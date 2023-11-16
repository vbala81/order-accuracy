import { FoodItem } from "./fooditem";

export interface Order {
    order: FoodItem[],
    orderdate: Date,
    isready: boolean,
    orderissue: String,
    s3imagelink: String
    orderId: String
}

export interface Results {
    Items: Order[],
    Count: number,
    ScannedCount: number
}