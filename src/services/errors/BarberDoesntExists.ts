export class BarberDoesntExists extends Error {
    constructor(){
        super("Barber does not exists.");
    }
}