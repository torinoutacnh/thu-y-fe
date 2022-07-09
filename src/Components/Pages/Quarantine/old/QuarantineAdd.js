import React from "react";
import { Layout } from "antd";
import SideBar from "Components/Shared/Layout/SideBar/SideBar";
import ContentQuarantineAdd from "./ContentQuarantineAdd";
import "./Quarantine.css";
const { Header, Footer, Sider, Content } = Layout;
const QuarantineAdd = () => {
  return (
    <div className="quarantine-page">
      <Layout className="nav-quarantine">
        <Sider className="nav-menu-quarantine">
          <SideBar />
        </Sider>
        <Layout className="content-quarantine">
          <Content>
            <ContentQuarantineAdd />
          </Content>
        </Layout>
      </Layout>
    </div>
  );
};

export default QuarantineAdd;
