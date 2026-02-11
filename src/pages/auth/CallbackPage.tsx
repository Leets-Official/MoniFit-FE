import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { getDashboard } from '@/api/budgetPeriod';

export default function CallbackPage() {
  const navigate = useNavigate();
  const calledRef = useRef(false);

  useEffect(() => {
    if (calledRef.current) return;
    calledRef.current = true;
    
    const handleCallback = async () => {
      const params = new URLSearchParams(window.location.search);
      const authorizationCode = params.get('code');

      if (!authorizationCode) {
        console.error('인가 코드가 없습니다');
        navigate('/login');
        return;
      }

      try {
        console.log('백엔드로 인가 코드 전송:', authorizationCode);
        
        // 1. 카카오 로그인
        const response = await axios.post(
          '/api/v1/auth/kakao/login',
          {
            authorizationCode: authorizationCode
          }
        );

        const { accessToken, refreshToken } = response.data.data;
        
        // 토큰 저장
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);
        
        console.log('로그인 성공');

        // 2. 대시보드 조회로 활성 기간 확인
        const dashboardData = await getDashboard();

        if (dashboardData.hasPeriod) {
          // 활성 기간 있음 → 메인 화면
          console.log('활성 기간 있음 - 메인 화면으로 이동');
          navigate('/main');
        } else {
          // 활성 기간 없음 → 예산 설정 화면
          console.log('활성 기간 없음 - 예산 설정 화면으로 이동');
          navigate('/onboarding/budget-setting');
        }
        
      } catch (error) {
        console.error('로그인 처리 실패:', error);
        
        // 대시보드 조회 실패 시 안전하게 예산 설정 화면으로
        if (axios.isAxiosError(error) && error.response?.status === 401) {
          // 인증 실패
          alert('로그인에 실패했습니다. 다시 시도해주세요.');
          navigate('/login');
        } else {
          // 기타 오류 - 예산 설정 화면으로
          navigate('/onboarding/budget-setting');
        }
      }
    };

    handleCallback();
  }, [navigate]);

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="text-center">
        <div className="mb-4 text-xl">로그인 처리 중...</div>
        <div className="text-sm text-gray-500">잠시만 기다려주세요</div>
      </div>
    </div>
  );
}