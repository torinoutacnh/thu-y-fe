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
import { getDateCurrent } from "Utils/DateTimeUtils";
import { ToVietnamese } from "./ConvertNumberToVietnamese";



Font.register({
    family: "NotoSerif",
    fonts: [
        { src: require("./font/NotoSerif-Regular.ttf") }, // font-style: normal, font-weight: normal
        { src: require("./font/NotoSerif-Italic.ttf"), fontStyle: 'italic' },
        { src: require("./font/NotoSerif-Bold.ttf"), fontStyle: 'bold' },
        { src: require("./font/NotoSerif-BoldItalic.ttf"), fontStyle: 'boldItalic' },
    ]
});


// const tmp 

const styles = StyleSheet.create({
    body: {
        fontFamily: "NotoSerif",
        paddingTop: "38px",
        paddingHorizontal: 35,
        fontWeight: 300,
        marginLeft: "3px"

    },
    title: {
        fontSize: 24,
        textAlign: "center",
    },
    author: {
        fontSize: 12,
        textAlign: "center",
        marginBottom: 40,
    },
    subtitle: {
        fontSize: 18,
        margin: 12,
    },
    text: {
        margin: 12,
        fontSize: 12,
        textAlign: "justify",
        fontFamily: "Times-Roman",
    },
    image: {
        marginVertical: 15,
        marginHorizontal: 100,
    },
    header1: {
        fontSize: 12,
        textAlign: "center",
        color: "white",
        fontStyle: "bold"
    },
    header1_1: {
        fontSize: 13,
        textAlign: "center",
        color: "white",
        fontStyle: "bold"
    },

    header2: {
        fontSize: 13,
        textAlign: "center",
        color: "white",

    },

    header3: {
        fontSize: 13,
        textAlign: "center",
        color: "white",
        textDecoration: "underline",
        fontStyle: "bold"
    },
    title1: {
        fontSize: 13,
        textAlign: "center",
        color: "white",
        fontStyle: "bold"
    },

    containerHeader1: {

        display: "flex",
        flexWrap: "wrap",
        flexDirection: "row",
        justifyContent: "space-between",
    },
    containerHeader2: {

        display: "flex",
        flexWrap: "wrap",
        flexDirection: "row",
        justifyContent: "space-between",
    },

    containerHeader3: {
        marginTop: 3,
        display: "flex",
        flexWrap: "wrap",
        flexDirection: "row",
        justifyContent: "center",
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



    note: {
        position: "absolute",
        fontSize: 7,
        bottom: 20,
        left: 35,
        textAlign: "left",
        color: "white",
    },


    colBody25: {
        width: "25%",
        fontSize: 9,
        borderLeft: "1px solid white",
        borderRight: "1px solid white",
        borderBottom: "1px solid white",
        height: "100%",
        paddingTop: "5px",
        paddingBottom: "3px",
        alignItems: "center", maxLines: 1, textOverflow: "ellipsis", paddingLeft: "5px", paddingRight: "5px"
    },

    colBody26: {
        width: "26%",
        fontSize: 9,
        borderLeft: "1px solid white",
        borderRight: "1px solid white",
        borderBottom: "1px solid white",
        height: "100%",
        paddingTop: "5px",
        paddingBottom: "3px",
        alignItems: "center", maxLines: 1, textOverflow: "ellipsis", paddingLeft: "2px", paddingRight: "2px"
    },

    colBody18: {
        width: "18%",
        fontSize: 9,
        borderBottom: "1px solid white",
        height: "100%",
        paddingTop: "3.5px",
        paddingBottom: "3.5px", maxLines: 1, textOverflow: "ellipsis", paddingLeft: "2px", paddingRight: "2px"
    },
    colBody16: {
        width: "16%",
        fontSize: 9,
        borderBottom: "1px solid white",
        borderLeft: "1px solid white",
        height: "100%",
        paddingTop: "5px",
        paddingBottom: "3px", maxLines: 1, textOverflow: "ellipsis", paddingLeft: "2px", paddingRight: "2px"
    },

    colBody15: {
        width: "15%",
        fontSize: 9,
        borderBottom: "1px solid white",
        borderLeft: "1px solid white",
        height: "100%",
        paddingTop: "5px",
        paddingBottom: "3px", maxLines: 1, textOverflow: "ellipsis", paddingLeft: "2px", paddingRight: "2px"
    },



    table: {
        width: "100%",
        marginTop: "26px",
        textAlign: "center",
        marginLeft: "10px"

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
const PDF12D = (props: any) => {


    const report: ReportModel = props.report
    const pdf = PDFModel(report);


    // pdf.attrs.map((item, index) => {
    //     return (
    //         console.log(index, " =name=> ", item.attributeName)
    //     )
    // })

    // console.log("pdf =>>>>> ", pdf);


    const year_ngayxetnghiem = pdf.attrs[42]?.value?.slice(0, 4) ?? ""
    const month_ngayxetnghiem = pdf.attrs[42]?.value?.slice(5, 7) ?? ""
    const day_ngayxetnghiem = pdf.attrs[42]?.value?.slice(8, 10) ?? ""

    const year_giatridenngay = pdf.attrs[49]?.value?.slice(0, 4) ?? ""
    const month_giatridenngay = pdf.attrs[49]?.value?.slice(5, 7) ?? ""
    const day_giatridenngay = pdf.attrs[49]?.value?.slice(8, 10) ?? ""


    const tmp: string = getDateCurrent()
    const arrDate = tmp.split("-")
    // console.log(arrDate);


    const sum = Number(pdf.attrs[8]?.value) + Number(pdf.attrs[13]?.value) + Number(pdf.attrs[18]?.value)

    const ani = () => {
        return (
            <View style={[styles.row_body, styles.bold]}>
                <Text style={styles.colBody25}>{' loại hàng '}</Text>
                <Text style={styles.colBody18}>{'đóng gói'}</Text>
                <Text style={styles.colBody16}>{'100'}</Text>
                <Text style={styles.colBody15}>{'2kg'}</Text>
                <Text style={styles.colBody26}>{'mục đích'}</Text>
            </View>
        )
    }



    return (
        <Document>

            <Page style={styles.body}>
                <View style={styles.containerHeader1}>

                    <View style={{ width: "40%" }} >
                        <Text style={styles.header1} fixed>
                            {`CHI CỤC CHĂN NUÔI VÀ THÚ Y`}
                        </Text>
                        <Text style={styles.header1} fixed>
                            {`ĐỒNG NAI`}
                        </Text>
                    </View>

                    <View style={{ width: "60%" }} >
                        <Text style={styles.header1_1} fixed>
                            {`CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM`}
                        </Text>
                        <Text style={styles.header3} fixed>
                            {`Độc lập - Tự do - Hạnh phúc`}
                        </Text>
                    </View>

                </View>

                <View style={styles.containerHeader2}>
                    <View style={{ width: "85%", paddingLeft: 80 }}>
                        <Text style={styles.title1} fixed>
                            {`GIẤY CHỨNG NHẬN KIỂM DỊCH`}
                        </Text>
                        <Text style={styles.title1} fixed>
                            {`ĐỘNG VẬT VẬN CHUYỂN RA KHỎI ĐỊA BÀN CẤP TỈNH`}
                        </Text>
                    </View>

                    <View style={{ width: "15%", marginTop: 15 }}>
                        <Text style={styles.header1_1} fixed>
                            {`Mẫu : 12d`}
                        </Text>
                    </View>
                </View>

                <View style={styles.containerHeader3}>
                    <Text style={styles.header2}>
                        {`Số: 21115250`}
                    </Text>
                    <Text style={{ marginLeft: 25, fontSize: 13, fontStyle: "italic", color: "white" }}>
                        {`/CN-KDSPĐV-UQ`}
                    </Text>
                </View>

                <View style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", marginTop: "1px" }}>
                    <Text style={{ fontSize: 10, width: "46%", color: "white" }}>
                        {`Họ tên chủ hàng (hoặc người đại diện): `}
                    </Text>
                    <Text style={{ fontSize: 10, maxWidth: "54%", maxLines: 1, textOverflow: "ellipsis" }}>
                        {pdf.attrs[0]?.value}
                    </Text>
                </View>

                <View style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}>
                    <Text style={{ fontSize: 10, width: "23%", color: "white" }}>
                        {`Địa chỉ giao dịch: `}
                    </Text>
                    <Text style={{ fontSize: 9, maxWidth: "77%", marginTop: "1px", maxLines: 1, textOverflow: "ellipsis" }}>
                        {pdf.attrs[1]?.value}
                    </Text>
                </View>


                <View style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", marginTop: "3px" }}>

                    <View style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", width: "33%" }}>
                        <Text style={{ width: "43%", marginTop: 0, fontSize: 10, color: "white" }}>
                            {`Điện thoại: `}
                        </Text>
                        <Text style={{ fontSize: 10, maxWidth: "47%", paddingLeft: "5px", maxLines: 1, textOverflow: "ellipsis" }}>
                            {pdf.attrs[2]?.value}
                        </Text>
                    </View>

                    <View style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", width: "23%" }}>
                        <Text style={{ width: "26%", marginTop: 0, fontSize: 10, color: "white" }}>
                            {`Fax: `}
                        </Text>
                        <Text style={{ fontSize: 10, maxWidth: "70%", paddingLeft: "8px", maxLines: 1, textOverflow: "ellipsis" }}>
                            {pdf.attrs[3]?.value}
                        </Text>
                    </View>

                    <View style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", width: "20%" }}>
                        <Text style={{ width: "33%", marginTop: 0, fontSize: 10, color: "white" }}>
                            {`Email: `}
                        </Text>
                        <Text style={{ fontSize: 9, maxWidth: "67%", paddingLeft: "2px", maxLines: 1, textOverflow: "ellipsis" }}>
                            {pdf.attrs[4]?.value}
                        </Text>
                    </View>

                </View>

                <Text style={{ marginTop: 10, fontSize: 10, color: "white" }}>
                    {`Vận chuyển số động vật sau:`}
                </Text>


                <View style={styles.table}>



                    <View style={[styles.row_body, styles.bold]}>
                        <Text style={styles.colBody25}>{pdf.attrs[5]?.value}</Text>
                        <Text style={styles.colBody18}>{pdf.attrs[6]?.value}</Text>
                        <Text style={styles.colBody16}>{pdf.attrs[7]?.value}</Text>
                        <Text style={styles.colBody15}>{pdf.attrs[8]?.value}</Text>
                        <Text style={styles.colBody26}>{pdf.attrs[9]?.value}</Text>
                    </View>

                    <View style={[styles.row_body, styles.bold]}>
                        <Text style={styles.colBody25}>{pdf.attrs[10]?.value}</Text>
                        <Text style={styles.colBody18}>{pdf.attrs[11]?.value}</Text>
                        <Text style={styles.colBody16}>{pdf.attrs[12]?.value}</Text>
                        <Text style={styles.colBody15}>{pdf.attrs[13]?.value}</Text>
                        <Text style={styles.colBody26}>{pdf.attrs[14]?.value}</Text>
                    </View>

                    <View style={[styles.row_body, styles.bold]}>
                        <Text style={styles.colBody25}>{pdf.attrs[15]?.value}</Text>
                        <Text style={styles.colBody18}>{pdf.attrs[16]?.value}</Text>
                        <Text style={styles.colBody16}>{pdf.attrs[17]?.value}</Text>
                        <Text style={styles.colBody15}>{pdf.attrs[18]?.value}</Text>
                        <Text style={styles.colBody26}>{pdf.attrs[19]?.value}</Text>
                    </View>


                    <View style={[styles.row_body, styles.bold]}>
                        <Text style={[styles.colBody25, { fontStyle: 'bold', color: "white" }]}>{'Tổng số'}</Text>
                        <Text style={[styles.colBody18, { fontStyle: 'bold', maxLines: 1, textOverflow: "ellipsis" }]}>{' '}</Text>
                        <Text style={[styles.colBody16, { fontStyle: 'bold', maxLines: 1, textOverflow: "ellipsis" }]}>
                            {
                                (Number(pdf.attrs[8]?.value) + Number(pdf.attrs[13]?.value) + Number(pdf.attrs[18]?.value)) > 0 ?
                                    Number(pdf.attrs[8]?.value) + Number(pdf.attrs[13]?.value) + Number(pdf.attrs[18]?.value) : ""
                            }
                        </Text>
                        <Text style={[styles.colBody15, { fontStyle: 'bold', maxLines: 1, textOverflow: "ellipsis" }]}>
                            {sum > 0 ? sum : ""}
                        </Text>
                        <Text style={[styles.colBody26, { fontStyle: 'bold', maxLines: 1, textOverflow: "ellipsis" }]}>{' '}</Text>
                    </View>
                </View>

                <View style={{ marginTop: "7px", display: "flex", flexDirection: "row", flexWrap: "wrap" }}>
                    <Text style={{ width: "30%", marginTop: 0, fontSize: 10, color: "white" }}>
                        {`Tổng số (viết bằng chữ): `}
                    </Text>
                    <Text style={{ fontSize: 9, width: "70%", maxLines: 1, textOverflow: "ellipsis" }}>
                        {
                            sum > 0 ? <>{ToVietnamese(sum) + " kilogam"}</> : ""
                        }
                    </Text>
                </View>

                <View style={{ marginTop: "4px", display: "flex", flexDirection: "row", flexWrap: "wrap" }}>
                    <Text style={{ width: "39%", marginTop: 0, fontSize: 10, color: "white" }}>
                        {`Tên cơ sở sản xuất, sơ chế, bảo quản: `}
                    </Text>
                    <Text style={{ fontSize: 9, width: "61%", maxLines: 1, textOverflow: "ellipsis", paddingLeft: "14px" }}>
                        {pdf.attrs[20]?.value}
                    </Text>
                </View>

                <View style={{ marginTop: "1px", display: "flex", flexDirection: "row", flexWrap: "wrap" }}>
                    <Text style={{ width: "13%", marginTop: 0, fontSize: 10, color: "white" }}>
                        {`Địa chỉ: `}
                    </Text>
                    <Text style={{ fontSize: 9, width: "87%", maxLines: 1, textOverflow: "ellipsis", paddingLeft: "4px" }}>
                        {pdf.attrs[21]?.value}
                    </Text>
                </View>

                <View style={{ marginTop: "3px", display: "flex", flexDirection: "row", flexWrap: "wrap" }}>
                    <Text style={{ width: "36%", marginTop: 0, fontSize: 10, color: "white" }}>
                        {`Tên tổ chức, cá nhân nhận hàng: `}
                    </Text>
                    <Text style={{ fontSize: 9, width: "64%", maxLines: 1, textOverflow: "ellipsis", paddingLeft: "9px" }}>
                        {pdf.attrs[22]?.value}
                    </Text>
                </View>

                <View style={{ marginTop: "3px", display: "flex", flexDirection: "row", flexWrap: "wrap" }}>
                    <Text style={{ width: "15%", marginTop: 0, fontSize: 10, color: "white" }}>
                        {`Địa chỉ: `}
                    </Text>
                    <Text style={{ fontSize: 9, width: "85%", maxLines: 1, textOverflow: "ellipsis", paddingLeft: "5px" }}>
                        {pdf.attrs[23]?.value}
                    </Text>
                </View>



                <View style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", marginTop: "3px" }}>

                    <View style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", width: "35%" }}>
                        <Text style={{ width: "47%", marginTop: 0, fontSize: 10, color: "white" }}>
                            {`Điện thoại: `}
                        </Text>
                        <Text style={{ fontSize: 9, maxWidth: "53%", maxLines: 1, textOverflow: "ellipsis" }}>
                            {pdf.attrs[24]?.value}
                        </Text>
                    </View>

                    <View style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", width: "23%" }}>
                        <Text style={{ width: "30%", marginTop: 0, fontSize: 10, color: "white" }}>
                            {`Fax: `}
                        </Text>
                        <Text style={{ fontSize: 9, maxWidth: "70%", paddingLeft: "8px", maxLines: 1, textOverflow: "ellipsis" }}>
                            {pdf.attrs[25]?.value}
                        </Text>
                    </View>

                    <View style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", width: "42%" }}>
                        <Text style={{ width: "27%", marginTop: 0, fontSize: 10, color: "white", paddingLeft: "20px" }}>
                            {`Email: `}
                        </Text>
                        <Text style={{ fontSize: 9, width: "73%", maxLines: 1, textOverflow: "ellipsis" }}>
                            {pdf.attrs[26]?.value}
                        </Text>
                    </View>

                </View>



                <View style={{ marginTop: "3px", display: "flex", flexDirection: "row", flexWrap: "wrap" }}>
                    <Text style={{ width: "22%", marginTop: 0, fontSize: 10, color: "white" }}>
                        {`Nơi đến cuối cùng: `}
                    </Text>
                    <Text style={{ fontSize: 9, width: "78%", maxLines: 1, textOverflow: "ellipsis", paddingLeft: "5px" }}>
                        {pdf.attrs[27]?.value}
                    </Text>
                </View>

                <Text style={{ marginTop: 3, fontSize: 10, color: "white" }}>
                    {`Nơi giao hàng trong quá trình vận chuyển (nếu có): `}
                </Text>


                <View style={{ display: "flex", flexDirection: "row", fontSize: 10, flexWrap: "wrap", lineHeight: 1.7, marginTop: 1, paddingLeft: "20px" }}>
                    <Text style={{ width: "6%", color: "white" }}>
                        {`1/ `}
                    </Text>
                    <Text style={{ width: "36%", fontSize: 9, textAlign: "center", maxLines: 1, textOverflow: "ellipsis" }}>
                        {pdf.attrs[28]?.value}
                    </Text>
                    <Text style={{ width: "11%", color: "white" }}>
                        {` Số lượng: `}
                    </Text>
                    <Text style={{ width: "15%", fontSize: 9, textAlign: "center", maxLines: 1, textOverflow: "ellipsis" }}>
                        {pdf.attrs[29]?.value}
                    </Text>
                    <Text style={{ width: "17%", color: "white" }}>
                        {` Khối lượng: `}
                    </Text>
                    <Text style={{ width: "15%", fontSize: 9, textAlign: "center", maxLines: 1, textOverflow: "ellipsis" }}>
                        {pdf.attrs[30]?.value}
                    </Text>
                </View>
                <View style={{ display: "flex", flexDirection: "row", fontSize: 10, flexWrap: "wrap", lineHeight: 1.7, marginTop: 1, paddingLeft: "20px" }}>
                    <Text style={{ width: "6%", color: "white" }}>
                        {`2/ `}
                    </Text>
                    <Text style={{ width: "36%", fontSize: 9, textAlign: "center", maxLines: 1, textOverflow: "ellipsis" }}>
                        {pdf.attrs[31]?.value}
                    </Text>
                    <Text style={{ width: "11%", color: "white" }}>
                        {` Số lượng: `}
                    </Text>
                    <Text style={{ width: "15%", fontSize: 9, textAlign: "center", maxLines: 1, textOverflow: "ellipsis" }}>
                        {pdf.attrs[32]?.value}
                    </Text>
                    <Text style={{ width: "17%", color: "white" }}>
                        {` Khối lượng: `}
                    </Text>
                    <Text style={{ width: "15%", fontSize: 9, textAlign: "center", maxLines: 1, textOverflow: "ellipsis" }}>
                        {pdf.attrs[33]?.value}
                    </Text>
                </View>
                <View style={{ display: "flex", flexDirection: "row", fontSize: 10, flexWrap: "wrap", lineHeight: 1.7, marginTop: 1, paddingLeft: "20px" }}>
                    <Text style={{ width: "6%", color: "white" }}>
                        {`3/ `}
                    </Text>
                    <Text style={{ width: "36%", fontSize: 9, textAlign: "center", maxLines: 1, textOverflow: "ellipsis" }}>
                        {pdf.attrs[34]?.value}
                    </Text>
                    <Text style={{ width: "11%", color: "white" }}>
                        {` Số lượng: `}
                    </Text>
                    <Text style={{ width: "15%", fontSize: 9, textAlign: "center", maxLines: 1, textOverflow: "ellipsis" }}>
                        {pdf.attrs[35]?.value}
                    </Text>
                    <Text style={{ width: "17%", color: "white" }}>
                        {` Khối lượng: `}
                    </Text>
                    <Text style={{ width: "15%", fontSize: 9, textAlign: "center", maxLines: 1, textOverflow: "ellipsis" }}>
                        {pdf.attrs[36]?.value}
                    </Text>
                </View>




                <View style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}>

                    <View style={{ width: "48%", display: "flex", flexDirection: "row", flexWrap: "wrap" }}>
                        <Text style={{ width: "55%", marginTop: 0, fontSize: 10, maxLines: 1, color: "white" }}>
                            {`Phương tiện vận chuyển: `}
                        </Text>
                        <Text style={{ fontSize: 9, maxWidth: "45%", maxLines: 1, textOverflow: "ellipsis", paddingLeft: "20px" }}>
                            {pdf.attrs[37]?.value}
                        </Text>
                    </View>

                    <View style={{ width: "52%", display: "flex", flexDirection: "row", flexWrap: "wrap" }}>
                        <Text style={{ width: "40%", marginTop: 0, fontSize: 10, maxLines: 1, color: "white", }}>
                            {`Biển kiểm soát: `}
                        </Text>
                        <Text style={{ fontSize: 9, maxWidth: "60%", maxLines: 1, textOverflow: "ellipsis" }}>
                            {pdf.attrs[38]?.value}
                        </Text>
                    </View>

                </View>


                <View style={{ marginTop: "3.5px", display: "flex", flexDirection: "row", flexWrap: "wrap" }}>
                    <Text style={{ width: "45%", marginTop: 0, fontSize: 10, color: "white" }}>
                        {`Điều kiện bảo quản hàng khi vận chuyển: `}
                    </Text>
                    <Text style={{ fontSize: 9, width: "55%", maxLines: 1, textOverflow: "ellipsis", paddingLeft: "9px" }}>
                        {pdf.attrs[39]?.value}
                    </Text>
                </View>

                <View style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}>
                    <Text style={{ width: "33%", marginTop: "0px", fontSize: 10, maxLines: 1, color: "white", }}>
                        {`Các vật dụng khác có liên quan: `}
                    </Text>
                    <Text style={{ fontSize: 9, maxWidth: "67%", maxLines: 1, textOverflow: "ellipsis", marginTop: "0px", paddingLeft: "20px" }}>
                        {pdf.attrs[40]?.value}
                    </Text>
                </View>




                <View style={{ height: "30px", marginTop: "5px" }}>
                    <Text style={{ fontSize: 11, fontStyle: "bold", textAlign: "center", width: "100%", color: "white" }}>
                        {`CHỨNG NHẬN KIỂM DỊCH`}
                    </Text>
                    <Text style={{ marginTop: 0, fontSize: 10, fontWeight: "bold", color: "white" }}>
                        {`Tôi, kiểm dịch viên động vật ký tên dưới đây chứng nhận:`}
                    </Text>
                </View>
                <View style={{ height: "32px", display: "flex", flexDirection: "row", flexWrap: "wrap" }}>
                    <Text style={{ fontSize: 9, maxLines: 2, lineHeight: 1.7, paddingLeft: "5px", color: "white" }}>
                        {'1/ Sản phẩm động vật trên được lấy từ động vật khỏe mạnh; Xuất phát từ vùng, cơ sở an toàn dịch bệnh và được giết mổ, sơ chế, bảo quản đảm bảo các yêu cầu vệ sinh thú y theo quy định;'}
                    </Text>
                </View>

                <Text style={{ fontSize: 10, fontWeight: "bold", color: "white" }}>
                    {`2/ Sản phẩm động vật trênd dã được kiểm tra các chỉ tiêu vệ sinh thú y tại kết quả xét nghiệm số:`}
                </Text>


                <View style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", marginTop: "1px" }}>
                    <Text style={{ marginTop: 0, fontSize: 9, fontWeight: "bold", width: "8%", maxLines: 1, textOverflow: "ellipsis", textAlign: "right", }}>
                        {pdf.attrs[41]?.value?.split('/')[0]}
                    </Text>
                    <Text style={{ marginTop: 0, fontSize: 9, fontWeight: "bold", width: "7%", maxLines: 1, textOverflow: "ellipsis", textAlign: "right", }}>
                        {pdf.attrs[41]?.value?.split('/')[1]}
                    </Text>
                    <Text style={{ marginTop: 0, fontSize: 9, fontWeight: "bold", width: "9%", color: "white" }}>
                        {`ngày`}
                    </Text>
                    <Text style={{ marginTop: 0, marginLeft: "3px", fontSize: 9, fontWeight: "bold", width: "4%", textAlign: "right", maxLines: 1, textOverflow: "ellipsis" }}>
                        {`${day_ngayxetnghiem}`}
                    </Text>
                    <Text style={{ marginTop: 0, fontSize: 9, fontWeight: "bold", width: "4%", textAlign: "right", maxLines: 1, textOverflow: "ellipsis" }}>
                        {`${month_ngayxetnghiem}`}
                    </Text>
                    <Text style={{ marginTop: 0, fontSize: 9, fontWeight: "bold", width: "5%", textAlign: "right", maxLines: 1, textOverflow: "ellipsis" }}>
                        {`${year_ngayxetnghiem}`}
                    </Text>
                    <Text style={{ marginTop: 0, fontSize: 11, fontWeight: "bold", width: "7%", color: "white", }}>
                        {` của`}
                    </Text>

                    <Text style={{ marginTop: 0, fontSize: 9, fontWeight: "bold", width: "33%", maxLines: 1, textOverflow: "ellipsis" }}>
                        {pdf.attrs[43]?.value}
                    </Text>

                </View>




                <View style={{ marginTop: "1px", display: "flex", flexDirection: "row", flexWrap: "wrap" }}>
                    <Text style={{ width: "59%", marginTop: 0, fontSize: 10, color: "white" }}>
                        {`3/ Sản phậm động vật trên đáp ứng các yêu cầu sau:`}
                    </Text>
                    <Text style={{ fontSize: 9, width: "41%", maxLines: 1, textOverflow: "ellipsis" }}>
                        {pdf.attrs[44]?.value}
                    </Text>
                </View>


                <View style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", marginTop: "2px" }}>
                    <Text style={{ marginTop: 0, fontSize: 10, fontWeight: "bold", width: "60%", color: "white" }}>
                        {`4/ Sản phẩm đã được khử trùng tiêu độc bằng:`}
                    </Text>
                    <Text style={{ marginTop: 0, fontSize: 9, fontWeight: "bold", width: "20%", maxLines: 1, textOverflow: "ellipsis", paddingLeft: "12px", }}>
                        {pdf.attrs[45]?.value}
                    </Text>
                    <Text style={{ marginTop: 0, fontSize: 10, fontWeight: "bold", width: "8%", color: "white", }}>
                        {`nồng độ `}
                    </Text>
                    <Text style={{ marginTop: 0, fontSize: 9, fontWeight: "bold", width: "8%", maxLines: 1, textOverflow: "ellipsis" }}>
                        {pdf.attrs[46]?.value}
                    </Text>
                </View>




                <Text style={{ fontSize: 10, maxLines: 1, color: "white" }}>
                    {`5/ Phương tiện vận chuyển, các vật dụng khác có liên quan kèm theo đảm bảo yêu cầu vệ sinh`}
                </Text>


                <View style={{ marginTop: "4px", display: "flex", flexDirection: "row", flexWrap: "wrap" }}>
                    <Text style={{ width: "47%", marginTop: 0, fontSize: 10, color: "white" }}>
                        {`thú y, đã được khử trùng tiêu độc bằng`}
                    </Text>
                    <Text style={{ fontSize: 9, width: "25%", maxLines: 1, textOverflow: "ellipsis", paddingLeft: "13px" }}>
                        {pdf.attrs[47]?.value}
                    </Text>

                    <Text style={{ fontSize: 9, width: "13%", maxLines: 1, color: "white" }}>
                        {`nồng độ`}
                    </Text>
                    <Text style={{ fontSize: 9, width: "15%", maxLines: 1, textOverflow: "ellipsis" }}>
                        {pdf.attrs[48]?.value}
                    </Text>

                </View>




                <View style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", marginTop: 4 }}>

                    <View style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", width: "55%" }}>
                        <Text style={{ marginTop: 0, fontSize: 10, width: "45%", color: "white" }}>
                            {`Giấy có giá trị đến ngày`}
                        </Text>
                        <Text style={{ marginTop: 0, fontSize: 9, fontWeight: "bold", width: "11%", textAlign: "right", maxLines: 1, textOverflow: "ellipsis" }}>
                            {`${day_giatridenngay}`}
                        </Text>
                        <Text style={{ marginTop: 0, fontSize: 9, fontWeight: "bold", width: "9%", textAlign: "right", maxLines: 1, textOverflow: "ellipsis" }}>
                            {`${month_giatridenngay}`}
                        </Text>
                        <Text style={{ marginTop: 0, fontSize: 9, fontWeight: "bold", width: "14%", textAlign: "right", maxLines: 1, textOverflow: "ellipsis" }}>
                            {`${year_giatridenngay}`}
                        </Text>
                    </View>

                    <View style={{ width: "45%", textAlign: "center" }}>
                        <View style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}>
                            <Text style={{ marginTop: 0, fontSize: 11, width: "16%", color: "white" }}>
                                {`Cấp tại `}
                            </Text>

                            <Text style={{ marginTop: 0, fontSize: 9, width: "30%", maxLines: 1, textOverflow: "ellipsis", }}>
                                {pdf.attrs[50]?.value}
                            </Text>

                            <Text style={{ marginTop: 0, fontSize: 11, width: "12%", textAlign: "left", color: "white" }}>
                                {` ngày`}
                            </Text>

                            <Text style={{ marginTop: 0, fontSize: 9, fontWeight: "bold", width: "14%", textAlign: "right", maxLines: 1, textOverflow: "ellipsis" }}>
                                {arrDate[2]}
                            </Text>
                            <Text style={{ marginTop: 0, fontSize: 9, fontWeight: "bold", width: "13%", textAlign: "right", maxLines: 1, textOverflow: "ellipsis" }}>
                                {arrDate[1]}
                            </Text>
                            <Text style={{ marginTop: 0, fontSize: 9, fontWeight: "bold", width: "15%", textAlign: "right", maxLines: 1, textOverflow: "ellipsis" }}>
                                {arrDate[0]}
                            </Text>
                        </View>

                        <Text style={{ marginTop: 0, fontSize: 11, fontStyle: "bold", color: "white" }}>
                            {`KIỂM DỊCH VIÊN ĐỘNG VẬT`}
                        </Text>
                        <Text style={{ marginTop: 0, fontSize: 11, color: "white" }}>
                            {`(Ký, ghi rõ họ tên)`}
                        </Text>
                    </View>

                </View>




            </Page>
        </Document >
    );
}

export { PDF12D };
