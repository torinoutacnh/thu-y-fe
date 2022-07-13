import React from "react";

const RemoveUndefine = (obj: any) => {
  Object.keys(obj).forEach((key) => obj[key] === undefined && delete obj[key]);
};

export { RemoveUndefine };
