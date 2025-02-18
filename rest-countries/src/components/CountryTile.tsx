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
    return (
        <li className="flex flex-col rounded-md bg-white w-[80%] shadow-md">
            <img
                src={flag}
                className="rounded-tl-md rounded-tr-md w-full h-44 object-cover"
            />
            <ul className="flex flex-col gap-0.5 px-6 pb-10 pt-6">
                <li className="text-lg font-extrabold mb-2">{country}</li>
                <li className="text-sm">
                    <strong>Population: </strong>
                    {population}
                </li>
                <li className="text-sm">
                    <strong>Region: </strong>
                    {region}
                </li>
                <li className="text-sm">
                    <strong>Capital: </strong>
                    {capital}
                </li>
            </ul>
        </li>
    )
}
