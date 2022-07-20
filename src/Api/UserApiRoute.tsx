import { useQuery } from "react-query";

const UserApiRoute = {
  get Base() {
    return "/user";
  },
  get register() {
    return "/accounts/register";
  },
  get verifyEmail() {
    return "/accounts/verify-email"
  },
  get login() {
    return this.Base.concat("/login");
  },
  get getUser() {
    return this.Base.concat("/get-user");
  },
  get getSchedule() {
    return this.Base.concat("/get-user-schedule");
  },
  get create() {
    return this.Base.concat("/create-user");
  },
  get update() {
    return this.Base.concat("/update-user");
  },
  get delete() {
    return this.Base.concat("/delete-user");
  },
};

export default UserApiRoute;
