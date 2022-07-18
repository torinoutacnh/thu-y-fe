import { Button, PageHeader } from "antd";
import { abattoirEndpoints } from "Components/router/AbattoirRoutes";
import { RouteEndpoints } from "Components/router/MainRouter";
import { quarantineEndpoints } from "Components/router/QuarantineRoutes";
import { staffEndpoints } from "Components/router/StaffRoutes";
import React, { useRef } from "react";
import { Link } from "react-router-dom";
import logoThuY from "../../../../Static/image/logo.png"

import "./header.css";
import "./nav.css";

const Header = () => {
  const navRef = useRef(null);

  return (
    <>
      <PageHeader>
        <div className="header_menu">
          <img
            src="https://gw.alipayobjects.com/zos/antfincdn/aPkFc8Sj7n/method-draw-image.svg"
            alt="logo"
            width={30}
          />
          <h4>PHẦN MỀM QUẢN LÝ KIỂM SOÁT GIẾT MỔ VÀ KIỂM DỊCH</h4>
          <div className="btn-nav">
            <Button
              onMouseEnter={() => {
                navRef.current.style.display = "block";
              }}
            >
              show nav
            </Button>
          </div>
        </div>
        <nav className="nav-bar-top" ref={navRef}>
          <ul>
            <li>
              <div className="dropdown-menu">
                <Button type="link">Kiểm dịch</Button>
                <div className="dropdown-content">
                  <ul>
                    <li>
                      <Link to={quarantineEndpoints.home}>
                        Báo cáo kiểm dịch
                      </Link>
                    </li>
                    <li>
                      <Link to={RouteEndpoints.notfound}>
                        Hóa đơn kiểm dịch
                      </Link>
                    </li>
                    <li>
                      <Link to={RouteEndpoints.notfound}>
                        Báo cáo doanh thu
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </li>
            <li>
              <div className="dropdown-menu">
                <Button type="link">Giết mổ</Button>
                <div className="dropdown-content">
                  <ul>
                    <li>
                      <Link to={abattoirEndpoints.home}>Báo cáo giết mổ</Link>
                    </li>
                    <li>
                      <Link to={RouteEndpoints.notfound}>Hóa đơn giết mổ</Link>
                    </li>
                    <li>
                      <Link to={RouteEndpoints.notfound}>Báo cáo doanh thu</Link>
                    </li>
                  </ul>
                </div>
              </div>
            </li>
            <li>
              <div className="dropdown-menu">
                <Button type="link">Quản trị admin</Button>
                <div className="dropdown-content">
                  <ul>
                    <li>
                      <Link to={staffEndpoints.home}>Quản lý nhân viên</Link>
                    </li>
                    <li>
                      <Link to={RouteEndpoints.animal.basepath}>
                        Quản lý động vật
                      </Link>
                    </li>
                    <li>
                      <Link to={RouteEndpoints.notfound}>Quản lý đơn giá</Link>
                    </li>
                    <li>
                      <Link to={RouteEndpoints.notfound}>Quản lý lò mổ</Link>
                    </li>
                    <li>
                      <Link to={RouteEndpoints.notfound}>Doanh thu tổng</Link>
                    </li>
                  </ul>
                </div>
              </div>
            </li>
          </ul>
        </nav>
      </PageHeader>
    </>
  );
};

export default Header;
