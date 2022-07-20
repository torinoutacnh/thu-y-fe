import { Button, Form, Input, Modal, Radio, notification } from "antd";

import { useAuth } from "Modules/hooks/useAuth";
import { PlusOutlined } from "@ant-design/icons";
import React, { useState } from "react";
import { ManageAbattoirRoute } from "Api";
const CreateAbattoir = (props: any) => {
  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [form] = Form.useForm();
  const { user } = useAuth();
  notification.config({
    placement: "topRight",
    bottom: 50,
    duration: 3,
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
  const showModal = () => {
    setVisible(true);
  };

  const Cancel = () => {
    form.resetFields();
    setVisible(false);
  };

  const CreateUser = () => {
    if (user) {
      setConfirmLoading(true);
      fetch(
        process.env.REACT_APP_API.concat(ManageAbattoirRoute.createAbattoir),
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer ".concat(user.token),
          },
          body: JSON.stringify(form.getFieldsValue()),
        }
      )
        .then((res) => res.json())
        .then((data) => {
          openNotificationWithIcon(
            "success",
            "Thêm lò mổ",
            "Thêm lò mổ thành công"
          );
          props.UpdateAbattoirAfterCreate();
        })
        .catch((error) => {
          console.log(">>>> Delete error", error);
          openNotificationWithIcon(
            "error",
            "Thêm lò mổ",
            "Thêm lò mổ thất bại"
          );
        })
        .finally(() => {
          setVisible(false);
          setConfirmLoading(false);
          form.resetFields();
        });
    }
  };

  return (
    <>
      <Button type="primary" icon={<PlusOutlined />} onClick={showModal}>
        Thêm mới
      </Button>
      <Modal
        title="Thêm lò mổ"
        visible={visible}
        footer={
          <>
            <Button type="default" htmlType="button" onClick={Cancel}>
              Hủy bỏ
            </Button>
            <Button
              form="create-user-form"
              type="primary"
              loading={confirmLoading}
              htmlType="submit"
            >
              Thêm mới
            </Button>
          </>
        }
        confirmLoading={confirmLoading}
        onCancel={() => setVisible(false)}
      >
        <Form
          id="create-user-form"
          layout="vertical"
          form={form}
          onFinish={CreateUser}
        >
          <Form.Item
            label={"Tên lò mổ"}
            name={"name"}
            rules={[
              {
                required: true,
                message: "Nhập tên lò mổ!",
                type: "string",
              },
              {
                message:
                  "Tên lò mổ gồm 8-20 ký tự và không chứa kí tự đặc biệt!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label={"Tên người quản lý"}
            name={"managerName"}
            rules={[
              {
                required: true,
                message: "Nhập tên người quản lý!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label={"Số điện thoại"}
            name={"phone"}
            rules={[
              {
                required: true,
                message: "Nhập số điện thoại!",
              },
              {
                message: "Số điện thoại không đúng định dạng!",
                pattern: new RegExp("(84|0[3|5|7|8|9])+([0-9]{8})"),
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label={"Email"}
            name={"email"}
            rules={[
              {
                message: "Số email không đúng định dạng!",
                pattern: /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item label={"Địa chỉ"} name={"address"}>
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default CreateAbattoir;
