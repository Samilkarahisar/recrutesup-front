import { Attachment } from './attachment';
import { Wish } from './wish';

export class Offer {
    id: number;
    label: string;
    description: string;
    address: string;
    city: string;
    mailAddress: string;
    creationDate: Date;
    userId: number;
    userFirstname: string;
    userLastname: string;
    state: string;
    companyId: number;
    companyName: string;
    companyState: string;
    attachmentList: Attachment[];
    wishReceivedList: Wish[];
}