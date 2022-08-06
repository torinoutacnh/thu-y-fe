import { useState } from "react";
import { Input, notification, Form, Modal } from "antd";
import { UserApiRoute } from "Api";
import { useAuth } from "Modules/hooks/useAuth";
import { useLoading } from "Modules/hooks/useLoading";

export function SendEmailForgotPassword() {
  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const { setLoading } = useLoading();
  const [form] = Form.useForm();
  const { user } = useAuth();

  const showModal = () => {
    setVisible(true);
  };

  const Cancel = () => {
    form.resetFields();
    setVisible(false);
  };

  ///////////////////////////////////////////////////////
  notification.config({
    placement: "topRight",
    bottom: 50,
    duration: 3,
    rtl: true,
  });

  type NotificationType = "success" | "info" | "warning" | "error";

  const openNotificationWithIcon = (type: NotificationType, title: string) => {
    notification[type]({
      message: title,
    });
  };
  ///////////////////////////////////////////////////////

  const onFinishForgotPassword = () => {
    setLoading(true);
    setVisible(false);
    fetch(process.env.REACT_APP_API.concat(UserApiRoute.forgotPassword), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form.getFieldsValue()),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("forgot password message >>>>>>", data.message);
        openNotificationWithIcon(
          "success",
          "Kiểm tra email để được hướng dẫn đặt lại mật khẩu"
        );
      })
      .catch((error) => {
        console.log("change password error >>>>>>", error);
        openNotificationWithIcon("error", "Tài khoản không tồn tại");
      })
      .finally(() => {
        form.resetFields();
        setLoading(false);
      });

    // console.log("account >>>>>>>", form.getFieldsValue())
  };
  ///////////////////////////////////////////////////////
  return (
    <>
      <a onClick={showModal}>Quên mật khẩu</a>
      <Modal
        title="Nhập tên tài khoản"
        visible={visible}
        confirmLoading={confirmLoading}
        onCancel={() => setVisible(false)}
        onOk={onFinishForgotPassword}
        okText="Xác nhận"
        cancelText="Hủy bỏ"
      >
        <Form
          id="forgot_password-form"
          layout="vertical"
          form={form}
          onFinish={onFinishForgotPassword}
        >
          {/* /////////////////////////////////////////// */}
          <Form.Item
            label={"Tên tài khoản"}
            name={"account"}
            rules={[
              {
                required: true,
                message: "Nhập tên tài khoản!",
                type: "string",
              },
            ]}
          >
            <Input />
          </Form.Item>

          {/* /////////////////////////////////////////// */}
        </Form>
      </Modal>
    </>
  );
}
