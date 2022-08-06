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
    message: string
  ) => {
    notification[type]({
      message: title,
      description: message,
    });
  };

  const VerifyError = "Verification failed";
  const successType = "success";
  const errortype = "error";
  const titleSuccess = "Xác minh tài khoản thành công";
  const messageSuccess = "Bạn có thể đăng nhập ngay bây giờ";
  const titleError = "Xác minh tài khoản thất bại";
  const messageError = "Vui lòng kiểm tra lại";

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
      .then((data) => {
        console.log("verify message >>>>>>>", data.message);
        setLoading(false);
        let s1: NotificationType, s2: string, s3: string;
        if (data.message === VerifyError) {
          s1 = errortype;
          s2 = titleError;
          s3 = messageError;
        } else {
          s1 = successType;
          s2 = titleSuccess;
          s3 = messageSuccess;
        }
        openNotificationWithIcon(s1, s2, s3);
      })
      .catch((error) => {
        console.log("verify error >>>>>>>", error);

        openNotificationWithIcon(errortype, titleError, messageError);
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
