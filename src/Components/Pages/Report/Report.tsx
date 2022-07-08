import React from "react";
import { Layout } from "antd";
import "./Report.css";
import MenuReport from "./MenuReport";
import ContentReport from "./ContentReport";
import SideBar from "Components/Shared/Layout/SideBar/SideBar";
const { Header, Footer, Sider, Content } = Layout;
const Report = () => {
  return (
    <div className="report-page">
      <Layout className="nav-report">
        <Sider className="nav-menu-report">
          <SideBar />
        </Sider>
        <Layout className="content-report">
          <Content>
            <ContentReport />
          </Content>
        </Layout>
      </Layout>
    </div>
  );
};

export default Report;
