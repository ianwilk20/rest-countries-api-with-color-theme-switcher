import { useState } from 'react'
import { Home } from './routes/Home'
import { Theme } from './types/Theme'

import sun from '../src/assets/images/sun-solid.svg'
import moon from '../src/assets/images/moon-outline.svg'

function App() {
    const [mode, setMode] = useState<Theme>(Theme.LIGHT)

    return (
        <main className="max-w-[100vw] min-w-[100vw] min-h-[100vh] bg-gray-100">
            <header className="w-full flex justify-between px-4 py-8 shadow-md bg-white">
                <strong>Where in the world?</strong>
                <button className="flex items-center gap-1.5 bg-transparent text-sm font-semibold">
                    {mode === Theme.LIGHT ? (
                        <img src={moon} className="w-5 h-5" />
                    ) : (
                        <img src={sun} className="w-16 h-16" />
                    )}
                    Dark Mode
                </button>
            </header>
            <Home />
        </main>
    )
}

export default App
