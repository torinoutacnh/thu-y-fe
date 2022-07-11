import React, { useState, useEffect } from "react";
import { Form, Button, Input, Modal, Select } from "antd";
import TextArea from "antd/lib/input/TextArea";
const ModalEditUser = ({ visible, onok, onCancel, dataUser }) => {
  const { Option } = Select;
  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setUserdata({ ...userdata, [name]: value });
  };
  const handleChange = (value) => {
    console.log(typeof `selected ${value}`);
  };

  console.log("dataUser", dataUser);
  const [form] = Form.useForm();
  const initialUser = {
    name: "",
    account: "",
    password: "",
    phone: "",
    email: "",
    address: "",
    sex: 1,
    role: 1,
  };
  const [userdata, setUserdata] = useState(initialUser);
  const { name, account, password, phone, email, address, sex, role } =
    userdata;

  const onFinish = async (e) => {
    alert("finish");
  };
  return (
    <div>
      <Modal
        visible={visible}
        onOk={onok}
        onCancel={onCancel}
        title="Sửa thông tin nhân viên"
      >
        <Form
          name="basic"
          form={form}
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 12,
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item
            label="Họ tên"
            name="name"
            rules={[
              {
                required: true,
                message: "Nhập họ và tên!",
              },
            ]}
            hasFeedback
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Tài khoản"
            name="account"
            rules={[
              {
                required: true,
                message: "Nhập tài khoản!",
              },
            ]}
            hasFeedback
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="password"
            label="Mật khẩu"
            rules={[
              {
                required: true,
                message: "Nhập mật khẩu!",
              },
            ]}
            hasFeedback
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            name="phone"
            label="Số điện thoại"
            rules={[
              {
                required: true,
                message: "Nhập số điện thoại!",
              },
            ]}
            hasFeedback
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[
              {
                required: true,
                message: "Nhập email!",
              },
              {
                type: "email",
                message: "Hãy nhập đúng định dạng email!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="address"
            label="Địa chỉ"
            rules={[
              {
                required: true,
                message: "Nhập địa chỉ!",
              },
            ]}
            hasFeedback
          >
            <TextArea />
          </Form.Item>
          <Form.Item label="Giới tính" name="sex">
            <Select
              rules={[
                {
                  required: true,
                  message: "Chọn giới tính!",
                },
              ]}
              style={{
                width: "100%",
              }}
              hasFeedback
              onChange={handleChange}
            >
              <Option value={1} name="1">
                Nam
              </Option>
              <Option value={0} name="0">
                Nữ
              </Option>
            </Select>
          </Form.Item>
          <Form.Item label="Chức vụ" name="role">
            <Select
              rules={[
                {
                  required: true,
                  message: "Chọn chức vụ!",
                },
              ]}
              style={{
                width: "100%",
              }}
              hasFeedback
              onChange={handleChange}
            >
              <Option value={1} name="1">
                Nhân viên
              </Option>
              <Option value={2} name="2">
                Quản lý
              </Option>
              <Option value={3} name="3">
                Giám dốc
              </Option>
            </Select>
          </Form.Item>
          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button type="primary" htmlType="submit">
              Sửa thông tin
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ModalEditUser;
