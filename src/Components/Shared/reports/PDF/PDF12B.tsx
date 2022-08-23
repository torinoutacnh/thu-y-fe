import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
  Font,
} from "@react-pdf/renderer";
import { ReportModel } from "Components/Shared/Models/Form";
import { PDFModel } from "./mapper/map-report";
import { ToVietnamese } from "./ConvertNumberToVietnamese";
import { getDateCurrent } from "Utils/DateTimeUtils";

Font.register({
  family: "NotoSerif",
  fonts: [
    { src: require("./font/NotoSerif-Regular.ttf") }, // font-style: normal, font-weight: normal
    { src: require("./font/NotoSerif-Italic.ttf"), fontStyle: "italic" },
    { src: require("./font/NotoSerif-Bold.ttf"), fontStyle: "bold" },
    {
      src: require("./font/NotoSerif-BoldItalic.ttf"),
      fontStyle: "boldItalic",
    },
  ],
});

const styles = StyleSheet.create({
  body: {
    fontFamily: "NotoSerif",
    paddingTop: 50,
    paddingHorizontal: 35,
    fontWeight: 300

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

  col25: {
    width: "25%",
    fontSize: 9,
    border: "1px solid white",
    padding: "10px",
    fontStyle: "bold",
    color: "white"
  },

  col31: {
    width: "26%",
    fontSize: 9,
    border: "1px solid white",
    padding: "10px",
    fontStyle: "bold",
    color: "white"
  },

  col12: {
    width: "12%",
    fontSize: 9,
    border: "1px solid white",
    padding: "10px",
    fontStyle: "bold",
    color: "white"
  },
  col24: {
    width: "22%",
    fontSize: 9,
    border: "1px solid white",
    fontStyle: "bold",
    color: "white"
  },
  col13: {
    width: "12%",
    fontSize: 9,
    borderTop: "1px solid white",
    borderBottom: "1px solid white",
    padding: "3.9x",
    fontStyle: "bold",
    color: "white"
  },
  colBody25: {
    width: "25%",
    fontSize: 9,
    borderLeft: "1px solid white",
    borderRight: "1px solid white",
    borderBottom: "1px solid white",
    height: "100%",
    paddingTop: "3px",
    paddingBottom: "3px",
    alignItems: "center", maxLines: 1, textOverflow: "ellipsis",
    paddingLeft: "2px", paddingRight: "2px"
  },

  colBody31: {
    width: "26%",
    fontSize: 9,
    borderLeft: "1px solid white",
    borderRight: "1px solid white",
    borderBottom: "1px solid white",
    height: "100%",
    paddingTop: "3px",
    paddingBottom: "3px",
    alignItems: "center", maxLines: 1, textOverflow: "ellipsis",
    paddingLeft: "2px", paddingRight: "2px"
  },

  colBody13: {
    width: "12%",
    fontSize: 9,
    borderBottom: "1px solid white",
    height: "100%",
    paddingTop: "3px",
    paddingBottom: "3px", maxLines: 1, textOverflow: "ellipsis",
    paddingLeft: "2px", paddingRight: "2px"
  },
  colBody12_1: {
    width: "12%",
    fontSize: 9,
    borderBottom: "1px solid white",
    borderLeft: "1px solid white",
    height: "100%",
    paddingTop: "3px",
    paddingBottom: "3px", maxLines: 1, textOverflow: "ellipsis",
    paddingLeft: "2px", paddingRight: "2px"
  },
  colBody12_2: {
    width: "12%",
    fontSize: 9,
    borderLeft: "1px solid white",
    borderBottom: "1px solid white",
    borderRight: "1px solid white",
    height: "100%",
    paddingTop: "3px",
    paddingBottom: "3px", maxLines: 1, textOverflow: "ellipsis",
    paddingLeft: "2px", paddingRight: "2px"
  },


  table: {
    width: "100%",
    marginTop: 5,
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
const PDF12B = (props: { report: ReportModel }) => {
  const { report } = props;
  const pdf = PDFModel(report);

  // pdf.attrs.map((item, index) => {
  //   return (
  //     console.log(index, "     =>>>    ", item.attributeName, " => ", item.value)
  //   )
  // })

  // console.log("pdf value >>>>>> ", pdf);


  const year_giatridenngay = pdf.attrs[35]?.value?.slice(0, 4) ?? ""
  const month_giatridenngay = pdf.attrs[35]?.value?.slice(5, 7) ?? ""
  const day_giatridenngay = pdf.attrs[35]?.value?.slice(8, 10) ?? ""

  const year_ngaytiem2 = pdf.attrs[32]?.value?.slice(0, 4) ?? ""
  const month_ngaytiem2 = pdf.attrs[32]?.value?.slice(5, 7) ?? ""
  const day_ngaytiem2 = pdf.attrs[32]?.value?.slice(8, 10) ?? ""

  const year_ngayxetnghiem = pdf.attrs[27]?.value?.slice(0, 4) ?? ""
  const month_ngayxetnghiem = pdf.attrs[27]?.value?.slice(5, 7) ?? ""
  const day_ngayxetnghiem = pdf.attrs[27]?.value?.slice(8, 10) ?? ""

  const year_ngaytiem1 = pdf.attrs[30]?.value?.slice(0, 4) ?? ""
  const month_ngaytiem1 = pdf.attrs[30]?.value?.slice(5, 7) ?? ""
  const day_ngaytiem1 = pdf.attrs[30]?.value?.slice(8, 10) ?? ""


  const tmp = getDateCurrent()
  const arrDate = tmp.split("-")

  // const AnimalRender = () => {
  //   const render = [];
  //   for (let index = 0; index < 3; index++) {
  //     const element = pdf.animals[index] ? (
  //       <View style={[styles.row_body, styles.bold]} key={index}>
  //         <Text style={styles.colBody25}>{pdf.animals[index].name}</Text>
  //         <Text style={styles.colBody13}></Text>
  //         <Text style={styles.colBody12_1}></Text>
  //         <Text style={styles.colBody12_2}> </Text>
  //         <Text style={styles.colBody13}>{pdf.animals[index].amount}</Text>
  //         <Text style={styles.colBody31}></Text>
  //       </View>
  //     ) : (
  //       <View style={[styles.row_body, styles.bold]} key={index}>
  //         <Text style={styles.colBody25}></Text>
  //         <Text style={styles.colBody13}></Text>
  //         <Text style={styles.colBody12_1}></Text>
  //         <Text style={styles.colBody12_2}> </Text>
  //         <Text style={styles.colBody13}></Text>
  //         <Text style={styles.colBody31}></Text>
  //       </View>
  //     );
  //     render.push(element);
  //   }
  //   return render.map((x) => x);
  // };
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
              {`Mẫu : 12b`}
            </Text>
          </View>
        </View>

        <View style={styles.containerHeader3}>
          <Text style={styles.header2}>
            {`Số: 21115250`}
          </Text>
          <Text style={{ marginLeft: 25, fontSize: 13, fontStyle: "italic", color: "white" }}>
            {`/CN-KDĐV-UQ`}
          </Text>
        </View>

        <View style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}>
          <Text style={{ fontSize: 11, width: "43%", color: "white" }}>
            {`Họ tên chủ hàng (hoặc người đại diện): `}
          </Text>
          <Text style={{ fontSize: 10, maxWidth: "40%", maxLines: 1, textOverflow: "ellipsis", }}>
            {pdf.attrs[0].value}
          </Text>
        </View>

        <View style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}>
          <Text style={{ fontSize: 11, width: "20%", color: "white" }}>
            {`Địa chỉ giao dịch: `}
          </Text>
          <Text style={{ fontSize: 9, maxWidth: "50%", marginTop: "1px", maxLines: 1, textOverflow: "ellipsis", }}>
            {pdf.attrs[1].value}
          </Text>
        </View>


        <View style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", marginTop: "3px" }}>

          <View style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", width: "30%" }}>
            <Text style={{ width: "43%", marginTop: 0, fontSize: 11, color: "white" }}>
              {`Điện thoại: `}
            </Text>
            <Text style={{ fontSize: 10, maxWidth: "47%", maxLines: 1, textOverflow: "ellipsis", }}>
              {pdf.attrs[2].value}
            </Text>
          </View>

          <View style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", width: "23%" }}>
            <Text style={{ width: "26%", marginTop: 0, fontSize: 11, color: "white" }}>
              {`Fax: `}
            </Text>
            <Text style={{ fontSize: 10, maxWidth: "70%", paddingLeft: "5px", maxLines: 1, textOverflow: "ellipsis", }}>
              {pdf.attrs[3].value}
            </Text>
          </View>

          <View style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", width: "23%" }}>
            <Text style={{ width: "33%", marginTop: 0, fontSize: 11, color: "white" }}>
              {`Email: `}
            </Text>
            <Text style={{ fontSize: 10, maxWidth: "67%", maxLines: 1, textOverflow: "ellipsis", }}>
              {pdf.attrs[4].value}
            </Text>
          </View>

        </View>

        <Text style={{ marginTop: 5, fontSize: 11, color: "white" }}>
          {`Vận chuyển số động vật sau:`}
        </Text>


        <View style={styles.table}>

          <View style={[styles.row_header, styles.bold, styles.header]}>
            <Text style={styles.col25}>{'Loại động vật'}</Text>
            <Text style={styles.col13}>{'Tuổi\n(1)'}</Text>

            <View style={styles.col24}>
              <Text style={{ width: "100%", borderBottom: '1px solid white', padding: "3px" }}>{'Tính biệt'}</Text>
              <View style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", width: "100%" }}>
                <Text style={{ width: "50%", paddingTop: "1px" }}>{'Đực'}</Text>
                <Text style={{ width: "50%", paddingTop: "1px", borderLeft: "1px solid white" }}>{'Cái'}</Text>
              </View>
            </View>

            <Text style={styles.col13}>{'Số lượng\n(Con)'}</Text>
            <Text style={styles.col31}>{'Mục đích sử dụng'}</Text>
          </View>

          <View style={[styles.row_body, styles.bold]}>
            <Text style={styles.colBody25}>{pdf.attrs[5].value}</Text>
            <Text style={styles.colBody13}>{pdf.attrs[6].value}</Text>
            <Text style={styles.colBody12_1}>{' '}</Text>
            <Text style={styles.colBody12_2}>{' '}</Text>
            <Text style={styles.colBody13}>{Number(pdf.attrs[7].value).toLocaleString()}</Text>
            <Text style={styles.colBody31}>{pdf.attrs[8].value}</Text>
          </View>

          <View style={[styles.row_body, styles.bold]}>
            <Text style={styles.colBody25}>{pdf.attrs[9].value}</Text>
            <Text style={styles.colBody13}>{pdf.attrs[10].value}</Text>
            <Text style={styles.colBody12_1}>{' '}</Text>
            <Text style={styles.colBody12_2}>{' '}</Text>
            <Text style={styles.colBody13}>{Number(pdf.attrs[11].value).toLocaleString()}</Text>
            <Text style={styles.colBody31}>{pdf.attrs[12].value}</Text>
          </View>

          <View style={[styles.row_body, styles.bold]}>
            <Text style={styles.colBody25}>{pdf.attrs[13].value}</Text>
            <Text style={styles.colBody13}>{pdf.attrs[14].value}</Text>
            <Text style={styles.colBody12_1}>{' '}</Text>
            <Text style={styles.colBody12_2}>{' '}</Text>
            <Text style={styles.colBody13}>{Number(pdf.attrs[15].value).toLocaleString()}</Text>
            <Text style={styles.colBody31}>{pdf.attrs[16].value}</Text>
          </View>

          <View style={[styles.row_body, styles.bold]}>
            <Text style={[styles.colBody25, { fontStyle: 'bold', color: "white" }]}>{'Tổng số'}</Text>
            <Text style={[styles.colBody13, { fontStyle: 'bold' }]}>{' '}</Text>
            <Text style={[styles.colBody12_1, { fontStyle: 'bold' }]}>{' '}</Text>
            <Text style={[styles.colBody12_2, { fontStyle: 'bold' }]}> {' '}</Text>
            <Text style={[styles.colBody13, { fontStyle: 'bold' }]}>
              {(Number(pdf.attrs[7].value) + Number(pdf.attrs[11].value) + Number(pdf.attrs[15].value)).toLocaleString()}
            </Text>
            <Text style={[styles.colBody31, { fontStyle: 'bold' }]}>{' '}</Text>
          </View>
        </View>

        <View style={{ marginTop: "5px", display: "flex", flexDirection: "row", flexWrap: "wrap" }}>
          <Text style={{ width: "28%", marginTop: 0, fontSize: 11, color: "white" }}>
            {`Tổng số (viết bằng chữ): `}
          </Text>
          <Text style={{ fontSize: 9, maxWidth: "67%", maxLines: 1, textOverflow: "ellipsis", }}>
            {`${ToVietnamese(Number(pdf.attrs[7].value) + Number(pdf.attrs[11].value) + Number(pdf.attrs[15].value))} con`}
          </Text>
        </View>

        <View style={{ marginTop: "5px", height: "33px", display: "flex", flexDirection: "row", flexWrap: "wrap" }}>
          {/* nơi xuất phát */}
          <Text style={{ fontSize: 9, maxLines: 2, lineHeight: 1.8, paddingLeft: "5px", color: "white" }}>
            {`Nơi xuất phát:mmmmm `}
            <Text style={{ fontSize: 9, maxLines: 2, textOverflow: "ellipsis", lineHeight: 1.8, color: "black" }}>
              {pdf.attrs[17].value}
            </Text>
          </Text>
        </View>

        <View style={{ height: "33px", display: "flex", flexDirection: "row", flexWrap: "wrap", marginTop: "2px" }}>
          {/* nơi đến cuối cùng */}
          <Text style={{ fontSize: 9, maxLines: 2, lineHeight: 1.8, paddingLeft: "5px", color: "white" }}>
            {`Nơi đến cuối cùng:mmmmmmmm`}
            <Text style={{ fontSize: 9, maxLines: 2, textOverflow: "ellipsis", lineHeight: 1.8, paddingLeft: "5px", color: "black" }}>
              {pdf.attrs[18].value}
            </Text>
          </Text>
        </View>

        <View style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", }}>

          <View style={{ width: "54%", display: "flex", flexDirection: "row", flexWrap: "wrap" }}>
            <Text style={{ width: "50%", marginTop: 0, fontSize: 11, maxLines: 1, color: "white" }}>
              {`Phương tiện vận chuyển: `}
            </Text>
            <Text style={{ fontSize: 10, maxWidth: "50%", maxLines: 1, textOverflow: "ellipsis", }}>
              {pdf.attrs[19].value}
            </Text>
          </View>

          <View style={{ width: "46%", display: "flex", flexDirection: "row", flexWrap: "wrap" }}>
            <Text style={{ width: "37%", marginTop: 0, fontSize: 11, maxLines: 1, color: "white", }}>
              {`Biển kiểm soát: `}
            </Text>
            <Text style={{ fontSize: 10, maxWidth: "50%", maxLines: 1, textOverflow: "ellipsis", }}>
              {pdf.attrs[20].value}
            </Text>
          </View>

        </View>

        <Text style={{ marginTop: "5px", fontSize: 11, color: "white", paddingLeft: "10px" }}>
          {`Nơi giao hàng trong quá trình vận chuyển(nếu có):`}
        </Text>

        <View style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", marginTop: "1px", marginLeft: "10px" }}>
          <Text style={{ width: "59%", fontSize: 9, maxLines: 1, textOverflow: "ellipsis", paddingLeft: "10px" }}>
            {pdf.attrs[21].value}
          </Text>

          <View style={{ width: "41%", display: "flex", flexDirection: "row", flexWrap: "wrap" }}>
            <Text style={{ width: "27%", marginTop: 0, fontSize: 11, maxLines: 1, color: "white" }}>
              {`Số lượng: `}
            </Text>
            <Text style={{ fontSize: 10, maxWidth: "73%", maxLines: 1 }}>
              {pdf.attrs[22].value}
            </Text>
          </View>
        </View>


        <View style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}>
          <Text style={{ width: "33%", marginTop: "2px", fontSize: 11, maxLines: 1, color: "white", }}>
            {`Các vật dụng khác có liên quan: `}
          </Text>
          <Text style={{ fontSize: 9, maxWidth: "50%", maxLines: 1, textOverflow: "ellipsis", }}>
            {pdf.attrs[23].value}
          </Text>
        </View>



        <View style={{ height: "30px", marginTop: "5px" }}>
          <Text style={{ fontSize: 11, fontStyle: "bold", textAlign: "center", width: "100%", color: "white" }}>
            {`CHỨNG NHẬN KIỂM DỊCH`}
          </Text>
          <Text style={{ marginTop: 0, fontSize: 11, fontWeight: "bold", color: "white" }}>
            {`Tôi, kiểm dịch viên động vật ký tên dưới đây chứng nhận:`}
          </Text>
        </View>


        <View style={{ height: "32px", display: "flex", flexDirection: "row", flexWrap: "wrap" }}>
          <Text style={{ fontSize: 9, maxLines: 2, lineHeight: 1.7, paddingLeft: "5px", color: "white" }}>
            {`1/ Số động vật trên xuất phát từ vùng/cơ sở an toàn với các bệnh:mmmmmmmmmmm `}
            <Text style={{ fontSize: 9, maxLines: 2, textOverflow: "ellipsis", lineHeight: 1.7, paddingLeft: "5px", color: "black" }}>
              {pdf.attrs[24].value}
            </Text>
          </Text>
        </View>


        <Text style={{ marginTop: "3px", fontSize: 11, fontWeight: "bold", color: "white" }}>
          {`2/ Số động vật trên không có triệu chứng lâm sàng của bệnh truyền nhiễm khi xuất phát;`}
        </Text>

        <View style={{ height: "45px", marginTop: "0px" }}>
          <Text style={{ marginTop: 0, fontSize: 11, color: "white" }}>
            {"3/ Động vật đã được xét nghiệm và có kết quả âm tính với các bệnh:"}
          </Text>

          <View style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}>
            <Text style={{ marginTop: 0, fontSize: 9, fontWeight: "bold", width: "51%", maxLines: 1, textOverflow: "ellipsis", paddingLeft: "5px" }}>
              {pdf.attrs[25].value}
            </Text>

            <View style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", width: "49%" }}>
              <Text style={{ marginTop: 0, fontSize: 11, fontWeight: "bold", width: "55%", color: "white" }}>
                {`tại kết quả xét nghiệm số:`}
              </Text>
              <Text style={{ marginTop: 0, fontSize: 10, fontWeight: "bold", width: "23%", maxLines: 1, textOverflow: "ellipsis", textAlign: "center" }}>
                {pdf.attrs[26].value?.split('/')[0]}
              </Text>
              <Text style={{ marginTop: 0, fontSize: 10, fontWeight: "bold", width: "22%", maxLines: 1, textOverflow: "ellipsis", textAlign: "center" }}>
                {pdf.attrs[26].value?.split('/')[1]}
              </Text>
            </View>

          </View>


          <View style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", marginTop: "1px" }}>
            <Text style={{ marginTop: 0, fontSize: 11, fontWeight: "bold", width: "6%", color: "white" }}>
              {`ngày`}
            </Text>
            <Text style={{ marginTop: 0, marginLeft: "3px", fontSize: 10, fontWeight: "bold", width: "4%", textAlign: "right" }}>
              {`${day_ngayxetnghiem}`}
            </Text>
            <Text style={{ marginTop: 0, fontSize: 10, fontWeight: "bold", width: "6%", textAlign: "right" }}>
              {`${month_ngayxetnghiem}`}
            </Text>
            <Text style={{ marginTop: 0, fontSize: 10, fontWeight: "bold", width: "7%", textAlign: "right" }}>
              {`${year_ngayxetnghiem}`}
            </Text>
            <Text style={{ marginTop: 0, fontSize: 11, fontWeight: "bold", width: "9%", color: "white" }}>
              {` của`}
            </Text>

            <Text style={{ marginTop: 0, fontSize: 9, fontWeight: "bold", width: "40%", maxLines: 1, textOverflow: "ellipsis", }}>
              {pdf.attrs[28].value}
            </Text>
            <Text style={{ marginTop: 0, fontSize: 11, fontWeight: "bold", width: "25%", fontStyle: "italic", color: "white" }}>
              {`(gửi kèm bản sao, nếu có)`}
            </Text>
          </View>

        </View>



        <Text style={{ marginTop: "2px", fontSize: 11, fontWeight: "bold", color: "white" }}>
          {`4/ Động vật đã được tiêm phòng vắc xin với các bệnh:`}
        </Text>

        <View style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", marginTop: "1px" }}>
          <Text style={{ marginTop: 0, fontSize: 9, fontWeight: "bold", width: "56%", maxLines: 1, textOverflow: "ellipsis", marginLeft: "10px" }}>
            {pdf.attrs[29].value}
          </Text>
          <Text style={{ marginTop: 0, fontSize: 11, fontWeight: "bold", width: "20%", maxLines: 1, textAlign: "right", color: "white" }}>
            {`tiêm phòng ngày `}
          </Text>
          <Text style={{ marginTop: 0, fontSize: 10, fontWeight: "bold", width: "6%", textAlign: "right" }}>
            {`${day_ngaytiem1}`}
          </Text>
          <Text style={{ marginTop: 0, fontSize: 10, fontWeight: "bold", width: "6%", textAlign: "right" }}>
            {`${month_ngaytiem1}`}
          </Text>
          <Text style={{ marginTop: 0, fontSize: 10, fontWeight: "bold", width: "9%", textAlign: "right" }}>
            {`${year_ngaytiem1}`}
          </Text>
        </View>
        <View style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}>
          <Text style={{ marginTop: 0, fontSize: 9, fontWeight: "bold", width: "56%", maxLines: 1, textOverflow: "ellipsis", marginLeft: "10px" }}>
            {pdf.attrs[31].value}
          </Text>
          <Text style={{ marginTop: 0, fontSize: 11, fontWeight: "bold", width: "20%", maxLines: 1, textAlign: "right", color: "white" }}>
            {`tiêm phòng ngày `}
          </Text>
          <Text style={{ marginTop: 0, fontSize: 10, fontWeight: "bold", width: "6%", textAlign: "right" }}>
            {`${day_ngaytiem2}`}
          </Text>
          <Text style={{ marginTop: 0, fontSize: 10, fontWeight: "bold", width: "6%", textAlign: "right" }}>
            {`${month_ngaytiem2}`}
          </Text>
          <Text style={{ marginTop: 0, fontSize: 10, fontWeight: "bold", width: "9%", textAlign: "right" }}>
            {`${year_ngaytiem2}`}
          </Text>
        </View>


        <Text style={{ marginTop: "4px", fontSize: 11, fontWeight: "bold", color: "white" }}>
          {`5/ Phương tiện vận chuyển, các vật dụng khác có liên quan kèm theo bảo đảm vệ sinh thú y, đã`}
        </Text>

        <View style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}>
          <Text style={{ marginTop: 0, fontSize: 9, fontWeight: "bold", width: "29%", color: "white" }}>
            {`được khử trùng tiêu độc bằng`}
          </Text>
          <Text style={{ marginTop: 0, fontSize: 9, fontWeight: "bold", width: "35%", maxLines: 1, textOverflow: "ellipsis", paddingLeft: "7px" }}>
            {pdf.attrs[33].value}
          </Text>
          <Text style={{ marginTop: 0, fontSize: 11, fontWeight: "bold", width: "9%", color: "white" }}>
            {`nồng độ `}
          </Text>
          <Text style={{ marginTop: 0, fontSize: 10, fontWeight: "bold", width: "26%", maxLines: 1, textOverflow: "ellipsis", }}>
            {pdf.attrs[34].value}
          </Text>
        </View>

        <View style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", marginTop: 5 }}>

          <View style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", width: "55%" }}>
            <Text style={{ marginTop: 0, fontSize: 11, width: "45%", color: "white" }}>
              {`Giấy có giá trị đến ngày`}
            </Text>
            <Text style={{ marginTop: 0, fontSize: 10, fontWeight: "bold", width: "10%", textAlign: "right" }}>
              {`${day_giatridenngay}`}
            </Text>
            <Text style={{ marginTop: 0, fontSize: 10, fontWeight: "bold", width: "7%", textAlign: "right" }}>
              {`${month_giatridenngay}`}
            </Text>
            <Text style={{ marginTop: 0, fontSize: 10, fontWeight: "bold", width: "14%", textAlign: "right" }}>
              {`${year_giatridenngay}`}
            </Text>
          </View>

          <View style={{ width: "45%", textAlign: "center" }}>
            <View style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}>
              <Text style={{ marginTop: 0, fontSize: 11, width: "16%", color: "white" }}>
                {`Cấp tại `}
              </Text>

              <Text style={{ marginTop: 0, fontSize: 9, width: "30%", maxLines: 1, textOverflow: "ellipsis", }}>
                {pdf.attrs[36].value}
              </Text>

              <Text style={{ marginTop: 0, fontSize: 11, width: "12%", textAlign: "left", color: "white" }}>
                {` ngày`}
              </Text>

              <Text style={{ marginTop: 0, fontSize: 10, fontWeight: "bold", width: "10%", textAlign: "right" }}>
                {arrDate[2]}
              </Text>
              <Text style={{ marginTop: 0, fontSize: 10, fontWeight: "bold", width: "14%", textAlign: "right" }}>
                {arrDate[1]}
              </Text>
              <Text style={{ marginTop: 0, fontSize: 10, fontWeight: "bold", width: "16%", textAlign: "right" }}>
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

        <Text style={[styles.note, { fontSize: 8, marginTop: 60, color: "white" }]}>
          {"-(1): Đối với động vật làm giống\n-(2): Tên cơ quan trả lời kết quả xét nghiệm"}
        </Text>


      </Page>
    </Document >
  )

}


export { PDF12B };
