import React from "react";
import { Card, Col, Row } from "antd";
import "./home.css";
import { quarantineEndpoints } from "Components/router/QuarantineRoutes";
import { Link } from "react-router-dom";
import { abattoirEndpoints } from "Components/router/AbattoirRoutes";
import { RouteEndpoints } from "Components/router/MainRouter";

export default function HomePage() {
  return (
    <div className="container-home">
      <h1>Quản lý kiểm dịch</h1>
      <div
        className="card__box"
        style={{
          padding: "30px",
          background: "#ececec",
          marginBottom: "50px",
        }}
      >
        <Row gutter={16}>
          <Col xs={24} sm={24} md={8} lg={8}>
            <Link to={quarantineEndpoints.basepath}>
              <div className="card">ĐƠN ĐĂNG KÝ KDĐV (MS 1)</div>
            </Link>
          </Col>
          <Col xs={24} sm={24} md={8} lg={8}>
            <Link to={RouteEndpoints.notfound}>
              <div className="card m20">BIÊN BẢN VSTY (MS 7)</div>
            </Link>
          </Col>
          <Col xs={24} sm={24} md={8} lg={8}>
            <Link to={quarantineEndpoints.cnkd}>
              <div className="card">GIẤY CNKD (MS 12B)</div>
            </Link>
          </Col>
        </Row>
      </div>
      <h1>Quản lý giết mổ</h1>
      <div
        style={{
          padding: "30px",
          background: "#ececec",
        }}
      >
        <Row gutter={16}>
          <Col xs={24} sm={24} md={8} lg={8}>
            <Link to={abattoirEndpoints.basepath}>
              <div className="card">BÁO CÁO GIẾT MỔ</div>
            </Link>
          </Col>
          <Col xs={24} sm={24} md={8} lg={8}>
            <Link to={RouteEndpoints.notfound}>
              <div className="card">HÓA ĐƠN GIẾT MỔ</div>
            </Link>
          </Col>
          <Col xs={24} sm={24} md={8} lg={8}>
            <Link to={RouteEndpoints.notfound}>
              <div className="card">BÁO CÁO DOANH THU</div>
            </Link>
          </Col>
        </Row>
      </div>
    </div>
  );
}
