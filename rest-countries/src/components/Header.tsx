import { useContext } from 'react'
import { ThemeContext } from '../contexts/ThemeContext'
import { Theme } from '../types/Theme'
import sun from '../../src/assets/images/sun-solid.svg'
import moon from '../../src/assets/images/moon-outline.svg'
import { Outlet } from 'react-router'

export const Header = () => {
    const { theme, setTheme } = useContext(ThemeContext)
    console.log('Theme: ', theme)

    return (
        <>
            <header className="w-full flex justify-between px-4 py-8 shadow-md bg-white">
                <strong>Where in the world?</strong>
                <button
                    className="flex items-center gap-1.5 bg-transparent text-sm font-semibold"
                    onClick={() =>
                        setTheme &&
                        setTheme((theme) =>
                            theme === Theme.LIGHT ? Theme.DARK : Theme.LIGHT
                        )
                    }
                >
                    {theme === Theme.LIGHT ? (
                        <img src={moon} className="w-5 h-5" />
                    ) : (
                        <img src={sun} className="w-16 h-16" />
                    )}
                    Dark Mode
                </button>
            </header>
            <Outlet />
        </>
    )
}
