import AnimalApiRoute from "./AnimalApiRoute";
import FormApiRoute from "./FormApiRoute";
import listAnimalApiRoute from "./ListAnimalApiRoute";
import ReportApiRoute from "./ReportApiRoute";
import SealTabApiRoute from "./SealTabApiRoute";
import UserApiRoute from "./UserApiRoute";
import ManageAbattoirRoute from "./ManageAbattoirRoute";
import ManageReceiptRoute from "./ManageReceiptRoute";

export {
  SealTabApiRoute,
  ReportApiRoute,
  FormApiRoute,
  UserApiRoute,
  AnimalApiRoute,
  listAnimalApiRoute,
  ManageAbattoirRoute,
  ManageReceiptRoute,
};

export const ApiRoute = {
  getseals: "/sealconfig",
  createsealtab: "/sealconfig",
  excelFiles: "/files/excel"
};
