import { createContext } from 'react'

interface CountryContextProps {
    country: string
    setCountry: React.Dispatch<React.SetStateAction<string>> | null
}
export const CountryContext = createContext<CountryContextProps>({
    country: '',
    setCountry: null,
})
