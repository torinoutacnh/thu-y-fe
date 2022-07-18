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
  get animalkilling() {
    return this.Base.concat("/animal-killing");
  },
  get listQuarantine() {
    return this.Base.concat("/list-quarantine");
  },
  get getSingleReport() {
    return this.Base.concat("/single-report");
  },
  get delete() {
    return this.Base.concat("/delete-report");
  },
};

export default ReportApiRoute;
