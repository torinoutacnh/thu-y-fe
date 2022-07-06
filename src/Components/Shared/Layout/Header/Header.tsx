import { PageHeader } from 'antd';
import React from 'react';

import './header.css';

const Header = () => {
    return (
        <PageHeader className='header_theme_dark'>
            <div className='header_menu'>

                <img
                    src="https://gw.alipayobjects.com/zos/antfincdn/aPkFc8Sj7n/method-draw-image.svg" alt='logo'
                    width={30}
                />
                <h1>
                    PHẦN MỀM QUẢN LÝ KIỂM SOÁT GIẾT MỔ VÀ KIỂM DỊCH
                </h1>
            </div>
        </PageHeader>
    );
}

export default Header;