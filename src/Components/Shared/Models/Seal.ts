interface SealModel {
    id?: string;
    sealName?: string;
    sealCode?: string;
    reportTicketId?: string;
    content?: string;
    id_Pricing?: string;
    price?: number;
    amount?: number;
}

interface UpdateSealTabModel {
    reportId: string;
    sealTabs: { id: string, sealName: string, sealCode: string }[]
}

export type { SealModel, UpdateSealTabModel }