
export interface Product {
    id: number,
    name: string,
    description: string,
    price: {
        base: string,
        amount: number,
        adjAmount: number
    }
    relatedProducts: number[];
}