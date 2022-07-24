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

interface ReceiptReportModel {
  id?: string,
  userId?: string,
  userName?: string,
  receiptAllocateId?: string,
  receiptName?: string,
  codeName?: string,
  codeNumber?: string,
  dateUse?: string,
  pageUse?: number
}

export type { ReceiptModel, ReceiptReportModel };
