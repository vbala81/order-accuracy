export interface FoodItem {
    name: String,
    itemname: String,
    description: String,
    img: String,
    items: Item[],
    orderedItems: OrderedItem[]
}
export interface Item {
    name: String,
    isadded: boolean,
    optional: boolean
}

export interface OrderedItem {
    name: String,
    isadded: boolean,
    sequencenumber: number
}

export interface orderItem {
    name: String,
    orderId: String,
    item: String

}


export interface customerOrder {
    oid: String,
    omessage: String,
    items: String[]

}

export const FOODITEMS: FoodItem[] = [
    {
        name: "Quarter Pounder with Cheese", itemname:"Burger", items: [{ name: "Seasme Seed Bun", isadded: false, optional: true },
        { name: "Beef", isadded: false, optional: true },
        { name: "Shredded Lettuce", isadded: false, optional: false },
        { name: "Roma Tomato", isadded: false, optional: false },
        { name: "3 Half Stripes Bacon", isadded: false, optional: false },
        { name: "American Cheese", isadded: false, optional: false }],
        orderedItems: [{ name: "Bun (Bottom)", isadded: false, sequencenumber: 1 },
        { name: "Beef", isadded: false, sequencenumber: 2 },
        { name: "Cheese", isadded: false, sequencenumber: 3 },
        { name: "Lettuce", isadded: false, sequencenumber: 4 },
        { name: "Tomato", isadded: false, sequencenumber: 5 },
        { name: "Bacon", isadded: false, sequencenumber: 6 },
        { name: "Bun (Top) " , isadded: false, sequencenumber: 7 }],
        description: " Quarter Pounder with Cheese Burger with  bacon slices , Lettuce, Roma Tomato and American Cheese",
        img: 'Burger'

    },
    {
        name: "Medium Fries", 
        itemname:"Fries",
        items: [{ name: "fries", isadded: false, optional: true }],
        orderedItems: [{ name: "fries", isadded: false, sequencenumber: 1 }], 
        description: "Medium Crispy fries", img: 'Fries'
    },
    {
        name: "Large Fries", 
        itemname: "Fries",
        orderedItems: [{ name: "fries", isadded: false, sequencenumber: 1 }],
        items: [{ name: "fries", isadded: false, optional: true },],
        description: "Large Crispy fries", img: 'Fries'
    }
];