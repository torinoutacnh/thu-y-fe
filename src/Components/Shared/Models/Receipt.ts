import { AllocateModel } from "./Allocate";

interface ReceiptModel {
  id?: string;
  name?: string;
  page?: string;
  codeName?: string;
  codeNumber?: string;
  effectiveDate?: string;
  allocates?: AllocateModel[]
}

export type { ReceiptModel };
