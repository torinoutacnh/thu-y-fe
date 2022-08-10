import { Col, Row } from "antd";
import { Link } from "react-router-dom";
import {
  quarantineEndpoints,
  generalEndpoints,
  abattoirEndpoints,
} from "Components/router/routes";
import { url } from "inspector";
import logoHome from "../../../Static/image/logo.png"

export default function HomePage() {
  return (
    <div className="container" style={{ display: "flex", fontWeight: 500, lineHeight: 3 }}>
      <div className="logo-home" style={{ flex: 1 }}>
        <img src={logoHome} alt="Chi cục thú ý Đồng Nai" style={{
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          width: '100%',
          margin: '7% 0',
        }}
        />
      </div>
      <div className="list-form" style={{
        flex: 2,
      }}>
        <div
          className="header-container"
          style={{
            backgroundColor: 'rgb(46 58 70)',
            width: '100%',
            color: 'white',
            lineHeight: 2.5,
            paddingLeft: '13px',
          }}
        >
          PHẦN MỀM QUẢN LÝ KIỂM SOÁT GIẾT MỔ VÀ KIỂM DỊCH
        </div>
        <div
          className="list-item"
          style={{
            display: 'flex',
            marginTop: '5px',
            lineHeight: 4,
          }}
        >
          <div
            className="list-item_1"
            style={{
              flex: 1,
            }}
          >
            <div className="header_list-item_1" style={{ paddingLeft: '10px', fontSize: '18px' }}>QUẢN LÝ KIỂM DỊCH</div>
            <div className="content_list-item_1">
              <ul style={{
                listStyle: 'none',
              }}>
                <li
                  style={{
                    textAlign: 'center',
                    margin: '5% 5% 10% -5%',
                    border: '3px dashed rgb(75 148 221)',
                    borderRadius: '20px',
                  }}
                >
                  ĐƠN ĐĂNG KÝ KDĐV (MS 1)
                </li>
                <li
                  style={{
                    textAlign: 'center',
                    margin: '10% 5% 10% -5%',
                    border: '3px dashed rgb(75 148 221)',
                    borderRadius: '20px',
                  }}
                >
                  BIÊN BẢN VSTY (MS 7)
                </li>
                <li style={{
                  textAlign: 'center',
                  margin: '10% 5% 0 -5%',
                  border: '3px dashed rgb(75 148 221)',
                  borderRadius: '20px',
                }}
                >
                  GIẤY CNKD (MS 12B)
                </li>
              </ul>
            </div>
          </div>
          <div
            className="list-item_2"
            style={{
              flex: 1,
            }}
          >
            <div className="header_list-item_2" style={{ paddingLeft: '10px', fontSize: '18px' }}>QUẢN LÝ GIẾT MỔ</div>
            <div className="content_list-item_2">
              <ul style={{
                listStyle: 'none',
              }}>
                <li
                  style={{
                    textAlign: 'center',
                    margin: '5% 5% 10% -5%',
                    border: '3px dashed rgb(75 148 221)',
                    borderRadius: '20px',
                  }}
                >
                  BÁO CÁO GIẾT MỔ
                </li>
                <li
                  style={{
                    textAlign: 'center',
                    margin: '10% 5% 10% -5%',
                    border: '3px dashed rgb(75 148 221)',
                    borderRadius: '20px',
                  }}
                >
                  HÓA ĐƠN GIẾT MỔ
                </li>
                <li style={{
                  textAlign: 'center',
                  margin: '10% 5% 0 -5%',
                  border: '3px dashed rgb(75 148 221)',
                  borderRadius: '20px',
                }}
                >
                  BÁO CÁO DOANH THU
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    // <div className="margin--top--3">
    //   <h1>Quản lý kiểm dịch</h1>
    //   <div
    //     className="card__box"
    //     style={{
    //       padding: "30px",
    //       background: "#ececec",
    //       marginBottom: "50px",
    //     }}
    //   >
    //     <Row gutter={16}>
    //       <Col xs={24} sm={24} md={8} lg={8}>
    //         <Link to={quarantineEndpoints.basepath}>
    //           <div className="card">ĐƠN ĐĂNG KÝ KDĐV (MS 1)</div>
    //         </Link>
    //       </Col>
    //       <Col xs={24} sm={24} md={8} lg={8}>
    //         <Link to={generalEndpoints.notfound}>
    //           <div className="card ">BIÊN BẢN VSTY (MS 7)</div>
    //         </Link>
    //       </Col>
    //       <Col xs={24} sm={24} md={8} lg={8}>
    //         <Link to={quarantineEndpoints.cnkd}>
    //           <div className="card">GIẤY CNKD (MS 12B)</div>
    //         </Link>
    //       </Col>
    //     </Row>
    //   </div>
    //   <h1>Quản lý giết mổ</h1>
    //   <div
    //     style={{
    //       padding: "30px",
    //       background: "#ececec",
    //     }}
    //   >
    //     <Row gutter={16}>
    //       <Col xs={24} sm={24} md={8} lg={8}>
    //         <Link to={abattoirEndpoints.basepath}>
    //           <div className="card">BÁO CÁO GIẾT MỔ</div>
    //         </Link>
    //       </Col>
    //       <Col xs={24} sm={24} md={8} lg={8}>
    //         <Link to={generalEndpoints.notfound}>
    //           <div className="card">HÓA ĐƠN GIẾT MỔ</div>
    //         </Link>
    //       </Col>
    //       <Col xs={24} sm={24} md={8} lg={8}>
    //         <Link to={generalEndpoints.notfound}>
    //           <div className="card">BÁO CÁO DOANH THU</div>
    //         </Link>
    //       </Col>
    //     </Row>
    //   </div>
    // </div>
  );
}
