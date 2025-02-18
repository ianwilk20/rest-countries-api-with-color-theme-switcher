export const CountryDetails = () => {
    return (
        <>
            <a href="/">{'<- Back'}</a>
            <img />
            <h1>Country name</h1>
            <ul>
                <li>
                    <strong>Native Name: </strong>
                    {}
                </li>
                <li>
                    <strong>Population: </strong>
                    {}
                </li>
                <li>
                    <strong>Region: </strong>
                    {}
                </li>
                <li>
                    <strong>Sub Region: </strong>
                    {}
                </li>
                <li>
                    <strong>Capital: </strong>
                    {}
                </li>
                <br />
                <li>
                    <strong>Top Level Domain: </strong>
                    {}
                </li>
                <li>
                    <strong>Currencies: </strong>
                    {}
                </li>
                <li>
                    <strong>Languages: </strong>
                    {}
                </li>
            </ul>

            <h2>Border Countries:</h2>
            <ul>
                <li>
                    <a>{}</a>
                </li>
                <li>
                    <a>{}</a>
                </li>
                <li>
                    <a>{}</a>
                </li>
            </ul>
        </>
    )
}
