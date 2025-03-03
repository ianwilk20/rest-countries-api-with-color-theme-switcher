import { useContext } from 'react'
import { NavLink } from 'react-router'
import { CountryContext } from '../contexts/CountryContext'

interface CountryTileProps {
    country: string
    population: string
    region: string
    capital: string
    flag: string
}

export const CountryTile = ({
    country,
    population,
    region,
    capital,
    flag,
}: CountryTileProps) => {
    const { setCountry } = useContext(CountryContext)

    return (
        <NavLink
            to={`/${encodeURI(country.toLowerCase())}`}
            className="flex flex-col rounded-md bg-white dark:bg-dark-gray-primary dark:hover:bg-dark-gray-secondary dark:text-gray-100 w-full shadow-md cursor-pointer transition-[all_0.5_ease] hover:scale-105 hover:shadow-lg"
            onClick={() => setCountry && setCountry(country)}
        >
            <li>
                <img
                    src={flag}
                    className="rounded-tl-md rounded-tr-md w-full h-44 object-cover"
                />
                <ul className="flex flex-col gap-0.5 px-6 pb-10 pt-6">
                    <li className="text-lg font-extrabold mb-2">{country}</li>
                    <li className="text-sm font-light">
                        <strong className="font-semibold">Population: </strong>
                        {Intl.NumberFormat().format(Number(population))}
                    </li>
                    <li className="text-sm font-light">
                        <strong className="font-semibold">Region: </strong>
                        {region}
                    </li>
                    <li className="text-sm font-light">
                        <strong className="font-semibold">Capital: </strong>
                        {capital}
                    </li>
                </ul>
            </li>
        </NavLink>
    )
}
