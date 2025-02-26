import { useContext, useEffect } from 'react'
import arrowBlack from '../assets/images/arrow-left-black.svg'
import arrowWhite from '../assets/images/arrow-left-white.svg'
import { ThemeContext } from '../contexts/ThemeContext'
import { Theme } from '../types/Theme'
import { useCountryDetails } from '../hooks/useCountryDetails'
import { CountryContext } from '../contexts/CountryContext'
import { useBorderCountries } from '../hooks/useBorderCountries'
import { Error } from '../components/Error'
import { Loading } from '../components/Loading'
import { NavLink, useParams } from 'react-router'

export const CountryDetails = () => {
    const { country: paramCountry } = useParams()
    const { theme } = useContext(ThemeContext)
    const { country, setCountry } = useContext(CountryContext)
    const { data, isLoading, isError } = useCountryDetails({
        country: country,
    })
    console.log('CountryDetails: context country: ', country)

    useEffect(() => {
        if (!country && typeof setCountry === 'function' && paramCountry) {
            setCountry(paramCountry)
        }
    }, [country, paramCountry, setCountry])

    const { borderCountries, isLoadingBorders, isErrorBorders } =
        useBorderCountries({ borderCodes: data?.borders })

    console.log('CountryDetails: foundCountry in params: ', paramCountry)
    return (
        <main className="max-w-[100vw] min-w-[100vw] min-h-[100vh] bg-gray-100">
            <div className="flex flex-col gap-2 px-6 py-6">
                <a
                    href="/"
                    className="flex gap-2 items-center text-black shadow-md bg-white w-fit py-2 px-6 rounded-sm"
                >
                    <img
                        src={theme === Theme.LIGHT ? arrowBlack : arrowWhite}
                        className="w-4"
                    />
                    <span>Back</span>
                </a>
                {isError ? (
                    <Error
                        details={`Error retrieving details for ${country}`}
                    />
                ) : isLoading ? (
                    <Loading details={`Loading details for ${country}...`} />
                ) : (
                    <>
                        <img
                            src={data?.flags.svg}
                            className="h-56 mt-12 mb-12 object-cover"
                        />
                        <h1 className="text-2xl font-extrabold mb-4">
                            {data?.name?.common}
                        </h1>
                        <ul className="flex flex-col gap-2">
                            <li>
                                <p className="font-light">
                                    <strong className="font-semibold">
                                        Native Name:{' '}
                                    </strong>

                                    {data &&
                                        Object.values(data?.name?.nativeName)[0]
                                            .common}
                                </p>
                            </li>
                            <li>
                                <p className="font-light">
                                    <strong className="font-medium">
                                        Population:{' '}
                                    </strong>
                                    {Intl.NumberFormat().format(
                                        Number(data?.population)
                                    )}
                                </p>
                            </li>
                            <li>
                                <p className="font-light">
                                    <strong className="font-medium">
                                        Region:{' '}
                                    </strong>
                                    {data?.region}
                                </p>
                            </li>
                            <li>
                                <p className="font-light">
                                    <strong className="font-medium">
                                        Sub Region:{' '}
                                    </strong>
                                    {data?.subregion}
                                </p>
                            </li>
                            <li>
                                <p className="font-light">
                                    <strong className="font-medium">
                                        Capital:{' '}
                                    </strong>
                                    {data?.capital[0]}
                                </p>
                            </li>
                            <br />
                            <li>
                                <p className="font-light">
                                    <strong className="font-medium">
                                        Top Level Domain:{' '}
                                    </strong>
                                    {data?.tld[0]}
                                </p>
                            </li>
                            <li>
                                <p className="font-light">
                                    <strong className="font-medium">
                                        Currencies:{' '}
                                    </strong>
                                    {data &&
                                        Object.values(data?.currencies)
                                            .sort((a, b) =>
                                                a.name.localeCompare(b.name)
                                            )
                                            .map((currency) => currency.name)
                                            .join(', ')}
                                </p>
                            </li>
                            <li>
                                <p className="font-light">
                                    <strong className="font-medium">
                                        Languages:{' '}
                                    </strong>
                                    {data &&
                                        Object.values(data?.languages)
                                            .sort()
                                            .join(', ')}
                                </p>
                            </li>
                        </ul>
                        <div
                            className={`flex ${
                                borderCountries && borderCountries.length > 0
                                    ? 'flex-col gap-3'
                                    : 'items-baseline gap-1'
                            } mt-8`}
                        >
                            <h2 className="text-lg font-semibold">
                                Border Countries:
                            </h2>
                            {isLoadingBorders ? (
                                <Loading details="Loading border countries..." />
                            ) : isErrorBorders ? (
                                <Error details="Error retrieving border countries" />
                            ) : borderCountries &&
                              borderCountries.length > 0 ? (
                                <ul className="grid grid-cols-3 items-center gap-2">
                                    {borderCountries
                                        .sort((a, b) =>
                                            a.name.common.localeCompare(
                                                b.name.common
                                            )
                                        )
                                        .map((country) => (
                                            <NavLink
                                                to={`/${encodeURI(
                                                    country.name.common.toLowerCase()
                                                )}`}
                                                onClick={() =>
                                                    setCountry &&
                                                    setCountry(
                                                        country.name.common
                                                    )
                                                }
                                                key={country.cca3}
                                            >
                                                <li className="bg-white shadow-md py-2 rounded text-xs flex justify-center">
                                                    {country.name.common}
                                                </li>
                                            </NavLink>
                                        ))}
                                </ul>
                            ) : (
                                <p className="font-light">None</p>
                            )}
                        </div>
                    </>
                )}
            </div>
        </main>
    )
}
