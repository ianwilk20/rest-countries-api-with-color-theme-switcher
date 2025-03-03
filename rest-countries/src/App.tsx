import { useState } from 'react'
import { Home } from './routes/Home'
import { BrowserRouter, Route, Routes } from 'react-router'
import { CountryDetails } from './routes/CountryDetails.tsx'
import { Header } from './components/Header.tsx'
import { CountryContext } from './contexts/CountryContext.ts'
import { Theme as RadixTheme } from '@radix-ui/themes'

function App() {
    const [country, setCountry] = useState<string>('')

    return (
        <RadixTheme className="bg-inherit">
            <CountryContext.Provider value={{ country, setCountry }}>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Header />}>
                            <Route
                                path="/:country"
                                element={<CountryDetails />}
                            />
                            <Route index element={<Home />} />
                        </Route>
                    </Routes>
                </BrowserRouter>
            </CountryContext.Provider>
        </RadixTheme>
    )
}

export default App
