import React, { useEffect } from "react";
import { Button, Col, Form, Input, Modal, Radio, Row } from "antd";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { useLoading } from "Modules/hooks/useLoading";
import { notification } from "antd";
import { ApiRoute, UserApiRoute } from "Api";
import { publicEndpoints } from "Components/router/routes";

export function VerifyForgotPassword() {
  const [form] = Form.useForm();
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
  const checkLengthPassword = () => {
    if (form.getFieldValue("password").length >= 6) {
      return true;
    }
    form.setFields([
      {
        name: "password",
        errors: ["Mật khẩu tối thiểu 6 ký tự"],
      },
    ]);
    return false;
  };

  const checkConfirmPassword = () => {
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

  const onFinishForgotPassword = () => {
    if (!checkLengthPassword()) return;
    if (!checkConfirmPassword()) return;

    const data = {
      token: veryData.token,
      password: form.getFieldValue("password"),
      confirmPassword: form.getFieldValue("confirmPassword"),
      account: veryData.username,
    };
    setLoading(true);
    fetch(process.env.REACT_APP_API.concat(UserApiRoute.resetPassword), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })

      .then(async (res) => {

        const data = await res.json()

        if (res.status >= 500) {
          console.log("reset pasword   status >= 500 ", data);
          return
        }
        else if (res.status >= 400) {
          console.log("reset pasword   status >= 400 ", data);
          openNotificationWithIcon("error", data.message);
          return
        }

        console.log("register message >>>>>>>", data.message);
        openNotificationWithIcon("success", data.message);

      })
      .catch((error) => {
        console.log("register error >>>>>>>", error);

      })
      .finally(() => {
        setLoading(false);
        navigate(publicEndpoints.login);
      });
  };

  ////////////////////////////////////////////////////////////////////////////////

  return (
    <div>
      <Row>
        <Col xs={24} sm={24} md={8} lg={8}></Col>
        <Col xs={24} sm={24} md={8} lg={8}>
          <h1 style={{ textAlign: "center" }}>Cấp lại mật khẩu</h1>

          <Form
            style={{ marginTop: 20 }}
            id="update-user-form"
            layout="vertical"
            form={form}
            onFinish={onFinishForgotPassword}
          >
            <Form.Item
              name={"password"}
              label={"Mật khẩu"}
              rules={[
                {
                  required: true,
                  message: "Nhập mật khẩu!",
                  type: "string",
                },
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item
              name={"confirmPassword"}
              label={"Nhập lại mật khẩu"}
              rules={[
                {
                  required: true,
                  message: "Nhập lại mật khẩu!",
                  type: "string",
                },
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Button type="primary" htmlType="submit">
              Xác nhận
            </Button>
          </Form>
        </Col>
        <Col xs={24} sm={24} md={8} lg={8}></Col>
      </Row>
    </div>
  );
}
