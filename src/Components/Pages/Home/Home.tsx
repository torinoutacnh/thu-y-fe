import { Col, Row, Button, Radio } from "antd";
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
    <div className="container">
      <div className="logo-home" style={{ flex: 1 }}>
        <img 
          src={logoHome} 
          style={{pointerEvents: "none"}} 
          alt="Chi cục thú ý Đồng Nai"
        />
      </div>
      <div className="list-form" style={{ flex: 2 }}>
        <div className="header-container">
          <h1>
            PHẦN MỀM QUẢN LÝ KIỂM SOÁT GIẾT MỔ VÀ KIỂM DỊCH
          </h1> 
        </div>
        <div className="list-item">
          <div className="list-item_1" style={{flex: 1 }}>
            <div className="header_list-item_1">
              <h2>
                QUẢN LÝ KIỂM DỊCH
            </h2>
            </div>
            <div className="content_list-item_1">
              <ul style={{ listStyle: 'none' }} >
                <li>
                  <Link to={quarantineEndpoints.dkkd}>
                    <Radio.Button className="btn">
                      ĐƠN ĐĂNG KÝ KDĐV (MS 1)
                    </Radio.Button>
                  </Link>
                </li>
                <li>
                  <Link to={quarantineEndpoints.vsyt}>
                    <Radio.Button className="btn">
                      BIÊN BẢN VSTY (MS 7)
                    </Radio.Button>
                  </Link>
                </li>
                <li>
                  <Link to={quarantineEndpoints.cnkd}>
                    <Radio.Button className="btn">
                      GIẤY CNKD (MS 12B)
                    </Radio.Button>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="list-item_2" style={{ flex: 1 }}>
            <div className="header_list-item_2">
              <h2>
                QUẢN LÝ GIẾT MỔ
              </h2>
            </div>
            <div className="content_list-item_2">
              <ul style={{ listStyle: 'none' }}>
                <li>
                  <Link to={abattoirEndpoints.nkgm}>
                    <Radio.Button className="btn">
                      BÁO CÁO GIẾT MỔ
                    </Radio.Button>
                  </Link>
                </li>
                <li>
                  <Link to={generalEndpoints.notfound}>
                    <Radio.Button className="btn">
                      HÓA ĐƠN GIẾT MỔ
                    </Radio.Button>
                  </Link>
                </li>
                <li>
                  <Link to={generalEndpoints.notfound}>
                    <Radio.Button className="btn">
                      BÁO CÁO DOANH THU
                    </Radio.Button> 
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
