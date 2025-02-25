// interface DropdownProps {
//     placeholder: string
//     items: string[]
//     onItemSelected: React.Dispatch<React.SetStateAction<unknown>>
//     disabled: boolean
//     classes: string
// }

// export const Dropdown = ({
//     placeholder,
//     items,
//     onItemSelected,
//     disabled,
//     classes,
// }: DropdownProps) => {
//     return (
//         <div
//             className={`relative ${classes} bg-white w-1/2 py-4 px-4 text-sm [&>*]:text-black border-black shadow-md rounded-md`}
//         >
//             <select className="bg-red w-full">
//                 <option disabled selected hidden>
//                     {placeholder}
//                 </option>
//                 {items &&
//                     items.map((item) => (
//                         <option
//                             key={item}
//                             className="text-black"
//                             onClick={() => onItemSelected(item)}
//                             value={item}
//                         >
//                             {item}
//                         </option>
//                     ))}
//             </select>
//         </div>
//     )
// }
