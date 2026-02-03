export default function LoginPage() {
const REST_API_KEY = import.meta.env.VITE_KAKAO_CLIENT_ID;
  const REDIRECT_URI = import.meta.env.VITE_KAKAO_REDIRECT_URI;
  const handleKakaoLogin = () => {
    console.log("카카오 로그인 프로세스 시작");
    window.location.href = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;
  };

  return (
    <div className="relative flex h-full w-full flex-col items-center justify-end pb-20 px-6">
      
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 h-full w-full object-cover opacity-60"
      >
        <source src="/login-video.mp4" type="video/mp4" />
      </video>

    <div className="relative z-10 flex w-full items-center justify-center mb-12">
      <button
        onClick={handleKakaoLogin}
        className="relative z-10 flex w-full items-center justify-center w-[285px] h-[63px] gap-3 rounded-xl bg-[#FEE500] py-4 text-[20px] font-bold text-black"
      >
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
          <path d="M12 3C7.029 3 3 6.129 3 10.023C3 12.553 4.636 14.777 7.091 16.095L6.155 19.544C6.096 19.754 6.34 19.923 6.516 19.805L10.59 17.076C11.05 17.14 11.519 17.175 12 17.175C16.971 17.175 21 14.046 21 10.151C21 6.256 16.971 3.127 12 3.127V3Z" fill="black" />
        </svg>
        카카오 로그인
      </button>
      </div>
    </div>
  );
}