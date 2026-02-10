import axios from "axios";

const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_BASE_URL}/api/v1`,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request 인터셉터 - 모든 요청에 Access Token 자동 추가
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response 인터셉터 - 401 에러 시 토큰 자동 재발급
api.interceptors.response.use(
  (response) => {
    // 정상 응답은 그대로 반환
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // 401 에러이고, 재시도가 아닌 경우에만 토큰 재발급 시도
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; // 무한 루프 방지

      try {
        const refreshToken = localStorage.getItem('refreshToken');
        
        // Refresh Token이 없으면 로그인 페이지로
        if (!refreshToken) {
          localStorage.clear();
          window.location.href = '/login';
          return Promise.reject(error);
        }

        // API 명세서대로 토큰 재발급 요청
        const response = await axios.post('/api/v1/auth/reissue', {
          refreshToken: refreshToken
        });

        // 명세서 구조: response.data.data
        const { accessToken, refreshToken: newRefreshToken } = response.data.data;

        // 새 토큰 저장
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', newRefreshToken);

        // 실패했던 원래 요청에 새 토큰을 넣어서 재시도
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        return api(originalRequest);

      } catch (refreshError) {
        // Refresh Token도 만료되었거나 유효하지 않은 경우
        console.error('토큰 재발급 실패:', refreshError);
        localStorage.clear();
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }

    // 401이 아닌 다른 에러는 그대로 반환
    return Promise.reject(error);
  }
);

export default api;
