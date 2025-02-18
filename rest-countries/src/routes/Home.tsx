import { CountryTile } from '../components/CountryTile'
import { Dropdown } from '../components/Dropdown'
import { useCountries } from '../hooks/useCountries'
import countryData from '../assets/data.json'
import './Home.css'
import { useState } from 'react'
import { Country } from '../types/Country'
import { Regions } from '../types/Regions'
import { CountryList } from '../components/CountryList'

export const Home = () => {
    // const { data, isLoading, isError } = useCountries()
    const [searchText, setSearchText] = useState<string>('')
    const [selectedRegion, setSelectedRegion] = useState<Regions>(Regions.ANY)
    // const [filteredData, setFilteredData] = useState<Country[]>(data)
    const data: Country[] = countryData as Country[]
    const isLoading = false
    const isError = 'false'

    console.log('Search text: ', searchText)

    const filterByRegion = (region: string): void => {
        const filteredCounties = data.filter(
            (country) => country.region === region
        )
        setFilteredData(filteredCounties)
    }

    const filterByName = (name: string): void => {
        const filteredCounties = data.filter((country) =>
            country.name.common.includes(name)
        )
        setFilteredData(filteredCounties)
    }

    // console.log(filteredData)

    return (
        <div className="flex flex-col gap-2 px-4 py-6">
            <div className="relative">
                <input
                    id="country-search"
                    type="text"
                    placeholder="Search for a country..."
                    className="w-full py-4 pl-16 text-sm before bg-white shadow-md rounded-md"
                    disabled={isLoading || isError}
                    value={searchText}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        setSearchText(e.target.value)
                    }}
                />
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                    width="1rem"
                    className="absolute top-0 bottom-0 left-6 mt-auto mb-auto"
                >
                    <path
                        className="fill-gray-400"
                        d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"
                    />
                </svg>
            </div>
            <Dropdown
                placeholder="Filter by Region"
                items={['Africa', 'America', 'Asia', 'Europe', 'Oceania']}
                onItemSelected={setSelectedRegion}
                disabled={isLoading || isError}
                classes="mt-6 text-black"
            />
            <CountryList
                isLoading={isLoading}
                isError={isError}
                countryList={data}
                searchText={searchText}
                selectedRegion={selectedRegion}
            />
            {/* {isLoading ? (
                <div className="flex flex-col justify-center items-center mt-16 top-0 bottom-0">
                    <span className="loader"></span>
                    <strong className="text-lg mt-2">Loading...</strong>
                </div>
            ) : isError ? (
                "We're having trouble loading results right now"
            ) : (
                // <ul className="flex flex-col items-center gap-10">
                //     {[1, 2, 3].map((item) => (
                //         <CountryTile
                //             country="Germany"
                //             population="81,770,900"
                //             region="Europe"
                //             capital="Berlin"
                //             flag="https://flagcdn.com/de.svg"
                //         />
                //     ))}
                // </ul>
                <ul className="flex flex-col items-center gap-8 mt-4 w-full">
                    {/* {data &&
                        data
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
                            ))} */}
            {/* </ul> */}
            {/* {data && data.map((country) => (
                    <CountryTile
                        country={country.name.common}
                        population={country.population.toString()}
                        region={country.region}
                        capital={country.capital[0] || "Unknown"}
                        flag={country.flags.svg}
                    />
                ))} */}
        </div>
    )
}
