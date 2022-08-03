import React, { useState } from "react";
import { Form, Input, Button, Checkbox, notification, Space } from "antd";

import { UserApiRoute } from "Api";
import { RouteEndpoints } from "Components/router/MainRouter";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "Modules/hooks/useAuth";
import { useLoading } from "Modules/hooks/useLoading";
import { publicEndpoints } from "Components/router/PublicRoutes";
import { IconType } from "antd/lib/notification";
import logoThuY from "../../../Static/image/logo.png";
import { SendEmailForgotPassword } from "../User/SendEmailForgotPassword";
import { UserLoginModel } from "Components/Shared/Models/User";
import moment from "moment";

export default function LoginPage() {
  return <LoginForm />;
}

interface UserLogin {
  username: string;
  password: string;
}

const LoginForm = () => {
  const [userinfo, setUserInfo] = useState<UserLogin>({} as any);
  const navigate = useNavigate();
  const { user, setUser } = useAuth();
  const { setLoading } = useLoading();

  function validateUser() {
    if (!userinfo?.username || !userinfo?.password) return false;
    return true;
  }

  const openNotification = (
    message: string,
    type: IconType,
    onClose?: any,
    body?: string
  ) => {
    notification.open({
      duration: 2.5,
      message: message,
      description: body,
      type: type,
      onClose: onClose,
    });
  };

  const Login = async () => {
    if (!validateUser()) return;
    setLoading(true);
    fetch(process.env.REACT_APP_API.concat(UserApiRoute.login), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userinfo),
    })
      .then((res) => {
        if (res.status >= 500)
          throw new Error("Lỗi hệ thống. Vui lòng thử lại sau");
        if (res.status >= 400) throw new Error("Sai tài khoản/mật khẩu");
        return res.json();
      })
      .then((data) => {
        openNotification("Đăng nhập thành công", "success");
        const expired = moment(new Date(), "DD-MM-YYYY hh:mm:ss")
          .add(1, "hours")
          .toString();
        (data.data as UserLoginModel).expired = expired;
        setUser(data.data);
        navigate(RouteEndpoints.home.basepath, { replace: true });
      })
      .catch((error) => {
        openNotification(error.message, "error", console.log(error));
        console.log(error);
      })
      .finally(() => setLoading(false));
  };

  return (
    <>
      <div style={{ width: "100%", marginBottom: "1%" }}>
        <img
          src={logoThuY}
          style={{
            width: "10%",
            display: "block",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        />
      </div>

      <Space
        align="center"
        direction="horizontal"
        style={{ width: "100%", justifyContent: "center" }}
      >
        <h1>Đăng nhập</h1>
      </Space>
      <Form
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 8 }}
        initialValues={{ remember: true }}
        // autoComplete="off"
        onFinish={Login}
        style={{ marginTop: 20 }}
      >
        <Form.Item
          label="Tài khoản"
          name="username"
          rules={[{ required: true, message: "Nhập tài khoản!" }]}
        >
          <Input
            onChange={(e) => {
              setUserInfo({ ...userinfo, username: e.target.value });
            }}
            value={userinfo.username ?? ""}
          />
        </Form.Item>

        <Form.Item
          label="Mật khẩu"
          name="password"
          rules={[{ required: true, message: "Nhập mật khẩu !" }]}
        >
          <Input.Password
            onChange={(e) => {
              setUserInfo({ ...userinfo, password: e.target.value });
            }}
            value={userinfo.password ?? ""}
          />
        </Form.Item>

        <Form.Item
          name="remember"
          valuePropName="checked"
          style={{ justifyContent: "center" }}
        >
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Form.Item style={{ justifyContent: "center" }}>
          <Button type="primary" htmlType="submit">
            Đăng nhập
          </Button>

          <Link to={publicEndpoints.register} style={{ marginLeft: 10 }}>
            Chưa có tài khoản ?
          </Link>
        </Form.Item>

        <Form.Item style={{ justifyContent: "center" }}>
          <SendEmailForgotPassword />
        </Form.Item>
      </Form>
    </>
  );
};
