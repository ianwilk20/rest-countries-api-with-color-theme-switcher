import { useEffect, useState } from 'react'
import { Country } from '../types/Country'

interface useBorderCountriesProps {
    borderCodes: string[] | undefined
}

interface useBorderCountriesReturns {
    isLoadingBorders: boolean
    isErrorBorders: boolean | unknown
    borderCountries: Country[] | null
}
export const useBorderCountries = ({
    borderCodes,
}: useBorderCountriesProps): useBorderCountriesReturns => {
    const [isLoadingBorders, setIsLoading] = useState<boolean>(false)
    const [isErrorBorders, setIsError] = useState<boolean | unknown>(false)
    const [borderCountries, setData] = useState<Country[] | null>(null)

    useEffect(() => {
        const getBorderCountries = async () => {
            setIsLoading(true)
            try {
                const resp = await fetch(
                    `https://restcountries.com/v3.1/alpha?codes=${borderCodes.join()}&fields=name,cca3`
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

                setData(resp_data)
            } catch (error) {
                setIsError(error)
                console.error(error)
            } finally {
                setIsLoading(false)
            }
        }

        if (borderCodes && borderCodes.length > 0) {
            getBorderCountries()
        }
    }, [borderCodes])

    return {
        borderCountries,
        isLoadingBorders,
        isErrorBorders,
    }
}
