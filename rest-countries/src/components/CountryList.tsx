import { Country } from '../types/Country'
import { Regions } from '../types/Regions'
import { CountryTile } from './CountryTile'

interface CountryListProps {
    isLoading: boolean
    isError: string
    countryList: Country[]
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
    if (isLoading)
        return (
            <div className="flex flex-col justify-center items-center mt-16 top-0 bottom-0">
                <span className="loader"></span>
                <strong className="text-lg mt-2">Loading...</strong>
            </div>
        )

    if (isError) {
        return (
            <>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                    className="w-20"
                >
                    <path d="M256 32c14.2 0 27.3 7.5 34.5 19.8l216 368c7.3 12.4 7.3 27.7 .2 40.1S486.3 480 472 480L40 480c-14.3 0-27.6-7.7-34.7-20.1s-7-27.8 .2-40.1l216-368C228.7 39.5 241.8 32 256 32zm0 128c-13.3 0-24 10.7-24 24l0 112c0 13.3 10.7 24 24 24s24-10.7 24-24l0-112c0-13.3-10.7-24-24-24zm32 224a32 32 0 1 0 -64 0 32 32 0 1 0 64 0z" />
                </svg>
                <p>We're having trouble loading results right now</p>
            </>
        )
    }

    if (countryList) {
        return (
            <ul className="flex flex-col items-center gap-8 mt-4 w-full">
                {countryList
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
