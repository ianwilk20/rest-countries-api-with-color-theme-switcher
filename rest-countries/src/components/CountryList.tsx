import { useEffect, useState } from 'react'
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
    const [filteredCounties, setFilteredCountries] = useState<Country[] | null>(
        countryList
    )

    useEffect(() => {
        setFilteredCountries(
            countryList &&
                countryList
                    .sort((a, b) =>
                        a.name.common < b.name.common
                            ? -1
                            : a.name.common > b.name.common
                            ? 1
                            : 0
                    )
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
        )
    }, [selectedRegion, searchText, countryList])

    if (isLoading) return <Loading details="Loading countries" />

    if (isError) {
        return (
            <Error details="We're having trouble loading results right now" />
        )
    }

    if (filteredCounties) {
        console.log('In countrylist')
        if (filteredCounties.length === 0) {
            console.log('countryList empty')
            return (
                <div className="flex flex-col items-center gap-2 w-full mt-16">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 512 512"
                        className="w-8 h-8"
                    >
                        <path d="M464 256A208 208 0 1 0 48 256a208 208 0 1 0 416 0zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zm169.8-90.7c7.9-22.3 29.1-37.3 52.8-37.3l58.3 0c34.9 0 63.1 28.3 63.1 63.1c0 22.6-12.1 43.5-31.7 54.8L280 264.4c-.2 13-10.9 23.6-24 23.6c-13.3 0-24-10.7-24-24l0-13.5c0-8.6 4.6-16.5 12.1-20.8l44.3-25.4c4.7-2.7 7.6-7.7 7.6-13.1c0-8.4-6.8-15.1-15.1-15.1l-58.3 0c-3.4 0-6.4 2.1-7.5 5.3l-.4 1.2c-4.4 12.5-18.2 19-30.6 14.6s-19-18.2-14.6-30.6l.4-1.2zM224 352a32 32 0 1 1 64 0 32 32 0 1 1 -64 0z" />
                    </svg>
                    <p className="text-center">
                        No countries match your selection.
                        <br />
                        Try adjusting your search criteria.
                    </p>
                </div>
            )
        } else {
            return (
                <ul className="grid grid-cols-[repeat(auto-fit,minmax(calc(var(--spacing)*64),1fr))] justify-items-center gap-y-8 gap-x-4 sm:gap-8 mt-4 w-full">
                    {filteredCounties &&
                        filteredCounties
                            .sort((a, b) =>
                                a.name.common < b.name.common
                                    ? -1
                                    : a.name.common > b.name.common
                                    ? 1
                                    : 0
                            )
                            .filter((country) => {
                                if (selectedRegion !== Regions.ANY) {
                                    return country.region === selectedRegion
                                }
                                return true
                            })
                            .filter((country) => {
                                if (searchText !== '') {
                                    return country.name.common.includes(
                                        searchText
                                    )
                                }
                                return true
                            })
                            .map((country) => (
                                <CountryTile
                                    country={country.name.common}
                                    population={country.population.toString()}
                                    region={country.region}
                                    capital={
                                        (country?.capital &&
                                            country?.capital[0]) ||
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
}
