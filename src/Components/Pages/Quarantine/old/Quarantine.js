import React from "react";
import { Layout } from "antd";
import "./Quarantine.css";
import SideBar from "Components/Shared/Layout/SideBar/SideBar";
import ContentQuarantine from "./ContentQuarantine";
const { Header, Footer, Sider, Content } = Layout;
const Quarantine = () => {
	return <ContentQuarantine />;
};

export default Quarantine;
