const publicEndpoints = {
  login: "/dang-nhap",
  register: "/dang-ky",
  verifyEmail: "/verify",
  forgotPass: "/forgotpass",
};

const staffEndpoints = {
  get basepath() {
    return "/nhan-vien";
  },
  get home() {
    return this.basepath;
  },
  get createStaff() {
    return this.basepath.concat("/them-nhan-vien");
  },
  get updateStaff() {
    return this.basepath.concat("/thong-tin-nhan-vien/:id");
  },
};

const manageabattoirEndpoints = {
  get basepath() {
    return "/quan-ly-lo-mo";
  },
  get home() {
    return this.basepath;
  },
  get createabattoir() {
    return this.basepath.concat("/tao-lo-mo");
  },
  get updateabattoir() {
    return this.basepath.concat("/cap-nhat-lo-mo/:id");
  },
};

const abattoirEndpoints = {
  get basepath() {
    return "/lo-mo";
  },
  get home() {
    return this.basepath;
  },
  get nkgm() {
    return this.basepath.concat("/nhat-ky-giet-mo");
  },
  get cnkdxkdv() {
    return this.basepath.concat("/phieu-chung-nhan-kiem-dich");
  },
  get createreport() {
    return this.basepath.concat("/tao-bao-cao");
  },
  get updatereport() {
    return this.basepath.concat("/cap-nhat-bao-cao/:id");
  },
  get createAbattoi() {
    return this.basepath.concat("/tao-lo-mo");
  }
};

const animalEndpoints = {
  get basepath() {
    return "/dong-vat";
  },
  get home() {
    return this.basepath;
  },
  get updateAnimal() {
    return this.basepath.concat("/cap-nhat-dong-vat/:id");
  },
  get createAnimal() {
    return this.basepath.concat("/tao-dong-vat");
  }
};

const generalEndpoints = {
  home: "/",
  notfound: "/chuc-nang-dang-phat-trien",
};

const manageReceiptEndpoints = {
  get basepath() {
    return "/quan-ly-hoa-don";
  },
  get home() {
    return this.basepath;
  },
  get createreceipt() {
    return this.basepath.concat("/tao-hoa-don");
  },
  get updatereceipt() {
    return this.basepath.concat("/cap-nhat-hoa-don/:id");
  },
  get createAllocate() {
    return "/cap-hoa-don"
  },
  get createReceiptReport() {
    return "/su-dung-hoa-don"
  }
};

const quarantineEndpoints = {
  get basepath() {
    return "/kiem-dich";
  },
  get home() {
    return this.basepath;
  },
  get vsyt() {
    return this.basepath.concat("/bien-ban-ve-sinh-y-te");
  },
  get cnkd() {
    return this.basepath.concat("/chung-nhan-kiem-dich");
  },
  get dkkd() {
    return this.basepath.concat("/dang-ky-kiem-dich");
  },
  get createreport() {
    return this.basepath.concat("/tao-bao-cao");
  },
  get updatereport() {
    return this.basepath.concat("/cap-nhat-bao-cao");
  },
};

export {
  publicEndpoints,
  manageabattoirEndpoints,
  abattoirEndpoints,
  animalEndpoints,
  quarantineEndpoints,
  manageReceiptEndpoints,
  staffEndpoints,
  generalEndpoints,
};
