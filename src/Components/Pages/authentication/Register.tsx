import { useRef, useState } from "react";
import { Form, Input, Button, Radio, notification } from "antd";
import { Link } from "react-router-dom";
import { UserApiRoute } from "Api";
import { useLoading } from "Modules/hooks/useLoading";
import { useNavigate } from "react-router-dom";
import { publicEndpoints } from "Components/router/routes";

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
  confirmPassword: string;
  phone: string;
  email: string;
  address: string;
  sex: number;
  role?: number;
}

const RegisterForm = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [user, setUser] = useState<UserData>({} as any);
  const [form] = Form.useForm();
  const passwordRef = useRef(null);
  const confirmPasswordRef = useRef(null);
  const emailRef = useRef(null);
  const { setLoading } = useLoading();
  const navigate = useNavigate();
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

  ////////////////////////////////////////////////////////////////////////////////

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
      user.confirmPassword === null ||
      user.phone === null ||
      user.sex === null
    )
      return false;
    return true;
  };

  const checkPassword = () => {
    if (
      form.getFieldValue("password") === form.getFieldValue("confirmPassword")
    ) {
      return true;
    }

    form.setFields([
      {
        name: "confirmPassword",
        errors: ["Xác nhận mật khẩu không khớp"],
      },
    ]);
    return false;
  };

  const registerSuccess =
    "Registration successful, please check your email for verification instructions";
  const success = "success";
  const error = "error";
  const titleSuccess = "Đăng ký tài khoản thành công";
  const messageSuccess = "Vào mail kích hoạt tài khoản ngay nào";
  const titleError = "Đăng ký tài khoản thất bại";
  const messageError = "Tên tài khoản đã tồn tại";

  const Register = async () => {
    if (!validateUser()) return;
    if (!checkPassword()) return;

    setLoading(true);
    fetch(process.env.REACT_APP_API.concat(UserApiRoute.register), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(user),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log("register message >>>>>>>", data.message);
        setLoading(false);

        let s1: NotificationType, s2: string, s3: string;

        if (data.message === registerSuccess) {
          s1 = success;
          s2 = titleSuccess;
          s3 = messageSuccess;
        } else {
          s1 = error;
          s2 = titleError;
          s3 = messageError;
        }

        openNotificationWithIcon(s1, s2, s3);

        if (data.message === registerSuccess) {
          navigate(publicEndpoints.login);
        }
      })
      .catch((error) => {
        console.log("register error >>>>>>>", error);
        setLoading(false);
        openNotificationWithIcon(
          "error",
          "ERROR",
          `Tạo tài khoản không thành công`
        );
      });

    // console.log("form >>>>>>>>> ", user)
  };

  return (
    <Form
      form={form}
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
            // console.log(user);
          }}
          value={user.name ?? ""}
        />
      </Form.Item>
      <Form.Item
        label="Số điện thoại"
        name="phone"
        rules={[
          {
            required: true,
            message: "Nhập số điện thoại người dùng!",
          },
          {
            message: "Số điện thoại không đúng định dạng!",
            pattern: new RegExp("(84|0[3|5|7|8|9])+([0-9]{8})"),
          },
        ]}
      >
        <Input
          onChange={(e) => {
            setUser({ ...user, phone: e.target.value });
            // console.log(user);
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
        rules={[
          {
            required: true,
            message: "Nhập email!",
          },
          {
            message: "Email không đúng định dạng!",
            pattern: /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/,
          },
        ]}
      >
        <Input
          ref={emailRef}
          onChange={(e) => {
            setUser({ ...user, email: e.target.value });
            // console.log(user);
          }}
          value={user.email ?? ""}
        />
      </Form.Item>
      <Form.Item label="Địa chỉ" name="address">
        <Input
          onChange={(e) => {
            setUser({ ...user, address: e.target.value });
            // console.log(user);
          }}
          value={user.address ?? ""}
        />
      </Form.Item>
      <Form.Item
        name="sex"
        label="Giới tính"
        rules={[{ required: true, message: "Chọn giới tính!" }]}
      >
        <Radio.Group
          onChange={(e) => {
            setUser({ ...user, sex: e.target.value, role: 2 });
            // console.log(user);
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
            // console.log(user);
          }}
          value={user.account ?? ""}
        />
      </Form.Item>
      <Form.Item
        label="Mật khẩu"
        name="password"
        rules={[
          {
            required: true,
            message: "Nhập mật khẩu!",
          },
        ]}
      >
        <Input.Password
          minLength={6}
          ref={passwordRef}
          onChange={(e) => {
            setUser({ ...user, password: e.target.value });
            // console.log(user);
          }}
          value={user.password ?? ""}
        />
      </Form.Item>
      <Form.Item
        label="Nhập lại mật khẩu"
        name="confirmPassword"
        rules={[
          {
            required: checkConfirmPassword(),
            message: "Mật khẩu không chính xác",
          },
        ]}
      >
        <Input.Password
          ref={confirmPasswordRef}
          onChange={(e) => {
            setUser({ ...user, confirmPassword: e.target.value });
            // console.log(user);
          }}
          value={user.confirmPassword ?? ""}
        />
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
