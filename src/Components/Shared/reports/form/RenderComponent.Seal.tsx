import {
  Form,
  Space,
  Select,
  Input,
  Button,
  Modal,
  FormListFieldData,
} from "antd";
import {
  MinusCircleOutlined,
  PlusOutlined,
  SaveOutlined,
} from "@ant-design/icons";
import React, { useEffect, useRef, useState } from "react";
import { ApiRoute, ManageReceiptRoute, SealTabApiRoute } from "Api";
import { useAuth } from "Modules/hooks/useAuth";
import { ReportModel, SealValueModel } from "Components/Shared/Models/Form";
import { useLoading } from "Modules/hooks/useLoading";
import { SealModel, UpdateSealTabModel } from "Components/Shared/Models/Seal";
import { AnimalModel } from "Components/Shared/Models/Animal";
import { FormInstance, FormListProps } from "antd/lib/form";
import { AllocateModel } from "Components/Shared/Models/Allocate";
import notification, { IconType } from "antd/lib/notification";

const SealFields = (props: {
  mainFormRef: FormInstance;
  report?: ReportModel;
  getSeal?: any
}) => {
  const { mainFormRef } = props;
  const [report, setReport] = useState<ReportModel>(props.report);
  // const [seals, setSeals] = useState<SealModel[]>([]);
  const { user } = useAuth();
  const { setLoading } = useLoading();
  const [showAddSeal, setShowAddSeal] = useState<boolean>(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const keyRef = useRef(0);

  const getKey = () => {
    keyRef.current = keyRef.current + 1;
    return keyRef.current;
  };

  const [page, setPage] = useState({
    pageNumber: 0,
    pageSize: 1000,
  });
  const [seals, setListAllocate] = useState<AllocateModel[]>([]);

  const [form] = Form.useForm<SealModel>();
  const Cancel = () => {
    form.resetFields();
    setShowAddSeal(false);
  };

  const openNotification = (
    message: string,
    type: IconType,
    onClose?: any,
    body?: string
  ) => {
    notification.open({
      duration: 2.5,
      message: message,
      description: body,
      type: type,
      onClose: onClose,
    });
  };

  const AddSeal = (add: any) => {
    const val = form.getFieldsValue();
    const tmp = seals.filter(i => i.receiptName === val.sealName)[0]

    if (val.amount > tmp.remainPage) {
      openNotification("Số lượng vé còn lại không đủ", "error")
      return
    }
    val.sealCode = tmp.codeName

    console.log("val", val);
    return

    if (user) {
      setConfirmLoading(true);
      fetch(process.env.REACT_APP_API.concat(SealTabApiRoute.create), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer ".concat(user.token),
        },
        body: JSON.stringify(val),
      })
        .then((res) => {
          if (res.status >= 500) throw new Error("Lỗi hệ thống! Thử lại sau.");
          if (res.status >= 400)
            throw new Error(`${res.status} : ${res.statusText}`);
          return res.json();
        })
        .then((data) => {
          if (data.data) {
            val.id = data.data;
            add(val);
            openNotification("Thêm vé thành công!", "error")
          } else throw new Error(data.message);
        })
        .catch((error) => console.log("error", error))
        .finally(() => {
          setShowAddSeal(false);
          setConfirmLoading(false);
          form.resetFields();
        });
    }
  };

  const deleteTag = (idx: number, remove: any) => {
    if (user) {
      setLoading(true);
      fetch(process.env.REACT_APP_API.concat(SealTabApiRoute.delete), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer ".concat(user.token),
        },
        body: JSON.stringify({
          id: mainFormRef.getFieldValue("sealTabs")[idx].id,
        }),
      })
        .then((res) => {
          if (res.status >= 500) throw new Error("Lỗi hệ thống! Thử lại sau.");
          if (res.status >= 400)
            throw new Error(`${res.status} : ${res.statusText}`);
          return res.json();
        })
        .then((data) => {
          console.log(data);
          remove(idx);
        })
        .catch((error) => console.log(error))
        .finally(() => {
          setLoading(false);
        });
    }
  };

  const SaveSealTab = () => {
    if (user) {
      setLoading(true);
      fetch(process.env.REACT_APP_API.concat(SealTabApiRoute.update), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer ".concat(user.token),
        },
        body: JSON.stringify(mainFormRef.getFieldsValue()),
      })
        .then((res) => {
          if (res.status >= 500) throw new Error("Lỗi hệ thống! Thử lại sau.");
          if (res.status >= 400)
            throw new Error(`${res.status} : ${res.statusText}`);
          return res.json();
        })
        .then((data) => {
          console.log(data);
          openNotification("Đã lưu thông tin vé", "success")
        })
        .catch((error) => console.log(error))
        .finally(() => {
          setLoading(false);
        });
    }
  };

  // useEffect(() => {
  //   if (user) {
  //     setLoading;
  //     true;
  //     fetch(process.env.REACT_APP_API.concat(ApiRoute.getseals), {
  //       method: "GET",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: "Bearer ".concat(user.token),
  //       },
  //     })
  //       .then((res) => res.json())
  //       .then((data) => {
  //         setSeals(data.data);
  //       })
  //       .catch((error) => console.log(error))
  //       .finally(() => setLoading(false));
  //   }
  // }, [user.token, user.userId]);

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
      })
      .then((data) => {
        const tmp: AllocateModel[] = data.data;
        setListAllocate(tmp.filter((item) => item.userId === user.userId));
      })
      .catch((error) => console.log(error))
      .finally(() => {
        setLoading(false);
      });
  }, [page.pageNumber, page.pageSize]);


  const handleChange = (value: string) => {
    console.log("tmp", seals.filter(i => i.receiptName == value)[0].codeName);
  };

  return (
    <>
      <Form.Item
        label="Danh sách vé"
        labelCol={{ span: 24 }}
        style={{ paddingRight: 30 }}
        shouldUpdate={(prevValues, curValues) =>
          prevValues.sealTabs !== curValues.sealTabs
        }
      >
        <Form.List name={"sealTabs"}>
          {(fields, { add, remove }) => {
            return (
              <>
                {fields.map((field) => (
                  <Space
                    key={field.key}
                    style={{ display: "flex", marginBottom: 8 }}
                    align="baseline"
                  >
                    <>
                      <Form.Item
                        key={getKey()}
                        {...field}
                        name={"id"}
                        hidden={true}
                      >
                        <Input />
                      </Form.Item>

                      <Form.Item
                        {...field}
                        label="Loại vé"
                        key={getKey()}
                        name={[field.name, "sealName"]}
                        rules={[
                          {
                            required: true,
                            message: "Mời chọn loại vé!",
                          },
                        ]}
                      >
                        <Select style={{ width: 200 }}
                          onChange={handleChange}
                        >
                          {seals.map((item) => (
                            <Select.Option key={item.id} value={item.receiptName}>
                              {item.receiptName}
                            </Select.Option>
                          ))}
                        </Select>
                      </Form.Item>

                      <Form.Item
                        {...field}
                        label={"Số lượng"}
                        name={[field.name, "amount"]}
                        rules={[
                          {
                            required: true,
                            message: "Nhập số lượng!",
                          },
                          {
                            message: "Số lượng không đúng định dạng!",
                            pattern: new RegExp("([0-9])"),
                          },
                        ]}
                      >
                        <Input />
                      </Form.Item>

                      <Form.Item
                        {...field}
                        label="Mã vé"
                        key={getKey()}
                        name={[field.name, "sealCode"]}
                        // rules={[
                        //   {
                        //     required: true,
                        //     message: "Hãy điền mã vé!",
                        //   },
                        // ]}
                        hidden={true}
                      >
                        <Input />
                      </Form.Item>

                      {report ? (
                        <MinusCircleOutlined
                          onClick={() => deleteTag(field.name, remove)}
                        />
                      ) : (
                        <MinusCircleOutlined onClick={() => remove(field.name)} />
                      )}
                    </>
                  </Space>
                ))}

                <Form.Item>
                  {report ? (
                    <>
                      <Button
                        type="dashed"
                        onClick={() => { setShowAddSeal(true); props.getSeal(seals) }}
                        block
                        icon={<PlusOutlined />}
                      >
                        Thêm vé
                      </Button>
                      <Modal
                        title="Thêm vé"
                        visible={showAddSeal}
                        onCancel={Cancel}
                        footer={
                          <>
                            <Button
                              type="default"
                              htmlType="button"
                              onClick={Cancel}
                            >
                              Hủy bỏ
                            </Button>
                            <Button
                              form="create-seal-form"
                              type="primary"
                              loading={confirmLoading}
                              htmlType="submit"
                            >
                              Thêm mới
                            </Button>
                          </>
                        }
                      >
                        <Form
                          id="create-seal-form"
                          layout="vertical"
                          form={form}
                          onFinish={() => {
                            AddSeal(add);
                          }}
                          disabled={confirmLoading}
                        >
                          <Form.Item
                            name={"reportTicketId"}
                            initialValue={report.id}
                            hidden={true}
                          >
                            <Input />
                          </Form.Item>
                          <Form.Item name={"id"} hidden={true}>
                            <Input />
                          </Form.Item>
                          <Form.Item
                            label={"Loại vé"}
                            name={"sealName"}
                            rules={[
                              {
                                required: true,
                                message: "Chọn loại vé!",
                              },
                            ]}
                          >
                            <Select>
                              {seals.map((item) => (
                                <Select.Option
                                  key={item.id}
                                  value={item.receiptName}
                                >
                                  {item.receiptName}
                                </Select.Option>
                              ))}
                            </Select>
                          </Form.Item>
                          <Form.Item
                            label={"Mã vé"}
                            name={"sealCode"}
                            // rules={[
                            //   {
                            //     required: true,
                            //     message: "Nhập mã vé!",
                            //     type: "string",
                            //   },
                            // ]}
                            hidden={true}
                          >
                            <Input />
                          </Form.Item>

                          <Form.Item
                            label={"Số lượng"}
                            name={"amount"}
                            rules={[
                              {
                                required: true,
                                message: "Nhập số lượng!",
                              },
                              {
                                message: "Số lượng không đúng định dạng!",
                                pattern: new RegExp("([0-9])"),
                              },
                            ]}
                          >
                            <Input />
                          </Form.Item>


                        </Form>
                      </Modal>
                      <Button
                        type="primary"
                        style={{ marginTop: 20 }}
                        onClick={SaveSealTab}
                        block
                        icon={<SaveOutlined />}
                      >
                        Lưu thông tin vé
                      </Button>
                    </>
                  ) : (
                    <Button
                      type="dashed"
                      onClick={() => { add(); props.getSeal(seals) }}
                      block
                      icon={<PlusOutlined />}
                    >
                      Thêm vé
                    </Button>
                  )}
                </Form.Item>
              </>
            );
          }}
        </Form.List>
      </Form.Item>
    </>
  );
};

export { SealFields };
