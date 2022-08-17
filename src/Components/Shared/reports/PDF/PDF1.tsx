import React from "react";
import {
    Document,
    Page,
    Text,
    View,
    StyleSheet,
    Image,
    Font
} from "@react-pdf/renderer";
import { ReportModel } from "Components/Shared/Models/Form";
import { PDFModel } from "./mapper/map-report";
import { ToVietnamese } from "./ConvertNumberToVietnamese";
import { getDateCurrent } from "Utils/DateTimeUtils";

Font.register({
    family: "NotoSerif",
    fonts: [
        { src: require("./font/NotoSerif-Regular.ttf") }, // font-style: normal, font-weight: normal
        { src: require("./font/NotoSerif-Italic.ttf"), fontStyle: 'italic' },
        { src: require("./font/NotoSerif-Bold.ttf"), fontStyle: 'bold' },
        { src: require("./font/NotoSerif-BoldItalic.ttf"), fontStyle: 'boldItalic' },
    ]
});

const styles = StyleSheet.create({
    body: {
        fontFamily: "NotoSerif",
        paddingHorizontal: 35,
        fontWeight: 300,
        margin: "99.5 -10 0 -9",
        fontSize: 10,
        lineHeight: 1.2,
    },

    text: {
        margin: 12,
        fontSize: 12,
        textAlign: "justify",
        fontFamily: "Times-Roman",
    },

    pageNumber: {
        position: "absolute",
        fontSize: 12,
        bottom: 30,
        left: 0,
        right: 0,
        textAlign: "center",
        color: "grey",
    },

    borderColor: {
        color: "white"
    },

    col36: {
        width: "36%",
        height: "13mm",
        fontSize: 9,
        border: "1px solid borderColor",
        padding: "10px",
        fontStyle: "bold",
    },

    col14: {
        width: "14%",
        height: "13mm",
        fontSize: 9,
        border: "1px solid borderColor",
        fontStyle: "bold",
        color: "black"
    },

    col10: {
        width: "10%",
        height: "13mm",
        fontSize: 9,
        border: "1px solid borderColor",
        fontStyle: "bold",
        color: "black"
    },

    col20: {
        width: "20%",
        height: "13mm",
        fontSize: 9,
        border: "1px solid borderColor",
        fontStyle: "bold",
        color: "black"
    },

    colBody36: {
        width: "36%",
        height: "6.5mm",
        fontSize: 8,
        border: "none",        
        justifyContent: "center",
        padding: "3px 0",
    },

    colBody14: {
        width: "14%",
        height: "6.5mm",
        fontSize: 8,
        border: "none",
        padding: "3px 0 3px 14px",
    },

    colBody10: {
        width: "10%",
        height: "6.5mm",
        fontSize: 8,
        border: "none",
        padding: "3px 0 3px 15px",
    },

    colBody20_hp1: {
        width: "10%",
        height: "6.5mm",
        fontSize: 8,
        border: "none",
        padding: "3px 0 3px 13px",
    },

    colBody20_hp2: {
        width: "10%",
        height: "6.5mm",
        fontSize: 8,
        border: "none",
        padding: "3px 0 3px 18px",
    },

    colBody20: {
        width: "20%",
        height: "6.5mm",
        fontSize: 8,
        border: "none",
        padding: "3px 0 3px 30px",
    },

    col31_6: {
        width: "31.66%",
        height: "6.5mm",
        fontSize: 8,
        border: "none",        
        justifyContent: "center",
        padding: "3px 0",
    },

    col20_5: {
        width: "20.55%",
        height: "6.5mm",
        fontSize: 8,
        border: "none",
        padding: "3px 0 3px 15px",
    },

    col12_7: {
        width: "12.79%",
        height: "6.5mm",
        fontSize: 8,
        border: "none",
        padding: "3px 0 3px 10px",
    },

    col15: {
        width: "15%",
        height: "6.5mm",
        fontSize: 8,
        border: "none",
        padding: "3px 0 3px 20px",
    },

    col52_2: {
        width: "52.2%",
        height: "6.5mm",
        fontSize: 8,
        border: "1px solid borderColor",
        padding: "3px 0",
    },

    table: {
        width: "100%",
        textAlign: "center"
    },

    row_header: {
        display: 'flex',
        flexDirection: 'row',
        borderTop: '1px solid white',
        alignItems: "center",
        justifyContent: "center"
    },

    row_body: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: "center",
        justifyContent: "center"
    },

    header: {
        borderTop: 'none',
      },

    bold: {
        fontWeight: 'bold',
    },
});

