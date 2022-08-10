import { Button, PageHeader } from "antd";
import { RouteEndpoints } from "Components/router";
import {
  staffEndpoints,
  manageReceiptEndpoints,
  quarantineEndpoints,
  manageabattoirEndpoints,
  abattoirEndpoints,
  animalEndpoints,
  generalEndpoints,
} from "Components/router/routes";
import logoThuY from "../../../../Static/image/logo.png";
import { useAuth } from "Modules/hooks/useAuth";
import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./header.css";

import { ChangePassword } from "Components/Pages/authentication/ChangePassword";

const Header = () => {
  const navigate = useNavigate();
  const keyRef = useRef(0);
  const { user, singOut } = useAuth();

  const getKey = () => {
    keyRef.current = keyRef.current + 1;
    return keyRef.current;
  };

  const navRef = useRef(null);

  const toggleMenu = () => {
    if (user) {
      const menu = document.querySelector("#menu-responsive") as HTMLElement;
      const navbar = document.querySelector(".nav-bar-top");

      menu.classList.toggle("fa-times");
      navbar.classList.toggle("active");

    }
  }

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

  const [showItems4, setShowItems4] = useState(false);
  const [iconRotate4, setIconRotate4] = useState(false);
  function handleClicElements4() {
    setShowItems4(!showItems4);
    setIconRotate4(!iconRotate4);
  }

  return (
    <>
      <PageHeader>
        <div className="header__web">
          <div className="header_menu">
            <img
              src={logoThuY}
              alt="logo"
              width={30}
              onClick={() => {
                navigate(generalEndpoints.home);
              }}
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
                        className={`icon ${iconRotate1 ? "iconRotate--90" : "iconRotate-0"
                          }`}
                      >
                        <i className="fa-solid fa-angle-left"></i>
                      </span>
                    </Button>
                    <div className="dropdown-content">
                      <ul
                        className={`dropdown-content-1 ${showItems1 ? "showItems" : ""
                          }`}
                      >
                        <li>
                          <Link to={quarantineEndpoints.dkkd} onClick={() => { toggleMenu() }}>
                            Đăng ký kiểm dịch

                          </Link>
                        </li>
                        <li>
                          <Link to={quarantineEndpoints.cnkd} onClick={() => { toggleMenu() }}>
                            Chứng nhận kiểm dịch
                          </Link>
                        </li>
                        <li>
                          <Link to={quarantineEndpoints.vsyt} onClick={() => { toggleMenu() }}>
                            Biên bản vệ sinh y tế
                          </Link>
                        </li>
                        <li>
                          <Link to={quarantineEndpoints.cnkd} onClick={() => { toggleMenu() }}>
                            Hóa đơn kiểm dịch
                          </Link>
                        </li>
                        <li>
                          <Link to={quarantineEndpoints.home} onClick={() => { toggleMenu() }}>
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
                        className={`icon ${iconRotate2 ? "iconRotate--90" : "iconRotate-0"
                          }`}
                      >
                        <i className="fa-solid fa-angle-left"></i>
                      </span>
                    </Button>
                    <div className="dropdown-content">
                      <ul
                        className={`dropdown-content-1 ${showItems2 ? "showItems" : ""
                          }`}
                      >
                        <li>
                          <Link to={abattoirEndpoints.nkgm} onClick={() => { toggleMenu() }}>
                            Báo cáo giết mổ
                          </Link>
                        </li>
                        <li>
                          <Link to={abattoirEndpoints.cnkdxkdv} onClick={() => { toggleMenu() }}>
                            Chứng nhận kiểm dịch
                          </Link>
                        </li>
                        <li>
                          <Link to={abattoirEndpoints.home} onClick={() => { toggleMenu() }}>
                            Hóa đơn giết mổ
                          </Link>
                        </li>
                        <li>
                          <Link to={abattoirEndpoints.home} onClick={() => { toggleMenu() }}>
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
                        className={`icon ${iconRotate3 ? "iconRotate--90" : "iconRotate-0"
                          }`}
                      >
                        <i className="fa-solid fa-angle-left"></i>
                      </span>
                    </Button>
                    <div className="dropdown-content">
                      <ul
                        className={`dropdown-content-1 ${showItems3 ? "showItems" : ""
                          }`}
                      >
                        <li>
                          <Link to={staffEndpoints.home} onClick={() => { toggleMenu() }}>
                            Quản lý nhân viên
                          </Link>
                        </li>
                        <li>
                          <Link to={animalEndpoints.home} onClick={() => { toggleMenu() }}>
                            Quản lý động vật
                          </Link>
                        </li>
                        <li>
                          <Link to={quarantineEndpoints.home} onClick={() => { toggleMenu() }}>
                            Quản lý đơn giá
                          </Link>
                        </li>
                        <li>
                          <Link to={manageabattoirEndpoints.home} onClick={() => { toggleMenu() }}>
                            Quản lý lò mổ
                          </Link>
                        </li>
                        <li>
                          <Link to={manageReceiptEndpoints.home} onClick={() => { toggleMenu() }}>
                            Quản lý hóa đơn
                          </Link>
                        </li>
                        <li>
                          <Link to={quarantineEndpoints.home} onClick={() => { toggleMenu() }}>
                            Doanh thu tổng
                          </Link>
                        </li>
                        <li>
                          <Link to={RouteEndpoints.myAllocate} onClick={() => { toggleMenu() }}>
                            Hóa đơn của tôi
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </li>
                <li onClick={handleClicElements4} className="mb20">
                  <div className="dropdown-menu">
                    <Button type="link" className="dropdown-menu__btn">
                      Tài khoản
                      <span
                        className={`icon ${iconRotate4 ? "iconRotate--90" : "iconRotate-0"
                          }`}
                      >
                        <i className="fa-solid fa-angle-left"></i>
                      </span>
                    </Button>
                    <div className="dropdown-content">
                      <ul
                        className={`dropdown-content-1 ${showItems4 ? "showItems" : ""
                          }`}
                      >
                        <li onClick={() => { toggleMenu() }}>
                          <ChangePassword />
                        </li>
                        <li onClick={singOut}>
                          <a>Đăng xuất</a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </li>
                {/* <li>
                  <div style={{ marginTop: 20, float: "right" }}>
                    <Button
                      danger
                      style={{ color: "red", borderRadius: 5 }}
                      type="default"
                      className="dropdown-menu__btn"
                      onClick={singOut}
                    >
                      Đăng xuất
                    </Button>
                  </div>
                </li> */}
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
