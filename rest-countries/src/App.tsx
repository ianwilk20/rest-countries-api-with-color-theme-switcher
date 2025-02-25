import { useState } from 'react'
import { Home } from './routes/Home'
import { BrowserRouter, Route, Routes } from 'react-router'
import { CountryDetails } from './routes/CountryDetails.tsx'
import { ThemeContext } from './contexts/ThemeContext.ts'
import { Theme } from './types/Theme.ts'
import { Header } from './components/Header.tsx'
import { CountryContext } from './contexts/CountryContext.ts'
import { Theme as RadixTheme } from '@radix-ui/themes'

function App() {
    const [theme, setTheme] = useState<Theme>(Theme.LIGHT)
    const [country, setCountry] = useState<string>('')
    console.log('Theme: ', theme)

    return (
        <RadixTheme>
            <ThemeContext.Provider value={{ theme, setTheme }}>
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
            </ThemeContext.Provider>
        </RadixTheme>
    )
}

export default App
