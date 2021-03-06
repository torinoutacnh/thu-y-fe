import { Button, PageHeader } from "antd";
import { abattoirEndpoints } from "Components/router/AbattoirRoutes";
import { RouteEndpoints } from "Components/router/MainRouter";
import { manageabattoirEndpoints } from "Components/router/ManageAbattoirRoutes";
import { quarantineEndpoints } from "Components/router/QuarantineRoutes";
import { staffEndpoints } from "Components/router/StaffRoutes";
import { managereceiptEndpoints } from "Components/router/ManageReceiptRoutes";
import logoThuY from "../../../../Static/image/logo.png";
import { useAuth } from "Modules/hooks/useAuth";
import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./header.css";

import { publicEndpoints } from "Components/router/PublicRoutes";

import { medicalHygieneEndpoints } from "Components/router/MedicalHygieneRoutes";
import { ChangePassword } from "Components/Pages/User/ChangePassword";


const Header = () => {
  const navigate = useNavigate();
  const keyRef = useRef(0);
  const { user, singOut } = useAuth();

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
            <img src={logoThuY} alt="logo" width={30} onClick={() => { navigate(RouteEndpoints.home.basepath) }} />
            <h4>PH???N M???M QU???N L?? KI???M SO??T GI???T M??? V?? KI???M D???CH</h4>
          </div>
          {user ? (
            <>
              <div id="menu-responsive" className="fa-solid fa-bars"></div>
              <ul className="nav-bar-top" ref={navRef}>
                <li onClick={handleClicElements1}>
                  <div className="dropdown-menu">
                    <Button type="link" className="dropdown-menu__btn">
                      Ki???m d???ch
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
                          <Link to={quarantineEndpoints.home}>
                            B??o c??o ki???m d???ch
                          </Link>
                        </li>
                        <li>
                          <Link to={medicalHygieneEndpoints.home}>
                            Bi??n b???n v??? sinh y t???
                          </Link>
                        </li>
                        <li>
                          <Link to={quarantineEndpoints.home}>
                            H??a ????n ki???m d???ch
                          </Link>
                        </li>
                        <li>
                          <Link to={quarantineEndpoints.home}>
                            B??o c??o doanh thu
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </li>
                <li onClick={handleClicElements2} className="mb20">
                  <div className="dropdown-menu">
                    <Button type="link" className="dropdown-menu__btn">
                      Gi???t m???
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
                          <Link to={abattoirEndpoints.home}>
                            B??o c??o gi???t m???
                          </Link>
                        </li>
                        <li>
                          <Link to={abattoirEndpoints.home}>
                            H??a ????n gi???t m???
                          </Link>
                        </li>
                        <li>
                          <Link to={abattoirEndpoints.home}>
                            B??o c??o doanh thu
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </li>
                <li onClick={handleClicElements3}>
                  <div className="dropdown-menu">
                    <Button type="link" className="dropdown-menu__btn">
                      Qu???n tr??? admin
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
                          <Link to={staffEndpoints.home}>
                            Qu???n l?? nh??n vi??n
                          </Link>
                        </li>
                        <li>
                          <Link to={RouteEndpoints.animal.basepath}>
                            Qu???n l?? ?????ng v???t
                          </Link>
                        </li>
                        <li>
                          <Link to={quarantineEndpoints.home}>
                            Qu???n l?? ????n gi??
                          </Link>
                        </li>
                        <li>
                          <Link to={manageabattoirEndpoints.home}>
                            Qu???n l?? l?? m???
                          </Link>
                        </li>
                        <li>
                          <Link to={managereceiptEndpoints.home}>
                            Qu???n l?? h??a ????n
                          </Link>
                        </li>
                        <li>
                          <Link to={quarantineEndpoints.home}>
                            Doanh thu t???ng
                          </Link>
                        </li>
                        <li>
                          <Link to={RouteEndpoints.myAllocate}>
                            H??a ????n c???a t??i
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </li>
                <li onClick={handleClicElements4} className="mb20">
                  <div className="dropdown-menu">
                    <Button type="link" className="dropdown-menu__btn">
                      T??i kho???n
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
                        <li>
                          <ChangePassword />
                        </li>
                        <li onClick={singOut}>
                          <a>
                            ????ng xu???t
                          </a>

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
                      ????ng xu???t
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
