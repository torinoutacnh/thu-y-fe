interface AbattoirModel {
  id?: string;
  name?: string;
  address?: string;
  managerName?: string;
  email?: string;
  phone?: string;
}

interface AbattoirPaging {
  pageNumber: number;
  pageSize: number;
  id?: string;
  name?: string;
  address?: string;
  managerName?: string;
  email?: string;
  phone?: string;
}

export type { AbattoirModel, AbattoirPaging };
