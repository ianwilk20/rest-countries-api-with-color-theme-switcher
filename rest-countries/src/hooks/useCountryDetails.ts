import { useEffect, useState } from 'react'
import { Country } from '../types/Country'

interface useCountryDetailsProps {
    country: string
}

interface useCountryDetailsReturns {
    isLoading: boolean
    isError: boolean | unknown
    data: Country | null
}
export const useCountryDetails = ({
    country,
}: useCountryDetailsProps): useCountryDetailsReturns => {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [isError, setIsError] = useState<boolean | unknown>(false)
    const [data, setData] = useState<Country | null>(null)

    useEffect(() => {
        const getCountryDetails = async () => {
            setIsLoading(true)
            try {
                const resp = await fetch(
                    `https://restcountries.com/v3.1/name/${encodeURI(
                        country
                    )}?fields=name,tld,population,currencies,languages,region,subregion,capital,borders,flags`
                )
                if (!resp.ok) {
                    throw new Error(resp.status + ' - ' + resp.statusText)
                }
                const resp_data: Country[] = await resp.json()
                if (!resp_data || resp_data.length === 0 || !resp_data[0]) {
                    throw new Error(
                        resp.status +
                            ' - ' +
                            resp.statusText +
                            ' - returned data does not satisfy constraints: ' +
                            resp_data
                    )
                }

                const foundCountry = resp_data.find((cntry) =>
                    cntry.name.common
                        .toLowerCase()
                        .includes(country.toLowerCase())
                )
                if (!foundCountry) {
                    throw new Error('Cannot find the country specified')
                }
                setData(foundCountry)
            } catch (error) {
                setIsError(error)
                console.error(error)
            } finally {
                setIsLoading(false)
            }
        }

        if (country) {
            getCountryDetails()
        }
    }, [country])

    return {
        isLoading,
        isError,
        data,
    }
}
