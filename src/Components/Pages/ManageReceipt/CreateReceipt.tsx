import { Button, Col, Form, Input, Modal, notification, Row } from "antd";
import { useAuth } from "Modules/hooks/useAuth";
import { PlusOutlined } from "@ant-design/icons";
import { useState } from "react";
import { ManageReceiptRoute } from "Api";
import { DatePicker } from "antd";

import "moment/locale/zh-cn";
import { Navigate, useNavigate } from "react-router-dom";
import { manageReceiptEndpoints } from "Components/router/routes";
const CreateReceipt = (props: any) => {
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
  const date = new Date();

  const CreateReceipt = () => {
    if (user) {
      setConfirmLoading(true);
      fetch(
        process.env.REACT_APP_API.concat(ManageReceiptRoute.createReceipt),
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
          console.log("check data", data);
          openNotificationWithIcon(
            "success",
            "Thêm hóa đơn",
            "Thêm hóa đơn thành công"
          );
          navigate(manageReceiptEndpoints.basepath)
        })
        .catch((error) => {
          console.log(">>>> Delete error", error);
          openNotificationWithIcon("error", "Thêm hóa đơn", "Thêm lò hóa đơn");
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

          <h2 style={{ textAlign: "center" }}>Thêm mới hóa đơn</h2>
          <Form
            id="create-user-form"
            layout="vertical"
            form={form}
            onFinish={CreateReceipt}
          >
            <Form.Item
              label={"Tên hóa đơn"}
              name={"name"}
              rules={[
                {
                  required: true,
                  message: "Nhập tên hóa đơn!",
                  type: "string",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label={"Tên mã hóa đơn "}
              name={"codeName"}
              rules={[
                {
                  required: true,
                  message: "Nhập tên mã hóa đơn",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label={"Số trang"}
              name={"page"}
              rules={[
                {
                  required: true,
                  message: "Nhập số trang",
                },
                {
                  message: "Bao gồm các số 0-9!",
                  pattern: new RegExp("[0-9]"),
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label={"Số mã hóa đơn"}
              name={"codeNumber"}
              rules={[
                {
                  required: true,
                  message: "Nhập số mã hóa đơn!",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item label={"Ngày hiệu lực"} name={"effectiveDate"}
              rules={[
                {
                  required: true,
                  message: "Chọn ngày hiệu lực!",
                }
              ]}
            >
              <DatePicker
                style={{ width: "100%" }}
                placeholder="Chọn ngày hiệu lực"
              />

              {/* <DatePicker
                defaultValue={moment(date, "YYYY-MM-DD")}
                style={{ width: "100%" }}
              /> */}
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

export default CreateReceipt;
