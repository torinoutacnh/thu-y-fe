import { Button, Dropdown, Menu, PageHeader } from "antd";
import menu, { MenuProps } from "antd/lib/menu";
import {
  TeamOutlined,
  UserOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  MoreOutlined,
  CalendarOutlined,
  ContainerOutlined,
  CheckCircleOutlined,
  ScissorOutlined,
} from "@ant-design/icons";
import React, { useRef } from "react";

import "./header.css";
import { RouteEndpoints } from "Components/router/MainRouter";
import { useNavigate } from "react-router-dom";

type MenuItem = Required<MenuProps>["items"][number];

const Header = () => {
  const navigate = useNavigate();
  const keyRef = useRef(0);

  const getKey = () => {
    keyRef.current = keyRef.current + 1;
    return keyRef.current;
  };

  const MenuItems: MenuItem[] = [
    {
      label: "Quản lý kiểm dịch",
      key: getKey(),
      icon: <CheckCircleOutlined />,
      children: [
        {
          label: "Báo cáo kiểm dịch",
          key: getKey(),
          onClick: () => {
            navigate(RouteEndpoints.quarantine.basepath);
          },
        },
        {
          label: "Hóa đơn kiểm dịch",
          key: getKey(),
          onClick: () => {
            navigate(RouteEndpoints.home.basepath);
          },
        },
        { label: "Báo cáo doanh thu", key: getKey() },
      ],
    },
    {
      label: "Quản lý giết mổ",
      key: getKey(),
      icon: <ScissorOutlined />,
      children: [
        {
          label: "Báo cáo giết mổ",
          icon: <ContainerOutlined />,
          key: getKey(),
        },
        { label: "Hóa đơn giết mổ", key: getKey() },
        { label: "Báo cáo doanh thu", key: getKey() },
      ],
    },
    {
      label: "Quản trị admin",
      key: getKey(),
      icon: <UserOutlined />,
      children: [
        {
          label: "Danh sách nhân viên",
          key: 2,
          icon: <TeamOutlined />,
          onClick: () => {
            navigate(RouteEndpoints.staff.basepath);
          },
        },
        {
          label: "Quản lý đơn giá",
          key: getKey(),
          icon: <CalendarOutlined />,
        },
        { label: "Quản lý lò mổ", key: getKey(), icon: <CalendarOutlined /> },
        {
          label: "Doanh thu tổng",
          key: getKey(),
          icon: <CalendarOutlined />,
        },
        {
          label: "Quản lý hóa đơn",
          key: getKey(),
          icon: <CalendarOutlined />,
        },
      ],
    },
    {
      label: "Đăng xuất",
      key: getKey(),
      icon: <UserOutlined />,
    },
  ];

  return (
    <PageHeader className="header_theme_dark">
      <div className="header_menu">
        <img
          src="https://gw.alipayobjects.com/zos/antfincdn/aPkFc8Sj7n/method-draw-image.svg"
          alt="logo"
          width={30}
        />
        <h3>PHẦN MỀM QUẢN LÝ KIỂM SOÁT GIẾT MỔ VÀ KIỂM DỊCH</h3>
      </div>
    </PageHeader>
  );
};

export default Header;
