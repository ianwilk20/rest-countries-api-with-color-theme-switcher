import { Dropdown } from '../components/Dropdown'
import { useAllCountries } from '../hooks/useAllCountries'
import { useState } from 'react'
import { Country } from '../types/Country'
import { Regions } from '../types/Regions'
import { CountryList } from '../components/CountryList'

export const Home = () => {
    const [cachedData, setCachedData] = useState<Country[] | null>(null)
    const { data, isLoading, isError } = useAllCountries({
        countryData: cachedData,
    })
    const [searchText, setSearchText] = useState<string>('')
    const [selectedRegion, setSelectedRegion] = useState<Regions>(Regions.ANY)

    if (data && !cachedData) {
        setCachedData(data)
    }

    console.log('Search text: ', searchText)
    console.log('Selected region: ', selectedRegion)

    return (
        <section className="w-full dark:bg-gray-800 h-full">
            <div className="flex flex-col gap-2 px-4 py-6 md:px-12 lg:px-24">
                <div className="flex flex-col gap-6 sm:flex-row sm:justify-between">
                    <div className="relative w-full max-w-[calc(var(--spacing)*108)]">
                        <input
                            id="country-search"
                            type="text"
                            placeholder="Search for a country..."
                            className="w-full py-4 pl-16 text-sm before bg-white hover:bg-gray-50 dark:bg-dark-gray-secondary dark:hover:bg-dark-gray-secondary-hover shadow-md rounded-md disabled:bg-gray-200 disabled:hover:bg-gray-200 disabled:text-black disabled:placeholder:text-black dark:placeholder:text-gray-100"
                            disabled={isLoading || isError}
                            value={searchText}
                            onChange={(
                                e: React.ChangeEvent<HTMLInputElement>
                            ) => {
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
                                className="fill-gray-400 dark:fill-gray-100"
                                d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"
                            />
                        </svg>
                    </div>
                    <Dropdown
                        placeholder="Filter by Region"
                        items={[
                            'Africa',
                            'Americas',
                            'Asia',
                            'Europe',
                            'Oceania',
                        ]}
                        onItemSelected={setSelectedRegion}
                        disabled={isLoading || isError}
                        classes="text-black"
                    />
                </div>
                <div>
                    <CountryList
                        isLoading={isLoading}
                        isError={isError}
                        countryList={data}
                        searchText={searchText}
                        selectedRegion={selectedRegion}
                    />
                </div>
            </div>
        </section>
    )
}
