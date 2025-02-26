import { Dropdown } from '../components/Dropdown'
import { useAllCountries } from '../hooks/useAllCountries'
import { useState } from 'react'
import { Country } from '../types/Country'
import { Regions } from '../types/Regions'
import { CountryList } from '../components/CountryList'
// import { Dropdown } from '../components/CustomDropdown'

export const Home = () => {
    const [cachedData, setCachedData] = useState<Country[] | null>(null)
    const { data, isLoading, isError } = useAllCountries({
        countryData: cachedData,
    })
    const [searchText, setSearchText] = useState<string>('')
    const [selectedRegion, setSelectedRegion] = useState<Regions>(Regions.ANY)
    // const [filteredData, setFilteredData] = useState<Country[]>(data)
    // const data: Country[] = countryData as Country[]
    // const isLoading = false
    // const isError = 'false'

    if (data && !cachedData) {
        setCachedData(data)
    }

    console.log('Search text: ', searchText)
    console.log('Selected region: ', selectedRegion)
    // const filterByRegion = (region: string): void => {
    //     const filteredCounties = data.filter(
    //         (country) => country.region === region
    //     )
    //     setFilteredData(filteredCounties)
    // }

    // const filterByName = (name: string): void => {
    //     const filteredCounties = data.filter((country) =>
    //         country.name.common.includes(name)
    //     )
    //     setFilteredData(filteredCounties)
    // }

    // console.log(filteredData)

    return (
        <main className="max-w-[100vw] min-w-[100vw] min-h-[100vh] bg-gray-100">
            <div className="flex flex-col gap-2 px-4 py-6">
                <div className="relative">
                    <input
                        id="country-search"
                        type="text"
                        placeholder="Search for a country..."
                        className="w-full py-4 pl-16 text-sm before bg-white shadow-md rounded-md disabled:bg-gray-200 disabled:text-black disabled:placeholder:text-black"
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
                    items={['Africa', 'Americas', 'Asia', 'Europe', 'Oceania']}
                    onItemSelected={setSelectedRegion}
                    disabled={isLoading || isError}
                    classes="mt-6 text-black"
                />
                <div className="flex items-center">
                    <CountryList
                        isLoading={isLoading}
                        isError={isError}
                        countryList={data}
                        searchText={searchText}
                        selectedRegion={selectedRegion}
                    />
                </div>
            </div>
        </main>
    )
}
