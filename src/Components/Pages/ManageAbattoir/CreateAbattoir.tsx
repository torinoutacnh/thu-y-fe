import { Button, Form, Input, Modal, Radio, notification, Col, Row } from "antd";

import { useAuth } from "Modules/hooks/useAuth";
import { PlusOutlined } from "@ant-design/icons";
import React, { useState } from "react";
import { ManageAbattoirRoute } from "Api";
import { useNavigate } from "react-router-dom";
import { abattoirEndpoints, manageabattoirEndpoints } from "Components/router/routes";
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
  const navigate = useNavigate()

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
          navigate(manageabattoirEndpoints.basepath)
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

      <Row>
        <Col xs={24} sm={5} md={7} lg={7}></Col>
        <Col xs={24} sm={12} md={10} lg={10}>

          <h2 style={{ textAlign: "center" }}>Tạo mới lò mổ</h2>
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
            <Form.Item>
              <Button
                form="create-user-form"
                type="primary"
                loading={confirmLoading}
                htmlType="submit"
              >
                Thêm mới
              </Button>
            </Form.Item>
          </Form>

        </Col>
        <Col xs={24} sm={5} md={7} lg={7}></Col>
      </Row>
    </>
  );
};

export default CreateAbattoir;
