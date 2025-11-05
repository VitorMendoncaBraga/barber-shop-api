export class BarberAlreadyExists extends Error {
    constructor(){
        super("Barbeiro já existente");
    }
}