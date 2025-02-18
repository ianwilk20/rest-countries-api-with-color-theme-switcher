import { Select } from '@radix-ui/themes'

export interface DropdownProps {
    placeholder: string
    items: string[]
    onItemSelected: React.Dispatch<React.SetStateAction<unknown>>
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
                className={`${classes} w-1/2 py-6 px-4 [&>*]:text-black border-black shadow-md`}
                variant="surface"
                color="gray"
            />
            <Select.Content position="popper" color="gray">
                <Select.Group>
                    {items &&
                        items.map((item) => (
                            <Select.Item
                                key={item}
                                className="text-black"
                                onClick={() => onItemSelected(item)}
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
