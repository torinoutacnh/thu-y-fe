import React from "react";
import { Layout } from "antd";
import "./Staff.css";
import SideBar from "Components/Shared/Layout/SideBar/SideBar";
import ContentStaff from "./ContentStaff";
const { Header, Footer, Sider, Content } = Layout;
const Staff = () => {
  return (
    <div className="staff-page">
      <Layout className="nav-staff">
        <Sider className="nav-menu-staff">
          <SideBar />
        </Sider>
        <Layout className="content-staff">
          <Content>
            <ContentStaff />
          </Content>
        </Layout>
      </Layout>
    </div>
  );
};

export default Staff;
