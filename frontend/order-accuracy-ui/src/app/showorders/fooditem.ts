export interface FoodItem {
    name: String,
    description: String,
    img: String,
    items: Item[]
}
export interface Item {
    name: String,
    isadded: boolean,
    optional: boolean
}

export interface orderItem {
    name: String,
    orderId: String,
    item: String

}


export interface customerOrder {
    oid:String,
    omessage: String,
    items:String[]

}

export const FOODITEMS: FoodItem[] = [
    {
        name: "Quarter Pounder with Cheese", items: [{ name: "Seasme Seed Bun", isadded: false, optional: true },
        { name: "Beef", isadded: false, optional: true },
        { name: "Shredded Lettuce", isadded: false, optional: false },
        { name: "Roma Tomato", isadded: false, optional: false },
        { name: "3 Half Stripes Bacon", isadded: false, optional: false },
        { name: "American Cheese", isadded: false, optional: false }],
        description: " Quarter Pounder with Cheese Burger with  bacon slices , Lettuce, Roma Tomato and American Cheese",
        img: 'Burger'
        
    },
    { name: "Medium Fries", items: [
        { name: "fries", isadded: false, optional: true },
    ], description: "Medium Crispy fries" ,img:'Fries'},
    { name: "Large Fries", items: [
        { name: "fries", isadded: false, optional: true },
    ], description: "Large Crispy fries" ,img:'Fries'}
];