import { Button, PageHeader } from "antd";
import { abattoirEndpoints } from "Components/router/AbattoirRoutes";
import { RouteEndpoints } from "Components/router/MainRouter";
import { quarantineEndpoints } from "Components/router/QuarantineRoutes";
import { staffEndpoints } from "Components/router/StaffRoutes";
import React, { useEffect, useRef, useState } from "react";
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

  useEffect(() => {
    const menu = document.querySelector("#menu-responsive") as HTMLElement;
    const navbar = document.querySelector(".nav-bar-top");
    menu.onclick = () => {
      menu.classList.toggle("fa-times");
      navbar.classList.toggle("active");
    };
  });

  const [showItems1, setShowItems1] = useState(false);
  const [iconRotate1, setIconRotate1] = useState(false);
  function handleClicElements1() {
    setShowItems1(!showItems1);
    setIconRotate1(!iconRotate1);
  }

  const [showItems2, setShowItems2] = useState(false);
  const [iconRotate2, setIconRotate2] = useState(false);
  function handleClicElements2() {
    setShowItems2(!showItems2);
    setIconRotate2(!iconRotate2);
  }

  const [showItems3, setShowItems3] = useState(false);
  const [iconRotate3, setIconRotate3] = useState(false);
  function handleClicElements3() {
    setShowItems3(!showItems3);
    setIconRotate3(!iconRotate3);
  }

  return (
    <>
      <PageHeader>
        <div className="header__web">
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
          <ul className="nav-bar-top" ref={navRef}>
            <li onClick={handleClicElements1}>
              <div className="dropdown-menu">
                <Button type="link" className="dropdown-menu__btn">
                  Kiểm dịch
                  <span
                    className={`icon ${
                      iconRotate1 ? "iconRotate--90" : "iconRotate-0"
                    }`}
                  >
                    <i className="fa-solid fa-angle-left"></i>
                  </span>
                </Button>
                <div className="dropdown-content">
                  <ul
                    className={`dropdown-content-1 ${
                      showItems1 ? "showItems" : ""
                    }`}
                  >
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
            <li onClick={handleClicElements2} className="mb20">
              <div className="dropdown-menu">
                <Button type="link" className="dropdown-menu__btn">
                  Giết mổ
                  <span
                    className={`icon ${
                      iconRotate2 ? "iconRotate--90" : "iconRotate-0"
                    }`}
                  >
                    <i className="fa-solid fa-angle-left"></i>
                  </span>
                </Button>
                <div className="dropdown-content">
                  <ul
                    className={`dropdown-content-1 ${
                      showItems2 ? "showItems" : ""
                    }`}
                  >
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
            <li onClick={handleClicElements3}>
              <div className="dropdown-menu">
                <Button type="link" className="dropdown-menu__btn">
                  Quản trị admin
                  <span
                    className={`icon ${
                      iconRotate3 ? "iconRotate--90" : "iconRotate-0"
                    }`}
                  >
                    <i className="fa-solid fa-angle-left"></i>
                  </span>
                </Button>
                <div className="dropdown-content">
                  <ul
                    className={`dropdown-content-1 ${
                      showItems3 ? "showItems" : ""
                    }`}
                  >
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
          <div id="menu-responsive" className="fa-solid fa-bars"></div>
        </div>
      </PageHeader>
    </>
  );
};

export default Header;
