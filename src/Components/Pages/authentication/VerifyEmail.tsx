import React, { useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { useLoading } from "Modules/hooks/useLoading";
import { notification } from "antd";
import { ApiRoute, UserApiRoute } from "Api";
import { publicEndpoints } from "Components/router/routes";

export function VerifyEmail() {
  const { setLoading } = useLoading();
  const navigate = useNavigate();
  const location = useLocation();

  const params = new URLSearchParams(location.search);
  const veryData = {
    username: params.get("username"),
    token: params.get("token"),
  };

  ////////////////////////////////////////////////////////////////////////////////
  notification.config({
    placement: "topRight",
    bottom: 50,
    duration: 5,
    rtl: true,
  });

  type NotificationType = "success" | "info" | "warning" | "error";

  const openNotificationWithIcon = (
    type: NotificationType,
    title: string,
  ) => {
    notification[type]({
      message: title,
    });
  };



  ////////////////////////////////////////////////////////////////////////////////

  useEffect(() => {
    setLoading(true);
    fetch(process.env.REACT_APP_API.concat(UserApiRoute.verifyEmail), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(veryData),
    })
      .then((res) => {
        return res.json();
      })
      .then(async (res) => {

        const data = await res.json()

        if (res.status >= 500) {
          console.log("verifi email status >= 500 ", data);
          return
        }
        else if (res.status >= 400) {
          console.log("verifi email status >= 400 ", data);
          openNotificationWithIcon("error", data.message);
          return
        }

        console.log("verify message >>>>>>>", data.message);

        openNotificationWithIcon("success", data.message);

      })
      .catch((error) => {
        console.log("verify error >>>>>>>", error);

      })
      .finally(() => {
        setLoading(false);
        navigate(publicEndpoints.login);
      });
  }, []);
  ////////////////////////////////////////////////////////////////////////////////

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "400px",
      }}
    >
      <h1
        style={{
          textAlign: "center",
          marginTop: "20%",
          fontSize: "calc(3vw + 2px)",
          color: "blue",
        }}
      >
        Đang kích hoạt tài khoản, vui lòng đợi trong giây lát...
      </h1>
    </div>
  );
}
