import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { HiChatBubbleOvalLeft } from "react-icons/hi2";

import { auth } from "@src/Firebase";
import { useAppSelector, useAppDispatch } from "@src/redux/hooks";
import { handleChart } from "@src/redux/feature/chart/chartSlice";
import {
  login,
  logout,
  selectLogin,
} from "@src/redux/feature/login/loginSlice";

export const NavBar = () => {
  const navigate = useNavigate();

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
      <span className="inline sm:hidden">Menu</span>
      <span
        className="hidden sm:inline hover:cursor-pointer"
        onClick={() => dispatch(handleChart())}
      >
        Chart
      </span>
      <span
        onClick={() => navigate("/")}
        className="text-base font-normal sm:text-xl sm:font-semibold hover:cursor-pointer"
      >
        Cinema inside
      </span>
      {!isLogin ? (
        <button
          onClick={handleLogin}
          className="flex items-center justify-center gap-x-2 bg-yellow-300 hover:bg-yellow-400 px-2 py-1 sm:px-6 sm:py-3 rounded-lg"
        >
          <HiChatBubbleOvalLeft className="w-3 h-3 sm:w-5 sm:h-5" />
          <span>Login</span>
        </button>
      ) : (
        <button
          onClick={handleLogout}
          className="flex items-center justify-center gap-x-2 bg-yellow-300 hover:bg-yellow-400 px-2 py-1 sm:px-6 sm:py-3 rounded-lg"
        >
          <HiChatBubbleOvalLeft className="w-3 h-3 sm:w-5 sm:h-5" />
          <span>Logout</span>
        </button>
      )}
    </div>
  );
};
