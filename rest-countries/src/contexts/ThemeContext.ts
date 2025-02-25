import { createContext } from 'react'
import { Theme } from '../types/Theme'

interface ThemeContextProps {
    theme: Theme
    setTheme: React.Dispatch<React.SetStateAction<Theme>> | null
}
export const ThemeContext = createContext<ThemeContextProps>({
    theme: Theme.LIGHT,
    setTheme: null,
})
