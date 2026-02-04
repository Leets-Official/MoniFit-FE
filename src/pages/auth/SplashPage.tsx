import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const SplashPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // 2초 뒤에 로그인 페이지로 이동
    const timer = setTimeout(() => {
      navigate('/login');
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="flex items-center justify-center w-full h-screen">
      <div className="duration-1000 animate-in fade-in">
        <img src="/banner-4x.png" alt="MONIFIT" className="w-32 md:w-40" />
      </div>
    </div>
  );
};

export default SplashPage;