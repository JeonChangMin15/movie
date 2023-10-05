import { useEffect } from "react";
import { signOut, onAuthStateChanged } from "firebase/auth";
import axios from "axios";

import { auth } from "@src/Firebase";
import { useAppSelector, useAppDispatch } from "@src/redux/hooks";
import {
  login,
  logout,
  selectLogin,
} from "@src/redux/feature/login/loginSlice";

export const NavBar = () => {
  const isLogin = useAppSelector(selectLogin);
  const dispatch = useAppDispatch();

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
      console.log("auth", authUser);
      if (authUser !== null) {
        dispatch(login());
      } else {
        dispatch(logout());
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
