import { useState } from "react";
import { Input, notification, Form, Modal } from "antd";
import { UserApiRoute } from "Api";
import { useAuth } from "Modules/hooks/useAuth";
import { useLoading } from "Modules/hooks/useLoading";

export function ChangePassword() {
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

  const messageSucces = "Password change successful, you can now login";
  const success = "success";
  const error = "error";
  const titleSuccess = "Thay đổi mật khẩu thành công";
  const titleError = "Mật khẩu cũ không chính xác";

  const onFinshChangePassword = () => {
    if (checkLengthPassword() === false) return;
    if (checkConfirmPassword() === false) return;

    setLoading(true);
    setVisible(false);
    fetch(process.env.REACT_APP_API.concat(UserApiRoute.changePassword), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer ".concat(user.token),
      },
      body: JSON.stringify(form.getFieldsValue()),
    })
      .then(async (res) => {

        const data = await res.json()

        if (res.status >= 500) {
          console.log("change pass status >= 500 ", data);
          return
        }
        else if (res.status >= 400) {
          console.log("change pass status >= 400 ", data);
          openNotificationWithIcon(error, data.message);
          return
        }

        console.log("change password message >>>>>>", data.message);

        openNotificationWithIcon(success, titleSuccess);
      })
      .catch((error) => {
        console.log("change password error >>>>>>", error);
      })
      .finally(() => {
        form.resetFields();
        setLoading(false);
      });

    // console.log("password >>>>>>>", form.getFieldsValue())
  };
  ///////////////////////////////////////////////////////
  return (
    <>
      <a onClick={showModal}>Đổi mật khẩu</a>
      <Modal
        title="Đổi mật khẩu"
        visible={visible}
        confirmLoading={confirmLoading}
        onCancel={() => setVisible(false)}
        onOk={onFinshChangePassword}
        okText="Xác nhận"
        cancelText="Hủy bỏ"
      >
        <Form
          id="change_password-form"
          layout="vertical"
          form={form}
          onFinish={onFinshChangePassword}
        >
          {/* /////////////////////////////////////////// */}
          <Form.Item
            label={"Mật khẩu cũ"}
            name={"oldPassword"}
            rules={[
              {
                required: true,
                message: "Nhập mật khẩu cũ!",
                type: "string",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            label={"Mật khẩu mới"}
            name={"password"}
            rules={[
              {
                required: true,
                message: "Nhập mật khẩu mới!",
                type: "string",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            label={"Xác nhận mật khẩu mới"}
            name={"confirmPassword"}
            rules={[
              {
                required: true,
                message: "Nhập xác nhận mật khẩu!",
                type: "string",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            label={"Tài khoản"}
            name={"account"}
            rules={[
              {
                type: "string",
              },
            ]}
            initialValue={user.account}
          >
            <Input disabled={true} />
          </Form.Item>

          {/* /////////////////////////////////////////// */}
        </Form>
      </Modal>
    </>
  );
}
