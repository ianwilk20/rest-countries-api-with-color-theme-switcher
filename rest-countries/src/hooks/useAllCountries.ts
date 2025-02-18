import { useEffect, useState } from 'react'
import { Country } from '../types/Country'

interface useCountriesProps {}

interface useCountriesReturns {
    isLoading: boolean
    isError: boolean | unknown
    data: Country[] | null
}
export const useCountries = (): useCountriesReturns => {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [isError, setIsError] = useState<boolean | unknown>(false)
    const [data, setData] = useState<Country[] | null>(null)

    useEffect(() => {
        const getAllCountries = async () => {
            setIsLoading(true)
            try {
                const resp = await fetch(
                    'https://restcountries.com/v3.1/all?fields=name,capital,population,region,flags'
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
            getAllCountries()
        }
    }, [])

    return {
        isLoading,
        isError,
        data,
    }
}
