import { Layout, Spin } from "antd";
import { useAuth } from "Modules/hooks/useAuth";
import { useLoading } from "Modules/hooks/useLoading";
import { useStoreSelector } from "Modules/Redux";
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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const user = useAuth();
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
          {user && <SideBar />}
          <Content
            style={{ background: "#fff", minHeight: "80vh", padding: 10 }}
          >
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
