export interface FoodItem {
    name: String,
    description: String,
    items: Item[]
}
export interface Item {
    name: String,
    isadded: boolean,
    optional: boolean
}

export const FOODITEMS: FoodItem[] = [
    {
        name: "Burger", items: [{ name: "Ciabatta Bun", isadded: false, optional: true },
        { name: "Cripsy Chicken", isadded: false, optional: true },
        { name: "Lettue", isadded: false, optional: false },
        { name: "Tomato", isadded: false, optional: false },
        { name: "Bacon", isadded: false, optional: false },
        { name: "Cheese", isadded: false, optional: false }],
        description: " Juicy Chicken Burger with bacon slices , lettue, tomato and Cheese"
    },
    { name: "Fries", items: [{ name: "Cheese", isadded: false, optional: false }], description: "Cripsy fries" }
];