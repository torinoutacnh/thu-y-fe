import React from "react";
import { Layout } from "antd";
import "./Report.css";
import ContentReport from "./ContentReport";
const Report = () => {
  return (
    <div className="report-page">
      <Layout className="nav-report">
        <ContentReport />
      </Layout>
    </div>
  );
};

export default Report;
