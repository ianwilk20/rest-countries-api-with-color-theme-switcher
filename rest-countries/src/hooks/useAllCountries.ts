import { useEffect, useState } from 'react'
import { Country } from '../types/Country'

interface useAllCountriesProps {
    countryData: Country[] | null
}

interface useAllCountriesReturns {
    isLoading: boolean
    isError: boolean
    data: Country[] | null
}
export const useAllCountries = ({
    countryData,
}: useAllCountriesProps): useAllCountriesReturns => {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [isError, setIsError] = useState<boolean>(false)
    const [data, setData] = useState<Country[] | null>(countryData)

    useEffect(() => {
        const getAllCountries = async () => {
            setIsLoading(true)
            try {
                const resp = await fetch(
                    'https://restcountries.com/v3.1/all?fields=name,capital,population,region,flags,cca3'
                )
                if (!resp.ok) {
                    throw new Error(resp.status + ' - ' + resp.statusText)
                }
                const resp_data = await resp.json()
                setData(resp_data)
            } catch (error) {
                setIsError(true)
                console.error(error)
            } finally {
                setIsLoading(false)
            }
        }

        if (!countryData) {
            console.log('calling fetch')
            getAllCountries()
        }
    }, [countryData, data])

    return {
        isLoading,
        isError,
        data,
    }
}
