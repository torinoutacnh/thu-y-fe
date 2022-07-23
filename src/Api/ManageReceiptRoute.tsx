const ManageReceiptRoute = {
  get Base() {
    return "/quan-ly-hoa-don";
  },

  get update() {
    return this.Base.concat("/cap-nhat-hoa-don/:id");
  },
  get delete() {
    return "/receipt/delete-receipt";
  },
  get getReceipt() {
    return "/receipt";
  },
  get createReceipt() {
    return "/receipt/create-receipt";
  },
  get updateReceipt() {
    return "/receipt/update-receipt";
  },
  get createAllocateReceipt() {
    return "/allocate-receipt/create"
  },
  get allocateReceipt() {
    return "/allocate-receipt"
  }
};

export default ManageReceiptRoute;
