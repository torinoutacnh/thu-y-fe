import { Layout, Spin } from "antd";
import Cookies from "js-cookie";
import { useAuth } from "Modules/hooks/useAuth";
import { useLoading } from "Modules/hooks/useLoading";
import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "./Footer/Footer";
import Header from "./Header/Header";
import SideBar from "./SideBar/SideBar";
const { Content } = Layout;

type Props = {
  children?: React.ReactNode;
};

const MainLayout: React.FC<Props> = ({ children }) => {
  const { isloading } = useLoading();
  return (
    <Spin
      spinning={isloading}
      size="large"
      style={{ top: "20%", right: "50%", position: "fixed" }}
    >
      <Layout
        style={{ padding: 0, backgroundColor: "#313a46", minHeight: "100vh" }}
      >
        <Header />
        <Layout>
          <Content style={{ background: "#fff", padding: 10 }}>
            {children}
            <Outlet />
          </Content>
        </Layout>
        <Footer />
      </Layout>
    </Spin>
  );
};

export default MainLayout;
