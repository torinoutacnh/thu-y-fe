import { type } from "os";

interface AllocateModel {
    id?: string,
    userId?: string,
    receiptId?: string,
    amount?: number,
    userName?: string
    codeName?: string,
    codeNumber?: string,
    receiptName?: string,
    totalPage?: number,
    remainPage?: number
}

export type { AllocateModel }