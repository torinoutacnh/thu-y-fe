import { useState, useEffect, useRef } from "react";
import { EyeOutlined, ArrowRightOutlined } from "@ant-design/icons";
import { Table, Button } from "antd";
import { useAuth } from "Modules/hooks/useAuth";
import { ColumnsType } from "antd/lib/table";
import { RouteEndpoints } from "Components/router";
import { useNavigate } from "react-router-dom";
import { useLoading } from "Modules/hooks/useLoading";
import useWindowSize from "Modules/hooks/useWindowSize";
import { notification, Space } from "antd";
import { ManageReceiptRoute } from "Api";
import { AllocateModel } from "Components/Shared/Models/Allocate";
import { CreateReceiptReport } from "../ReceiptReport/CreateReceiptReport";
import { manageReceiptEndpoints } from "Components/router/routes";

export function MyAllocateReceipt() {
  const [page, setPage] = useState({
    pageNumber: 0,
    pageSize: 1000,
  });

  const [listAllocate, setListAllocate] = useState<AllocateModel[]>([]);
  const { user } = useAuth();
  const { setLoading } = useLoading();
  const navigate = useNavigate();
  const keyRef = useRef(0);
  const windowSize = useWindowSize();
  const [count, setCount] = useState(0)
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
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
  const getKey = () => {
    keyRef.current++;
    return keyRef.current;
  };

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  useEffect(() => {
    // console.log("useEffect")
    setLoading(true);
    fetch(
      process.env.REACT_APP_API.concat(ManageReceiptRoute.allocateReceipt),
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
        // console.log(">>>> res", res)
      })
      .then((data) => {
        // setListTmp(data.data)
        // console.log(">>>> data", data)
        const tmp: AllocateModel[] = data.data;
        setListAllocate(tmp.filter((item) => item.userId === user.userId));
      })
      .catch((error) => console.log(error))
      .finally(() => {
        setLoading(false);
      });
  }, [page.pageNumber, page.pageSize, count]);

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  const [isShowModal, setIsShowModal] = useState(false)
  const [dataAllocate, setDataAllocate] = useState<AllocateModel>()
  const onClickShowModal = (data: AllocateModel) => {
    console.log("onclickshowmodal", data);

    setIsShowModal(true)
    setDataAllocate(data)
  }
  const onClickHideModal = () => {
    setIsShowModal(false)
    setDataAllocate(null)
  }

  const onClickFinishModal = () => {
    setIsShowModal(false)
    setDataAllocate(null)
    setCount((pre) => pre + 1)
  }


  const AllocateColumn: ColumnsType<AllocateModel> = [
    { title: "Tên hóa đơn", dataIndex: "receiptName", key: 1 },
    { title: "Tên tài khoản", dataIndex: "userName", key: 2 },
    { title: "Tên mã hóa đơn", dataIndex: "codeName", key: 3 },
    { title: "Số mã hóa đơn", dataIndex: "codeNumber", key: 4 },
    { title: "Số lượng", dataIndex: "amount", key: 5 },
    { title: "Tổng số trang", dataIndex: "totalPage", key: 6 },
    { title: "Số trang còn lại", dataIndex: "remainPage", key: 7 },
    {
      title: "Xử lý",
      dataIndex: "",
      key: 8,
      render: (record) => (
        <>
          <Button
            type="link"
            onClick={() => onClickShowModal(record)}
            icon={<ArrowRightOutlined />}
          >
            Sử dụng hóa đơn
          </Button>

          <Button
            icon={<EyeOutlined />}
            type="link"
            onClick={() => {
              navigate(
                RouteEndpoints.receiptReportWithIdAllocate.replace(
                  ":id",
                  record.id
                )
              );
            }}
          >
            Xem chi tiết
          </Button>
        </>
      ),
    },
  ];

  const resColumns: ColumnsType<AllocateModel> = [
    {
      title: "Danh sách hóa đơn",
      key: getKey(),
      render: (record, key, index) => {
        return (
          <>
            <tr style={{ width: "100%" }}>
              <th style={{ width: "37%" }}>Tên hóa đơn :</th>
              <td>{record.receiptName}</td>
            </tr>
            <tr style={{ width: "100%" }}>
              <th style={{ width: "37%" }}>Tên tài khoản :</th>
              <td>{record.userName}</td>
            </tr>
            <tr style={{ width: "100%" }}>
              <th style={{ width: "37%" }}>Tên mã hóa đơn :</th>
              <td>{record.codeName}</td>
            </tr>
            <tr style={{ width: "100%" }}>
              <th style={{ width: "37%" }}>Số mã hóa đơn :</th>
              <td>{record.codeNumber}</td>
            </tr>
            <tr style={{ width: "100%" }}>
              <th style={{ width: "37%" }}>Số lượng :</th>
              <td>{record.amount}</td>
            </tr>
            <tr style={{ width: "100%" }}>
              <th style={{ width: "37%" }}>Tổng số trang :</th>
              <td>{record.totalPage}</td>
            </tr>
            <tr style={{ width: "100%" }}>
              <th style={{ width: "37%" }}>Số trang còn lại :</th>
              <td>{record.remainPage}</td>
            </tr>
            <tr>
              <th>Xử lý</th>
              <th>
                <Space>
                  <Button
                    type="link"
                    onClick={() => onClickShowModal(record)}
                    icon={<ArrowRightOutlined />}
                  >

                    Sử dụng hóa đơn
                  </Button>


                </Space>
              </th>
            </tr>
            <tr>
              <th></th>
              <th><Button
                icon={<EyeOutlined />}
                type="link"
                onClick={() => {
                  navigate(
                    RouteEndpoints.receiptReportWithIdAllocate.replace(
                      ":id",
                      record.id
                    )
                  );
                }}
              >
                Xem chi tiết
              </Button></th>
            </tr>
          </>
        );
      },
    },
  ];

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  return (
    <>
      {/* {console.log("list allocate >>>>>>>>> ", listAllocate)} */}
      <Table
        columns={windowSize.width > 768 ? AllocateColumn : resColumns}
        rowKey={"reportId"}
        dataSource={listAllocate}
      />

      {
        isShowModal && dataAllocate &&
        <CreateReceiptReport
          dataAllocate={dataAllocate}
          onClickHideModal={onClickHideModal}
          onClickFinishModal={onClickFinishModal}
        />
      }
    </>
  );
}
