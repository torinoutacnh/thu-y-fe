import React from "react";
import { Layout } from "antd";
import "./Quarantine.css";
import SideBar from "Components/Shared/Layout/SideBar/SideBar";
import ContentQuarantine from "./ContentQuarantine";
const { Header, Footer, Sider, Content } = Layout;
const Quarantine = () => {
  return (
    <div className="quarantine-page">
      <Layout className="nav-quarantine">
        <Sider className="nav-menu-quarantine">
          <SideBar />
        </Sider>
        <Layout className="content-quarantine">
          <Content>
            <ContentQuarantine />
          </Content>
        </Layout>
      </Layout>
    </div>
  );
};

export default Quarantine;
