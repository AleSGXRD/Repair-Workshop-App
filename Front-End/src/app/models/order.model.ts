import { Client } from "./client.model"

 interface Order{
    id:number,
    kind:string,
    brand:string,
    motherBoard:string,
    CPU:string,
    powerSupply:String,
    GPU:string,
    HDD:string,
    RAM:string,
    others:string,
    description:string,
    price:number,

    createdAt:string,

    client: Client
    clientId:number
}

interface OrderFinished{
    id:number,
    kind:string,
    brand:string,
    motherBoard:string,
    CPU:string,
    powerSupply:String,
    GPU:string,
    HDD:string,
    RAM:string,
    others:string,
    description:string,
    price:number,
    completed:boolean,

    createdAt:string,
    finishedAt:string,

    client: Client
    clientId:number
}

export {Order,OrderFinished}

