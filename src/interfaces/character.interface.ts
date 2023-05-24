export interface ICharacterResponse {
    docs: ICharacter[]
    total: number
    limit: number
    offset: number
    page: number
    pages: number
}

export interface ICharacter {
    _id: string
    height: string
    race: string
    gender?: string
    birth: string
    spouse: string
    death: string
    realm: string
    hair: string
    name: string
    wikiUrl?: string
}
