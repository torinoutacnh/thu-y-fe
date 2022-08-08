import { useEffect } from "react";
import { Button, Input } from "antd";
import { useAuth } from "Modules/hooks/useAuth";
import { RouteEndpoints } from "Components/router";
import { useNavigate } from "react-router-dom";
import { useLoading } from "Modules/hooks/useLoading";
import { Form, notification } from "antd";
import { useParams } from "react-router-dom";
import { animalEndpoints } from "Components/router/routes";

const UpdateAllocate = () => {
  const { setLoading } = useLoading();
  const { user } = useAuth();
  const { id } = useParams();
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const page = {
    pageNumber: 0,
    pageSize: 1000,
    id: id,
  };
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  notification.config({
    placement: "topRight",
    bottom: 50,
    duration: 3,
    rtl: true,
    maxCount: 1000,
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
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  useEffect(() => {
    setLoading(true);
    fetch(process.env.REACT_APP_API.concat(RouteEndpoints.myAllocate), {
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
        console.log("data", data.data[0]);

        form.setFieldsValue({
          id: data.data[0].id,
          userId: data.data[0].userId,
          receiptId: data.data[0].receiptId,
          amount: data.data[0].amount,
          userName: data.data[0].userName,
          codeName: data.data[0].codeName,
          codeNumber: data.data[0].codeNumber,
          receiptName: data.data[0].receiptName,
        });
      })
      .catch((error) => console.log(error))
      .finally(() => {
        setLoading(false);
      });
  }, [page.pageSize, page.pageNumber]);
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  const onFinishUpdate = () => {
    console.log("update finish >>>> ", form.getFieldsValue());

    // setLoading(true);
    // fetch(process.env.REACT_APP_API.concat(AnimalApiRoute.update), {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //     Authorization: "Bearer ".concat(user.token),
    //   },
    //   body: JSON.stringify(form.getFieldsValue()),
    // })
    //   .then((res) => {
    //     return res.json();
    //     // console.log(">>>> res", res)
    //   })
    //   .then((data) => {

    //     navigate(RouteEndpoints.animal.basepath)
    //     openNotificationWithIcon(
    //       "success",
    //       "SUCCESS",
    //       `Cập nhật thông tin động vật thành công`
    //     );

    //   })
    //   .catch((error) => {
    //     console.log(error)
    //     openNotificationWithIcon(
    //       "error",
    //       "ERROR",
    //       `Cập nhật thông tin thất bại, vui lòng kiểm tra lại thông tin`
    //     );
    //     setLoading(false);
    //   })
  };
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  //
  return (
    <>
      {/* {console.log("update data >>>>>>>>", animalUpdate)} */}

      <Form id="update-animal-form" layout="vertical" form={form}>
        <Form.Item>
          <b>Cập nhật thông tin động vật</b>
        </Form.Item>
        <Form.Item
          label={"id"}
          name={"id"}
          rules={[
            {
              required: true,
              message: "Nhập số lượng",
              type: "string",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label={"userId"}
          name={"userId"}
          rules={[
            {
              required: true,
              message: "Nhập số lượng",
              type: "string",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label={"receiptId"}
          name={"receiptId"}
          rules={[
            {
              required: true,
              message: "Nhập số lượng",
              type: "string",
            },
          ]}
        >
          <Input />
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
          label={"Tên mã hóa đơn"}
          name={"codeName"}
          rules={[
            {
              required: true,
              message: "Nhập số lượng",
              type: "string",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label={"Số mã hóa đơn"}
          name={"codeNumber"}
          rules={[
            {
              required: true,
              message: "Nhập số lượng",
              type: "string",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Button
          type="primary"
          onClick={() => {
            navigate(animalEndpoints.home);
          }}
        >
          Quay lại
        </Button>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <Button type="primary" onClick={() => onFinishUpdate()}>
          Cập nhật
        </Button>
      </Form>
    </>
  );
};

export default UpdateAllocate;
