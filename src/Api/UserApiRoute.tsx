import { useQuery } from "react-query";

const UserApiRoute = {
  get Base() {
    return "/user";
  },

  get getSingle() {
    return "/user/get-single";
  },

  get register() {
    return "/accounts/register";
  },

  get changePassword() {
    return "/accounts/change-password";
  },

  get forgotPassword() {
    return "/accounts/forgot-password";
  },
  get resetPassword() {
    return "/accounts/reset-password";
  },

  get verifyEmail() {
    return "/accounts/verify-email";
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
