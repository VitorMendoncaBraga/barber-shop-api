export class UserDoesntExists extends Error {
    constructor(){
        super("User does not exists.");
    }
}