// Create Document Component
const PDF1 = (props: { report: ReportModel }) => {
    const { report } = props;
    const pdf = PDFModel(report);

    const year_ngaycapcmnd = pdf.attrs[5].value.slice(0,4)
    const month_ngaycapcmnd = pdf.attrs[5].value.slice(5,7)
    const day_ngaycapcmnd = pdf.attrs[5].value.slice(8,10)

    const year_ngayquyetdinh = pdf.attrs[19].value.slice(0,4)
    const month_ngayquyetdinh = pdf.attrs[19].value.slice(5,7)
    const day_ngayquyetdinh = pdf.attrs[19].value.slice(8,10)

    const year_ngayxetnghiem1 = pdf.attrs[23].value.slice(0, 4)
    const month_ngayxetnghiem1 = pdf.attrs[23].value.slice(5, 7)
    const day_ngayxetnghiem1 = pdf.attrs[23].value.slice(8, 10)

    const year_ngayxetnghiem2 = pdf.attrs[26].value.slice(0, 4)
    const month_ngayxetnghiem2 = pdf.attrs[26].value.slice(5, 7)
    const day_ngayxetnghiem2 = pdf.attrs[26].value.slice(8, 10)

    const year_ngaytiem1 = pdf.attrs[28].value.slice(0, 4)
    const month_ngaytiem1 = pdf.attrs[28].value.slice(5, 7)
    const day_ngaytiem1 = pdf.attrs[28].value.slice(8, 10)

    const year_ngaytiem2 = pdf.attrs[30].value.slice(0, 4)
    const month_ngaytiem2 = pdf.attrs[30].value.slice(5, 7)
    const day_ngaytiem2 = pdf.attrs[30].value.slice(8, 10)

    const year_ngayxetnghiemvsty = pdf.attrs[37].value.slice(0, 4)
    const month_ngayxetnghiemvsty = pdf.attrs[37].value.slice(5, 7)
    const day_ngayxetnghiemvsty = pdf.attrs[37].value.slice(8, 10)

    const year_ngaykiemdich = pdf.attrs[60].value.slice(0, 4)
    const month_ngaykiemdich = pdf.attrs[60].value.slice(5, 7)
    const day_ngaykiemdich = pdf.attrs[60].value.slice(8, 10)

    const year_ngayvaosodk = pdf.attrs[62].value.slice(0, 4)
    const month_ngayvaosodk = pdf.attrs[62].value.slice(5, 7)
    const day_ngayvaosodk = pdf.attrs[62].value.slice(8, 10)

    const tmp = getDateCurrent()
    const arrDate = tmp.split("-")

    const tinhbiet = pdf.attrs[13].value?.split("/")
    const quyetdinh = pdf.attrs[18].value?.split("/")
    const xetnghiem1 = pdf.attrs[22].value?.split("/")
    const xetnghiem2 = pdf.attrs[25].value?.split("/")
    const xetnghiemvsty = pdf.attrs[36].value?.split("/")

    return (
        <Document>
        <Page style={styles.body}>

            <View style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", justifyContent: "center" }}>
                <Text style={{ width: "9%", opacity: 0 }}>
                    {`Kính gửi: `}
                </Text>
                <Text style={{ width: "59%" , fontSize: 8, maxLines: 1, textOverflow: "ellipsis" }}>
                    {pdf.attrs[1].value}
                </Text>
            </View>

            <View style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}>
                <Text style={{ width: "37%", opacity: 0 }}>
                    {`Họ tên chủ hàng (hoặc người đại diện): `}
                </Text>
                <Text style={{ fontSize: 8, maxWidth: "63%", maxLines: 1, textOverflow: "ellipsis" }}>
                    {pdf.attrs[2].value}
                </Text>
            </View>

            <View style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", marginTop: 0.5 }}>
                <Text style={{ width: "18%", opacity: 0 }}>
                    {`Địa chỉ giao dịch: `}
                </Text>
                <Text style={{ fontSize: 8, maxWidth: "82%", maxLines: 1, textOverflow: "ellipsis" }}>
                    {pdf.attrs[3].value}
                </Text>
            </View>

            <View style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}>
                <Text style={{ width: "25%", opacity: 0 }}>
                    {`Chứng minh nhân dân số: `}
                </Text>
                <Text style={{ fontSize: 9, width: "28%", maxLines: 1, textOverflow: "ellipsis" }}>
                    {pdf.attrs[4].value}
                </Text>
                <Text style={{ width: "12%", opacity: 0 }}>
                    {`Cấp ngày `}
                </Text>
                <Text style={{ fontSize: 9, width: "3%", textAlign: "center" }}>
                    {` ${day_ngaycapcmnd} `}
                </Text>
                <Text style={{ fontSize: 9, width: "5%", textAlign: "center" }}>
                    {` ${month_ngaycapcmnd} `}
                </Text>
                <Text style={{ fontSize: 9, width: "5%", textAlign: "center" }}>
                    {` ${year_ngaycapcmnd} `}
                </Text>
                <Text style={{ width: "5%", opacity: 0 }}>
                    {`tại `}
                </Text>
                <Text style={{ fontSize: 8, maxWidth: "17%", marginTop: 0.5, maxLines: 1, textOverflow: "ellipsis" }}>
                    {pdf.attrs[6].value}
                </Text>
            </View>

            <View style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", marginTop: 0.5 }}>
                <Text style={{ width: "12%", opacity: 0 }}>
                    {`Điện thoại: `}
                </Text>
                <Text style={{ width: "26%" , fontSize: 9, maxLines: 1, textOverflow: "ellipsis" }}>
                    {pdf.attrs[7].value}
                </Text>
                <Text style={{ width: "6%", opacity: 0 }}>
                    {` Fax: `}
                </Text>
                <Text style={{ width: "14%", fontSize: 9, maxLines: 1, textOverflow: "ellipsis" }}>
                    {pdf.attrs[8].value}
                </Text>
                <Text style={{ width: "10%", opacity: 0 }}>
                    {` Email: `}
                </Text>
                <Text style={{ fontSize: 8, maxWidth: "34%", maxLines: 1, textOverflow: "ellipsis" }}>
                    {pdf.attrs[9].value}
                </Text>
            </View>

            <View style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}>
                <Text style={{ opacity: 0 }}>
                    {`Đề nghị được làm thủ tục kiểm dịch số hàng sau: `}
                </Text>
            </View>

            <View style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}>
                <Text style={{ opacity: 0 }}>
                    {`I/ ĐỘNG VẬT: `}
                </Text>
            </View>

            <View style={[styles.table, { marginTop: 7 }]}>
                <View style={[styles.row_header, styles.bold, styles.header, { opacity: 0 }]}>
                    <Text style={styles.col36}>{'Loại động vật'}</Text>
                    <Text style={styles.col14}>{'Giống'}</Text>
                    <Text style={styles.col10}>{'Tuổi'}</Text>
                    <View style={styles.col20}>
                        <Text style={{ width: "100%", height: "50%", border: '1px solid borderColor' }}>{'Tính biệt'}</Text>
                        <View style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", width: "100%" }}>
                        <Text style={{ width: "50%" }}>{'Đực'}</Text>
                        <Text style={{ width: "50%" }}>{'Cái'}</Text>
                        </View>
                    </View>
                    <Text style={styles.col20}>{'Mục đích sử dụng'}</Text>
                </View>

                <View style={[styles.row_header, styles.bold, styles.header]}>
                    <Text style={styles.colBody36}>{pdf.attrs[10].value}</Text>
                    <Text style={styles.colBody14}>{pdf.attrs[11].value}</Text>
                    <Text style={styles.colBody10}>{pdf.attrs[12].value}</Text>
                    <Text style={[styles.colBody20_hp1]}>{tinhbiet[0]}</Text>
                    <Text style={[styles.colBody20_hp2]}>{tinhbiet[1]}</Text>
                    <Text style={styles.colBody20}>{pdf.attrs[14].value}</Text>
                </View>

                <View style={[styles.row_body]}>
                    <Text style={[styles.colBody36, { fontStyle: 'bold', opacity: 0 }]}>{'Tổng số'}</Text>
                    <Text style={[styles.colBody14, { fontStyle: 'bold' }]}>{' '}</Text>
                    <Text style={[styles.colBody10, { fontStyle: 'bold' }]}>{' '}</Text>
                    <Text style={[styles.colBody20_hp1, { fontStyle: 'bold' }]}>{tinhbiet[0]}</Text>
                    <Text style={[styles.colBody20_hp2, { fontStyle: 'bold' }]}> {tinhbiet[1]}</Text>
                    <Text style={[styles.colBody20, { fontStyle: 'bold' }]}>{' '}</Text>
                </View>
            </View>

            <View style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", marginTop: 5 }}>
                <Text style={{ fontSize: 10, width: "24%", opacity: 0 }}>
                    {`Tổng số (viết bằng chữ): `}
                </Text>
                <Text style={{ fontSize: 8, maxWidth: "76%", maxLines: 1, textOverflow: "ellipsis" }}>
                    {`${ToVietnamese (Number(tinhbiet[0]) + Number(tinhbiet[1]))} con`}
                </Text>
            </View>

            <View style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", marginTop: 0.5 }}>
                <Text style={{ fontSize: 10, width: "15%", opacity: 0 }}>
                    {`Nơi xuất phát: `}
                </Text>
                <Text style={{ fontSize: 8, maxWidth: "85%", maxLines: 1, textOverflow: "ellipsis" }}>
                    {pdf.attrs[15].value}
                </Text>
            </View>

            <View style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", marginTop: 0.5 }}>
                <Text style={{ fontSize: 10, width: "28.5%", opacity: 0 }}>
                    {`Tình trạng sức khỏe động vật: `}
                </Text>
                <Text style={{ fontSize: 8, maxWidth: "71.5%", maxLines: 1, textOverflow: "ellipsis" }}>
                    {pdf.attrs[16].value}
                </Text>
            </View>
            
            <View style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", marginTop: 1 }}>
                <Text style={{ fontSize: 10, width: "55%", opacity: 0 }}>
                    {`Số động vật trên xuất phát từ vùng/cơ sở an toàn với bệnh: `}
                </Text>
                <Text style={{ fontSize: 8, maxWidth: "45%", maxLines: 1, textOverflow: "ellipsis" }}>
                    {pdf.attrs[17].value}
                </Text>
            </View>

            <View style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}>
                <Text style={{ fontSize: 9, width: "16%", opacity: 0 }}>
                    {`theo Quyết định số `}
                </Text>
                <Text style={{ fontSize: 8, width: "12%", textAlign:"center", maxLines: 1, textOverflow: "ellipsis" }}>
                    {quyetdinh[0]}
                </Text>
                <Text style={{ fontSize: 8, width: "11%", textAlign:"center", maxLines: 1, textOverflow: "ellipsis" }}>
                    {quyetdinh[1]}
                </Text>
                <Text style={{ fontSize: 10, width: "4.5%", opacity: 0 }}>
                    {`ngày `}
                </Text>
                <Text style={{ fontSize: 9, width: "3%", textAlign:"center" }}>
                    {` ${day_ngayquyetdinh} `}
                </Text>
                <Text style={{ fontSize: 9, width: "6%", textAlign:"center" }}>
                    {` ${month_ngayquyetdinh} `}
                </Text>
                <Text style={{ fontSize: 9, width: "6%", textAlign:"center" }}>
                    {` ${year_ngayquyetdinh} `}
                </Text>
                <Text style={{ fontSize: 10, width: "8%", opacity: 0 }}>
                    {`của `}
                </Text>
                <Text style={{ fontSize: 8, maxWidth: "26%", maxLines: 1, textOverflow: "ellipsis" }}>
                    {pdf.attrs[20].value}
                </Text>
                <Text style={{ fontSize: 9, width: "7%", opacity: 0 }}>
                    {`(nếu có).`}
                </Text>
            </View>

            <View style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}>
                <Text style={{ opacity: 0 }}>
                    {`Số động vật trên đã được xét nghiệm các bênh sau (nếu có):`}
                </Text>
            </View>

            <View style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", marginTop: 2.5 }}>
                <Text style={{ width: "3%", opacity: 0 }}>
                    {`1/`}
                </Text>
                <Text style={{ width: "22%" , fontSize: 8, textAlign: "center", maxLines: 1, textOverflow: "ellipsis" }}>
                    {pdf.attrs[21].value}
                </Text>
                <Text style={{ width: "21%", opacity: 0 }}>
                    {`Kết quả xét nghiệm số `}
                </Text>
                <Text style={{ width: "11%", fontSize: 8, textAlign: "center", maxLines: 1, textOverflow: "ellipsis" }}>
                    {xetnghiem1[0]}
                </Text>
                <Text style={{ width: "16%", fontSize: 8, textAlign: "center", maxLines: 1, textOverflow: "ellipsis" }}>
                    {xetnghiem1[1]}
                </Text>
                <Text style={{ width: "5%", opacity: 0 }}>
                    {`ngày `}
                </Text>
                <Text style={{ fontSize: 9, width: "5%", textAlign: "center" }}>
                    {` ${day_ngayxetnghiem1} `}
                </Text>
                <Text style={{ fontSize: 9, width: "5%", textAlign: "center" }}>
                    {` ${month_ngayxetnghiem1} `}
                </Text>
                <Text style={{ fontSize: 9, width: "6%", textAlign: "center" }}>
                    {` ${year_ngayxetnghiem1} `}
                </Text>
            </View>

            <View style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}>
                <Text style={{ width: "3%", opacity: 0 }}>
                    {`2/`}
                </Text>
                <Text style={{ width: "22%" , fontSize: 8, textAlign: "center", maxLines: 1, textOverflow: "ellipsis" }}>
                    {pdf.attrs[24].value}
                </Text>
                <Text style={{ width: "21%", opacity: 0 }}>
                    {`Kết quả xét nghiệm số `}
                </Text>
                <Text style={{ width: "11%", fontSize: 8, textAlign: "center", maxLines: 1, textOverflow: "ellipsis" }}>
                    {xetnghiem2[0]}
                </Text>
                <Text style={{ width: "16%", fontSize: 8, textAlign: "center", maxLines: 1, textOverflow: "ellipsis" }}>
                    {xetnghiem2[1]}
                </Text>
                <Text style={{ width: "5%", opacity: 0 }}>
                    {`ngày `}
                </Text>
                <Text style={{ fontSize: 9, width: "5%", textAlign: "center" }}>
                    {` ${day_ngayxetnghiem2} `}
                </Text>
                <Text style={{ fontSize: 9, width: "5%", textAlign: "center" }}>
                    {` ${month_ngayxetnghiem2} `}
                </Text>
                <Text style={{ fontSize: 9, width: "6%", textAlign: "center" }}>
                    {` ${year_ngayxetnghiem2} `}
                </Text>
            </View>

            <View style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}>
                <Text style={{ opacity: 0 }}>
                    {`Số động vật trên đã được tiêm phòng vắc xin với các bệnh sau (loại vắc xin, nơi sản xuất):`}
                </Text>
            </View>

            <View style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}>
                <Text style={{ width: "3%", opacity: 0 }}>
                    {`1/`}
                </Text>
                <Text style={{ width: "63%" , fontSize: 8, textAlign: "center", maxLines: 1, textOverflow: "ellipsis" }}>
                    {pdf.attrs[27].value}
                </Text>
                <Text style={{ width: "16.2%", opacity: 0 }}>
                    {`tiêm phòng ngày`}
                </Text>
                <Text style={{ fontSize: 9, width: "4%", textAlign: "center" }}>
                    {` ${day_ngaytiem1} `}
                </Text>
                <Text style={{ fontSize: 9, width: "7%", textAlign: "center" }}>
                    {` ${month_ngaytiem1} `}
                </Text>
                <Text style={{ fontSize: 9, width: "6%" }}>
                    {` ${year_ngaytiem1} `}
                </Text>
            </View>

            <View style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}>
                <Text style={{ width: "3%", opacity: 0 }}>
                    {`2/`}
                </Text>
                <Text style={{ width: "63%" , fontSize: 8, textAlign: "center", maxLines: 1, textOverflow: "ellipsis" }}>
                    {pdf.attrs[29].value}
                </Text>
                <Text style={{ width: "16.2%", opacity: 0 }}>
                    {`tiêm phòng ngày `}
                </Text>
                <Text style={{ fontSize: 9, width: "4%", textAlign: "center" }}>
                    {` ${day_ngaytiem2} `}
                </Text>
                <Text style={{ fontSize: 9, width: "7%", textAlign: "center" }}>
                    {` ${month_ngaytiem2} `}
                </Text>
                <Text style={{ fontSize: 9, width: "6%" }}>
                    {` ${year_ngaytiem2} `}
                </Text>
            </View>

            <View style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}>
                <Text style={{ opacity: 0 }}>
                    {`II/ SẢN PHẨM ĐỘNG VẬT: `}
                </Text>
            </View>

            <View style={[styles.table, { marginTop: 4 }]}>
                <View style={[styles.row_header, styles.bold, styles.header, { opacity: 0 }]}>
                    <Text style={styles.col31_6}>{'Tên hàng'}</Text>
                    <Text style={styles.col20_5}>{'Quy cách đóng gói'}</Text>
                    <Text style={styles.col12_7}>{'Số lượng (2)'}</Text>
                    <Text style={styles.col15}>{'Khối lượng (kg)'}</Text>
                    <Text style={styles.colBody20}>{'Mục đích sử dụng'}</Text>
                </View>

                <View style={[styles.row_body]}>
                    <Text style={styles.col31_6}>{pdf.attrs[31].value}</Text>
                    <Text style={styles.col20_5}>{pdf.attrs[32].value}</Text>
                    <Text style={styles.col12_7}>{pdf.attrs[33].value}</Text>
                    <Text style={styles.col15}>{pdf.attrs[34].value}</Text>
                    <Text style={styles.colBody20}>{pdf.attrs[35].value}</Text>
                </View>

                <View style={[styles.row_body]}>
                    <Text style={[styles.col52_2, { fontStyle: 'bold', opacity: 0 }]}>{'Tổng số'}</Text>
                    <Text style={[styles.col12_7, { fontStyle: 'bold' }]}>{Number(pdf.attrs[33].value).toLocaleString()}</Text>
                    <Text style={[styles.col15, { fontStyle: 'bold' }]}>{Number(pdf.attrs[33].value * pdf.attrs[34].value).toLocaleString()}</Text>
                    <Text style={[styles.colBody20, { fontStyle: 'bold' }]}>{' '}</Text>
                </View>
            </View>
            
            <View style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", marginTop: 5 }}>
                <Text style={{ fontSize: 10, width: "24%", opacity: 0 }}>
                    {`Tổng số (viết bằng chữ): `}
                </Text>
                <Text style={{ fontSize: 8, maxWidth: "76%", maxLines: 1, textOverflow: "ellipsis" }}>
                    {`${ToVietnamese (pdf.attrs[33].value * pdf.attrs[34].value)} ki-lô-gam`}
                </Text>
            </View>

            <View style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", marginTop: 0.5 }}>
                <Text style={{ opacity: 0 }}>
                    {`Số động vật trên đã được xét nghiệm các chỉ tiêu vệ sinh thú y theo kết quả xét nghiệm số`}
                </Text>
            </View>

            <View style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", marginTop: 0.5 }}>
                <Text style={{ fontSize: 8, width: "11%", textAlign:"center", marginTop: 0.5, maxLines: 1, textOverflow: "ellipsis" }}>
                    {xetnghiemvsty[0]}
                </Text>
                <Text style={{ fontSize: 8, width: "19%", textAlign:"center", marginTop: 0.5, maxLines: 1, textOverflow: "ellipsis" }}>
                    {xetnghiemvsty[1]}
                </Text>
                <Text style={{ fontSize: 10, width: "3.5%", opacity: 0 }}>
                    {`d `}
                </Text>
                <Text style={{ fontSize: 9, width: "5%", textAlign:"center" }}>
                    {` ${day_ngayxetnghiemvsty} `}
                </Text>
                <Text style={{ fontSize: 9, width: "5%", textAlign:"center" }}>
                    {` ${month_ngayxetnghiemvsty} `}
                </Text>
                <Text style={{ fontSize: 9, width: "7%", textAlign:"center" }}>
                    {` ${year_ngayxetnghiemvsty} `}
                </Text>
                <Text style={{ fontSize: 10, width: "6%", opacity: 0 }}>
                    {`của `}
                </Text>
                <Text style={{ fontSize: 8, maxWidth: "23%", maxLines: 1, textOverflow: "ellipsis" }}>
                    {pdf.attrs[38].value}
                </Text>
                <Text style={{ fontSize: 9, width: "7%", opacity: 0 }}>
                    {`(nếu có).`}
                </Text>
            </View>

            <View style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}>
                <Text style={{ width: "27%", opacity: 0 }}>
                    {`Tên, địa chỉ cơ sở sản xuất: `}
                </Text>
                <Text style={{ fontSize: 8, maxWidth: "73%", maxLines: 1, textOverflow: "ellipsis" }}>
                    {pdf.attrs[39].value}
                </Text>
            </View>

            <View style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", marginTop: 0.5 }}>
                <Text style={{ width: "12%", opacity: 0 }}>
                    {`Điện thoại: `}
                </Text>
                <Text style={{ width: "33%" , fontSize: 9, maxLines: 1, textOverflow: "ellipsis" }}>
                    {pdf.attrs[40].value}
                </Text>
                <Text style={{ width: "8%", opacity: 0 }}>
                    {` Fax: `}
                </Text>
                <Text style={{ fontSize: 9, maxLines: 1, textOverflow: "ellipsis" }}>
                    {pdf.attrs[41].value}
                </Text>
            </View>

            <View style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", marginTop: 1 }}>
                <Text style={{ opacity: 0 }}>
                    {`III/ CÁC THÔNG TIN KHÁC: `}
                </Text>
            </View>

            <View style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}>
                <Text style={{ fontSize: 10, width: "32%", opacity: 0 }}>
                    {`Tên tổ chức, cá nhân nhập hàng: `}
                </Text>
                <Text style={{ fontSize: 8, maxWidth: "68%", maxLines: 1, textOverflow: "ellipsis" }}>
                    {pdf.attrs[42].value}
                </Text>
            </View>

            <View style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}>
                <Text style={{ fontSize: 10, width: "9%", opacity: 0 }}>
                    {`Địa chỉ: `}
                </Text>
                <Text style={{ fontSize: 8, maxWidth: "81%", maxLines: 1, textOverflow: "ellipsis" }}>
                    {pdf.attrs[43].value}
                </Text>
            </View>

            <View style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}>
                <Text style={{ width: "12%", opacity: 0 }}>
                    {`Điện thoại: `}
                </Text>
                <Text style={{ width: "22%" , fontSize: 9, maxLines: 1, textOverflow: "ellipsis" }}>
                    {pdf.attrs[44].value}
                </Text>
                <Text style={{ width: "5%", opacity: 0 }}>
                    {` Fax: `}
                </Text>
                <Text style={{ fontSize: 9, maxLines: 1, textOverflow: "ellipsis" }}>
                    {pdf.attrs[45].value}
                </Text>
            </View>

            <View style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", marginTop: 0.5 }}>
                <Text style={{ fontSize: 10, width: "21%", opacity: 0 }}>
                    {`Nơi đến (cuối cùng): `}
                </Text>
                <Text style={{ fontSize: 8, maxWidth: "79%", maxLines: 1, textOverflow: "ellipsis" }}>
                    {pdf.attrs[46].value}
                </Text>
            </View>

            <View style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", marginTop: 0.5 }}>
                <Text style={{ fontSize: 10, width: "25%", opacity: 0 }}>
                    {`Phương tiện vận chuyển: `}
                </Text>
                <Text style={{ fontSize: 8, maxWidth: "75%", maxLines: 1, textOverflow: "ellipsis" }}>
                    {pdf.attrs[47].value}
                </Text>
            </View>

            <View style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}>
                <Text style={{ opacity: 0 }}>
                    {`Nơi giao hàng trong quá trình vận chuyển (nếu có):`}
                </Text>
            </View>

            <View style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}>
                <Text style={{ width: "3%", opacity: 0 }}>
                    {`1/`}
                </Text>
                <Text style={{ width: "34%" , fontSize: 8, maxLines: 1, textOverflow: "ellipsis" }}>
                    {pdf.attrs[48].value}
                </Text>
                <Text style={{ width: "9%", opacity: 0 }}>
                    {`Số lượng: `}
                </Text>
                <Text style={{ fontSize: 9, width: "8%", textAlign: "center", maxLines: 1, textOverflow: "ellipsis" }}>
                    {pdf.attrs[49].value}
                </Text>
                <Text style={{ width: "15%", opacity: 0 }}>
                    {`Khối lượng: `}
                </Text>
                <Text style={{ fontSize: 8, maxLines: 1, textOverflow: "ellipsis" }}>
                    {pdf.attrs[50].value}
                </Text>
            </View>

            <View style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", marginTop: 1 }}>
                <Text style={{ fontSize: 10, width: "49%", opacity: 0 }}>
                    {`Điều kiện bảo quản hàng trong quá trình vận chuyển: `}
                </Text>
                <Text style={{ fontSize: 8, maxLines: 1, textOverflow: "ellipsis" }}>
                    {pdf.attrs[51].value}
                </Text>
            </View>

            <View style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}>
                <Text style={{ fontSize: 10, width: "37%", opacity: 0 }}>
                    {`Các vật dụng khác liên quan kèm theo: `}
                </Text>
                <Text style={{ fontSize: 8, maxWidth: "63%", maxLines: 1, textOverflow: "ellipsis" }}>
                    {pdf.attrs[52].value}
                </Text>
            </View>

            <View style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}>
                <Text style={{ fontSize: 10, width: "30%", opacity: 0 }}>
                    {`Các giấy tờ kèm theo: `}
                </Text>
                <Text style={{ fontSize: 8, maxWidth: "70%", maxLines: 1, textOverflow: "ellipsis" }}>
                    {pdf.attrs[53].value}
                </Text>
            </View>

            <View style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}>
                <Text style={{ fontSize: 10, width: "20%", opacity: 0 }}>
                    {`Địa điểm kiểm dịch: `}
                </Text>
                <Text style={{ fontSize: 8, maxWidth: "80%", maxLines: 1, textOverflow: "ellipsis" }}>
                    {pdf.attrs[54].value}
                </Text>
            </View>

            <View style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", marginTop: 0.5 }}>
                <Text style={{ fontSize: 10, width: "20%", opacity: 0 }}>
                    {`Thời gian kiểm dịch: `}
                </Text>
                <Text style={{ fontSize: 8, maxLines: 1, textOverflow: "ellipsis" }}>
                    {pdf.attrs[55].value}
                </Text>
            </View>

            <View style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}>
                <Text style={{ opacity: 0 }}>
                    {`Tôi cam đoan việc đăng ký trên hoàn toàn đúng sự thật và cam kết chấp hành đúng pháp luật thú y.`}
                </Text>
            </View>

            <View style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", marginTop: 3.5 }}>
                <Text style={{ width: "70%", textAlign: "center", opacity: 0 }}>
                    {`Ý KIẾN CỦA CƠ QUAN KIỂM DỊCH ĐỘNG VẬT`}
                </Text>
                <Text style={{ fontSize: 10, width: "15%", opacity: 0 }}>
                    {`Đăng ký tại `}
                </Text>
                <Text style={{ fontSize: 8, width: "15%", textAlign: "center", maxLines: 1, textOverflow: "ellipsis" }}>
                    {pdf.attrs[56].value}
                </Text>
            </View>

            <View style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", fontSize: 9, marginTop: 3 }}>
                <Text style={{ width: "28%", opacity: 0 }}>
                    {`Đồng ý kiểm dịch tại địa điểm`}
                </Text>
                <Text style={{ fontSize: 8, width: "10%", textAlign: "center", maxLines: 1, textOverflow: "ellipsis" }}>
                    {pdf.attrs[57].value}
                </Text>
                <Text style={{ width: "7.1%", opacity: 0 }}>
                    {`vào hồi`}
                </Text>
                <Text style={{ fontSize: 9, width: "3%", textAlign: "center" }}>
                    {pdf.attrs[58].value}
                </Text>
                <Text style={{ width: "3%", opacity: 0 }}>
                    {`giờ`}
                </Text>
                <Text style={{ fontSize: 9, width: "4%", textAlign: "center" }}>
                    {pdf.attrs[59].value}
                </Text>
                <Text style={{ width: "4.8%", opacity: 0 }}>
                    {`ngày`}
                </Text>
                <Text style={{ fontSize: 9, width: "3%", textAlign: "center" }}>
                    {` ${day_ngaykiemdich} `}
                </Text>
                <Text style={{ fontSize: 9, width: "4.5%", textAlign: "center" }}>
                    {` ${month_ngaykiemdich} `}
                </Text>
                <Text style={{ fontSize: 9, width: "4.5%" }}>
                    {` ${year_ngaykiemdich} `}
                </Text>
                <Text style={{ width: "7.1%", opacity: 0, textAlign: "center"}}>
                    {`D`}
                </Text>
                <Text style={{ fontSize: 9, width: "4%", textAlign: "center" }}>
                    {arrDate[2]}
                </Text>
                <Text style={{ width: "6.5%", opacity: 0 }}>
                    {`m`}
                </Text>
                <Text style={{ fontSize: 9, width: "3%", textAlign: "center" }}>
                    {arrDate[1]}
                </Text>
                <Text style={{ width: "5.5%", opacity: 0 }}>
                    {`y`}
                </Text>
                <Text style={{ fontSize: 9, width: "4%", marginRight: -13 }}>
                    {arrDate[0]}
                </Text>
            </View>

            <View style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", fontSize: 9, marginTop: 1 }}>
                <Text style={{ width: "4%", opacity: 0, marginLeft: "14.5%" }}>
                    {`Vào sổ đăng ký số`}
                </Text>
                <Text style={{ fontSize: 9, width: "9%", textAlign: "center", maxLines: 1, textOverflow: "ellipsis" }}>
                    {pdf.attrs[61].value}
                </Text>
                <Text style={{ width: "6.5%", opacity: 0 }}>
                    {`ngày`}
                </Text>
                <Text style={{ fontSize: 9, width: "3.2%", textAlign: "center" }}>
                    {` ${day_ngayvaosodk} `}
                </Text>
                <Text style={{ fontSize: 9, width: "4.2%", textAlign: "center" }}>
                    {` ${month_ngayvaosodk} `}
                </Text>
                <Text style={{ fontSize: 9, width: "5%", textAlign: "center" }}>
                    {` ${year_ngayvaosodk} `}
                </Text>
            </View>

        </Page>
    </Document >
    )
    
}

export { PDF1 };