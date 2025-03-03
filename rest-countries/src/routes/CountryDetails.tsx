import { useContext, useEffect } from 'react'
import { useCountryDetails } from '../hooks/useCountryDetails'
import { CountryContext } from '../contexts/CountryContext'
import { useBorderCountries } from '../hooks/useBorderCountries'
import { Error } from '../components/Error'
import { Loading } from '../components/Loading'
import { NavLink, useParams } from 'react-router'
import { BackIcon } from '../components/BackIcon'

export const CountryDetails = () => {
    const { country: paramCountry } = useParams()
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
        <section className="w-full bg-gray-100 dark:bg-gray-800">
            <div className="flex flex-col gap-2 px-6 py-6 md:px-12 lg:px-20">
                <NavLink
                    to="/"
                    className="flex gap-2 items-center text-black shadow-md bg-white dark:bg-dark-gray-secondary dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-dark-gray-secondary-hover transition w-fit py-2 px-6 rounded-sm"
                >
                    <BackIcon
                        className={'w-4 h-4 fill-black dark:fill-gray-50'}
                    />
                    <span>Back</span>
                </NavLink>
                {isError ? (
                    <Error
                        details={`Error retrieving details for ${country}`}
                    />
                ) : data ? (
                    <div className="flex flex-col lg:flex-row gap-16 xl:gap-26 mt-16">
                        <img
                            src={data?.flags.svg}
                            className=" mt-12 mb-12 object-cover max-w-[calc(var(--spacing)*108)] xl:max-w-[calc(var(--spacing)*150)] h-auto lg:m-0"
                        />
                        <div className="w-full flex flex-col lg:max-w-[calc(var(--spacing)*180)] justify-center">
                            <h1 className="text-2xl font-extrabold mb-4">
                                {data?.name?.common}
                            </h1>
                            <ul className="flex flex-col gap-2 dark:text-gray-100 lg:grid lg:grid-cols-2 lg:gap-1">
                                <li className="lg:col-[1]">
                                    <p className="font-light">
                                        <strong className="font-semibold">
                                            Native Name:{' '}
                                        </strong>

                                        {data &&
                                            Object.values(
                                                data?.name?.nativeName
                                            )[0].common}
                                    </p>
                                </li>
                                <li className="lg:col-[1]">
                                    <p className="font-light">
                                        <strong className="font-medium">
                                            Population:{' '}
                                        </strong>
                                        {Intl.NumberFormat().format(
                                            Number(data?.population)
                                        )}
                                    </p>
                                </li>
                                <li className="lg:col-[1]">
                                    <p className="font-light">
                                        <strong className="font-medium">
                                            Region:{' '}
                                        </strong>
                                        {data?.region}
                                    </p>
                                </li>
                                <li className="lg:col-[1]">
                                    <p className="font-light">
                                        <strong className="font-medium">
                                            Sub Region:{' '}
                                        </strong>
                                        {data?.subregion}
                                    </p>
                                </li>
                                <li className="mb-8 lg:col-[1]">
                                    <p className="font-light">
                                        <strong className="font-medium">
                                            Capital:{' '}
                                        </strong>
                                        {data?.capital[0]}
                                    </p>
                                </li>
                                <li className="lg:col-[2] lg:row-[1]">
                                    <p className="font-light">
                                        <strong className="font-medium">
                                            Top Level Domain:{' '}
                                        </strong>
                                        {data?.tld[0]}
                                    </p>
                                </li>
                                <li className="lg:col-[2] lg:row-[2]">
                                    <p className="font-light">
                                        <strong className="font-medium">
                                            Currencies:{' '}
                                        </strong>
                                        {data &&
                                            Object.values(data?.currencies)
                                                .sort((a, b) =>
                                                    a.name.localeCompare(b.name)
                                                )
                                                .map(
                                                    (currency) => currency.name
                                                )
                                                .join(', ')}
                                    </p>
                                </li>
                                <li className="lg:col-[2] lg:row-[3]">
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
                                    borderCountries &&
                                    borderCountries.length > 0
                                        ? 'flex-col gap-3'
                                        : 'items-baseline gap-1'
                                } mt-8 lg:mt-0 max-w-96 lg:flex-row lg:max-w-none lg:items-center`}
                            >
                                <p className="font-semibold ">
                                    Border Countries:
                                </p>
                                {isLoadingBorders ? (
                                    <Loading details="Loading border countries..." />
                                ) : isErrorBorders ? (
                                    <Error details="Error retrieving border countries" />
                                ) : borderCountries &&
                                  borderCountries.length > 0 ? (
                                    <ul className="grid grid-cols-3 items-center gap-2 lg:flex">
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
                                                    className="bg-white dark:bg-dark-gray-secondary dark:text-gray-100 shadow-md rounded hover:bg-gray-100 dark:hover:bg-dark-gray-secondary-hover transition"
                                                >
                                                    <li className="py-2 text-xs flex justify-center lg:px-2">
                                                        {country.name.common}
                                                    </li>
                                                </NavLink>
                                            ))}
                                    </ul>
                                ) : (
                                    <p className="font-light">None</p>
                                )}
                            </div>
                        </div>
                    </div>
                ) : (
                    isLoading && (
                        <Loading
                            details={`Loading details for ${country}...`}
                        />
                    )
                )}
            </div>
        </section>
    )
}
