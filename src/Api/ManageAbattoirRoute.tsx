const ManageAbattoirRoute = {
  get Base() {
    return "/quan-ly-lo-mo";
  },
  get getabattoir() {
    return this.Base;
  },
  get update() {
    return this.Base.concat("/cap-nhat-lo-mo/:id");
  },
  get delete() {
    return "/abattoir/delete-abattoir";
  },
  get getAbattoir() {
    return "/abattoir";
  },
  get createAbattoir() {
    return "/abattoir/create-abattoir";
  },
  get updateAbattoir() {
    return "/abattoir/update-abattoir";
  },
};

export default ManageAbattoirRoute;
