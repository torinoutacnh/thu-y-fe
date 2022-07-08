import React, { useState } from "react";
import "./Quarantine.css";
import { Breadcrumb } from "antd";
import { ArrowLeftOutlined, PlusOutlined } from "@ant-design/icons";
import { Space, Table, Tag } from "antd";
import { Link } from "react-router-dom";

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
const columns = [
  {
    title: "Mã",
    dataIndex: "key",
    key: "key",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "Cơ sở lò mổ",
    dataIndex: "basis",
    key: "basis",
  },
  {
    title: "Tổng số con",
    dataIndex: "total",
    key: "total",
  },
  {
    title: "Nơi xuất phát",
    dataIndex: "start",
    key: "sttart",
  },
  {
    title: "Nơi đến",
    dataIndex: "arrive",
    key: "arrive",
  },
  {
    title: "Người lập",
    dataIndex: "createby",
    key: "createby",
  },
  {
    title: "Trạng thái",
    key: "status",
    render: (_, { tags }) => (
      <>
        {tags.map((tag) => {
          var color;

          if (tag === "Duyệt") {
            color = "#313a46";
          } else if (tag === "Hoàn thành") {
            color = "Green";
          } else {
            color = "Red";
          }

          return (
            <Link to="/sua-kiem-dich" key={tag}>
              <button
                style={{
                  background: `${color}`,
                  color: "white",
                  minWidth: "100px",
                  padding: "5px 0px",
                  borderRadius: "5px",
                  cursor: "Pointer",
                }}
                key={tag}
              >
                {tag}
              </button>
            </Link>
          );
        })}
      </>
    ),
  },
];
const data = [
  {
    key: "001",
    basis: "Lò mổ Hà Nội",
    total: "100",
    start: "Bình Dương",
    arrive: "Hồ Chí Minh",
    createby: "Phúc Hưng",
    tags: ["Sửa"],
  },
  {
    key: "001",
    basis: "Lò mổ Hà Nội",
    total: "100",
    start: "Bình Dương",
    arrive: "Hồ Chí Minh",
    createby: "Phúc Hưng",
    tags: ["Sửa"],
  },
  {
    key: "001",
    basis: "Lò mổ Hà Nội",
    total: "100",
    start: "Bình Dương",
    arrive: "Hồ Chí Minh",
    createby: "Phúc Hưng",
    tags: ["Sửa"],
  },
  {
    key: "001",
    basis: "Lò mổ Hà Nội",
    total: "100",
    start: "Bình Dương",
    arrive: "Hồ Chí Minh",
    createby: "Phúc Hưng",
    tags: ["Sửa"],
  },
  {
    key: "001",
    basis: "Lò mổ Hà Nội",
    total: "100",
    start: "Bình Dương",
    arrive: "Hồ Chí Minh",
    createby: "Phúc Hưng",
    tags: ["Sửa"],
  },
  {
    key: "001",
    basis: "Lò mổ Hà Nội",
    total: "100",
    start: "Bình Dương",
    arrive: "Hồ Chí Minh",
    createby: "Phúc Hưng",
    tags: ["Sửa"],
  },
  {
    key: "001",
    basis: "Lò mổ Hà Nội",
    total: "100",
    start: "Bình Dương",
    arrive: "Hồ Chí Minh",
    createby: "Phúc Hưng",
    tags: ["Sửa"],
  },
];
const ContentQuarantine = () => {
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
  return (
    <div>
      <Breadcrumb className="quarantine-crumb">
        <Breadcrumb.Item>Báo cáo kiểm dịch </Breadcrumb.Item>
      </Breadcrumb>
      <div className="quarantine-content-title">
        <div className="icon-content-title">
          <ArrowLeftOutlined /> <h2>Quản lý các báo cáo</h2>
        </div>
        <div className="btn-after-title">
          <div className="after-title-input">
            <div style={{ width: "50%" }}>Ngày lập:</div>
            <Input.Group compact>
              <DatePicker
                style={{
                  width: "50%",
                }}
                placeholder=""
              />
            </Input.Group>

            <Button
              icon={<PlusOutlined />}
              className="btn-add-content"
              onClick={showModal}
              type="primary"
            >
              <Link to="/them-kiem-dich" style={{ color: "#fff" }}>
                Thêm mới
              </Link>
            </Button>
          </div>
        </div>
      </div>
      <div className="table-content-report">
        <Table columns={columns} dataSource={data} />
      </div>
    </div>
  );
};

export default ContentQuarantine;
