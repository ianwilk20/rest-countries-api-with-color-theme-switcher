import { useEffect, useState } from 'react'
import { Theme } from '../types/Theme'
import sun from '../../src/assets/images/sun-regular.svg'
import moon from '../../src/assets/images/moon-outline.svg'
import { Outlet } from 'react-router'

export const Header = () => {
    const [theme, setTheme] = useState<Theme>(Theme.LIGHT)

    useEffect(() => {
        document.documentElement.classList.toggle('dark', theme === Theme.DARK)
    }, [theme])

    return (
        <>
            <main>
                <header className="w-full flex items-center justify-between px-4 py-8 md:py-4 md:px-12 lg:px-24 shadow-md bg-white dark:bg-dark-gray-secondary dark:text-gray-100">
                    <h1 className="font-extrabold text-sm xs:text-base sm:text-lg pl-2 sm:pl-0">
                        Where in the world?
                    </h1>
                    <button
                        className="flex items-center gap-1.5 bg-transparent text-sm lg:text-base sm:text-md font-semibold dark:font-normal dark:text-gray-100 cursor-pointer hover:bg-gray-100 dark:hover:bg-dark-gray-secondary-hover transition py-2 px-2 rounded"
                        onClick={() =>
                            setTheme &&
                            setTheme((theme) =>
                                theme === Theme.LIGHT ? Theme.DARK : Theme.LIGHT
                            )
                        }
                    >
                        <>
                            <img
                                src={theme === Theme.LIGHT ? moon : sun}
                                className="w-4 h-4"
                            />
                            {theme === Theme.LIGHT ? 'Dark Mode' : 'Light Mode'}
                        </>
                    </button>
                </header>
                <Outlet />
            </main>
        </>
    )
}
