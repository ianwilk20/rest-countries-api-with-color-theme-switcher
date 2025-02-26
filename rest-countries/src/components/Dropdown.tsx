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
        <Select.Root>
            <Select.Trigger
                disabled={disabled}
                placeholder={placeholder}
                className={`${classes} w-1/2 py-6 px-4 [&>*]:text-black border-black shadow-md disabled:bg-gray-200`}
                variant="surface"
                color="gray"
            />
            <Select.Content position="popper" color="gray" highContrast>
                <Select.Group>
                    {items &&
                        items.map((item) => (
                            <Select.Item
                                key={item}
                                onClick={() => onItemSelected(item as Regions)}
                                value={item}
                            >
                                {item}
                            </Select.Item>
                        ))}
                </Select.Group>
            </Select.Content>
        </Select.Root>
    )
}
