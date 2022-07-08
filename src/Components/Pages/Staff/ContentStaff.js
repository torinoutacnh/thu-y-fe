import React, { useState } from "react";
import "./Staff.css";
import { Checkbox, Form } from "antd";
import { Breadcrumb } from "antd";
import { ArrowLeftOutlined, PlusOutlined } from "@ant-design/icons";
import { Space, Table, Tag } from "antd";
import { Link } from "react-router-dom";
import Icon, {
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import {
  AutoComplete,
  Button,
  Cascader,
  Col,
  DatePicker,
  Input,
  InputNumber,
  Row,
  Select,
  Tooltip,
  Modal,
} from "antd";

const data = [
  {
    key: "001",
    username: "Nguyễn Văn A",
    birthday: "1999",
    position: "Nhân viên",
    workplace: "Hồ Chí Minh",

    tags: ["Sửa"],
  },
  {
    key: "001",
    username: "Nguyễn Văn A",
    birthday: "1999",
    position: "Nhân viên",
    workplace: "Hồ Chí Minh",

    tags: ["Sửa"],
  },
  {
    key: "001",
    username: "Nguyễn Văn A",
    birthday: "1999",
    position: "Nhân viên",
    workplace: "Hồ Chí Minh",

    tags: ["Sửa"],
  },
  {
    key: "001",
    username: "Nguyễn Văn A",
    birthday: "1999",
    position: "Nhân viên",
    workplace: "Hồ Chí Minh",

    tags: ["Sửa"],
  },
  {
    key: "001",
    username: "Nguyễn Văn A",
    birthday: "1999",
    position: "Nhân viên",
    workplace: "Hồ Chí Minh",

    tags: ["Sửa"],
  },
  {
    key: "001",
    username: "Nguyễn Văn A",
    birthday: "1999",
    position: "Nhân viên",
    workplace: "Hồ Chí Minh",

    tags: ["Sửa"],
  },
  {
    key: "001",
    username: "Nguyễn Văn A",
    birthday: "1999",
    position: "Nhân viên",
    workplace: "Hồ Chí Minh",

    tags: ["Sửa"],
  },
];

const ContentStaff = () => {
  const columns = [
    {
      title: "Mã",
      dataIndex: "key",
      key: "key",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Họ tên",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "Năm sinh",
      dataIndex: "birthday",
      key: "birthday",
    },
    {
      title: "Chức vụ",
      dataIndex: "position",
      key: "position",
    },
    {
      title: "Địa điểm công tác",
      dataIndex: "workplace",
      key: "workplace",
    },

    {
      title: "Trạng thái",
      key: "status",
      render: (_, { tags }) => (
        <>
          {tags.map((tag) => {
            return (
              <>
                <EyeOutlined className="icon-status" />
                <EditOutlined className="icon-status" />

                <DeleteOutlined className="icon-status" />
              </>
            );
          })}
        </>
      ),
    },
  ];
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [view, setView] = useState(false);
  const [edit, setEdit] = useState(false);
  const handleView = () => {
    setView(!view);
  };
  const handleEdit = () => {
    setView(!edit);
  };
  const onFinish = (e) => {
    e.preventDefault();
  };
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
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
              onOk={handleOk}
              onCancel={handleCancel}
            >
              <Form
                name="basic"
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
                  name="username"
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
                  label="Năm sinh"
                  name="birthday"
                  rules={[
                    {
                      required: true,
                      message: "Chọn năm sinh!",
                    },
                  ]}
                  hasFeedback
                >
                  <DatePicker style={{ width: "100%" }} />
                </Form.Item>
                <Form.Item
                  label="Chức vụ"
                  name="position"
                  rules={[
                    {
                      required: true,
                      message: "Chọn chức vụ!",
                    },
                  ]}
                  hasFeedback
                >
                  <DatePicker style={{ width: "100%" }} />
                </Form.Item>
                <Form.Item
                  label="Địa điểm công tác"
                  name="workplace"
                  rules={[
                    {
                      required: true,
                      message: "Nhập địa điểm công tác!",
                    },
                  ]}
                  hasFeedback
                >
                  <DatePicker style={{ width: "100%" }} />
                </Form.Item>
                <Form.Item
                  wrapperCol={{
                    offset: 8,
                    span: 16,
                  }}
                >
                  <Button type="primary" htmlType="submit">
                    Submit
                  </Button>
                </Form.Item>
              </Form>
            </Modal>
          </div>
        </div>
      </div>
      <div className="table-content-report">
        <Table columns={columns} dataSource={data} />
      </div>
    </div>
  );
};

export default ContentStaff;
