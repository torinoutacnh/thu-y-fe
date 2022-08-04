const AccountApiEndpoint = {
  get Base() {
    return "/accounts";
  },
  get refreshToken() {
    return this.Base.concat("/refresh-token");
  },
  get login() {
    return this.Base.concat("/authenticate");
  },
};

export default AccountApiEndpoint;
