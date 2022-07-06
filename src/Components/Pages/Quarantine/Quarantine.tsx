import React, { useEffect, useState } from 'react';
import { Divider, Space, Table } from 'antd';
import type { ColumnsType } from 'antd/lib/table';

interface DataType {
    key: React.Key;
    name: string;
    age: number;
    address: string;
}

const columns: ColumnsType<DataType> = [
    {
        title: 'Lò mổ',
        dataIndex: 'name',
    },
    {
        title: 'Ngày báo cáo',
        dataIndex: 'age',
    },
    {
        title: 'Người báo cáo',
        dataIndex: 'address',
    }, {
        title: 'Người duyệt',
        dataIndex: 'name',
    },
    {
        title: 'Tình trạng',
        dataIndex: 'age',
    },
    {
        title: 'Xử lý',
        dataIndex: 'address',
    },
];

const Quarantine = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        setData([]);
    }, []);

    return (
        <>
            <h1>Kiểm dịch</h1>
            <Space>
                Bộ lọc
            </Space>
            <Divider orientation='left' style={{ border: '2px' }}>Danh sách báo cáo</Divider>
            <Table columns={columns} dataSource={data} size="small" />
        </>
    );
}

export default Quarantine;