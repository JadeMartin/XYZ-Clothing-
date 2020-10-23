export interface Currency {
    base: string,
    rates: {
        USD?: number,
        AUD?: number,
        CNY?: number
    }
}