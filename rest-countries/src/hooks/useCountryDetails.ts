import { useEffect, useState } from 'react'
import { Country } from '../types/Country'

interface useCountriesProps {
    country: string
}

interface useCountriesReturns {
    isLoading: boolean
    isError: boolean | unknown
    data: Country[] | null
}
export const useCountryDetails = ({
    country,
}: useCountriesProps): useCountriesReturns => {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [isError, setIsError] = useState<boolean | unknown>(false)
    const [data, setData] = useState<Country[] | null>(null)

    useEffect(() => {
        const getCountryDetails = async () => {
            setIsLoading(true)
            try {
                const resp = await fetch(
                    `https://restcountries.com/v3.1/name/${country}?fields=name,tld,population,currencies,languages,region,subregion,capital,borders,flags`
                )
                if (!resp.ok) {
                    throw new Error(resp.status + ' - ' + resp.statusText)
                }
                const resp_data = await resp.json()
                setData(resp_data)
            } catch (error) {
                setIsError(error)
                console.error(error)
            } finally {
                setIsLoading(false)
            }
        }

        if (1 > 2) {
            getCountryDetails()
        }
    }, [])

    return {
        isLoading,
        isError,
        data,
    }
}
