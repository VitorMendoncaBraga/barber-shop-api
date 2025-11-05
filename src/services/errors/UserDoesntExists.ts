export class UserDoesntExists extends Error {
    constructor(){
        super("Usuário não existente");
    }
}