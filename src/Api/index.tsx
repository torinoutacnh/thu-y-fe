import AnimalApiRoute from "./AnimalApiRoute";
import FormApiRoute from "./FormApiRoute";
import listAnimalApiRoute from "./ListAnimalApiRoute";
import ReportApiRoute from "./ReportApiRoute";
import SealTabApiRoute from "./SealTabApiRoute";
import UserApiRoute from "./UserApiRoute";

export {
  SealTabApiRoute,
  ReportApiRoute,
  FormApiRoute,
  UserApiRoute,
  AnimalApiRoute,
  listAnimalApiRoute,
};

export const ApiRoute = {
  getseals: "/sealconfig",
  createsealtab: "/sealconfig",
};
