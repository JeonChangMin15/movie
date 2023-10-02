export const NavBar = () => {
  const handleLogin = () => {
    window.location.href = `https://kauth.kakao.com/oauth/authorize?client_id=${
      import.meta.env.VITE_KAKAO_REST_API_KEY
    }&redirect_uri=${import.meta.env.VITE_REDIRECT_URL}&response_type=code`;
  };

  return (
    <div className="w-full h-24 flex flex-row justify-between items-center px-5 lg:px-20 shadow-lg">
      <span>Menu</span>
      <span>Cinema inside</span>
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};
