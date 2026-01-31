import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "@/api/auth";

export default function CallbackPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const handleLogin = async () => {
      // 1. 카카오가 넘겨준 인가 코드 추출
      const code = new URL(window.location.href).searchParams.get("code");

      if (code) {
        try {
          // 2. Swagger 명세대로 POST 요청 전송
          // { "authorizationCode": "..." } 형태의 Body
          const response = await api.post('/auth/kakao/login', {
            authorizationCode: code,
          });

          // 3. 성공 응답에서 데이터 추출 (Swagger 구조 참고)
          const { accessToken, refreshToken, hasEverSetBudget } = response.data.data;

          // 4. 로컬 스토리지에 토큰 저장 (자동 로그인 및 인증 유지용)
          localStorage.setItem('accessToken', accessToken);
          localStorage.setItem('refreshToken', refreshToken);

          // 5. 요구사항 정의서에 따른 페이지 분기
          if (hasEverSetBudget) {
            // 기존 유저라면 메인으로
            navigate("/main");
          } else {
            // 신규 유저나 예산 설정이 안 된 경우 온보딩으로
            navigate("/onboarding/budget-setting");
          }
        } catch (error) {
          console.error("로그인 중 서버 오류 발생:", error);
          alert("로그인 처리 중 문제가 발생했습니다. 다시 시도해주세요.");
          navigate("/login");
        }
      }
    };

    handleLogin();
  }, [navigate]);

  return (
    <div className="flex h-full w-full items-center justify-center bg-black">
      <div className="text-center">
        {/* 간단한 로딩 스피너 */}
        <div className="mb-4 h-12 w-12 animate-spin rounded-full border-4 border-[#FEE500] border-t-transparent mx-auto"></div>
        <p className="text-white font-medium italic">로그인 정보를 확인하고 있어요...</p>
      </div>
    </div>
  );
}