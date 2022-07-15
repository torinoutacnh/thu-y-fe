const SealTabApiRoute = {
  get Base() {
    return "/sealtab";
  },
  get create() {
    return this.Base.concat("/create");
  },
  get delete() {
    return this.Base.concat("/delete");
  },
  get update() {
    return this.Base.concat("/update");
  },
};

export default SealTabApiRoute;
