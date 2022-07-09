import React from "react";
import { Layout } from "antd";
import SideBar from "Components/Shared/Layout/SideBar/SideBar";
import ContentQuarantineAdd from "./ContentQuarantineAdd";
import "./Quarantine.css";
import ContentQuarantineEdit from "./ContentQuarantineEdit";
const { Header, Footer, Sider, Content } = Layout;
const QuarantineEdit = () => {
  return (
    <div className="quarantine-page">
      <Layout className="nav-quarantine">
        <Sider className="nav-menu-quarantine">
          <SideBar />
        </Sider>
        <Layout className="content-quarantine">
          <Content>
            <ContentQuarantineEdit />
          </Content>
        </Layout>
      </Layout>
    </div>
  );
};

export default QuarantineEdit;
