import React from "react";
import { Link } from "react-router-dom";
import {
  HomeOutlined,
  AccountBookOutlined,
  BookOutlined,
  FileSearchOutlined,
  UsergroupAddOutlined,
  UserAddOutlined,
  SaveOutlined,
} from "@ant-design/icons";
import "./Report.css";
export default function MenuReport() {
  return (
    <div className="menu" style={{ margin: 0 }}>
      <div className="control">
        <h3 className="title-menu-report">Hệ thống quản lý</h3>
        <div className="menu-report">
          <HomeOutlined />
          <Link
            to="/report"
            style={{ color: "#9494e0" }}
            activeClassName="font-weight-bold"
            activeStyle={{ color: "blue" }}
          >
            Trang chủ
          </Link>
        </div>
        <div className="menu-report">
          <AccountBookOutlined />
          <Link
            to="/"
            style={{ color: "#9494e0" }}
            activeClassName="font-weight-bold"
            activeStyle={{ color: "blue" }}
          >
            Báo cáo
          </Link>
        </div>
        <div className="menu-report">
          <BookOutlined />
          <Link
            to="/"
            style={{ color: "#9494e0" }}
            activeClassName="font-weight-bold"
            activeStyle={{ color: "blue" }}
          >
            Tài liệu
          </Link>
        </div>
        <div className="menu-report">
          <FileSearchOutlined />
          <Link
            to="/"
            style={{ color: "#9494e0" }}
            activeClassName="font-weight-bold"
            activeStyle={{ color: "blue" }}
          >
            Files
          </Link>
        </div>
        <div className="menu-report">
          <UsergroupAddOutlined />
          <Link
            to="/"
            style={{ color: "#9494e0" }}
            activeClassName="font-weight-bold"
            activeStyle={{ color: "blue" }}
          >
            Phân quyền
          </Link>
        </div>
        <div className="menu-report">
          <UserAddOutlined />
          <Link
            to="/"
            style={{ color: "#9494e0" }}
            activeClassName="font-weight-bold"
            activeStyle={{ color: "blue" }}
          >
            Subscriptons
          </Link>
        </div>
        <div className="menu-report">
          <SaveOutlined />
          <Link
            to="/"
            style={{ color: "#9494e0" }}
            activeClassName="font-weight-bold"
            activeStyle={{ color: "blue" }}
          >
            Archived pages
          </Link>
        </div>
      </div>
    </div>
  );
}
