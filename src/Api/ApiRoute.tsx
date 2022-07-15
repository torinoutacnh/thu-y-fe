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

const ReportApiRoute = {
  get Base() {
    return "/report";
  },
  get create() {
    return this.Base.concat("/create-report");
  },
  get update() {
    return this.Base.concat("/update-report");
  },
  get getreport() {
    return this.Base;
  },
  get getSingleReport() {
    return this.Base.concat("/single-report");
  },
  get delete() {
    return this.Base.concat("/delete");
  },
};

const FormApiRoute = {
  get formBase() {
    return "/form";
  },
  get getform() {
    return this.formBase;
  },
};

const UserApiRoute = {
  get Base() {
    return "/user";
  },
  get register() {
    return this.Base.concat("/create-user");
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

const AnimalApiRoute = {
  get Base() {
    return "/animal";
  },
  get getanimals() {
    return this.Base;
  },
  get create() {
    return this.Base.concat("/create-animal");
  },
  get update() {
    return this.Base.concat("/update-animal");
  },
  get delete() {
    return this.Base.concat("/delete-animal");
  },
};

export {
  SealTabApiRoute,
  ReportApiRoute,
  FormApiRoute,
  UserApiRoute,
  AnimalApiRoute,
};

export const ApiRoute = {
  getseals: "/sealconfig",
  createsealtab: "/sealconfig",
};
