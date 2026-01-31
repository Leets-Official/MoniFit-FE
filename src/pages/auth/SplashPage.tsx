import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const SplashPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // 2초 뒤에 로그인 페이지로 이동
    const timer = setTimeout(() => {
      navigate('/auth/login');
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="flex h-screen w-full items-center justify-center">
      <div className="animate-in fade-in duration-1000">
        <img src="/src/public/banner.png" alt="MONIFIT" className="w-32 md:w-40" />
      </div>
    </div>
  );
};

export default SplashPage;