import { Country } from '../types/Country'
import { Regions } from '../types/Regions'
import { CountryTile } from './CountryTile'
import { Error } from './Error'
import { Loading } from './Loading'

interface CountryListProps {
    isLoading: boolean
    isError: boolean
    countryList: Country[] | null
    selectedRegion: Regions
    searchText: string
}

export const CountryList = ({
    isLoading,
    isError,
    countryList,
    selectedRegion,
    searchText,
}: CountryListProps) => {
    if (isLoading) return <Loading details="Loading countries" />

    if (isError) {
        return (
            <Error details="We're having trouble loading results right now" />
        )
    }

    if (countryList) {
        return (
            <ul className="flex flex-col items-center gap-8 mt-4 w-full">
                {countryList &&
                    countryList
                        .sort((a, b) =>
                            a.name.common < b.name.common
                                ? -1
                                : a.name.common > b.name.common
                                ? 1
                                : 0
                        )
                        .slice(0, 25)
                        .filter((country) => {
                            if (selectedRegion !== Regions.ANY) {
                                return country.region === selectedRegion
                            }
                            return true
                        })
                        .filter((country) => {
                            if (searchText !== '') {
                                return country.name.common.includes(searchText)
                            }
                            return true
                        })
                        .map((country) => (
                            <CountryTile
                                country={country.name.common}
                                population={country.population.toString()}
                                region={country.region}
                                capital={
                                    (country?.capital && country?.capital[0]) ||
                                    'None'
                                }
                                flag={country.flags.svg}
                                key={country.cca3}
                            />
                        ))}
            </ul>
        )
    }
}
