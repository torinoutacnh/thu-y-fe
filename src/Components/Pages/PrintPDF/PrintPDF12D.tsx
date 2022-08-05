import React, { useState, useEffect, useRef } from "react";
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Table, Button, Input, Descriptions, PageHeader } from "antd";
import AnimalApiRoute from "Api/AnimalApiRoute";
import { useAuth } from "Modules/hooks/useAuth";
import { ColumnsType } from "antd/lib/table";
import { RouteEndpoints } from "Components/router/MainRouter";
import { AnimalSexType } from "Components/Shared/Models/Animal";
import { Link, useNavigate } from "react-router-dom";
import { useLoading } from "Modules/hooks/useLoading";
import useWindowSize from "Modules/hooks/useWindowSize";
import { getKeyThenIncreaseKey } from "antd/lib/message";
import { AnimalModel } from "Components/Shared/Models/Animal";
import { PDFViewer } from "@react-pdf/renderer";
import { PDF12B } from "Components/Shared/Form/PDF/PDF12B";
import { Form, Checkbox, notification, Space, Row } from "antd";
import { ReportApiRoute } from "Api";
import { type } from "@testing-library/user-event/dist/type";
import { PDF12D } from "Components/Shared/Form/PDF/PDF12D";


// interface attributeModel {
//     attributeCode?: string;
//     attributeId?: string;
//     attributeName?: string;
//     formName?: string;
//     id?: string;
//     reportId?: string;
//     sort?: number;
//     value?: string;
// }

// interface DataPdfModel {
//     quyenso?: string;
//     khutrungtieudoc?: string;
//     noixuatphat?: string;
//     antoanvoicacbenh?: string;
//     dienthoai?: string;
//     diachigd?: string;
//     vatdunglienquan?: string;
//     fax?: string;
//     email?: string;
//     tenchuhang?: string;
//     nongdokhutrung?: string;
//     kqxetnghiemso?: string;
//     captai?: string;
//     noidecuoicung?: string;
//     giatridenngay?: string;
//     tennguoikiemdich?: string;
//     phuongtienvanchuyen?: string;
//     so?: string;
//     bienkiemsoat?: string;
//     ngayxetnghiem?: string;
//     ngaytiem2?: string;
//     tiembenh1?: string;
//     amtinhcacbenh?: string;
//     tiembenh2?: string;
//     noigiaohangkhac?: string;
//     coquanxetnghiem?: string;
//     soluonggiaohangkhac?: string;
//     ngaytiem1?: string;
// }

// interface listAnimalModel {
//     amount?: string;
//     animalId?: string;
//     animalName?: string;
//     animalSex?: number;
//     dayAge?: number;
//     id?: number;
//     isCar?: boolean;
//     reportTicketId?: string;
// }


// export type { DataPdfModel, listAnimalModel }

