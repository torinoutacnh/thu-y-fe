interface SealModel{
    id?:string;
    sealName?:string;
    sealCode?:string;
    reportTicketId?:string;
    unitPrice?:number
}

interface UpdateSealTabModel{
    reportId:string;
    sealTabs:{id:string,sealName:string,sealCode:string}[]
}

export type {SealModel,UpdateSealTabModel}