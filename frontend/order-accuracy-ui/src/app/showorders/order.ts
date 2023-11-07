import { FoodItem } from "./fooditem";

export interface Order {
    order: FoodItem[],
    orderdate: Date,
    isready: boolean,
    orderissue: String
}