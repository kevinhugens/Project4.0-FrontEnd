export class User {
    constructor(public userID: number, public firstName: string, public lastName: string, public email: string, public password: string, public token: string,
        public role: string) {
    }
}
