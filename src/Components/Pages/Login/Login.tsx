import React, { useState } from "react";
import { Form, Input, Button, Checkbox } from "antd";

import "./login.css";
import { ApiRoute } from "Api/ApiRoute";
import { RouteEndpoints } from "Components/router/MainRouter";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "Modules/hooks/useAuth";
import { useLoading } from "Modules/hooks/useLoading";

export default function LoginPage() {
  return (
    <>
      <h1 className="text-center">Login page</h1>
      <LoginForm />
    </>
  );
}

interface UserLogin {
  username: string;
  password: string;
}

const LoginForm = () => {
  const [userinfo, setUserInfo] = useState<UserLogin>({} as any);
  const navigate = useNavigate();
  const { setUser } = useAuth();
  const { setLoading } = useLoading();

  function validateUser() {
    if (!userinfo.username || !userinfo.password) return false;
    return true;
  }

  const Login = async () => {
    if (!validateUser()) return;
    setLoading(true);
    fetch(process.env.REACT_APP_API.concat(ApiRoute.login), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userinfo),
    })
      .then((res) => res.json())
      .then((data) => {
        setUser(data.data);
        navigate(RouteEndpoints.home.basepath, { replace: true });
      })
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  };

  return (
    <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 8 }}
      initialValues={{ remember: true }}
      autoComplete="off"
      onFinish={Login}
      style={{ marginTop: 20 }}
    >
      <Form.Item
        label="Taì khoản"
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
        wrapperCol={{ offset: 8, span: 16 }}
      >
        <Checkbox>Remember me</Checkbox>
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Đăng nhập
        </Button>
        <Link
          to={RouteEndpoints.user.register}
          style={{ textDecoration: "underline", marginLeft: 10 }}
        >
          Chưa có tài khoản ?
        </Link>
      </Form.Item>
    </Form>
  );
};
