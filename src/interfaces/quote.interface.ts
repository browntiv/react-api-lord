export interface IQuoteRespose {
    docs: IQuote[]
    total: number
    limit: number
    offset: number
    page: number
    pages: number
}

export interface IQuote {
    _id: string
    dialog: string
    movie: string
    character: string
    id: string
}