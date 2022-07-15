import { Button, Form, Input, Modal, Radio, notification } from "antd";
import { AnimalApiRoute, ApiRoute } from "Api";
import { AnimalSexType } from "Components/Shared/Models/Animal";
import { useAuth } from "Modules/hooks/useAuth";
import { PlusOutlined } from "@ant-design/icons";
import React, { useState } from "react";

function CreateAnimal() {
  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
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
    duration: 2,
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
  ///////////////////////////////////////////////////////

  const CreateAnimalFinish = () => {
    if (user) {
      setConfirmLoading(true);
      fetch(process.env.REACT_APP_API.concat(AnimalApiRoute.create), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer ".concat(user.token),
        },
        body: JSON.stringify(form.getFieldsValue()),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log("create animal success");
          openNotificationWithIcon(
            "success",
            "Thêm động vật",
            "Thêm động vật thành công"
          );
        })
        .catch((error) => {
          console.log(error);
          openNotificationWithIcon(
            "error",
            "Thêm động vật",
            "Thêm động vật thất bại"
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
        title="Thêm động vật"
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
          onFinish={CreateAnimalFinish}
        >
          {/* /////////////////////////////////////////// */}
          <Form.Item
            label={"Tên động vật"}
            name={"name"}
            rules={[
              {
                required: true,
                message: "Nhập tên động vật!",
                type: "string",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label={"Mô tả"}
            name={"description"}
            rules={[
              {
                required: true,
                message: "Nhập mô tả!",
                type: "string",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label={"Tuổi"}
            name={"dayAge"}
            rules={[
              {
                required: true,
                message: "Nhập tuổi!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label={"Giới tính"}
            name={"sex"}
            rules={[
              {
                required: true,
                message: "Chọn giới tính!",
              },
            ]}
          >
            <Radio.Group>
              {Object.values(AnimalSexType).map((key, idx) => {
                const val = AnimalSexType[key as any];
                if (!isNaN(Number(val)))
                  return (
                    <Radio key={idx} value={val}>
                      {AnimalSexType[val as any]}
                    </Radio>
                  );
              })}
            </Radio.Group>
          </Form.Item>

          <Form.Item
            label={"Giá kiểm dịch"}
            name={"pricing"}
            rules={[
              {
                required: true,
                message: "Nhập giá kiểm dịch!",
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

export default CreateAnimal;
