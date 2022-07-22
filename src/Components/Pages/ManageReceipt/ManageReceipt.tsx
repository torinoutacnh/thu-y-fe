import React, { useState, useEffect, useRef } from "react";
import { FileDoneOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import {
  Table,
  Button,
  Input,
  Descriptions,
  PageHeader,
  notification,
} from "antd";
import { getKeyThenIncreaseKey } from "antd/lib/message";
import { ApiRoute, ManageReceiptRoute, UserApiRoute } from "Api";
import { useAuth } from "Modules/hooks/useAuth";
import { ColumnsType } from "antd/lib/table";
import { Link, useNavigate } from "react-router-dom";
import { useLoading } from "Modules/hooks/useLoading";
import useWindowSize from "Modules/hooks/useWindowSize";
import { ReceiptModel } from "Components/Shared/Models/Receipt";
import { managereceiptEndpoints } from "Components/router/ManageReceiptRoutes";
import CreateReceipt from "./CreateReceipt";
import { ChangePassword } from "../User/ChangePassword";
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
  const [listUsername, setListUsername] = useState([])
  const [listId, setListId] = useState([])


  useEffect(() => {
    const tmp = liststaff.map((item, index) => {
      return ({ value: item.account })
    })
    setListUsername(tmp)
    // console.log("listUsername >>>>>>>>>> ", listUsername)
  }, [liststaff])

  useEffect(() => {
    const tmp = liststaff.map((item, index) => {
      return ({ value: item.account, id: item.id })
    })
    setListId(tmp)
    // console.log("listId >>>>>>>>>> ", listId)
  }, [liststaff])


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
          fetch(process.env.REACT_APP_API.concat(ManageReceiptRoute.getReceipt), {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer ".concat(user.token),
            },
            body: JSON.stringify(page),
          })
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

      })



  };

  useEffect(() => { GetReceipt(); }, [page.pageNumber, page.pageSize]);



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
        openNotificationWithIcon("error", "Xóa hóa đơn", "Xóa hóa đơn thất bại");
      });
  };
  const ReceiptColumns: ColumnsType<ReceiptModel> = [
    { title: "Tên hóa đơn", dataIndex: "name", key: 1 },
    { title: "Tên mã hóa đơn", dataIndex: "codeName", key: 2 },
    { title: "Số mã hóa đơn", dataIndex: "codeNumber", key: 3 },
    { title: "Ngày hiệu lực", dataIndex: "effectiveDate", key: 4 },

    {
      title: "Xử lý",
      dataIndex: "",
      key: 8,
      render: (record) => (
        <>
          <Link
            to={managereceiptEndpoints.updatereceipt.replace(":id", record.id)}
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

          <Button
            type="link"
            icon={<FileDoneOutlined />}

          >
            <CreateAllocate idReceipt={record.id} arrUser={listUsername} arrId={listId} />
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
        <Descriptions.Item label={"Xử lý"}>
          <>
            <Link
              to={managereceiptEndpoints.updatereceipt.replace(":id", data.id)}
            >
              <Button type="link" color="blue" icon={<EditOutlined />}>
                Cập nhật
              </Button>
            </Link>
            <Button type="link" danger icon={<DeleteOutlined />} onClick={() => deleteReceiptHandler(data.id, data.name)}>
              Xóa
            </Button>

            <Button type="link" icon={<FileDoneOutlined />}>
              <CreateAllocate idReceipt={data.id} arrUser={listUsername} arrId={listId} />
            </Button>

          </>
        </Descriptions.Item>
      </Descriptions>
    );
  };
  const UpdateReceiptAfterCreate = () => {
    setPage({ ...page, pageSize: page.pageSize - 1 });
  };
  return (
    <>
      {console.log("receipt >>>>>>>>", listReceipt)}
      <PageHeader
        title="Quản lý hóa đơn"
        extra={[
          <CreateReceipt
            key={getKeyThenIncreaseKey()}
            UpdateReceiptAfterCreate={UpdateReceiptAfterCreate}
          />,
        ]}
      />
      {listReceipt && windowSize && (
        <div className="table-content-report">
          {windowSize.width >= 1024 ? (
            <Table
              locale={{ emptyText: "Không có hóa đơn!" }}
              columns={ReceiptColumns}
              rowKey={"id"}
              dataSource={listReceipt}
            />
          ) : (
            listReceipt.map((x, idx) => (
              <RenderCard data={x} key={getKeyThenIncreaseKey()} idx={idx} />
            ))
          )}
        </div>
      )}
    </>
  );
};

export default ManageReceipt;
