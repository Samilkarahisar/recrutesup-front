import { Employee } from './employee';
import { Offer } from './offer';
import { Wish } from './wish';

export class Company {
    id: number;
    name: string;
    mailAddress: string;
    websiteUrl: string;
    description: string;
    state: string;
    offers: Offer[];
    employees: Employee[];
    wishSendList: Wish[];
}