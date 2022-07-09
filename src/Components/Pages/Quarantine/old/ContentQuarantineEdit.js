import React, { useState } from "react";
import "./Quarantine.css";
import {
  Breadcrumb,
  Layout,
  AutoComplete,
  Button,
  Cascader,
  DatePicker,
  Checkbox,
  Col,
  Form,
  Input,
  InputNumber,
  Row,
  Select,
} from "antd";

import { ArrowLeftOutlined, PlusOutlined } from "@ant-design/icons";

import { Link } from "react-router-dom";
const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 8,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 8,
    },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};
const { Header, Footer, Sider, Content } = Layout;
const ContentQuarantineEdit = () => {
  const [form] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div>
      <Breadcrumb className="quarantine-crumb">
        <Breadcrumb.Item>Báo cáo kiểm dịch </Breadcrumb.Item>
        <Breadcrumb.Item>Chỉnh sửa báo cáo kiểm dịch </Breadcrumb.Item>
      </Breadcrumb>
      <div className="quarantine-content-title">
        <div className="icon-content-title">
          <Link to="/quarantine" style={{ color: "black" }}>
            <ArrowLeftOutlined />
          </Link>
          <h2>Chỉnh sửa</h2>
        </div>
      </div>
      <div className="table-content-report">
        <h2 className="text-center" style={{ color: "red", marginBottom: 20 }}>
          Chỉnh sửa báo cáo kiểm dịch
        </h2>
        <div className="form-content-quarantine">
          <div className="form-create-quarantine">
            <Form
              {...formItemLayout}
              form={form}
              name="createquarantine"
              scrollToFirstError
              onFinish={handleSubmit}
            >
              <Form.Item
                name="username"
                label="Họ tên chủ hàng"
                rules={[
                  {
                    required: true,
                    message: "Nhập họ tên chủ hàng!",
                  },
                ]}
                hasFeedback
              >
                <Input />
              </Form.Item>

              <Form.Item
                name="address"
                label="Địa chỉ giao dịch"
                rules={[
                  {
                    required: true,
                    message: "Nhập địa chỉ giao dịch!",
                  },
                ]}
                hasFeedback
              >
                <Input />
              </Form.Item>

              <Form.Item
                name="start"
                label="Nơi xuất phát"
                hasFeedback
                rules={[
                  {
                    required: true,
                    message: "Nhập nơi xuất phát!",
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                name="arrive"
                label="Nơi đến cuối cùng"
                rules={[
                  {
                    required: true,
                    message: "Nhâp nơi đến cuối cùng",
                  },
                ]}
                hasFeedback
              >
                <Input />
              </Form.Item>

              <Form.Item
                name="vehicle"
                label="Phương tiện vận chuyển"
                rules={[
                  {
                    required: true,
                    message: "Nhập phương tiện vận chuyển",
                  },
                ]}
                hasFeedback
              >
                <Input
                  style={{
                    width: "100%",
                  }}
                />
              </Form.Item>

              <Form.Item
                name="control"
                label="Biển kiểm soát"
                rules={[
                  {
                    required: true,
                    message: "Nhập biển kiểm soát!",
                  },
                ]}
                hasFeedback
              >
                <Input
                  style={{
                    width: "100%",
                  }}
                />
              </Form.Item>

              <Form.Item
                name="realated"
                label="Vật dụng liên quan"
                rules={[
                  {
                    required: true,
                    message: "Nhập vật dụng liên quan!",
                  },
                ]}
                hasFeedback
              >
                <Input />
              </Form.Item>

              <Form.Item
                name="safe"
                label="An toàn với các bệnh"
                rules={[
                  {
                    required: true,
                    message: "Nhập an toàn với các bệnh!",
                  },
                ]}
                hasFeedback
              >
                <Input />
              </Form.Item>

              <Form.Item
                name="antiseptic"
                label="Khử trùng tiêu độc bằng"
                rules={[
                  {
                    required: true,
                    message: "Nhập khử trùng tiêu độc!",
                  },
                ]}
                hasFeedback
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="todate"
                label="Có giá trị đến ngày"
                rules={[
                  {
                    required: true,
                    message: "Nhập có giá trị đến ngày!",
                  },
                ]}
                hasFeedback
              >
                <DatePicker style={{ width: "100%" }} />
              </Form.Item>
              <Form.Item
                name="certificate"
                label="Số giấy chứng nhận"
                rules={[
                  {
                    required: true,
                    message: "Nhập số giấy chứng nhận!",
                  },
                ]}
                hasFeedback
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="grant"
                label="Cấp tại"
                rules={[
                  {
                    required: true,
                    message: "Nhập địa điểm cấp giấy chứng nhận!",
                  },
                ]}
                hasFeedback
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="sealingcode"
                label="Mã niêm phong"
                rules={[
                  {
                    required: true,
                    message: "Nhập mã niêm phong!",
                  },
                ]}
                hasFeedback
              >
                <Input />
              </Form.Item>
              <Form.Item {...tailFormItemLayout}>
                <Button type="primary" htmlType="submit">
                  Chỉnh sửa
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentQuarantineEdit;
