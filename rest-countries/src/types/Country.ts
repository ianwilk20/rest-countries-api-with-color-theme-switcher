export interface Country {
    name: {
        common: string
        official: string
        nativeName: {
            eng: {
                official: string
                common: string
            }
        }
    }
    capital: string[]
    region: string
    population: number
    flags: {
        png: string
        svg: string
    }
}
