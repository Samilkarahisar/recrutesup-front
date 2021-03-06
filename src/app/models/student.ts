import { Attachment } from './attachment';
import { Wish } from './wish';

export class Student {
    id: number;
    firstname: string;
    lastname: string;
    mailAddress: string;
    phoneNumber: string;
    schoolYear: string;
    label: string;
    description: string;
    state: string;
    wishSendList: Wish[];
    wishReceivedList: Wish[];
    attachmentList: Attachment[];
}