export function PrintPDF12D(props: any) {
    // const { user } = useAuth();
    // const { setLoading } = useLoading();
    // const navigate = useNavigate();
    // const keyRef = useRef(0);
    // const windowSize = useWindowSize();

    // const [listAtb, setListAtb] = useState<attributeModel[]>()
    // const [dataPdf, setDataPdf] = useState<DataPdfModel>()
    // const [isName, setIsName] = useState(false)
    // const [listAnimal, setListAnimal] = useState<AnimalModel[]>()
    // const [page, setPage] = useState({
    //     pageNumber: 0,
    //     pageSize: 1000,
    // });



    // const [AnimalReport, setAnimalReport] = useState<listAnimalModel[]>()

    // useEffect(() => {
    //     setLoading(true);
    //     fetch(process.env.REACT_APP_API.concat(AnimalApiRoute.getanimals), {
    //         method: "POST",
    //         headers: {
    //             "Content-Type": "application/json",
    //             Authorization: "Bearer ".concat(user.token),
    //         },
    //         body: JSON.stringify(page),
    //     })
    //         .then((res) => {
    //             return res.json();
    //             // console.log(">>>> res", res)
    //         })
    //         .then((data) => {
    //             setListAnimal(data.data);
    //             // console.log("arr animal >>>>>>> ", data.data)
    //         })
    //         .catch((error) => console.log(error))
    //         .finally(() => {
    //             setLoading(false);
    //         });
    // }, []);

    // useEffect(() => {
    //     setLoading(true);
    //     fetch(process.env.REACT_APP_API.concat(ReportApiRoute.getSingleReport, "?")
    //         + new URLSearchParams({ reportId: "4c7d5197-9bd9-4a9f-9011-9577294adc89" }), {
    //         method: "GET",
    //         headers: {
    //             "Content-Type": "application/json",
    //             Authorization: "Bearer ".concat(user.token),
    //         }
    //     })
    //         .then((res) => {
    //             return res.json();
    //             // console.log(">>>> res", res)
    //         })
    //         .then((data) => {
    //             setListAtb(data.data.values)
    //             setAnimalReport(data.data.listAnimals)
    //             console.log("report >>>>> ", data.data)
    //         })
    //         .catch((error) => console.log(error))
    //         .finally(() => {
    //             // setLoading(false);
    //         });
    // }, [])

    // useEffect(() => {
    //     if (listAtb) {
    //         // console.log("list >>>>> ", listAtb);
    //         const quyenso = listAtb.findIndex(item => item.attributeId === "98b11dd6-78ba-4adb-b6d1-d9ab014937eb")
    //         const khutrungtieudoc = listAtb.findIndex(item => item.attributeId === "80dfedf2-59d5-4d3b-9ccb-15cf34e35672")
    //         const noixuatphat = listAtb.findIndex(item => item.attributeId === "d15cfb89-e94b-4597-84ef-0645f7a5e775")
    //         const antoanvoicacbenh = listAtb.findIndex(item => item.attributeId === "3d077e86-40e7-48ae-9363-03d40aac747c")
    //         const dienthoai = listAtb.findIndex(item => item.attributeId === "f51aed38-6c7a-4872-8e5e-4d0d3b055c7f")
    //         const diachigd = listAtb.findIndex(item => item.attributeId === "46688937-502d-4f92-85ef-8b9ed275f03b")
    //         const vatdunglienquan = listAtb.findIndex(item => item.attributeId === "d5743079-f2b5-47d9-acbc-bf48c392f747")
    //         const fax = listAtb.findIndex(item => item.attributeId === "f9b83091-685d-4cf5-b242-7f83a6ada9e5")
    //         const email = listAtb.findIndex(item => item.attributeId === "fa00b3e6-138b-4dbd-ad59-3c3284f323fd")
    //         const tenchuhang = listAtb.findIndex(item => item.attributeId === "70c2ed0a-ef68-4e02-ad39-50796e972c6d")
    //         const nongdokhutrung = listAtb.findIndex(item => item.attributeId === "5d5f254c-10ed-4471-82f6-8c9c230a5148")
    //         const kqxetnghiemso = listAtb.findIndex(item => item.attributeId === "98d62adf-d9a4-458b-998a-1e87eb492936")
    //         const captai = listAtb.findIndex(item => item.attributeId === "5a97b504-7ed2-49c0-82df-067432b2afb6")
    //         const noidecuoicung = listAtb.findIndex(item => item.attributeId === "089bd45c-3bd3-4859-ab0a-94879627b230")
    //         const giatridenngay = listAtb.findIndex(item => item.attributeId === "b1add843-8765-46f0-a7d0-45f9df8bb214")
    //         const tennguoikiemdich = listAtb.findIndex(item => item.attributeId === "6aa0f6e9-3f1c-405c-9201-f9383a427576")
    //         const phuongtienvanchuyen = listAtb.findIndex(item => item.attributeId === "ff74f7gf76fwgtw643")
    //         const so = listAtb.findIndex(item => item.attributeId === "939e7f42-5c71-4fba-8069-a953c17d9e03")
    //         const bienkiemsoat = listAtb.findIndex(item => item.attributeId === "4e64e271-38f9-4f87-9c7a-c03df9fa6432")
    //         const ngayxetnghiem = listAtb.findIndex(item => item.attributeId === "lkjlk98dfg1gesd6456456adasd")
    //         const ngaytiem2 = listAtb.findIndex(item => item.attributeId === "lkjlkdasf098091esd6456456adasd")
    //         const tiembenh1 = listAtb.findIndex(item => item.attributeId === "123sadas1esd6456456adasd")
    //         const amtinhcacbenh = listAtb.findIndex(item => item.attributeId === "123sadas1esdadasd")
    //         const tiembenh2 = listAtb.findIndex(item => item.attributeId === "lkjlk98091esd6456456adasd")
    //         const noigiaohangkhac = listAtb.findIndex(item => item.attributeId === "lkjlk98dfg1esd6456456adasd")
    //         const coquanxetnghiem = listAtb.findIndex(item => item.attributeId === "lkjlk98dfg1ge6456456adasd")
    //         const soluonggiaohangkhac = listAtb.findIndex(item => item.attributeId === "lkjlk9809dfg1esd6456456adasd")
    //         const ngaytiem1 = listAtb.findIndex(item => item.attributeId === "lkjlkdasf1esd6456456adasd")


    //         const tmp: DataPdfModel = {
    //             quyenso: listAtb[quyenso].value,
    //             khutrungtieudoc: listAtb[khutrungtieudoc].value,
    //             noixuatphat: listAtb[noixuatphat].value,
    //             antoanvoicacbenh: listAtb[antoanvoicacbenh].value,
    //             dienthoai: listAtb[dienthoai].value,
    //             diachigd: listAtb[diachigd].value,
    //             vatdunglienquan: listAtb[vatdunglienquan].value,
    //             fax: listAtb[fax].value,
    //             email: listAtb[email].value,
    //             tenchuhang: listAtb[tenchuhang].value,
    //             nongdokhutrung: listAtb[nongdokhutrung].value,
    //             kqxetnghiemso: listAtb[kqxetnghiemso].value,
    //             captai: listAtb[captai].value,
    //             noidecuoicung: listAtb[noidecuoicung].value,
    //             giatridenngay: listAtb[giatridenngay].value,
    //             tennguoikiemdich: listAtb[tennguoikiemdich].value,
    //             phuongtienvanchuyen: listAtb[phuongtienvanchuyen].value,
    //             so: listAtb[so].value,
    //             bienkiemsoat: listAtb[bienkiemsoat].value,
    //             ngayxetnghiem: listAtb[ngayxetnghiem].value,
    //             ngaytiem2: listAtb[ngaytiem2].value,
    //             tiembenh1: listAtb[tiembenh1].value,
    //             amtinhcacbenh: listAtb[amtinhcacbenh].value,
    //             tiembenh2: listAtb[tiembenh2].value,
    //             noigiaohangkhac: listAtb[noigiaohangkhac].value,
    //             coquanxetnghiem: listAtb[coquanxetnghiem].value,
    //             soluonggiaohangkhac: listAtb[soluonggiaohangkhac].value,
    //             ngaytiem1: listAtb[ngaytiem1].value,
    //         }

    //         setDataPdf(tmp)
    //         // console.log("dataPdf >>>>>>> ", tmp)
    //         // setLoading(false)
    //     }

    // }, [listAtb])

    // useEffect(() => {
    //     if (listAnimal && AnimalReport) {

    //         AnimalReport.map((item, index) => {
    //             const ind = listAnimal.findIndex(i => i.id === item.animalId)
    //             item.animalName = listAnimal[ind].name
    //         })

    //         setIsName(true)
    //         // console.log("index  >>>>>>> ", AnimalReport);

    //     }
    // }, [AnimalReport, listAnimal])

    return (

        <>

            <Row align="middle" style={{ height: "100vh" }}>
                <PDFViewer width={"100%"} height={"100%"}>
                    <PDF12D />
                </PDFViewer>
            </Row>

        </>

    );



}
