import { notification } from "antd";
import { ApiRoute } from "Api";
import { useAuth } from "./useAuth";
import { useLoading } from "./useLoading";

export interface downloadModel {
    dateStart?: string,
    dateEnd?: string,
    userId?: string
}

export const useDownloadFile = () => {

    const { user } = useAuth();
    const { setLoading } = useLoading();


    notification.config({
        placement: "topRight",
        bottom: 50,
        duration: 3,
        rtl: true,
    });

    type NotificationType = "success" | "info" | "warning" | "error";

    const openNotificationWithIcon = (
        type: NotificationType,
        title: string

    ) => {
        notification[type]({
            message: title

        });
    };

    const doFecthDownloadFile = (fileName: string, downloadModel: downloadModel) => {


        setLoading(true)
        fetch(process.env.REACT_APP_API.concat(ApiRoute.excelFiles), {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer ".concat(user.token),
            },
            body: JSON.stringify(String(downloadModel)),
        })
            .then((res) => {
                return res.blob()
            })
            .then(blob => {

                openNotificationWithIcon("success", "Đang tải xuống")

                console.log("blob => ", blob);

                const url = window.URL.createObjectURL(blob);
                const a = document.createElement("a");
                a.style.display = "none";
                a.href = url;
                // the filename you want
                a.download = fileName.concat(".xlsx");
                document.body.appendChild(a);
                a.click();
                window.URL.revokeObjectURL(url);
            })
            .catch(() => {
                openNotificationWithIcon("error", "Tải xuống thất bại")
            })
            .finally(() => {
                setLoading(false)
            })
    }

    return doFecthDownloadFile
}