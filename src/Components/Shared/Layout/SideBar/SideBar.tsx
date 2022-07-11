/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button, Layout, Menu, MenuProps } from "antd";
import React, { useRef, useState } from "react";
import {
  TeamOutlined,
  UserOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  CalendarOutlined,
  ContainerOutlined,
  CheckCircleOutlined,
  ScissorOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { RouteEndpoints } from "Components/router/MainRouter";

type MenuItem = Required<MenuProps>["items"][number];

const SideBar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const keyRef = useRef(0);

  const getKey = () => {
    keyRef.current = keyRef.current + 1;
    return keyRef.current;
  };

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  const breakPoint = () => {
    if (!collapsed) setCollapsed(!collapsed);
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
        { label: "Quản lý đơn giá", key: getKey(), icon: <CalendarOutlined /> },
        { label: "Quản lý lò mổ", key: getKey(), icon: <CalendarOutlined /> },
        { label: "Doanh thu tổng", key: getKey(), icon: <CalendarOutlined /> },
        { label: "Quản lý hóa đơn", key: getKey(), icon: <CalendarOutlined /> },
      ],
    },
    {
      label: "Đăng xuất",
      key: getKey(),
      icon: <UserOutlined />,
    },
  ];

  return (
    <Layout.Sider
      collapsed={collapsed}
      breakpoint="md"
      onBreakpoint={breakPoint}
    >
      <Button
        type="primary"
        onClick={toggleCollapsed}
        style={{ marginBottom: 16 }}
      >
        {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
      </Button>
      <Menu
        defaultSelectedKeys={["1"]}
        mode="inline"
        theme="dark"
        items={MenuItems}
      />
    </Layout.Sider>
  );
};

export default SideBar;
