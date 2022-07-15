import { Button, Form, Input, Modal, Radio } from "antd";
import { ApiRoute } from "Api";
import { RoleType, SexType, UserModel } from "Components/Shared/Models/User";
import { useAuth } from "Modules/hooks/useAuth";
import { useLoading } from "Modules/hooks/useLoading";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function UpdateStaff() {
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [form] = Form.useForm<UserModel>();
  const [userval, setUserval] = useState<UserModel>();
  const { user } = useAuth();
  const { setLoading } = useLoading();
  const { id } = useParams();

  const CreateUser = () => {
    console.log("update");
  };

  return (
    <>
      <Form
        id="create-user-form"
        layout="vertical"
        form={form}
        onFinish={CreateUser}
        initialValues={userval}
      >
        <Form.Item name={"id"} hidden={true}>
          <Input />
        </Form.Item>
        <Form.Item
          label={"Tên nhân viên"}
          name={"name"}
          rules={[
            {
              required: true,
              message: "Nhập tên nhân viên!",
              type: "string",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label={"Tên tài khoản"}
          name={"account"}
          rules={[
            {
              required: true,
              message: "Nhập tên tài khoản!",
              type: "string",
            },
            {
              message:
                "Tên tài khoản không dấu gồm 8-20 ký tự và không chứa kí tự đặc biệt!",
              pattern: new RegExp(
                "^(?=[a-zA-Z0-9._]{8,20}$)(?!.*[_.]{2})[^_.].*[^_.]$"
              ),
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item initialValue={"12345678"} name={"password"} hidden={true}>
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
            {Object.values(SexType).map((key, idx) => {
              const val = SexType[key as any];
              if (!isNaN(Number(val)))
                return (
                  <Radio key={idx} value={val}>
                    {SexType[val as any]}
                  </Radio>
                );
            })}
          </Radio.Group>
        </Form.Item>
        <Form.Item
          label={"Chức vụ"}
          name={"role"}
          rules={[
            {
              required: true,
              message: "Chọn chức vụ!",
            },
          ]}
        >
          <Radio.Group>
            {Object.values(RoleType).map((key, idx) => {
              const val = RoleType[key as any];
              if (!isNaN(Number(val)))
                return (
                  <Radio key={idx} value={val}>
                    {RoleType[val as any]}
                  </Radio>
                );
            })}
          </Radio.Group>
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
    </>
  );
}

export default UpdateStaff;
