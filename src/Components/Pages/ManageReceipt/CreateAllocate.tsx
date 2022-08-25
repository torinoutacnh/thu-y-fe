import { useEffect, useState } from "react";
import { Button, Input, AutoComplete, Col, Row, Space } from "antd";
import { useAuth } from "Modules/hooks/useAuth";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useLoading } from "Modules/hooks/useLoading";
import { Form, Modal, notification } from "antd";
import { ManageReceiptRoute, UserApiRoute } from "Api";
import { UserModel } from "Components/Shared/Models/User";
import { manageReceiptEndpoints } from "Components/router/routes";
import "./modal.scss"
import useWindowSize from "Modules/hooks/useWindowSize";

export interface usernameModel {
  value: string;
}

export interface IdModel {
  value: string;
  id: string;
  name: string;
}

export function CreateAllocate(props: any) {

  const { idReceipt, arrUser, arrId, codeName, codeNumber, receiptName, onClickHideModal } = props;

  // const [searchParams] = useSearchParams();
  // const idReceipt = searchParams.get("idReceipt");
  // const codeName = searchParams.get("codeName");
  // const codeNumber = searchParams.get("codeNumber");
  // const { arrUser, arrId } = props;

  const [TmpName, setTmpName] = useState("");
  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const navigate = useNavigate();
  const [form] = Form.useForm();
  const { user } = useAuth();
  const { setLoading } = useLoading();

  const [page, setPage] = useState({
    pageIndex: 0,
    pageNumber: 1000,
  });

  const [liststaff, setListStaff] = useState<UserModel[]>();
  const [listUsername, setListUsername] = useState<usernameModel[]>(arrUser);
  const [listId, setListId] = useState<IdModel[]>(arrId);

  useEffect(() => {
    if (liststaff) {
      const tmp = liststaff.map((item, index) => {
        return { value: item.account };
      });
      setListUsername(tmp);
      // console.log("listUsername >>>>>>>>>> ", listUsername)
    }
  }, [liststaff]);

  useEffect(() => {
    if (liststaff) {
      const tmp = liststaff.map((item, index) => {
        return { value: item.account, id: item.id, name: item.name };
      });
      setListId(tmp);
      // console.log("listId >>>>>>>>>> ", listId)
    }
  }, [liststaff]);

  // useEffect(() => {
  //   setLoading(true)
  //   fetch(
  //     process.env.REACT_APP_API.concat(UserApiRoute.getUser, "?") +
  //     new URLSearchParams(page as any),
  //     {
  //       method: "GET",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: "Bearer ".concat(user.token),
  //       },
  //     }
  //   )
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setListStaff(data.data);
  //     })
  //     .catch((error) => console.log(error))

  // }, [])


  notification.config({
    placement: "topRight",
    bottom: 50,
    duration: 3,
    rtl: true,
  });
  type NotificationType = "success" | "info" | "warning" | "error";
  const openNotificationWithIcon = (type: NotificationType, title: string) => {
    notification[type]({
      message: title,
    });
  };

  const onChangeAutoComplete = (value: any, data: any) => {
    const index = listId.findIndex((item) => item.value === value);

    if (index === -1) {
      setTmpName("không tìm thấy nhân viên")
    }
    else {
      const tmpdata: IdModel = listId[index]
      const tmp: string = tmpdata.name
      setTmpName(tmp)
    }

  }

  const CreateAllocateFinish = () => {

    const index = listId.findIndex(item => item.value === form.getFieldValue("userName"))
    const selectID = listId[index].id



    // const allocate = { ...form.getFieldsValue(), userId: selectID, id: "id" }
    const allocate = {

      id: "id",
      userId: selectID,
      receiptId: idReceipt,
      amount: form.getFieldValue("amount"),
      userName: form.getFieldValue("userName"),
      codeName: codeName,
      codeNumber: codeNumber,
      receiptName: form.getFieldValue("receiptName"),




    }


    console.log("allocate >>>>>>>> ", allocate)

    // console.log("list user >>>>>>>> ", listUsername)
    // console.log("list id >>>>>>>> ", listId)
    // console.log("select id >>>>>>>> ", selectID)

    if (user?.token) {
      setLoading(true)
      fetch(process.env.REACT_APP_API.concat(ManageReceiptRoute.createAllocateReceipt), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer ".concat(user.token),
        },
        body: JSON.stringify(allocate),
      })
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          console.log("create allocate ok >>>>>>> ", data)
          openNotificationWithIcon("success", "Cấp hóa đơn thành công")
          form.resetFields()
          navigate(manageReceiptEndpoints.basepath)
          onClickHideModal()
          setLoading(false)
        })
        .catch((error) => {
          console.log("create allocate not >>>>>>> ", error)
          openNotificationWithIcon("error", "Cấp hóa đơn thất bại")
          setLoading(false)
        })

    }

  }

  const windowSize = useWindowSize();

  return (
    <>

      <>
        <div className="modal-container" >
          <div className="modal-click-close" onClick={() => { onClickHideModal() }}></div>
          <div className="modal-body" style={{ width: windowSize.width > 768 ? "40%" : "90%" }}>
            <Row style={{}}>
              <Col xs={24} sm={6} md={3} lg={3}></Col>
              <Col xs={24} sm={12} md={16} lg={16}>
                <h3 style={{ textAlign: "center" }}>Tên hóa đơn: {codeName}</h3>
                <Form
                  id="create-allocate-form"
                  layout="vertical"
                  form={form}
                  onFinish={CreateAllocateFinish}
                >
                  {/* /////////////////////////////////////////// */}
                  <Form.Item
                    hidden={true}
                    label={"Mã hóa đơn"}
                    name={"receiptId"}
                    rules={[
                      {
                        required: true,

                        type: "string",
                      },
                    ]}
                    initialValue={idReceipt}
                  >
                    <Input disabled={true} />
                  </Form.Item>

                  <Form.Item
                    label={"Tên hóa đơn cấp phát"}
                    name={"receiptName"}
                    rules={[
                      {
                        required: true,
                        message: "Nhập số lượng",
                        type: "string",
                      },
                    ]}
                    initialValue={receiptName}
                    hidden={true}
                  >
                    <Input />
                  </Form.Item>

                  <Form.Item
                    label={"Tên tài khoản"}
                    name={"userName"}
                    rules={[
                      {
                        required: true,

                        type: "string",
                      },
                    ]}
                  >
                    <div>
                      <AutoComplete
                        options={listUsername}
                        placeholder="Nhập để tìm kiếm"
                        filterOption={(inputValue, option) =>
                          option?.value
                            .toUpperCase()
                            .indexOf(inputValue.toUpperCase()) !== -1
                        }
                        onChange={onChangeAutoComplete}
                      />
                    </div>
                  </Form.Item>

                  <Form.Item
                    name={"tmpName"}
                    rules={[
                      {
                        type: "string",
                      },
                    ]}
                  >
                    <span style={{ color: "gray" }}>Tên nhân viên: {TmpName}</span>
                  </Form.Item>

                  <Form.Item
                    label={"Số lượng"}
                    name={"amount"}
                    rules={[
                      {
                        required: true,
                        message: "Nhập số lượng",
                      },
                      {
                        message: "Bao gồm các số 0-9!",
                        pattern: new RegExp("[0-9]"),
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>

                  <Form.Item
                    hidden={true}
                    label={"Tên mã hóa đơn"}
                    name={"codeName"}
                    rules={[
                      {
                        required: true,
                        message: "Nhập số lượng",
                        type: "string",
                      },
                    ]}
                    initialValue={codeName}
                  >
                    <Input />
                  </Form.Item>

                  <Form.Item
                    hidden={true}
                    label={"Số mã hóa đơn"}
                    name={"codeNumber"}
                    rules={[
                      {
                        required: true,
                        message: "Nhập số lượng",
                        type: "string",
                      },
                    ]}
                    initialValue={codeNumber}
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item style={{ marginTop: "10px", }} >
                    <div style={{ display: "flex", justifyContent: "center", width: "100%" }}>
                      <Space>
                        <Button
                          onClick={() => { onClickHideModal() }}
                          danger
                        >
                          Huỷ bỏ
                        </Button>

                        <Button
                          form="create-allocate-form"
                          type="primary"
                          loading={confirmLoading}
                          htmlType="submit"
                        >
                          Thêm mới
                        </Button>

                      </Space>
                    </div>
                  </Form.Item>

                  {/* /////////////////////////////////////////// */}
                </Form>
              </Col>
              <Col xs={24} sm={6} md={3} lg={3}></Col>
            </Row>
          </div>
        </div>
      </>

    </>
  );
}
