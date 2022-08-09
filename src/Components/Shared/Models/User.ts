
interface UserModel{
    id?:string;
    name?:string;
    account?:string;
    password?:string;
    phone?:string;
    email?:string;
    address?:string;
    sex:1|number;
    role:1|number;
}

interface UserLoginModel {
  token?: string;
  refreshToken?:string;
  name?: string;
  account?: string;
  role?: number;
  userId?: string;
  expired?:string;
}

enum RoleType{
  // "Nhân viên kiểm dịch"=1,
  // "Nhân viên lò mổ"=2,
  // "Quản lý"=3,
  "Nhân viên"=1,
  "Quản lý"=2,
}

enum SexType{
  "Nam"=1,
  "Nữ" =2,
}




export {RoleType,SexType}
export type {UserModel,UserLoginModel}