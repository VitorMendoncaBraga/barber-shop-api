export class BarberDoesntExists extends Error {
    constructor(){
        super("Barbeiro inválido");
    }
}