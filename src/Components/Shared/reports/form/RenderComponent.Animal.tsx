import {
  Form,
  Space,
  Select,
  Input,
  Button,
  Radio,
  Checkbox,
  Row,
  Modal,
} from "antd";
import {
  MinusCircleOutlined,
  PlusOutlined,
  SaveOutlined,
} from "@ant-design/icons";
import {
  AnimalPaging,
  AnimalModel,
  CreateAnimalItemModel,
} from "Components/Shared/Models/Animal";
import React, { useEffect, useRef, useState } from "react";
import { AnimalApiRoute, ApiRoute, listAnimalApiRoute } from "Api";
import { useAuth } from "Modules/hooks/useAuth";
import { ReportModel } from "Components/Shared/Models/Form";
import { useLoading } from "Modules/hooks/useLoading";
import form, { FormInstance } from "antd/lib/form";

const AnimalFields = (props: {
  report?: ReportModel;
  mainFormRef: FormInstance<ReportModel>;
}) => {
  const { mainFormRef } = props;
  const [report, setReport] = useState<ReportModel>(props.report);
  const [searchAnimal, setSearchAnimal] = useState<AnimalPaging>({
    pageNumber: 0,
    pageSize: 200,
  });
  const [animals, setAnimals] = useState<AnimalModel[]>([]);
  const { user } = useAuth();
  const { setLoading } = useLoading();
  const [showAddAnimal, setShowAddAnimal] = useState<boolean>(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const keyRef = useRef(0);
  const getkey = () => {
    keyRef.current = keyRef.current + 1;
    return keyRef.current;
  };

  const [form] = Form.useForm<CreateAnimalItemModel>();
  const Cancel = () => {
    form.resetFields();
    setShowAddAnimal(false);
  };

  useEffect(() => {
    if (searchAnimal) {
      setLoading(true);
      fetch(process.env.REACT_APP_API.concat(AnimalApiRoute.getanimals), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer ".concat(user.token),
        },
        body: JSON.stringify(searchAnimal),
      })
        .then((res) => res.json())
        .then((data) => {
          setAnimals(data.data);
        })
        .catch((error) => console.log(error))
        .finally(() => setLoading(false));
    }
  }, [searchAnimal.pageNumber, searchAnimal.pageSize]);

  const AddAnimal = (add: any) => {
    const val = form.getFieldsValue();
    console.log(val);

    if (user) {
      setConfirmLoading(true);
      fetch(process.env.REACT_APP_API.concat(listAnimalApiRoute.create), {
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
          } else throw new Error(data.message);
        })
        .catch((error) => console.log(error))
        .finally(() => {
          setShowAddAnimal(false);
          setConfirmLoading(false);
          form.resetFields();
        });
    }
  };

  const deleteAnimalItem = (idx: number, remove: any) => {
    if (user) {
      setLoading(true);
      fetch(process.env.REACT_APP_API.concat(listAnimalApiRoute.delete), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer ".concat(user.token),
        },
        body: JSON.stringify({
          id: mainFormRef.getFieldValue("listAnimals")[idx].id,
        }),
      })
        .then((res) => {
          if (res.status >= 500) throw new Error("Lỗi hệ thống! Thử lại sau.");
          if (res.status >= 400)
            throw new Error(`${res.status} : ${res.statusText}`);
          return res.json();
        })
        .then((data) => {
          remove(idx);
        })
        .catch((error) => console.log(error))
        .finally(() => {
          setLoading(false);
        });
    }
  };

  const SaveAnimalList = () => {
    console.log(mainFormRef.getFieldsValue());
    if (user) {
      setLoading(true);
      fetch(process.env.REACT_APP_API.concat(listAnimalApiRoute.update), {
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
        })
        .catch((error) => console.log(error))
        .finally(() => {
          setLoading(false);
        });
    }
  };

  return <></>
  // return (
  //   <Form.Item
  //     label="Danh sách động vật"
  //     labelCol={{ span: 24 }}
  //     style={{ paddingRight: 30 }}
  //     shouldUpdate={(prevValues, curValues) =>
  //       prevValues.listAnimals !== curValues.listAnimals
  //     }
  //   >
  //     <Form.List name={"listAnimals"}>
  //       {(fields, { add, remove }) => {
  //         return (
  //           <>
  //             {fields.map((field) => (
  //               <Space
  //                 key={field.key}
  //                 style={{ display: "flex", marginBottom: 8 }}
  //                 align="baseline"
  //               >
  //                 <>
  //                   <Form.Item
  //                     key={getkey()}
  //                     {...field}
  //                     name={"id"}
  //                     hidden={true}
  //                   >
  //                     <Input />
  //                   </Form.Item>
  //                   <Form.Item
  //                     {...field}
  //                     key={getkey()}
  //                     label="Động vật"
  //                     style={{ width: 150 }}
  //                     name={[field.name, "animalId"]}
  //                     rules={[
  //                       {
  //                         required: true,
  //                         message: "Chọn loại động vật!",
  //                       },
  //                     ]}
  //                   >
  //                     <Select
  //                       onSelect={(obj) => {
  //                         const curval = mainFormRef.getFieldsValue();
  //                         curval.listAnimals[field.key].animalName =
  //                           animals.find((x) => x.id === obj).name;
  //                         mainFormRef.setFieldsValue(curval);
  //                       }}
  //                     >
  //                       {animals.map((item) => (
  //                         <Select.Option key={item.id} value={item.id}>
  //                           {item.name}
  //                         </Select.Option>
  //                       ))}
  //                     </Select>
  //                   </Form.Item>
  //                   <Form.Item
  //                     {...field}
  //                     key={getkey()}
  //                     name={[field.name, "animalName"]}
  //                     hidden
  //                   >
  //                     <Input />
  //                   </Form.Item>
  //                   <Form.Item
  //                     {...field}
  //                     key={getkey()}
  //                     label="Số lượng"
  //                     name={[field.name, "amount"]}
  //                     rules={[
  //                       {
  //                         required: true,
  //                         message: "Xin điền số lượng!",
  //                       },
  //                       {
  //                         type: "number",
  //                         transform(value) {
  //                           return parseFloat(value);
  //                         },
  //                         message: "Sai định dạng!",
  //                       },
  //                     ]}
  //                   >
  //                     <Input type={"number"} />
  //                   </Form.Item>
  //                   <Form.Item
  //                     {...field}
  //                     key={getkey()}
  //                     name={[field.name, "isCar"]}
  //                     initialValue={false}
  //                     valuePropName="checked"
  //                     label={"Xe"}
  //                   >
  //                     <Checkbox name="isCar" />
  //                   </Form.Item>
  //                   {report ? (
  //                     <Form.Item key={getkey()}>
  //                       <MinusCircleOutlined
  //                         onClick={() => deleteAnimalItem(field.name, remove)}
  //                       />
  //                     </Form.Item>
  //                   ) : (
  //                     <Form.Item key={getkey()}>
  //                       <MinusCircleOutlined
  //                         onClick={() => remove(field.name)}
  //                       />
  //                     </Form.Item>
  //                   )}
  //                 </>
  //               </Space>
  //             ))}

  //             <Form.Item>
  //               {report ? (
  //                 <>
  //                   <Button
  //                     type="dashed"
  //                     onClick={() => setShowAddAnimal(true)}
  //                     block
  //                     icon={<PlusOutlined />}
  //                   >
  //                     Thêm động vật
  //                   </Button>
  //                   <Modal
  //                     title="Thêm động vật"
  //                     visible={showAddAnimal}
  //                     onCancel={Cancel}
  //                     footer={
  //                       <>
  //                         <Button
  //                           type="default"
  //                           htmlType="button"
  //                           onClick={Cancel}
  //                         >
  //                           Hủy bỏ
  //                         </Button>
  //                         <Button
  //                           form="create-animal-form"
  //                           type="primary"
  //                           loading={confirmLoading}
  //                           htmlType="submit"
  //                         >
  //                           Thêm mới
  //                         </Button>
  //                       </>
  //                     }
  //                   >
  //                     <Form
  //                       id="create-animal-form"
  //                       layout="vertical"
  //                       form={form}
  //                       onFinish={() => {
  //                         AddAnimal(add);
  //                       }}
  //                       disabled={confirmLoading}
  //                     >
  //                       <Form.Item
  //                         name={"reportTicketId"}
  //                         initialValue={report.id}
  //                         hidden={true}
  //                       >
  //                         <Input />
  //                       </Form.Item>
  //                       <Form.Item
  //                         name={"id"}
  //                         hidden={true}
  //                         initialValue={null}
  //                       >
  //                         <Input />
  //                       </Form.Item>
  //                       <Form.Item
  //                         label={"Động vật"}
  //                         name={"animalId"}
  //                         rules={[
  //                           {
  //                             required: true,
  //                             message: "Chọn động vật!",
  //                           },
  //                         ]}
  //                       >
  //                         <Select
  //                           onSelect={(obj) => {
  //                             const curval = form.getFieldsValue();
  //                             curval.animalName = animals.find(
  //                               (x) => x.id === obj
  //                             ).name;
  //                             form.setFieldsValue(curval);
  //                           }}
  //                         >
  //                           {animals.map((item) => (
  //                             <Select.Option key={item.id} value={item.id}>
  //                               {item.name}
  //                             </Select.Option>
  //                           ))}
  //                         </Select>
  //                       </Form.Item>
  //                       <Form.Item name={"animalName"} hidden={true}>
  //                         <Input />
  //                       </Form.Item>
  //                       <Form.Item
  //                         label={"Số lượng"}
  //                         name={"amount"}
  //                         rules={[
  //                           {
  //                             required: true,
  //                             message: "Xin điền số lượng!",
  //                           },
  //                           {
  //                             type: "number",
  //                             transform(value) {
  //                               return parseFloat(value);
  //                             },
  //                             message: "Sai định dạng!",
  //                           },
  //                         ]}
  //                       >
  //                         <Input type={"number"} />
  //                       </Form.Item>
  //                       <Form.Item
  //                         label={"Đơn vị"}
  //                         name={"isCar"}
  //                         initialValue={false}
  //                         valuePropName="checked"
  //                       >
  //                         <Checkbox name="isCar">Xe</Checkbox>
  //                       </Form.Item>
  //                     </Form>
  //                   </Modal>
  //                   <Button
  //                     type="primary"
  //                     style={{ marginTop: 20 }}
  //                     onClick={SaveAnimalList}
  //                     block
  //                     icon={<SaveOutlined />}
  //                   >
  //                     Lưu danh sách động vật
  //                   </Button>
  //                 </>
  //               ) : (
  //                 <Button
  //                   type="dashed"
  //                   onClick={() => add()}
  //                   block
  //                   icon={<PlusOutlined />}
  //                 >
  //                   Thêm động vật
  //                 </Button>
  //               )}
  //             </Form.Item>
  //           </>
  //         );
  //       }}
  //     </Form.List>
  //   </Form.Item>
  // );
};

export { AnimalFields };
