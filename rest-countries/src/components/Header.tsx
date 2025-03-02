import { useContext, useEffect } from 'react'
import { ThemeContext } from '../contexts/ThemeContext'
import { Theme } from '../types/Theme'
import sun from '../../src/assets/images/sun-regular.svg'
import moon from '../../src/assets/images/moon-outline.svg'
import { Outlet } from 'react-router'

export const Header = () => {
    const { theme, setTheme } = useContext(ThemeContext)
    console.log('Theme: ', theme)

    useEffect(() => {
        document.documentElement.classList.toggle(
            'dark',
            theme === Theme.DARK ||
                window.matchMedia('(prefers-color-scheme: dark)').matches
        )
    }, [theme])

    return (
        <>
            <main>
                <header className="w-full flex justify-between px-4 py-8 md:py-6 md:px-12 lg:px-20 shadow-md bg-white dark:bg-gray-800 dark:text-gray-100">
                    <h1 className="font-extrabold text-sm xs:text-base sm:text-lg">
                        Where in the world?
                    </h1>
                    <button
                        className="flex items-center gap-1.5 bg-transparent text-sm lg:text-base sm:text-md font-semibold dark:font-normal dark:text-gray-100 cursor-pointer"
                        onClick={() =>
                            setTheme &&
                            setTheme((theme) =>
                                theme === Theme.LIGHT ? Theme.DARK : Theme.LIGHT
                            )
                        }
                    >
                        {theme === Theme.LIGHT ? (
                            <>
                                <img src={moon} className="w-4 h-4" />
                                Dark Mode
                            </>
                        ) : (
                            <>
                                <img src={sun} className="w-4 h-4" />
                                Light Mode
                            </>
                        )}
                    </button>
                </header>
                <Outlet />
            </main>
        </>
    )
}
