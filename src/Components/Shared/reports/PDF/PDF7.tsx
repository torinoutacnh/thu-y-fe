import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";
import { ReportModel } from "Components/Shared/Models/Form";
import { PDFModel } from "./mapper/map-report";

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
    fontWeight: 300,
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
    color: "black",
    fontStyle: "bold",
  },
  header1_1: {
    fontSize: 13,
    textAlign: "center",
    color: "black",
    fontStyle: "bold",
  },

  header2: {
    fontSize: 13,
    textAlign: "center",
    color: "black",
  },

  header3: {
    fontSize: 13,
    textAlign: "center",
    color: "black",
    textDecoration: "underline",
    fontStyle: "bold",
  },
  title1: {
    fontSize: 13,
    textAlign: "center",
    color: "black",
    fontStyle: "bold",
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
    color: "black",
  },

  col25: {
    width: "25%",
    fontSize: 9,
    border: "1px solid white",
    padding: "10px",
    fontStyle: "bold",
    color: "black",
  },

  col31: {
    width: "26%",
    fontSize: 9,
    border: "1px solid white",
    padding: "10px",
    fontStyle: "bold",
    color: "black",
  },

  col12: {
    width: "12%",
    fontSize: 9,
    border: "1px solid white",
    padding: "10px",
    fontStyle: "bold",
    color: "black",
  },
  col24: {
    width: "22%",
    fontSize: 9,
    border: "1px solid white",
    fontStyle: "bold",
    color: "black",
  },
  col13: {
    width: "12%",
    fontSize: 9,
    borderTop: "1px solid white",
    borderBottom: "1px solid white",
    padding: "3.9x",
    fontStyle: "bold",
    color: "black",
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
    alignItems: "center",
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
    alignItems: "center",
  },

  colBody13: {
    width: "12%",
    fontSize: 9,
    borderBottom: "1px solid white",
    height: "100%",
    paddingTop: "3px",
    paddingBottom: "3px",
  },
  colBody12_1: {
    width: "12%",
    fontSize: 9,
    borderBottom: "1px solid white",
    borderLeft: "1px solid white",
    height: "100%",
    paddingTop: "3px",
    paddingBottom: "3px",
  },
  colBody12_2: {
    width: "12%",
    fontSize: 9,
    borderLeft: "1px solid white",
    borderBottom: "1px solid white",
    borderRight: "1px solid white",
    height: "100%",
    paddingTop: "3px",
    paddingBottom: "3px",
  },

  table: {
    width: "100%",
    marginTop: 5,
    textAlign: "center",
  },
  row_header: {
    display: "flex",
    flexDirection: "row",
    borderTop: "1px solid white",
    alignItems: "center",
    justifyContent: "center",
  },

  row_body: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },

  header: {
    borderTop: "none",
  },
  bold: {
    fontWeight: "bold",
  },
});

/**Create Document Component
 * @param props : { report: ReportModel }
 * return pdf with report value
 */
