import { Layout, Menu, MenuProps, PageHeader } from "antd";
import {
  ExperimentOutlined,
  MedicineBoxOutlined,
  AlignRightOutlined,
} from "@ant-design/icons";
import React, { useRef, useState } from "react";

import "./header.css";
import { RouteEndpoints } from "Components/router/MainRouter";
import { useNavigate } from "react-router-dom";
import { useAuth } from "Modules/hooks/useAuth";

const Header = () => {
  const navigate = useNavigate();
  const keyRef = useRef(0);
  const { user } = useAuth();

  const getKey = () => {
    keyRef.current = keyRef.current + 1;
    return keyRef.current;
  };

  const items: MenuProps["items"] = [
    {
      label: "Kiểm dịch",
      key: getKey(),
      icon: <ExperimentOutlined />,
      children: [
        {
          label: "Báo cáo kiểm dịch",
          key: getKey(),
          onClick: () => navigate(RouteEndpoints.quarantine.basepath),
        },
        {
          label: "Hóa đơn kiểm dịch",
          key: getKey(),
        },
        {
          label: "Báo cáo doanh thu",
          key: getKey(),
        },
      ],
    },
    {
      label: "Quản lý giết mổ",
      key: getKey(),
      icon: <MedicineBoxOutlined />,
      children: [
        {
          label: "Báo cáo giết mổ",
          key: getKey(),
          onClick: () => navigate(RouteEndpoints.staff.basepath),
        },
        {
          label: "Hóa đơn giết mổ",
          key: getKey(),
        },
        {
          label: "Báo cáo doanh thu",
          key: getKey(),
        },
      ],
    },
    {
      label: "Quản trị admin",
      icon: <MedicineBoxOutlined />,
      key: getKey(),
      children: [
        {
          label: "Danh sách nhân viên",
          onClick: () => navigate(RouteEndpoints.staff.basepath),
          key: getKey(),
        },

        {
          label: "Danh sách động vật",
          onClick: () => navigate(RouteEndpoints.animal.basepath),
          key: getKey(),
        },

        {
          label: "Quản lý đơn giá",
          key: getKey(),
        },
        {
          label: "Quản lý lò mổ",
          key: getKey(),
        },
        {
          label: "Quản lý hóa đơn",
          key: getKey(),
        },
        {
          label: "Doanh thu tổng",
          key: getKey(),
        },
      ],
    },
  ];

  return (
    <PageHeader>
      <div className="header_menu">
        <img
          src="https://gw.alipayobjects.com/zos/antfincdn/aPkFc8Sj7n/method-draw-image.svg"
          alt="logo"
          width={30}
        />
        <h4>PHẦN MỀM QUẢN LÝ KIỂM SOÁT GIẾT MỔ VÀ KIỂM DỊCH</h4>
      </div>
      {user && (
        <Layout.Header
          style={{
            background: "#313a46",
            color: "white",
          }}
        >
          <Menu
            direction={"ltr"}
            overflowedIndicator={<AlignRightOutlined />}
            mode={"horizontal"}
            items={items}
            style={{
              background: "#313a46",
              color: "white",
            }}
          />
        </Layout.Header>
      )}
    </PageHeader>
  );
};

export default Header;
