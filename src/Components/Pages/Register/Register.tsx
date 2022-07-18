import React, { useRef, useState } from "react";
import { Form, Input, Button, Radio } from "antd";
import { Link } from "react-router-dom";
import { RouteEndpoints } from "Components/router/MainRouter";
import { ApiRoute, UserApiRoute } from "Api";
import { publicEndpoints } from "Components/router/PublicRoutes";

export default function RegisterPage() {
  return (
    <>
      <h1 style={{ textAlign: "center", fontSize: 20, fontWeight: "bold" }}>
        Đăng ký tài khoản
      </h1>
      <RegisterForm />
    </>
  );
}

interface UserData {
  name: string;
  account: string;
  password: string;
  phone: string;
  email: string;
  address: string;
  sex: number;
}

const RegisterForm = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [user, setUser] = useState<UserData>({} as any);

  const passwordRef = useRef(null);
  const confirmPasswordRef = useRef(null);
  const emailRef = useRef(null);

  const checkConfirmPassword = () => {
    if (
      passwordRef.current?.value === null ||
      passwordRef.current?.value === ""
    )
      return false;
    if (passwordRef.current?.value !== confirmPasswordRef.current?.value)
      return false;
    return true;
  };

  const validateUser = () => {
    if (
      user.name === null ||
      user.account === null ||
      user.address === null ||
      user.email === null ||
      user.password === null ||
      user.phone === null ||
      user.sex === null
    )
      return false;
    return true;
  };

  const Register = async () => {
    if (!validateUser()) return;
    fetch(process.env.REACT_APP_API.concat(UserApiRoute.register), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => console.log(error));
  };

  return (
    <Form
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 8 }}
      layout="horizontal"
      style={{ marginTop: 20, padding: 10 }}
      onFinish={Register}
    >
      <Form.Item
        label="Họ và tên"
        name="name"
        rules={[{ required: true, message: "Nhập tên người dùng!" }]}
      >
        <Input
          onChange={(e) => {
            setUser({ ...user, name: e.target.value });
            console.log(user);
          }}
          value={user.name ?? ""}
        />
      </Form.Item>
      <Form.Item
        label="Số điện thoại"
        name="phone"
        rules={[{ required: true, message: "Nhập số điện thoại người dùng!" }]}
      >
        <Input
          onChange={(e) => {
            setUser({ ...user, phone: e.target.value });
            console.log(user);
          }}
          value={user.phone ?? ""}
          onKeyPress={(event) => {
            if (!/[0-9]/.test(event.key)) {
              event.preventDefault();
            }
          }}
        />
      </Form.Item>
      <Form.Item
        label="Email"
        name="email"
        rules={[{ required: true, message: "Nhập email!" }]}
      >
        <Input
          ref={emailRef}
          onChange={(e) => {
            setUser({ ...user, email: e.target.value });
            console.log(user);
          }}
          value={user.email ?? ""}
        />
      </Form.Item>
      <Form.Item label="Địa chỉ" name="address">
        <Input
          onChange={(e) => {
            setUser({ ...user, address: e.target.value });
            console.log(user);
          }}
          value={user.address ?? ""}
        />
      </Form.Item>
      <Form.Item
        label="Giới tính"
        rules={[{ required: true, message: "Chọn giới tính!" }]}
      >
        <Radio.Group
          defaultValue={1}
          onChange={(e) => {
            setUser({ ...user, sex: e.target.value });
            console.log(user);
          }}
          value={user.sex ?? 1}
        >
          <Radio value={1}> Nam </Radio>
          <Radio value={2}> Nữ </Radio>
        </Radio.Group>
      </Form.Item>
      <Form.Item
        label="Tên tài khoản"
        name="account"
        rules={[{ required: true, message: "Nhập tên tài khoản!" }]}
      >
        <Input
          onChange={(e) => {
            setUser({ ...user, account: e.target.value });
            console.log(user);
          }}
          value={user.account ?? ""}
        />
      </Form.Item>
      <Form.Item
        label="Mật khẩu"
        name="password"
        rules={[{ required: true, message: "Nhập mật khẩu!" }]}
      >
        <Input.Password
          ref={passwordRef}
          onChange={(e) => {
            setUser({ ...user, password: e.target.value });
            console.log(user);
          }}
          value={user.password ?? ""}
        />
      </Form.Item>
      <Form.Item
        label="Nhập lại mật khẩu"
        name="confirm password"
        rules={[
          {
            required: checkConfirmPassword(),
            message: "Mật khẩu không chính xác",
          },
        ]}
      >
        <Input.Password ref={confirmPasswordRef} />
      </Form.Item>
      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Đăng ký
        </Button>
        <Link
          to={publicEndpoints.login}
          style={{ textDecoration: "underline", marginLeft: 10 }}
        >
          Đã có tài khoản ?
        </Link>
      </Form.Item>
    </Form>
  );
};
