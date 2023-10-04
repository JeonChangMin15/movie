import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithCustomToken } from "firebase/auth";

import { Loading } from "@src/component/common/Loading";
import { auth } from "@src/Firebase";

const KaKaoAuth = () => {
  const navigate = useNavigate();
  const code = new URL(window.location.href).searchParams.get("code");

  useEffect(() => {
    const getToken = async () => {
      try {
        const { data } = await axios.post(
          "https://kauth.kakao.com/oauth/token",
          {
            grant_type: "authorization_code",
            client_id: import.meta.env.VITE_KAKAO_REST_API_KEY,
            redirect_uri: import.meta.env.VITE_REDIRECT_URL,
            code,
          },
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
            },
          }
        );

        localStorage.setItem("access_token", data.access_token);

        const { data: userInfo } = await axios.post(
          "https://kapi.kakao.com/v2/user/me",
          {},
          {
            headers: {
              Authorization: `Bearer ${data.access_token}`,
              "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
            },
          }
        );

        const cloudFunctionURL =
          "https://createcustomtoken-n4nx2ygzza-uc.a.run.app";
        const userData = {
          uid: String(userInfo.id),
          email: userInfo.kakao_account.email,
          displayName: userInfo.kakao_account.profile.nickname,
          photoURL: userInfo.kakao_account.profile.profile_image_url,
        };

        const { data: customToken } = await axios.post(
          cloudFunctionURL,
          userData
        );

        const loginInfo = await signInWithCustomToken(auth, customToken.token);

        navigate("/");
      } catch (error) {
        console.error("Error fetching access token", error);
        navigate("/");
      }
    };

    getToken();
  }, []);

  return (
    <div>
      <Loading />
    </div>
  );
};

export default KaKaoAuth;
