export interface Country {
    name: {
        common: string
        official: string
        nativeName: {
            [key: string]: {
                official: string
                common: string
            }
        }
    }
    capital: string[]
    region: string
    subregion: string
    population: number
    currencies: {
        [key: string]: {
            name: string
            symbol: string
        }
    }
    languages: {
        [key: string]: string
    }
    flags: {
        png: string
        svg: string
    }
    borders: string[]
    tld: string[]
    cca3: string
}
