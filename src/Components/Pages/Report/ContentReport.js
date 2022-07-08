import React, { useState } from "react";
import "./Report.css";
import { Breadcrumb } from "antd";
import { ArrowLeftOutlined, PlusOutlined } from "@ant-design/icons";
import { Space, Table, Tag } from "antd";
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
    title: "Cơ sở giết mổ",
    dataIndex: "basis",
    key: "basis",
  },
  {
    title: "Ngày lập báo cáo",
    dataIndex: "datereport",
    key: "datereport",
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
    datereport: "7/7/2022",
    address: "New York No. 1 Lake Park",
    tags: ["Duyệt"],
  },
  {
    key: "001",
    basis: "Lò mổ Hà Nội",
    datereport: "7/7/2022",
    address: "London No. 1 Lake Park",
    tags: ["Duyệt"],
  },
  {
    key: "001",
    basis: "Lò mổ Hà Nội",
    datereport: "7/7/2022",
    address: "Sidney No. 1 Lake Park",
    tags: ["Hoàn thành"],
  },
  {
    key: "001",
    basis: "Lò mổ Hà Nội",
    datereport: "7/7/2022",
    address: "Sidney No. 1 Lake Park",
    tags: ["Hoàn thành"],
  },
  {
    key: "001",
    basis: "Lò mổ Hà Nội",
    datereport: "7/7/2022",
    address: "Sidney No. 1 Lake Park",
    tags: ["Hoàn thành"],
  },
  {
    key: "001",
    basis: "Lò mổ Hà Nội",
    datereport: "7/7/2022",
    address: "Sidney No. 1 Lake Park",
    tags: ["Từ chối"],
  },
  {
    key: "001",
    basis: "Lò mổ Hà Nội",
    datereport: "7/7/2022",
    address: "Sidney No. 1 Lake Park",
    tags: ["Từ chối"],
  },
  {
    key: "001",
    basis: "Lò mổ Hà Nội",
    datereport: "7/7/2022",
    address: "Sidney No. 1 Lake Park",
    tags: ["Từ chối"],
  },
  {
    key: "001",
    basis: "Lò mổ Hà Nội",
    datereport: "7/7/2022",
    address: "Sidney No. 1 Lake Park",
    tags: ["Từ chối"],
  },
  {
    key: "001",
    basis: "Lò mổ Hà Nội",
    datereport: "7/7/2022",
    address: "Sidney No. 1 Lake Park",
    tags: ["Từ chối"],
  },
  {
    key: "001",
    basis: "Lò mổ Hà Nội",
    datereport: "7/7/2022",
    address: "Sidney No. 1 Lake Park",
    tags: ["Từ chối"],
  },
  {
    key: "001",
    basis: "Lò mổ Hà Nội",
    datereport: "7/7/2022",
    address: "Sidney No. 1 Lake Park",
    tags: ["Từ chối"],
  },
  {
    key: "001",
    basis: "Lò mổ Hà Nội",
    datereport: "7/7/2022",
    address: "Sidney No. 1 Lake Park",
    tags: ["Từ chối"],
  },
  {
    key: "001",
    basis: "Lò mổ Hà Nội",
    datereport: "7/7/2022",
    address: "Sidney No. 1 Lake Park",
    tags: ["Từ chối"],
  },
  {
    key: "001",
    basis: "Lò mổ Hà Nội",
    datereport: "7/7/2022",
    address: "Sidney No. 1 Lake Park",
    tags: ["Từ chối"],
  },
];
const ContentReport = () => {
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
      <Breadcrumb className="report-crumb">
        <Breadcrumb.Item>Báo cáo giết mổ</Breadcrumb.Item>
      </Breadcrumb>
      <div className="report-content-title">
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
            >
              Thêm mới
            </Button>
            <Modal
              title="Tạo báo cáo"
              visible={isModalVisible}
              onOk={handleOk}
              onCancel={handleCancel}
            >
              <p>Chọn lò mổ</p>
              <Input placeholder="Chọn lò mổ" />
              <p>Ngày lập báo cáo</p>
              <Input placeholder="Ngày lập báo cáo" />
              <div className="">
                <p>Nhập số lượng động vật vào</p>
                <Input placeholder="Nhập số lượng động vật" />
              </div>
              <div className="">
                <p>Nhập số lượng động vật giết mổ</p>
                <Input placeholder="Nhập số lượng động vật giết mổ" />
              </div>
            </Modal>
          </div>
        </div>
      </div>
      <div className="table-content-report">
        <Table columns={columns} dataSource={data} />;
      </div>
    </div>
  );
};

export default ContentReport;
