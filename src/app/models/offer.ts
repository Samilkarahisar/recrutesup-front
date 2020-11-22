import { Attachment } from './attachment';

export class Offer {
    id: number;
    label: string;
    description: string;
    address: string;
    city: string;
    mailAddress: string;
    creationDate: Date;
    userFirstname: string;
    userLastname: string;
    state: string;
    idCompany: string;
    attachmentList: Attachment[];

}