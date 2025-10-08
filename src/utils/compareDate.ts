import { InvalidDate } from "../services/errors/InvalidDate";

export function compareDate(date: Date){
    if(new Date(date) < new Date()){
        return false
    }

    return true
}