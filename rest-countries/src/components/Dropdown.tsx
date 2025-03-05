import { Select } from '@radix-ui/themes'
import { Regions } from '../types/Regions'

export interface DropdownProps {
    placeholder: string
    items: string[]
    onItemSelected: React.Dispatch<React.SetStateAction<Regions>>
    disabled: boolean
    classes: string
}

export const Dropdown = ({
    placeholder,
    items,
    onItemSelected,
    disabled,
    classes,
}: DropdownProps) => {
    return (
        <Select.Root
            onValueChange={(value: string) => onItemSelected(value as Regions)}
        >
            <Select.Trigger
                disabled={disabled}
                placeholder={placeholder}
                className={`${classes} w-1/2 sm:w-48 py-[26px] px-4 [&>*]:text-black dark:disabled:[&>*]:text-black border-black bg-white hover:bg-gray-50 dark:border-gray-100 shadow-md disabled:bg-gray-200 disabled:hover:bg-gray-200 dark:[&>*]:text-gray-100 dark:bg-dark-gray-secondary dark:hover:bg-dark-gray-secondary-hover`}
                variant="surface"
                color="gray"
                aria-label="Filter countries by region"
            />
            <Select.Content position="popper" color="gray" highContrast>
                <Select.Group>
                    {items &&
                        items.map((item) => (
                            <Select.Item key={item} value={item}>
                                {item}
                            </Select.Item>
                        ))}
                </Select.Group>
            </Select.Content>
        </Select.Root>
    )
}
