/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button, Layout, Menu, MenuProps } from 'antd';
import React, { useState } from 'react';
import {
    TeamOutlined, UserOutlined, MenuFoldOutlined, MenuUnfoldOutlined, CalendarOutlined, ContainerOutlined, CheckCircleOutlined, ScissorOutlined
} from "@ant-design/icons";
import { useNavigate } from 'react-router-dom';
import { RouteEndpoints } from 'Components/router/MainRouter';

type MenuItem = Required<MenuProps>['items'][number];

const SideBar = () => {
    const [collapsed, setCollapsed] = useState(false);
    const navigate = useNavigate();

    const toggleCollapsed = () => {
        setCollapsed(!collapsed);
    };

    const breakPoint = () => {
        if (!collapsed) setCollapsed(!collapsed);
    }

    const MenuItems: MenuItem[] = [
        {
            label: "Quản lý kiểm dịch", key: 4, icon: <CheckCircleOutlined />, children: [
                {
                    label: "Báo cáo kiểm dịch", key: 5, onClick: () => {
                        navigate(RouteEndpoints.quarantine.basepath);
                    }
                },
                {
                    label: "Hóa đơn kiểm dịch", key: 6, onClick: () => {
                        navigate(RouteEndpoints.home.basepath);
                    }
                },
                { label: "Item 4", key: 7 },
            ]
        },
        {
            label: "Quản lý giết mổ", key: 8, icon: <ScissorOutlined />, children: [
                { label: "Báo cáo giết mổ", icon: <ContainerOutlined />, key: 9 },
                { label: "Item 3", key: 10 },
                { label: "Item 4", key: 11 },
            ]
        },
        {
            label: "Quản lý nhân viên", key: 1, icon: <UserOutlined />, children: [
                { label: "Danh sách nhân viên", key: 2, icon: <TeamOutlined /> },
                { label: "Lịch làm việc", key: 3, icon: <CalendarOutlined /> },
            ]
        },
    ]

    return (
        <Layout.Sider
            collapsed={collapsed}
            breakpoint="md"
            onBreakpoint={breakPoint}>
            <Button type="primary" onClick={toggleCollapsed} style={{ marginBottom: 16 }}>
                {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            </Button>
            <Menu
                defaultSelectedKeys={['1']}
                mode="inline"
                theme="dark"
                items={MenuItems}
            />
        </Layout.Sider>
    );
}

export default SideBar;