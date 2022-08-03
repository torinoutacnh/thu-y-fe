const AccountApiEndpoint = {
  get Base() {
    return "/accounts";
  },
  get refreshToken() {
    return this.Base.concat("/refresh-token");
  },
};

export default AccountApiEndpoint;
