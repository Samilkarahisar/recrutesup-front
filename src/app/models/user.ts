import { Role } from "../constants/role";

export class User {
    id: number;
    idCompany: number;
    state: string;
    firstname: string;
    lastname: string;
    mailAddress: string;
    role: Role;
    token: string;
    type: string;
}