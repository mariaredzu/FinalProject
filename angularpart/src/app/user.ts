import { Usertype } from './usertype';

export class User {
    id: number;
    name: string;
    firstName: string;
    email: string;
    usertype: Usertype;

    constructor(id: number, name: string, firstName: string, email: string, usertype: Usertype) {
        this.id = id;
        this.name = name;
        this.firstName = firstName;
        this.email = email;
        this.usertype = usertype;
    }
}