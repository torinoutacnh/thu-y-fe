import { PageHeader } from "antd";
import React from "react";

import "./header.css";

const Header = () => {
  return (
    <PageHeader>
      <div className="header_menu">
        <img
          src="https://gw.alipayobjects.com/zos/antfincdn/aPkFc8Sj7n/method-draw-image.svg"
          alt="logo"
          width={30}
        />
        <h4>PHẦN MỀM QUẢN LÝ KIỂM SOÁT GIẾT MỔ VÀ KIỂM DỊCH</h4>
      </div>
    </PageHeader>
  );
};

export default Header;
