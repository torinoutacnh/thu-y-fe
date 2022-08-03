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
        paddingTop: 50,
        marginLeft: -6,
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
        color: "black",
        fontStyle: "bold"
    },
    header1_1: {
        fontSize: 13,
        textAlign: "center",
        color: "black",
        fontStyle: "bold"
    },

    header2: {
        fontSize: 13,
        textAlign: "center",
        color: "black",

    },

    header3: {
        fontSize: 12,
        textAlign: "center",
        color: "black",
        textDecoration: "underline",
        fontStyle: "bold"
    },
    title1: {
        fontSize: 15,
        textAlign: "center",
        color: "black",
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
        display: "flex",
        textAlign: "center",
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
        color: "black"
    },

    col31: {
        width: "26%",
        fontSize: 9,
        border: "1px solid white",
        padding: "10px",
        fontStyle: "bold",
        color: "black"
    },

    col12: {
        width: "12%",
        fontSize: 9,
        border: "1px solid white",
        padding: "10px",
        fontStyle: "bold",
        color: "black"
    },
    col24: {
        width: "22%",
        fontSize: 9,
        border: "1px solid white",
        fontStyle: "bold",
        color: "black"
    },
    col13: {
        width: "12%",
        fontSize: 9,
        borderTop: "1px solid white",
        borderBottom: "1px solid white",
        padding: "3.9x",
        fontStyle: "bold",
        color: "black"
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
        alignItems: "center"
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
        alignItems: "center"
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
const PDF7 = () => (
    <Document>
        <Page style={styles.body}>

            <View style={styles.containerHeader1}>
                <View style={{ width: "80%", alignContent: "center", marginLeft: "10%", flexWrap: "nowrap", opacity: 0 }} >
                    <Text style={styles.header1_1} fixed>
                        {`CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM`}
                    </Text>
                    <Text style={styles.header3} fixed>
                        {`Độc lập - Tự do - Hạnh phúc`}
                    </Text>
                </View>

                <View style={{ width: "10%", justifyContent: "flex-end", alignSelf: "flex-start", opacity: 0 }}>
                    <Text style={styles.header1_1} fixed>
                        {`Mẫu: 7`}
                    </Text>
                </View>
            </View>

            <View style={styles.containerHeader2}>
                <View style={{ width: "100%", padding: "12 70", textAlign: "center", opacity: 0 }}>
                    <Text style={styles.title1} fixed>
                        {`BIÊN BẢN GHI NHẬN TÌNH TRẠNG VỆ SINH THÚ Y CỦA ĐỘNG VẬT, SẢN PHẨM ĐỘNG VẬT`}
                    </Text>
                </View>
            </View>

            <View style={styles.containerHeader3}>
                <Text style={{ opacity: 0 }}>
                    {`Số: 21099101`}
                </Text>
                <Text style={{ marginLeft: 25, fontSize: 13, fontStyle: "italic", opacity: 0 }}>
                    {`/BB-VSTY`}
                </Text>
            </View>

            <View style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", fontSize: 11, lineHeight: 1.8, paddingTop: 2.1 }}>
                <Text style={{ width: "20%", opacity: 0 }}>
                    {`Hôm nay, vào hồi `}
                </Text>
                <Text style={{ width: "4%", fontSize: 10, textAlign: "center" }}>
                    {`13 `}
                </Text>
                <Text style={{ width: "6.5%", opacity: 0 }}>
                    {` giờ `}
                </Text>
                <Text style={{ width: "4%", fontSize: 10, textAlign: "center" }}>
                    {` 00 `}
                </Text>
                <Text style={{ width: "12%", opacity: 0 }}>
                    {` phút, ngày`}
                </Text>
                <Text style={{ width: "5%", fontSize: 10, textAlign: "center" }}>
                    {` 22 `}
                </Text>
                <Text style={{ width: "7%", opacity: 0 }}>
                    {` m `}
                </Text>
                <Text style={{ width: "6%", fontSize: 10, textAlign: "center" }}>
                    {` 12 `}
                </Text>
                <Text style={{ width: "6%", opacity: 0 }}>
                    {`y`}
                </Text>
                <Text style={{ width: "6%", fontSize: 10, textAlign: "center" }}>
                    {` 2022 `}
                </Text>
            </View>

            <View style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", lineHeight: 1.8, paddingBottom: 0.5 }}>
                <Text style={{ fontSize: 11, width: "16%", opacity: 0 }}>
                    {`Tại địa điểm : `}
                </Text>
                <Text style={{ fontSize: 9, maxWidth: "84%" }}>
                    {`Hồ Chí Minh `}
                </Text>
            </View>

            <Text style={{ fontSize: 11, lineHeight: 1.3, opacity: 0 }}>
                {`Chúng tôi gồm có :`}
            </Text>

            <View style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", lineHeight: 1.6, paddingTop: 2, marginTop: 1.5 }}>
                <Text style={{ fontSize: 11, width: "13%", opacity: 0 }}>
                    {`1/ Ông/bà : `}
                </Text>
                <Text style={{ fontSize: 9, width: "40%" }}>
                    {`Nguyễn Văn A `}
                </Text>
                <Text style={{ fontSize: 11, width: "13%", opacity: 0 }}>
                    {`Chức vụ : `}
                </Text>
                <Text style={{ fontSize: 9 }}>
                    {` Nhân viên `}
                </Text>
            </View>

            <View style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", lineHeight: 1.6, paddingTop: 1 }}>
                <Text style={{ fontSize: 11, width: "42%", opacity: 0 }}>
                    {`Là cán bộ cơ quan kiểm dịch động vật : `}
                </Text>
                <Text style={{ fontSize: 9, maxWidth: "58%" }}>
                    {`Quận Tân Bình `}
                </Text>
            </View>

            <View style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", lineHeight: 1.6, marginTop: 1 }}>
                <Text style={{ fontSize: 11, width: "13%", opacity: 0 }}>
                    {`2/ Ông/bà : `}
                </Text>
                <Text style={{ fontSize: 9, width: "41%" }}>
                    {`Nguyễn Thị B `}
                </Text>
                <Text style={{ fontSize: 11, opacity: 0 }}>
                    {`là chủ hàng (hoặc người đại diện) `}
                </Text>
            </View>

            <View style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", lineHeight: 1.6, paddingTop: 1, marginTop: 1.5 }}>
                <Text style={{ fontSize: 11, width: "22%", opacity: 0 }}>
                    {`Địa chỉ giao dịch : `}
                </Text>
                <Text style={{ fontSize: 9, maxWidth: "78%", paddingTop: 0.5 }}>
                    {`46A, Lê Trung Nghĩa, P.12, Q. Tân Bình, TP. Hồ Chí Minh `}
                </Text>
            </View>

            <View style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", fontSize: 11, lineHeight: 1.6, marginTop: 0.5 }}>
                <Text style={{ width: "17%", opacity: 0 }}>
                    {`Số điện thoại : `}
                </Text>
                <Text style={{ width: "23%", fontSize: 10, paddingTop: 1, textAlign: "center" }}>
                    {`0123456789 `}
                </Text>
                <Text style={{ width: "6%", opacity: 0 }}>
                    {` Fax : `}
                </Text>
                <Text style={{ width: "19%", fontSize: 10, paddingTop: 1, textAlign: "center" }}>
                    {`12378123123 `}
                </Text>
                <Text style={{ width: "9%", opacity: 0 }}>
                    {` Email : `}
                </Text>
                <Text style={{ fontSize: 9, paddingTop: 1 }}>
                    {`abacadawdad@gmail.com `}
                </Text>
            </View>

            <View style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", lineHeight: 1.6, marginTop: 2.5 }}>
                <Text style={{ fontSize: 11, width: "53%", opacity: 0 }}>
                    {`Trong khi tiến hành kiểm tra vệ sinh thú y lô hàng : `}
                </Text>
                <Text style={{ fontSize: 9, maxWidth: "47%" }}>
                    {`gia cầm `}
                </Text>
            </View>

            <View style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", fontSize: 11, lineHeight: 1.7, marginTop: 1.5 }}>
                <Text style={{ width: "3%", opacity: 0 }}>
                    {`1/ `}
                </Text>
                <Text style={{ width: "37%", fontSize: 9, textAlign: "center" }}>
                    {`Gà `}
                </Text>
                <Text style={{ width: "11%", opacity: 0 }}>
                    {` Số lượng: `}
                </Text>
                <Text style={{ width: "15%", fontSize: 10, textAlign: "center" }}>
                    {`100`}
                </Text>
                <Text style={{ width: "19%", opacity: 0 }}>
                    {` Khối lượng: `}
                </Text>
                <Text style={{ width: "8%", fontSize: 9, textAlign: "center", }}>
                    {` 2kg `}
                </Text>
            </View>

            <View style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", fontSize: 11, lineHeight: 1.7, marginTop: 0.5 }}>
                <Text style={{ width: "3%", opacity: 0 }}>
                    {`2/ `}
                </Text>
                <Text style={{ width: "37%", fontSize: 9, textAlign: "center" }}>
                    {`Vịt `}
                </Text>
                <Text style={{ width: "11%", opacity: 0 }}>
                    {` Số lượng: `}
                </Text>
                <Text style={{ width: "15%", fontSize: 10, textAlign: "center" }}>
                    {`100`}
                </Text>
                <Text style={{ width: "19%", opacity: 0 }}>
                    {` Khối lượng: `}
                </Text>
                <Text style={{ width: "8%", fontSize: 9, textAlign: "center" }}>
                    {` 2kg `}
                </Text>
            </View>

            <View style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", fontSize: 11, lineHeight: 1.7, marginTop: 0.5 }}>
                <Text style={{ width: "3%", opacity: 0 }}>
                    {`3/ `}
                </Text>
                <Text style={{ width: "37%", fontSize: 9, textAlign: "center" }}>
                    {`Ngỗng `}
                </Text>
                <Text style={{ width: "11%", opacity: 0 }}>
                    {` Số lượng: `}
                </Text>
                <Text style={{ width: "15%", fontSize: 10, textAlign: "center" }}>
                    {`200`}
                </Text>
                <Text style={{ width: "19%", opacity: 0 }}>
                    {` Khối lượng: `}
                </Text>
                <Text style={{ width: "8%", fontSize: 9, textAlign: "center" }}>
                    {` 2kg `}
                </Text>
            </View>

            <View style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", fontSize: 11, lineHeight: 1.7, marginTop: 0.5 }}>
                <Text style={{ width: "3%", opacity: 0 }}>
                    {`4/ `}
                </Text>
                <Text style={{ width: "37%", fontSize: 9, textAlign: "center" }}>
                    {`Gà móng đỏ `}
                </Text>
                <Text style={{ width: "11%", opacity: 0 }}>
                    {` Số lượng: `}
                </Text>
                <Text style={{ width: "15%", fontSize: 10, textAlign: "center" }}>
                    {`1000`}
                </Text>
                <Text style={{ width: "19%", opacity: 0 }}>
                    {` Khối lượng: `}
                </Text>
                <Text style={{ width: "8%", fontSize: 9, textAlign: "center" }}>
                    {` 2.500 kg `}
                </Text>
            </View>

            <View style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", lineHeight: 1.9, marginLeft: 6, paddingTop: 1, marginTop: -2.5 }}>
                <Text style={{ fontSize: 11, height: "38", color: "white" }}>
                    {`Phương pháp kiểm tra vệ sinh thú y của hàng : `}
                    <Text style={{ fontSize: 9, color: "white" }}>
                        {` #`}
                    </Text>
                    <Text style={{ fontSize: 9, color: "black" }}>
                        {`adawdawdawdawddddddddddddddddsssssssssssssssssssdddddddddddddddddddddddddsssgggggggggggdd `}
                    </Text>
                </Text>
            </View>

            <View style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", lineHeight: 2.1, marginLeft: 6, marginTop: -1 }}>
                <Text style={{ fontSize: 11, height: "84", color: "white" }}>
                    {`Tình trạng vệ sinh thú y của hàng : `}
                    <Text style={{ fontSize: 9, color: "white" }}>
                        {` # `}
                    </Text>
                    <Text style={{ fontSize: 9, color: "black" }}>
                        {` Business Users (Product Owners) Như một điều luật, đây là những người đưa ra quyết định trong việc kết thúc kiểm thử. Họ cũng xác định chất lượng công việc đã hoàn thành. Điều quan trọng nhất với họ là kết quả cuối cùng, được chuyển thành dạng ngắn và rút gọn nhất (CÓ hay KHÔNG). Thông tin nên được trình bày dưới dạng trực quan (đồ thị, sơ đồ). `}
                    </Text>
                </Text>
            </View>

            <View style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", lineHeight: 1.9, marginLeft: 6, marginTop: -6 }}>
                <Text style={{ fontSize: 11, height: "38", color: "white" }}>
                    {`Kết luận : `}
                    <Text style={{ fontSize: 9, color: "white" }}>
                        {` ## `}
                    </Text>
                    <Text style={{ fontSize: 9, color: "black" }}>
                        {` Đạt chuẩn yêu cầuddddddddddddddddddddddddddddddddddgggggdddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd `}
                    </Text>
                </Text>
            </View>

            <View style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", lineHeight: 1.9, marginLeft: 6 }}>
                <Text style={{ fontSize: 11, height: "38", color: "white" }}>
                    {`Ý kiến của chủ hàng (hoặc người đại diện) : `}
                    <Text style={{ fontSize: 9, color: "white" }}>
                        {` ## `}
                    </Text>
                    <Text style={{ fontSize: 9, color: "black" }}>
                        {`Khôngdddddddddddddddddddddddddddddddddddddddddgggddddddddadadadadadadawcó `}
                    </Text>
                </Text>
            </View>

        </Page>
    </Document >
);

export { PDF7 };