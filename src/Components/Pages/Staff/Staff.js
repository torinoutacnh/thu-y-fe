import React, { useEffect, useState } from "react";
import { Layout } from "antd";
import "./Staff.css";
import { Spin } from "antd";
import ContentStaff from "./ContentStaff";
import { ApiRoute } from "Api/ApiRoute";
import { useAuth } from "Modules/hooks/useAuth";
const { Header, Footer, Sider, Content } = Layout;
const Staff = () => {
	const [data, setdata] = useState([]);
	const [form, setForm] = useState();
	const [page, setPage] = useState({
		pageIndex: 1,
		pageNumber: 100,
	});
	const user = useAuth();

	useEffect(() => {
		if (user?.token) {
			fetch(
				process.env.REACT_APP_API.concat(ApiRoute.getUser, "?") +
					new URLSearchParams(page),
				{
					method: "GET",
					headers: {
						"Content-Type": "application/json",
						Authorization: "Bearer ".concat(user.token),
					},
				}
			)
				.then((res) => res.json())
				.then((data) => {
					console.log(data);
					setdata(data.data);
				})
				.catch((error) => console.log(error));
		}
	}, [user.token]);

	return (
		<div className="staff-page">
			<Layout className="nav-staff">
				<Layout className="content-staff">
					<Content>
						<ContentStaff liststaff={data} />
					</Content>
				</Layout>
			</Layout>
		</div>
	);
};

export default Staff;
