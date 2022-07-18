import { Button, PageHeader } from "antd";
import { abattoirEndpoints } from "Components/router/AbattoirRoutes";
import { RouteEndpoints } from "Components/router/MainRouter";
import { quarantineEndpoints } from "Components/router/QuarantineRoutes";
import { staffEndpoints } from "Components/router/StaffRoutes";
import React, { useRef } from "react";
import { Link } from "react-router-dom";

import "./header.css";
import "./nav.css";

const Header = () => {
  //
  const navigate = useNavigate();
  const keyRef = useRef(0);
  const { user } = useAuth();

  const getKey = () => {
    keyRef.current = keyRef.current + 1;
    return keyRef.current;
  };

  const items: MenuProps["items"] = [
    {
      label: "Kiểm dịch",
      key: getKey(),
      icon: <ExperimentOutlined />,
      children: [
        {
          label: "Báo cáo kiểm dịch",
          key: getKey(),
          onClick: () => navigate(RouteEndpoints.quarantine.basepath),
        },
        {
          label: "Hóa đơn kiểm dịch",
          key: getKey(),
        },
        {
          label: "Báo cáo doanh thu",
          key: getKey(),
        },
      ],
    },
    {
      label: "Quản lý giết mổ",
      key: getKey(),
      icon: <MedicineBoxOutlined />,
      children: [
        {
          label: "Báo cáo giết mổ",
          key: getKey(),
          onClick: () => navigate(RouteEndpoints.staff.basepath),
        },
        {
          label: "Hóa đơn giết mổ",
          key: getKey(),
        },
        {
          label: "Báo cáo doanh thu",
          key: getKey(),
        },
      ],
    },
    {
      label: "Quản trị admin",
      icon: <MedicineBoxOutlined />,
      key: getKey(),
      children: [
        {
          label: "Danh sách nhân viên",
          onClick: () => navigate(RouteEndpoints.staff.basepath),
          key: getKey(),
        },

        {
          label: "Danh sách động vật",
          onClick: () => navigate(RouteEndpoints.animal.basepath),
          key: getKey(),
        },

        {
          label: "Quản lý đơn giá",
          key: getKey(),
        },
        {
          label: "Quản lý lò mổ",
          key: getKey(),
        },
        {
          label: "Quản lý hóa đơn",
          key: getKey(),
        },
        {
          label: "Doanh thu tổng",
          key: getKey(),
        },
      ],
    },
  ];
  //
  const navRef = useRef(null);
  //

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
                      <Link to={quarantineEndpoints.home}>
                        Hóa đơn kiểm dịch
                      </Link>
                    </li>
                    <li>
                      <Link to={quarantineEndpoints.home}>
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
                      <Link to={abattoirEndpoints.home}>Hóa đơn giết mổ</Link>
                    </li>
                    <li>
                      <Link to={abattoirEndpoints.home}>Báo cáo doanh thu</Link>
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
                      <Link to={quarantineEndpoints.home}>Quản lý đơn giá</Link>
                    </li>
                    <li>
                      <Link to={quarantineEndpoints.home}>Quản lý lò mổ</Link>
                    </li>
                    <li>
                      <Link to={quarantineEndpoints.home}>Doanh thu tổng</Link>
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
