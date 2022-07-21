interface ReceiptModel {
  id?: string;
  name?: string;
  codeName?: string;
  codeNumber?: string;
  effectiveDate?: string;
  allocates: [
    {
      id?: string;
      codeName?: string;
      codeNumber?: string;
      amount?: number;
      receiptId?: string;
      receiptName?: string;
      userId?: string;
      userName?: string;
    }
  ];
}

export type { ReceiptModel };