const PDF7 = (props: { report: ReportModel }) => {
  const { report } = props;
  const pdf = PDFModel(report);
  console.log(report, pdf);

  const AnimalRender = () => {
    const render = [];
    for (let index = 0; index < 3; index++) {
      const element = pdf.animals[index] ? (
        <View style={[styles.row_body, styles.bold]} key={index}>
          <Text style={styles.colBody25}>{pdf.animals[index].name}</Text>
          <Text style={styles.colBody13}></Text>
          <Text style={styles.colBody12_1}></Text>
          <Text style={styles.colBody12_2}> </Text>
          <Text style={styles.colBody13}>{pdf.animals[index].amount}</Text>
          <Text style={styles.colBody31}></Text>
        </View>
      ) : (
        <View style={[styles.row_body, styles.bold]} key={index}>
          <Text style={styles.colBody25}></Text>
          <Text style={styles.colBody13}></Text>
          <Text style={styles.colBody12_1}></Text>
          <Text style={styles.colBody12_2}> </Text>
          <Text style={styles.colBody13}></Text>
          <Text style={styles.colBody31}></Text>
        </View>
      );
      render.push(element);
    }
    return render.map((x) => x);
  };

  return (
    <Document>
      <Page style={styles.body}>
        <View style={styles.containerHeader1}>
          <View style={{ width: "40%" }}>
            <Text style={styles.header1} fixed>
              {`CHI CỤC CHĂN NUÔI VÀ THÚ Y`}
            </Text>
            <Text style={styles.header1} fixed>
              {`ĐỒNG NAI`}
            </Text>
          </View>

          <View style={{ width: "60%" }}>
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
          <Text style={styles.header2}>{`Số: 21115250`}</Text>
          <Text
            style={{
              marginLeft: 25,
              fontSize: 13,
              fontStyle: "italic",
              color: "black",
            }}
          >
            {`/CN-KDĐV-UQ`}
          </Text>
        </View>

        <View
          style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}
        >
          <Text style={{ fontSize: 11, width: "43%", color: "black" }}>
            {`Họ tên chủ hàng (hoặc người đại diện): `}
          </Text>
          <Text style={{ fontSize: 11, maxWidth: "40%" }}>
            {`Nguyễn Văn A`}
          </Text>
        </View>

        <View
          style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}
        >
          <Text style={{ fontSize: 11, width: "20%", color: "black" }}>
            {`Địa chỉ giao dịch: `}
          </Text>
          <Text style={{ fontSize: 11, maxWidth: "50%" }}>{`Hồ Chí Minh`}</Text>
        </View>

        <View
          style={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            marginTop: "3px",
          }}
        >
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
              width: "30%",
            }}
          >
            <Text
              style={{
                width: "43%",
                marginTop: 0,
                fontSize: 11,
                color: "black",
              }}
            >
              {`Điện thoại: `}
            </Text>
            <Text style={{ fontSize: 11, maxWidth: "47%" }}>
              {`0338786210`}
            </Text>
          </View>

          <View
            style={{
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
              width: "23%",
            }}
          >
            <Text
              style={{
                width: "26%",
                marginTop: 0,
                fontSize: 11,
                color: "black",
              }}
            >
              {`Fax: `}
            </Text>
            <Text style={{ fontSize: 11, maxWidth: "70%" }}>{`123123123`}</Text>
          </View>

          <View
            style={{
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
              width: "23%",
            }}
          >
            <Text
              style={{
                width: "33%",
                marginTop: 0,
                fontSize: 11,
                color: "black",
              }}
            >
              {`Email: `}
            </Text>
            <Text style={{ fontSize: 11, maxWidth: "67%" }}>
              {`abc@gmail.com`}
            </Text>
          </View>
        </View>

        <Text style={{ marginTop: 5, fontSize: 11, color: "black" }}>
          {`Vận chuyển số động vật sau:`}
        </Text>

        <View style={styles.table}>
          <View style={[styles.row_header, styles.bold, styles.header]}>
            <Text style={styles.col25}>{"Loại động vật"}</Text>
            <Text style={styles.col13}>{"Tuổi\n(1)"}</Text>

            <View style={styles.col24}>
              <Text
                style={{
                  width: "100%",
                  borderBottom: "1px solid white",
                  padding: "3px",
                }}
              >
                {"Tính biệt"}
              </Text>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  flexWrap: "wrap",
                  width: "100%",
                }}
              >
                <Text style={{ width: "50%", paddingTop: "1px" }}>{"Đực"}</Text>
                <Text
                  style={{
                    width: "50%",
                    paddingTop: "1px",
                    borderLeft: "1px solid white",
                  }}
                >
                  {"Cái"}
                </Text>
              </View>
            </View>

            <Text style={styles.col13}>{"Số lượng\n(Con)"}</Text>
            <Text style={styles.col31}>{"Mục đích sử dụng"}</Text>
          </View>
          {AnimalRender()}

          <View style={[styles.row_body, styles.bold]}>
            <Text
              style={[styles.colBody25, { fontStyle: "bold", color: "black" }]}
            >
              {"Tổng số"}
            </Text>
            <Text style={[styles.colBody13, { fontStyle: "bold" }]}> </Text>
            <Text style={[styles.colBody12_1, { fontStyle: "bold" }]}> </Text>
            <Text style={[styles.colBody12_2, { fontStyle: "bold" }]}> </Text>
            <Text style={[styles.colBody13, { fontStyle: "bold" }]}>
              {pdf.animals.reduce((a, b) => {
                return a + b.amount;
              }, 0)}
            </Text>
            <Text style={[styles.colBody31, { fontStyle: "bold" }]}> </Text>
          </View>
        </View>

        <View
          style={{
            marginTop: "5px",
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
          }}
        >
          <Text
            style={{ width: "28%", marginTop: 0, fontSize: 11, color: "black" }}
          >
            {`Tổng số (viết bằng chữ): `}
          </Text>
          <Text style={{ fontSize: 11, maxWidth: "67%" }}>{`123 con`}</Text>
        </View>

        <View
          style={{
            marginTop: "2px",
            height: "30px",
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
          }}
        >
          <Text
            style={{
              width: "19%",
              marginTop: 0,
              fontSize: 11,
              maxLines: 1,
              color: "black",
            }}
          >
            {`Nơi xuất phát: `}
          </Text>
          <Text style={{ fontSize: 11, maxWidth: "81%", maxLines: 2 }}>
            {`Hồ chí minh Hồ chí minh Hồ chí minh Hồ chí minh Hồ chí minh Hồ chíh Hồ chí minh Hồ chí minh Hồ chí minh Hồ chí`}
          </Text>
        </View>

        <View
          style={{
            height: "30px",
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            marginTop: "5px",
          }}
        >
          <Text
            style={{
              width: "23%",
              marginTop: 0,
              fontSize: 11,
              maxLines: 1,
              color: "black",
            }}
          >
            {`Nơi đến cuối cùng: `}
          </Text>
          <Text style={{ fontSize: 11, maxWidth: "81%", maxLines: 2 }}>
            {`Hồ chí minh `}
          </Text>
        </View>

        <View
          style={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            marginTop: "5px",
          }}
        >
          <View
            style={{
              width: "54%",
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
            }}
          >
            <Text
              style={{
                width: "50%",
                marginTop: 0,
                fontSize: 11,
                maxLines: 1,
                color: "black",
              }}
            >
              {`Phương tiện vận chuyển: `}
            </Text>
            <Text style={{ fontSize: 11, maxWidth: "50%", maxLines: 1 }}>
              {`Ô tô`}
            </Text>
          </View>

          <View
            style={{
              width: "46%",
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
            }}
          >
            <Text
              style={{
                width: "37%",
                marginTop: 0,
                fontSize: 11,
                maxLines: 1,
                color: "black",
              }}
            >
              {`Biển kiểm soát: `}
            </Text>
            <Text style={{ fontSize: 11, maxWidth: "50%", maxLines: 1 }}>
              {`62F1 - 12345`}
            </Text>
          </View>
        </View>

        <Text style={{ marginTop: "5px", fontSize: 11, color: "black" }}>
          {`Nơi giao hàng trong quá trình vận chuyển(nếu có):`}
        </Text>

        <View
          style={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            marginTop: "1px",
          }}
        >
          <Text style={{ width: "59%", fontSize: 11, maxLines: 1 }}>
            {`nơi giao hàng khác`}
          </Text>

          <View
            style={{
              width: "41%",
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
            }}
          >
            <Text
              style={{
                width: "27%",
                marginTop: 0,
                fontSize: 11,
                maxLines: 1,
                color: "black",
              }}
            >
              {`Số lượng: `}
            </Text>
            <Text style={{ fontSize: 11, maxWidth: "73%", maxLines: 1 }}>
              {`2345`}
            </Text>
          </View>
        </View>

        <View
          style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}
        >
          <Text
            style={{
              width: "33%",
              marginTop: 0,
              fontSize: 11,
              maxLines: 1,
              color: "black",
            }}
          >
            {`Các vật dụng khác có liên quan: `}
          </Text>
          <Text style={{ fontSize: 11, maxWidth: "50%", maxLines: 1 }}>
            {`vật dụng liên quan`}
          </Text>
        </View>

        <View style={{ height: "55px", marginTop: "8px" }}>
          <Text
            style={{
              fontSize: 11,
              fontStyle: "bold",
              textAlign: "center",
              width: "100%",
              color: "black",
            }}
          >
            {`CHỨNG NHẬN KIỂM DỊCH`}
          </Text>
          <Text
            style={{
              marginTop: 0,
              fontSize: 11,
              fontWeight: "bold",
              color: "black",
            }}
          >
            {`Tôi, kiểm dịch viên động vật ký tên dưới đây chứng nhận:`}
          </Text>
          <Text
            style={{ marginTop: 0, fontSize: 11, maxLines: 2, color: "black" }}
          >
            {
              "1/ Số động vật trên xuất phát từ vùng/cơ sở an toàn với các bệnh:  "
            }
          </Text>
          <Text style={{ marginTop: 0, fontSize: 11, maxLines: 2 }}>
            {"bệnh 1, bệnh 2, bệnh 3, bệnh 4, bệnh 5, bệnh 6, bệnh 7"}
          </Text>
        </View>

        <Text
          style={{
            marginTop: "5px",
            fontSize: 11,
            fontWeight: "bold",
            color: "black",
          }}
        >
          {`2/ Số động vật trên không có triệu chứng lâm sàng của bệnh truyền nhiễm khi xuất phát;`}
        </Text>

        <View style={{ height: "45px", marginTop: "3px" }}>
          <Text style={{ marginTop: 0, fontSize: 11, color: "black" }}>
            {
              "3/ Động vật đã được xét nghiệm và có kết quả âm tính với các bệnh:"
            }
          </Text>

          <View
            style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}
          >
            <Text
              style={{
                marginTop: 0,
                fontSize: 10,
                fontWeight: "bold",
                width: "51%",
                maxLines: 1,
              }}
            >
              {`bệnh 1, bệnh 2, bệnh 3, bệnh 4, bệnh 5, bệnh 6 `}
            </Text>

            <View
              style={{
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
                width: "49%",
              }}
            >
              <Text
                style={{
                  marginTop: 0,
                  fontSize: 11,
                  fontWeight: "bold",
                  width: "55%",
                  color: "black",
                }}
              >
                {`tại kết quả xét nghiệm số:`}
              </Text>
              <Text
                style={{
                  marginTop: 0,
                  fontSize: 11,
                  fontWeight: "bold",
                  width: "23%",
                  maxLines: 1,
                  textAlign: "center",
                }}
              >
                {`12345`}
              </Text>
              <Text
                style={{
                  marginTop: 0,
                  fontSize: 11,
                  fontWeight: "bold",
                  width: "22%",
                  maxLines: 1,
                  textAlign: "center",
                }}
              >
                {`12345`}
              </Text>
            </View>
          </View>

          <View
            style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}
          >
            <Text
              style={{
                marginTop: 0,
                fontSize: 11,
                fontWeight: "bold",
                width: "6%",
                color: "black",
              }}
            >
              {`ngày`}
            </Text>
            <Text
              style={{
                marginTop: 0,
                marginLeft: "3px",
                fontSize: 11,
                fontWeight: "bold",
                width: "4%",
                textAlign: "right",
              }}
            >
              {`20 `}
            </Text>
            <Text
              style={{
                marginTop: 0,
                fontSize: 11,
                fontWeight: "bold",
                width: "6%",
                textAlign: "right",
              }}
            >
              {`11 `}
            </Text>
            <Text
              style={{
                marginTop: 0,
                fontSize: 11,
                fontWeight: "bold",
                width: "7%",
                textAlign: "right",
              }}
            >
              {`2000`}
            </Text>
            <Text
              style={{
                marginTop: 0,
                fontSize: 11,
                fontWeight: "bold",
                width: "9%",
                color: "black",
              }}
            >
              {` của`}
            </Text>

            <Text
              style={{
                marginTop: 0,
                fontSize: 11,
                fontWeight: "bold",
                width: "40%",
                maxLines: 1,
              }}
            >
              {`của cơ quan tổ chức`}
            </Text>
            <Text
              style={{
                marginTop: 0,
                fontSize: 11,
                fontWeight: "bold",
                width: "25%",
                fontStyle: "italic",
                color: "black",
              }}
            >
              {`(gửi kèm bản sao, nếu có)`}
            </Text>
          </View>
        </View>

        <Text
          style={{
            marginTop: 0,
            fontSize: 11,
            fontWeight: "bold",
            color: "black",
          }}
        >
          {`4/ Động vật đã được tiêm phòng vắc xin với các bệnh:`}
        </Text>

        <View
          style={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            marginTop: "3px",
          }}
        >
          <Text
            style={{
              marginTop: 0,
              fontSize: 11,
              fontWeight: "bold",
              width: "58%",
              maxLines: 1,
              marginLeft: "5px",
            }}
          >
            {`đã được tiêm phòng bệnh 1`}
          </Text>
          <Text
            style={{
              marginTop: 0,
              fontSize: 11,
              fontWeight: "bold",
              width: "20%",
              maxLines: 1,
              textAlign: "right",
              color: "black",
            }}
          >
            {`tiêm phòng ngày `}
          </Text>
          <Text
            style={{
              marginTop: 0,
              fontSize: 11,
              fontWeight: "bold",
              width: "6%",
              textAlign: "right",
            }}
          >
            {`20 `}
          </Text>
          <Text
            style={{
              marginTop: 0,
              fontSize: 11,
              fontWeight: "bold",
              width: "6%",
              textAlign: "right",
            }}
          >
            {`11 `}
          </Text>
          <Text
            style={{
              marginTop: 0,
              fontSize: 11,
              fontWeight: "bold",
              width: "9%",
              textAlign: "right",
            }}
          >
            {`2000`}
          </Text>
        </View>
        <View
          style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}
        >
          <Text
            style={{
              marginTop: 0,
              fontSize: 11,
              fontWeight: "bold",
              width: "58%",
              maxLines: 1,
              marginLeft: "5px",
            }}
          >
            {`đã được tiêm phòng bệnh 2`}
          </Text>
          <Text
            style={{
              marginTop: 0,
              fontSize: 11,
              fontWeight: "bold",
              width: "20%",
              maxLines: 1,
              textAlign: "right",
              color: "black",
            }}
          >
            {`tiêm phòng ngày `}
          </Text>
          <Text
            style={{
              marginTop: 0,
              fontSize: 11,
              fontWeight: "bold",
              width: "6%",
              textAlign: "right",
            }}
          >
            {`20 `}
          </Text>
          <Text
            style={{
              marginTop: 0,
              fontSize: 11,
              fontWeight: "bold",
              width: "6%",
              textAlign: "right",
            }}
          >
            {`11 `}
          </Text>
          <Text
            style={{
              marginTop: 0,
              fontSize: 11,
              fontWeight: "bold",
              width: "9%",
              textAlign: "right",
            }}
          >
            {`2000`}
          </Text>
        </View>

        <Text
          style={{
            marginTop: "5px",
            fontSize: 11,
            fontWeight: "bold",
            color: "black",
          }}
        >
          {`5/ Phương tiện vận chuyển, các vật dụng khác có liên quan kèm theo bảo đảm vệ sinh thú y, đã`}
        </Text>

        <View
          style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}
        >
          <Text
            style={{
              marginTop: 0,
              fontSize: 11,
              fontWeight: "bold",
              width: "29%",
              color: "black",
            }}
          >
            {`được khử trùng tiêu độc bằng`}
          </Text>
          <Text
            style={{
              marginTop: 0,
              fontSize: 11,
              fontWeight: "bold",
              width: "35%",
              maxLines: 1,
            }}
          >
            {`khử trung tiêu độc`}
          </Text>
          <Text
            style={{
              marginTop: 0,
              fontSize: 11,
              fontWeight: "bold",
              width: "9%",
              color: "black",
            }}
          >
            {`nồng độ `}
          </Text>
          <Text
            style={{
              marginTop: 0,
              fontSize: 11,
              fontWeight: "bold",
              width: "26%",
              maxLines: 1,
            }}
          >
            {`100%`}
          </Text>
        </View>

        <View
          style={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            marginTop: 5,
          }}
        >
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
              width: "55%",
            }}
          >
            <Text
              style={{
                marginTop: 0,
                fontSize: 11,
                width: "45%",
                color: "black",
              }}
            >
              {`Giấy có giá trị đến ngày`}
            </Text>
            <Text
              style={{
                marginTop: 0,
                fontSize: 11,
                fontWeight: "bold",
                width: "10%",
                textAlign: "right",
              }}
            >
              {`20 `}
            </Text>
            <Text
              style={{
                marginTop: 0,
                fontSize: 11,
                fontWeight: "bold",
                width: "7%",
                textAlign: "right",
              }}
            >
              {`11 `}
            </Text>
            <Text
              style={{
                marginTop: 0,
                fontSize: 11,
                fontWeight: "bold",
                width: "12%",
                textAlign: "right",
              }}
            >
              {`2000`}
            </Text>
          </View>

          <View style={{ width: "45%", textAlign: "center" }}>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
              }}
            >
              <Text
                style={{
                  marginTop: 0,
                  fontSize: 11,
                  width: "16%",
                  color: "black",
                }}
              >
                {`Cấp tại `}
              </Text>

              <Text
                style={{
                  marginTop: 0,
                  fontSize: 10,
                  width: "30%",
                  maxLines: 1,
                }}
              >
                {`TP.HCM`}
              </Text>

              <Text
                style={{
                  marginTop: 0,
                  fontSize: 11,
                  width: "12%",
                  textAlign: "left",
                  color: "black",
                }}
              >
                {` ngày`}
              </Text>

              <Text
                style={{
                  marginTop: 0,
                  fontSize: 11,
                  fontWeight: "bold",
                  width: "10%",
                  textAlign: "right",
                }}
              >
                {`20 `}
              </Text>
              <Text
                style={{
                  marginTop: 0,
                  fontSize: 11,
                  fontWeight: "bold",
                  width: "16%",
                  textAlign: "right",
                }}
              >
                {`11 `}
              </Text>
              <Text
                style={{
                  marginTop: 0,
                  fontSize: 11,
                  fontWeight: "bold",
                  width: "16%",
                  textAlign: "right",
                }}
              >
                {`2000`}
              </Text>
            </View>

            <Text
              style={{
                marginTop: 0,
                fontSize: 11,
                fontStyle: "bold",
                color: "black",
              }}
            >
              {`KIỂM DỊCH VIÊN ĐỘNG VẬT`}
            </Text>
            <Text style={{ marginTop: 0, fontSize: 11, color: "black" }}>
              {`(Ký, ghi rõ họ tên)`}
            </Text>
          </View>
        </View>

        <Text
          style={[styles.note, { fontSize: 8, marginTop: 60, color: "black" }]}
        >
          {
            "-(1): Đối với động vật làm giống\n-(2): Tên cơ quan trả lời kết quả xét nghiệm"
          }
        </Text>
      </Page>
    </Document>
  );
};

export { PDF7 };
