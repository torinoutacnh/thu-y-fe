import React, { useState, useEffect } from "react";
import "./Staff.css";
import { ArrowLeftOutlined, PlusOutlined } from "@ant-design/icons";
import {
  Table,
  Form,
  notification,
  Breadcrumb,
  Button,
  Input,
  Modal,
} from "antd";
import { Select } from "antd";
import Icon, {
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import { ApiRoute } from "Api/ApiRoute";
import TextArea from "antd/lib/input/TextArea";
import { useAuth } from "Modules/hooks/useAuth";

const ContentStaff = ({ liststaff }) => {
  const { Option } = Select;
  const [form] = Form.useForm();
  const handleClearFrom = () => {
    form.resetFields(); //reset form
  };
  // const handleOk = async (e) => {
  //   form.resetFields(); //reset form
  // };

  const rows = [];

  // liststaff &&
  //   liststaff.forEach((item) => {
  //     rows.push({
  //       id: item.id,
  //       account: item.account,
  //       address: item.address,
  //       email: item.email,
  //       name: item.name,
  //       phone: item.phone,
  //       role: item.role,
  //       sex: item.sex,
  //     });
  //   });

  const deleteUserHandle = (params) => {
    alert("deleted");
    const userId = params.id;
    fetch(
      process.env.REACT_APP_API.concat(ApiRoute.deleteUser, `?id=${userId}`),
      // new URLSearchParams(test),
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => {
        console.log(res);
        return res.json();
      })
      .then((data) => {
        console.log(data);
      })
      .catch((error) => console.log(error));
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Họ tên",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Tài khoản",
      dataIndex: "account",
      key: "account",
    },
    {
      title: "Địa chỉ",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Số điện thoại",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Chức vụ",
      dataIndex: "role",
      key: "role",
      render: (text) => (
        <p>
          {text === 1
            ? "Nhân viên"
            : text === 2
            ? "Quản lý"
            : text === 3
            ? "Giám đốc"
            : ""}
        </p>
      ),
    },
    {
      title: "Giới tính",
      dataIndex: "sex",
      render: (text) => <p>{text === 1 ? "Nam" : "Nữ"}</p>,
    },
    {
      title: "Trạng thái",
      key: "status",
      render: (params) => (
        <>
          <EyeOutlined className="icon-status" />
          <EditOutlined
            className="icon-status"
            onClick={() => showEditModal(params)}
          />
          {/* <DeleteOutlined
            className="icon-status"
            onClick={() => deleteUserHandle(params)}
          /> */}
        </>
      ),
    },
  ];
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalEditVisible, setIsModalEditisible] = useState(false);

  const initialUser = {
    id: "",
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
  const { id, name, account, password, phone, email, address, sex, role } =
    userdata;

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setUserdata({ ...userdata, [name]: value });
    console.log(userdata);
  };
  const user = useAuth();
  const onFinish = async (e) => {
    const newUser = {
      name: e.name,
      account: e.account,
      password: e.password,
      phone: e.phone,
      email: e.email,
      address: e.address,
      sex: Number(e.sex),
      role: Number(e.role),
    };
    fetch(process.env.REACT_APP_API.concat(ApiRoute.createUser), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer ".concat(user.token),
      },
      body: JSON.stringify(newUser),
    })
      .then((res) => {
        console.log(res);
        return res.json();
      })
      .then((data) => {
        handleOk();
        openNotificationWithIcon("success", "created user");
      })
      .catch((error) => console.log(error));
    form.resetFields();
  };
  const showModal = () => {
    setIsModalVisible(true);
  };
  const showEditModal = (params) => {
    console.log(params);
    setIsModalEditisible(true);
    if (params === null) return;
    else {
      setUserdata({ ...params });
    }
    console.log(userdata.sex);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };
  const handleOkEdit = () => {
    setIsModalEditisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const handleEditCancel = () => {
    setIsModalEditisible(false);
  };
  const handleChange = (value) => {
    console.log(typeof `selected ${value}`);
  };
  const openNotificationWithIcon = (type, message) => {
    notification[type]({
      message: message,
    });
  };
  const handleEditUser = () => {
    console.log("edit user", userdata);
    const newUser = {
      id: userdata.id,
      name: userdata.name,
      account: userdata.account,
      password: userdata.password,
      phone: userdata.phone,
      email: userdata.email,
      address: userdata.address,
      sex: Number(userdata.sex),
      role: Number(userdata.role),
    };
    fetch(process.env.REACT_APP_API.concat(ApiRoute.updateUser), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer ".concat(user.token),
      },
      body: JSON.stringify(newUser),
    })
      .then((res) => {
        console.log(res);
        return res.json();
      })
      .then((data) => {
        handleOkEdit();
        openNotificationWithIcon("success", "updated user");
      })
      .catch((error) => console.log(error));
    form.resetFields();
  };

  liststaff &&
    liststaff.forEach((item) => {
      rows.push({
        id: item.id,
        account: item.account,
        address: item.address,
        email: item.email,
        name: item.name,
        phone: item.phone,
        role: item.role,
        sex: item.sex,
      });
    });

  return (
    <div>
      <Breadcrumb className="staff-crumb">
        <Breadcrumb.Item>Nhân viên</Breadcrumb.Item>
      </Breadcrumb>
      <div className="staff-content-title">
        <div className="icon-content-title">
          <ArrowLeftOutlined /> <h2>Quản lý nhân viên</h2>
        </div>
        <div className="btn-after-title">
          <div className="after-title-input">
            <div style={{ width: "50%" }}>Tìm kiếm:</div>
            <Input.Group compact>
              <Input
                style={{
                  width: "80%",
                }}
              />
            </Input.Group>

            <Button
              icon={<PlusOutlined />}
              className="btn-add-content"
              onClick={showModal}
              type="primary"
            >
              Thêm mới
            </Button>

            <Modal
              title="Thêm mới nhân viên"
              visible={isModalVisible}
              okText="Thêm"
              onOk={handleOk}
              onCancel={handleCancel}
              style={{ marginTop: "-60px" }}
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
                  <Input
                    value={name}
                    onChange={handleChangeInput}
                    name="name"
                  />
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
                  <Input
                    value={account}
                    onChange={handleChangeInput}
                    name="account"
                  />
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
                  <Input.Password
                    name="password"
                    value={password}
                    onChange={handleChangeInput}
                  />
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
                  <Input
                    name="phone"
                    maxLength={13}
                    value={phone}
                    showCount
                    onChange={handleChangeInput}
                  />
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
                  <Input
                    name="email"
                    value={email}
                    onChange={handleChangeInput}
                  />
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
                  <TextArea
                    maxLength={100}
                    showCount
                    name="address"
                    value={address}
                    onChange={handleChangeInput}
                  />
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
                    Thêm mới
                  </Button>
                </Form.Item>
              </Form>
            </Modal>
            <Modal
              visible={isModalEditVisible}
              onOk={handleOkEdit}
              okText="Lưu"
              onCancel={handleEditCancel}
              title="Sửa thông tin nhân viên"
              style={{ marginTop: "-60px" }}
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
                onFinish={handleEditUser}
                autoComplete="off"
              >
                <Form.Item label="ID" name="id">
                  <h2 style={{ display: "none" }}>{userdata.id}</h2>
                  <Input value={userdata.id} name="id" disabled />
                </Form.Item>
                <Form.Item
                  label="Họ tên"
                  name="name"
                  // rules={[
                  //   {
                  //     required: true,
                  //     message: "Nhập họ và tên!",
                  //   },
                  // ]}
                  hasFeedback
                >
                  <h2 style={{ display: "none" }}>{userdata.name}</h2>
                  <Input
                    value={userdata.name}
                    name="name"
                    onChange={handleChangeInput}
                  />
                </Form.Item>

                <Form.Item
                  label="Tài khoản"
                  name="account"
                  // rules={[
                  //   {
                  //     required: true,
                  //     message: "Nhập tài khoản!",
                  //   },
                  // ]}
                  hasFeedback
                >
                  <h2 style={{ display: "none" }}>{userdata.account}</h2>
                  <Input
                    value={userdata.account}
                    name="account"
                    onChange={handleChangeInput}
                  />
                </Form.Item>

                <Form.Item
                  name="phone"
                  label="Số điện thoại"
                  // rules={[
                  //   {
                  //     required: true,
                  //     message: "Nhập số điện thoại!",
                  //   },
                  // ]}
                  hasFeedback
                >
                  <h2 style={{ display: "none" }}>{userdata.phone}</h2>
                  <Input
                    value={userdata.phone}
                    name="phone"
                    onChange={handleChangeInput}
                  />
                </Form.Item>
                <Form.Item
                  name="email"
                  label="Email"
                  rules={[
                    {
                      type: "email",
                      message: "Hãy nhập đúng định dạng email!",
                    },
                  ]}
                >
                  <p style={{ display: "none" }}>{userdata.email}</p>
                  <Input
                    value={userdata.email}
                    onChange={handleChangeInput}
                    name="email"
                  />
                </Form.Item>
                <Form.Item
                  name="address"
                  label="Địa chỉ"
                  // rules={[
                  //   {
                  //     required: true,
                  //     message: "Nhập địa chỉ!",
                  //   },
                  // ]}
                  hasFeedback
                >
                  <p style={{ display: "none" }}>{userdata.address}</p>
                  <TextArea
                    value={userdata.address}
                    name="address"
                    onChange={handleChangeInput}
                  />
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
                    defaultValue={userdata.sex === 1 ? "Nam" : "Nữ"}
                  >
                    <Option value="1" name="1">
                      Nam
                    </Option>
                    <Option value="0" name="0">
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
                    defaultValue={
                      userdata.role === 1
                        ? "Nhân viên"
                        : userdata.role === 2
                        ? "Quản lý"
                        : userdata.role === 3
                        ? "Giám đốc"
                        : ""
                    }
                  >
                    <Option value="1" name="1">
                      Nhân viên
                    </Option>
                    <Option value="2" name="2">
                      Quản lý
                    </Option>
                    <Option value="3" name="3">
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
        </div>
      </div>
      <div className="table-content-report">
        <Table columns={columns} dataSource={rows} />
      </div>
    </div>
  );
};

export default ContentStaff;
