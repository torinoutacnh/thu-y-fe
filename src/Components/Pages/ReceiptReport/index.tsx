import { useState, useEffect, useRef } from "react";
import { Table } from "antd";
import { useAuth } from "Modules/hooks/useAuth";
import { ColumnsType } from "antd/lib/table";
import { useLoading } from "Modules/hooks/useLoading";
import useWindowSize from "Modules/hooks/useWindowSize";
import { useParams } from "react-router-dom";
import { notification } from "antd";
import { ManageReceiptRoute } from "Api";
import { ReceiptReportModel } from "Components/Shared/Models/Receipt";

const ReceiptReportIndex = () => {
  const { id } = useParams();

  console.log("id >>>>", id);

  const [listRR, setListRR] = useState<ReceiptReportModel[]>([]);
  const { user } = useAuth();
  const { setLoading } = useLoading();
  const keyRef = useRef(0);
  const windowSize = useWindowSize();
  const [page, setPage] = useState({
    pageNumber: 0,
    pageSize: 10000,
    allocateId: id,
  });

  const getKey = () => {
    keyRef.current++;
    return keyRef.current;
  };
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  useEffect(() => {
    setLoading(true);
    fetch(process.env.REACT_APP_API.concat(ManageReceiptRoute.receiptReport), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer ".concat(user.token),
      },
      body: JSON.stringify(page),
    })
      .then((res) => {
        return res.json();
        // console.log(">>>> res", res)
      })
      .then((data) => {
        setListRR(data.data);
        // console.log(">>>> data",data)
      })
      .catch((error) => console.log(error))
      .finally(() => {
        setLoading(false);
      });
  }, [page.pageNumber, page.pageSize]);
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  const ReceiptReportColumn: ColumnsType<ReceiptReportModel> = [
    { title: "Tên hóa đơn", dataIndex: "receiptName", key: 1 },
    { title: "Tên tài khoản", dataIndex: "userName", key: 2 },
    { title: "Số trang sử dụng", dataIndex: "pageUse", key: 3 },
    { title: "Ngày sử dụng", dataIndex: "dateUse", key: 4 },

    // {
    //     title: "Xử lý",
    //     dataIndex: "",
    //     key: 8,
    //     render: (record) => (
    //         <>

    //             <Button
    //                 type="link"

    //                 // onClick={() => deleteAnimalHandler(record.id, record.name)}
    //                 icon={<ArrowRightOutlined />}
    //             >
    //                 <CreateReceiptReport
    //                     userId={record.userId}
    //                     userName={record.userName}
    //                     receiptAllocateId={record.id}
    //                     codeName={record.codeName}
    //                     codeNumber={record.codeNumber}
    //                 />
    //             </Button>

    //             <Button
    //                 icon={<EyeOutlined />}
    //                 type="link"
    //                 onClick={() => { navigate(RouteEndpoints.receiptReportWithIdAllocate.replace(":id", record.id)) }}>
    //                 Xem chi tiết
    //             </Button>

    //         </>
    //     ),
    // },
  ];

  const resColumns: ColumnsType<ReceiptReportModel> = [
    {
      title: "Chi tiết hóa đơn",
      key: getKey(),
      render: (record, key, index) => {
        return (
          <>
            <tr>
              <th>Tên hóa đơn :</th>
              <td>{record.receiptName}</td>
            </tr>
            <tr>
              <th>Tên tài khoản :</th>
              <td>{record.userName}</td>
            </tr>
            <tr>
              <th>Số trang sử dụng :</th>
              <td>{record.pageUse}</td>
            </tr>
            <tr>
              <th>Ngày sử dụng :</th>
              <td>{record.dateUse}</td>
            </tr>

            {/* <tr>
                        <Space>

                            <Button
                                type="link"
                                danger
                                //   onClick={() => deleteAnimalHandler(record.id, record.name)}
                                icon={<ArrowRightOutlined />}
                            >
                                <CreateReceiptReport
                                    userId={record.userId}
                                    userName={record.userName}
                                    receiptAllocateId={record.id}
                                    codeName={record.codeName}
                                    codeNumber={record.codeNumber}
                                />
                            </Button>

                            <Button
                                icon={<EyeOutlined />}
                                type="link"
                                onClick={() => { navigate(RouteEndpoints.receiptReportWithIdAllocate.replace(":id", record.id)) }}>
                                Xem chi tiết
                            </Button>
                        </Space>
                    </tr> */}
          </>
        );
      },
    },
  ];

  ////////////////////////////////////////////NOTIFICATION//////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
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

  /////////////////////////////////////////DELETE ANIMAL/////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  // const deleteAnimalHandler = (idAnimal: string, name: string) => {
  //   // setLoading(true);
  //   const animalDelete = {
  //     id: idAnimal,
  //   };

  //   setLoading(true);
  //   fetch(process.env.REACT_APP_API.concat(AnimalApiRoute.delete), {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: "Bearer ".concat(user.token),
  //     },
  //     body: JSON.stringify(animalDelete),
  //   })
  //     .then((res) => {
  //       return res.json();
  //       // console.log(">>>> res", res)
  //     })
  //     .then((data) => {
  //       // setListAnimal(data.data)
  //       openNotificationWithIcon(
  //         "success",
  //         "Xóa động vật",
  //         `Xóa ${name} thành công`
  //       );
  //       // toast.success("Xóa thành công");
  //       console.log(">>>> Delete animal ok");

  //       setPage({ ...page, pageSize: page.pageSize - 1 });
  //     })
  //     .catch((error) => {
  //       console.log(">>>> Delete error");
  //       openNotificationWithIcon(
  //         "error",
  //         "Xóa động vật",
  //         "Xóa động vật thất bại"
  //       );
  //     });
  // };

  /////////////////////////////////////////Update after create/////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  // const UpdateAnimalAfterCreate = () => {
  //   setPage({ ...page, pageSize: page.pageSize - 1 });
  // }

  //////////////////////////////////////////////////// RENDER //////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  return (
    <>
      {console.log("receipt report >>>>> ", listRR)}

      <Table
        columns={windowSize.width > 768 ? ReceiptReportColumn : resColumns}
        rowKey={"reportId"}
        dataSource={listRR}
      />
    </>
  );
};

export default ReceiptReportIndex;
