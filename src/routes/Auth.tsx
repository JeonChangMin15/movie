// import axios from "axios";
// import { useEffect } from "react";

// const KaKaoAuth = () => {
//   const code = new URL(window.location.href).searchParams.get("code");

//   console.log("mycode", code);

//   useEffect(() => {
//     const getToken = async () => {
//       const { data } = await axios.post(
//         "https://kauth.kakao.com/oauth/token",
//         {
//           grant_type: "authorization_code",
//           client_id: import.meta.env.VITE_KAKAO_REST_API_KEY,
//           redirect_uri: import.meta.env.VITE_REDIRECT_URL,
//           code,
//         },
//         {
//           headers: {
//             "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
//           },
//         }
//       );

//       return data;
//     };

//     const accessToken = getToken();

//     console.log("accessToken", accessToken);
//   }, []);
//   return <div>카카오 로그인 페이지</div>;
// };

// export default KaKaoAuth;

import axios from "axios";
import { useEffect } from "react";

const KaKaoAuth = () => {
  const code = new URL(window.location.href).searchParams.get("code");

  console.log("mycode", code);

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
        console.log("data", data);
        console.log("user", userInfo);
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
        console.log("custom", customToken);
      } catch (error) {
        console.error("Error fetching access token", error);
      }
    };

    getToken();
  }, []);

  return <div>카카오 로그인 페이지</div>;
};

export default KaKaoAuth;
