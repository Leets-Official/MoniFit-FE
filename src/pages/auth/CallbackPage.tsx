import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

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
        
        // 백엔드로 인가 코드 전송
        const response = await axios.post(
          `${import.meta.env.VITE_API_BASE_URL}/api/v1/auth/kakao/login`,
          {
            authorizationCode: authorizationCode
          }
        );

        const { accessToken, refreshToken } = response.data.data;
        
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);
        
        console.log('로그인 성공');
        navigate('/main');
      } catch (error) {
        console.error('카카오 로그인 실패:', error);
        alert('로그인에 실패했습니다. 다시 시도해주세요.');
        navigate('/login');
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
