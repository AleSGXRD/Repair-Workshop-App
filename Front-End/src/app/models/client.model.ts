import { Order, OrderFinished } from "./order.model"

interface Client{
    id:number,
    name:String,
    ci:string,
    email:string,
    phoneNumber:string

    order:Order[],
    orderFinished: OrderFinished[]

}

export {Client};