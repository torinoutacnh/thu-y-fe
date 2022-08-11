import { useState, useEffect, useRef } from "react";
import {
  FileDoneOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import {
  Table,
  Button,
  Descriptions,
  PageHeader,
  notification,
  Space,
} from "antd";
import { getKeyThenIncreaseKey } from "antd/lib/message";
import { ManageReceiptRoute, UserApiRoute } from "Api";
import { useAuth } from "Modules/hooks/useAuth";
import { ColumnsType } from "antd/lib/table";
import { Link, useNavigate } from "react-router-dom";
import { useLoading } from "Modules/hooks/useLoading";
import useWindowSize from "Modules/hooks/useWindowSize";
import { ReceiptModel } from "Components/Shared/Models/Receipt";
import { manageReceiptEndpoints } from "Components/router/routes";
import CreateReceipt from "./CreateReceipt";
import { CreateAllocate } from "./CreateAllocate";
import { UserModel } from "Components/Shared/Models/User";

const ManageReceipt = () => {
  const [listReceipt, setListReceipt] = useState<ReceiptModel[]>([]);
  const [page, setPage] = useState({
    pageNumber: 0,
    pageSize: 1000,
  });
  const [page2, setPage2] = useState({
    pageIndex: 1,
    pageNumber: 100,
  });
  const keyRef = useRef(0);
  const getKey = () => {
    keyRef.current++;
    return keyRef.current;
  };

  notification.config({
    placement: "topRight",
    bottom: 50,
    duration: 3,
    rtl: true,
  });
  type NotificationType = "success" | "info" | "warning" | "error";
  const openNotificationWithIcon = (
    type: NotificationType,
    title: string,
    message: string
  ) => {
    notification[type]({
      message: title,
      description: message,
    });
  };
  const { user } = useAuth();
  const { setLoading } = useLoading();
  const navigate = useNavigate();
  const windowSize = useWindowSize();
  const [liststaff, setListStaff] = useState<UserModel[]>([]);
  const [listUsername, setListUsername] = useState([]);
  const [listId, setListId] = useState([]);

  useEffect(() => {
    const tmp = liststaff.map((item, index) => {
      return { value: item.account };
    });
    setListUsername(tmp);
    // console.log("listUsername >>>>>>>>>> ", listUsername)
  }, [liststaff]);

  useEffect(() => {
    const tmp = liststaff.map((item, index) => {
      return { value: item.account, id: item.id, name: item.name };
    });
    setListId(tmp);
    // console.log("listId >>>>>>>>>> ", listId)
  }, [liststaff]);

  const GetReceipt = () => {
    setLoading(true);

    fetch(
      process.env.REACT_APP_API.concat(UserApiRoute.getUser, "?") +
      new URLSearchParams(page2 as any),
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer ".concat(user.token),
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setListStaff(data.data);
      })
      .catch((error) => console.log(error))
      .finally(() => {
        //////////////////////////////////////////////
        if (user?.token) {
          fetch(
            process.env.REACT_APP_API.concat(ManageReceiptRoute.getReceipt),
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer ".concat(user.token),
              },
              body: JSON.stringify(page),
            }
          )
            .then((res) => {
              return res.json();
            })
            .then((data) => {
              setListReceipt(data.data);
            })
            .catch((error) => console.log(error))
            .finally(() => setLoading(false));
        }
        /////////////////////////////////////////////
      });
  };

  useEffect(() => {
    GetReceipt();
  }, [page.pageNumber, page.pageSize]);

  const deleteReceiptHandler = (idReceipt: string, name: string) => {
    // setLoading(true);
    const receiptDelete = {
      id: idReceipt,
    };

    setLoading(true);
    fetch(process.env.REACT_APP_API.concat(ManageReceiptRoute.delete), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer ".concat(user.token),
      },
      body: JSON.stringify(receiptDelete),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        // setListAnimal(data.data)
        openNotificationWithIcon(
          "success",
          "Xóa hóa đơn",
          `Xóa ${name} thành công`
        );

        console.log(">>>> Delete receipt ok");

        setPage({ ...page, pageSize: page.pageSize - 1 });
      })
      .catch((error) => {
        console.log(">>>> Delete error");
        openNotificationWithIcon(
          "error",
          "Xóa hóa đơn",
          "Xóa hóa đơn thất bại"
        );
      });
  };
  const ReceiptColumns: ColumnsType<ReceiptModel> = [
    { title: "Tên hóa đơn", dataIndex: "name", key: 1 },
    { title: "Tên mã hóa đơn", dataIndex: "codeName", key: 2 },
    { title: "Số mã hóa đơn", dataIndex: "codeNumber", key: 3 },
    { title: "Ngày hiệu lực", dataIndex: "effectiveDate", key: 4 },
    { title: "Số trang", dataIndex: "page", key: 5 },
    {
      title: "Xử lý",
      dataIndex: "",
      key: 8,
      render: (record) => (
        <>
          <Link
            to={manageReceiptEndpoints.updatereceipt.replace(":id", record.id)}
          >
            <Button type="link" color="blue" icon={<EditOutlined />}>
              Cập nhật
            </Button>
          </Link>
          <Button
            type="link"
            danger
            icon={<DeleteOutlined />}
            onClick={() => deleteReceiptHandler(record.id, record.name)}
          >
            Xóa
          </Button>

          <Button type="link" icon={<FileDoneOutlined />}>
            <CreateAllocate
              idReceipt={record.id}
              arrUser={listUsername}
              arrId={listId}
              codeName={record.codeName}
              codeNumber={record.codeNumber}
            />
          </Button>
        </>
      ),
    },
  ];
  const RenderCard = (props: { data: ReceiptModel; idx: number }) => {
    const { data, idx } = props;
    const key = useRef(0);
    const getKey = () => {
      key.current = key.current + 1;
      return key.current;
    };

    return (
      <Descriptions
        bordered
        column={{ lg: 2, md: 1, sm: 1, xs: 1 }}
        labelStyle={{
          color: "white",
          backgroundColor: "#17202A",
          width: "40%",
        }}
        contentStyle={{
          color: "#17202A",
          backgroundColor: "#D5D8DC",
        }}
        size={"small"}
        style={{ marginTop: idx === 0 ? 10 : 50 }}
      >
        <Descriptions.Item label={"Tên hóa đơn"}>{data.name}</Descriptions.Item>
        <Descriptions.Item label={"Tên mã hóa đơn"}>
          {data.codeName}
        </Descriptions.Item>
        <Descriptions.Item label={"Số mã hóa đơn"}>
          {data.codeNumber}
        </Descriptions.Item>
        <Descriptions.Item label={"Ngày hiệu lực"}>
          {data.effectiveDate}
        </Descriptions.Item>
        <Descriptions.Item label={"Số trang"}>{data.page}</Descriptions.Item>
        <Descriptions.Item label={"Xử lý"}>
          <>
            <Link
              to={manageReceiptEndpoints.updatereceipt.replace(":id", data.id)}
            >
              <Button type="link" color="blue" icon={<EditOutlined />}>
                Cập nhật
              </Button>
            </Link>
            <Button
              type="link"
              danger
              icon={<DeleteOutlined />}
              onClick={() => deleteReceiptHandler(data.id, data.name)}
            >
              Xóa
            </Button>

            <Button type="link" icon={<FileDoneOutlined />}>
              <CreateAllocate
                idReceipt={data.id}
                arrUser={listUsername}
                arrId={listId}
                codeName={data.codeName}
                codeNumber={data.codeNumber}
              />
            </Button>
          </>
        </Descriptions.Item>
      </Descriptions>
    );
  };
  const resColumns: ColumnsType<ReceiptModel> = [
    {
      title: "Danh sách hóa đơn",
      key: getKey(),
      render: (record, key, index) => {
        return (
          <>
            <tr>
              <th>Tên hóa đơn :</th>
              <td>{record.name}</td>
            </tr>
            <tr>
              <th>Tên mã hóa đơn :</th>
              <td>{record.codeName}</td>
            </tr>
            <tr>
              <th>Số mã hóa đơn:</th>
              <td>{record.codeNumber}</td>
            </tr>
            <tr>
              <th>Ngày hiệu lực :</th>
              <td>{record.effectiveDate}</td>
            </tr>
            <tr>
              <th>Số trang :</th>
              <td>{record.page}</td>
            </tr>

            <tr>
              <Space>
                <Link
                  to={manageReceiptEndpoints.updatereceipt.replace(":id", record.id)}
                >
                  <Button type="link" color="blue" icon={<EditOutlined />}>
                    Cập nhật
                  </Button>
                </Link>
                <Button
                  type="link"
                  danger
                  onClick={() => deleteReceiptHandler(record.id, record.name)}
                  icon={<DeleteOutlined />}
                >
                  Xóa
                </Button>
                <Button type="link" icon={<FileDoneOutlined />}>
                  <CreateAllocate
                    idReceipt={record.id}
                    arrUser={listUsername}
                    arrId={listId}
                    codeName={record.codeName}
                    codeNumber={record.codeNumber}
                  />
                </Button>
              </Space>
            </tr>
          </>
        );
      },
    },
  ];
  const UpdateReceiptAfterCreate = () => {
    setPage({ ...page, pageSize: page.pageSize - 1 });
  };
  return (
    <>
      {/* {console.log("receipt >>>>>>>>", listReceipt)} */}
      <PageHeader
        title="Quản lý hóa đơn"
        extra={[
          <CreateReceipt
            key={getKeyThenIncreaseKey()}
            UpdateReceiptAfterCreate={UpdateReceiptAfterCreate}
          />,
        ]}
      />

      <Table
        locale={{ emptyText: "Không có hóa đơn!" }}
        columns={windowSize.width > 768 ? ReceiptColumns : resColumns}
        rowKey={"id"}
        dataSource={listReceipt}
      />
    </>
  );
};

export default ManageReceipt;
