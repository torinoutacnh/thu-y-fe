import { Button, PageHeader } from "antd";
import { abattoirEndpoints } from "Components/router/AbattoirRoutes";
import { RouteEndpoints } from "Components/router/MainRouter";
import { quarantineEndpoints } from "Components/router/QuarantineRoutes";
import { staffEndpoints } from "Components/router/StaffRoutes";
import { useAuth } from "Modules/hooks/useAuth";
import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./header.css";

const Header = () => {
  const navigate = useNavigate();
  const keyRef = useRef(0);
  const { user } = useAuth();

  const getKey = () => {
    keyRef.current = keyRef.current + 1;
    return keyRef.current;
  };

  const navRef = useRef(null);

  useEffect(() => {
    if (user) {
      const menu = document.querySelector("#menu-responsive") as HTMLElement;
      const navbar = document.querySelector(".nav-bar-top");
      menu.onclick = () => {
        menu.classList.toggle("fa-times");
        navbar.classList.toggle("active");
      };
    }
  }, [user?.userId]);

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
          </div>
          {user ? (
            <>
              <div id="menu-responsive" className="fa-solid fa-bars"></div>

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
                          <Link to={abattoirEndpoints.home}>
                            Báo cáo giết mổ
                          </Link>
                        </li>
                        <li>
                          <Link to={abattoirEndpoints.home}>
                            Hóa đơn giết mổ
                          </Link>
                        </li>
                        <li>
                          <Link to={abattoirEndpoints.home}>
                            Báo cáo doanh thu
                          </Link>
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
                          <Link to={staffEndpoints.home}>
                            Quản lý nhân viên
                          </Link>
                        </li>
                        <li>
                          <Link to={RouteEndpoints.animal.basepath}>
                            Quản lý động vật
                          </Link>
                        </li>
                        <li>
                          <Link to={quarantineEndpoints.home}>
                            Quản lý đơn giá
                          </Link>
                        </li>
                        <li>
                          <Link to={quarantineEndpoints.home}>
                            Quản lý lò mổ
                          </Link>
                        </li>
                        <li>
                          <Link to={quarantineEndpoints.home}>
                            Doanh thu tổng
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </li>
              </ul>
            </>
          ) : (
            <></>
          )}
        </div>
      </PageHeader>
    </>
  );
};

export default Header;
