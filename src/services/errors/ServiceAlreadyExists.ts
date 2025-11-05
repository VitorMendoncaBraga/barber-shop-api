export class ServiceAlreadyExists extends Error{
    constructor(){
        super("Serviço já existente")
    }
}