const ManageAbattoirRoute = {
  get Base() {
    return "/quan-ly-lo-mo";
  },
  get getabattoir() {
    return this.Base;
  },
  get create() {
    return this.Base.concat("/tao-lo-mo");
  },
  get update() {
    return this.Base.concat("/cap-nhat-lo-mo/:id");
  },
  get delete() {
    return this.Base.concat("/xoa-lo-mo/:id");
  },
  get getAbattoir() {
    return "/abattoir";
  },
  get createAbattoir() {
    return "/abattoir/create-abattoir";
  },
};

export default ManageAbattoirRoute;