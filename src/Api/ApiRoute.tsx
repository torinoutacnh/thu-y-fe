export const ApiRoute = {
  get sealtabBase() {
    return "/sealtab";
  },
  get reportBase() {
    return "/report";
  },
  get userBase() {
    return "/user";
  },
  get register() {
    return this.userBase.concat("/create-user");
  },
  get login() {
    return this.userBase.concat("/login");
  },
  get formBase() {
    return "/form";
  },
  get getform() {
    return this.formBase;
  },
  get createReport() {
    return this.reportBase.concat("/create-report");
  },
  get updateReportAttrs() {
    return this.reportBase.concat("/update-report");
  },
  get createReportSeal() {
    return this.sealtabBase.concat("/create");
  },
  get getreport() {
    return this.reportBase;
  },
  get getSingleReport() {
    return this.reportBase.concat("/single-report");
  },
  get deleteReport() {
    return this.reportBase.concat("/delete");
  },
  get createSeal() {
    return this.sealtabBase.concat("/create");
  },
  get deleteSeal() {
    return this.sealtabBase.concat("/delete");
  },
  get updateSeal() {
    return this.sealtabBase.concat("/update");
  },
  getanimals: "/animal",
  getseals: "/sealconfig",
  createsealtab: "/sealconfig",
  getUser: "/user/get-user",
  getSchedule: "/schedule/get-user-schedule",
  deleteUser: "/user/delete-user",
  createUser: "/user/create-user",
  updateUser: "/user/update-user",
  ///////////////////////////////////////////
  createAnimal: "/animal/create-animal",
  deleteAnimal: "/animal/delete-animal",
  updateAnimal: "/animal/update-animal",
};
