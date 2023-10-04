/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from "react";
import { signOut, onAuthStateChanged } from "firebase/auth";

import { auth } from "@src/Firebase";
import axios from "axios";

export const NavBar = () => {
  const [isLogin, setIsLogin] = useState(false);

  const handleLogin = () => {
    window.location.href = `https://kauth.kakao.com/oauth/authorize?client_id=${
      import.meta.env.VITE_KAKAO_REST_API_KEY
    }&redirect_uri=${import.meta.env.VITE_REDIRECT_URL}&response_type=code`;
  };

  const handleLogout = async () => {
    const accessToken = localStorage.getItem("access_token");
    await signOut(auth);
    await axios.post(
      "https://kapi.kakao.com/v1/user/logout",
      {},
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      if (authUser !== null) {
        setIsLogin(true);
      } else {
        setIsLogin(false);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <div className="w-full h-24 flex flex-row justify-between items-center px-5 lg:px-20 shadow-lg">
      <span>Menu</span>
      <span>Cinema inside</span>
      {!isLogin ? (
        <button onClick={handleLogin}>Login</button>
      ) : (
        <button onClick={handleLogout}>Logout</button>
      )}
    </div>
  );
};
