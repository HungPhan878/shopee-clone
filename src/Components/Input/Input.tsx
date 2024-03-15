/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { UseFormRegister } from 'react-hook-form'

interface Props {
  type: React.HTMLInputTypeAttribute
  placeholder?: string
  className?: string
  register: UseFormRegister<any>
  name: string
  rules?: object
  errorMessage?: string
}

export default function Input({
  type,
  placeholder,
  className,
  register,
  name,
  rules,
  errorMessage
}: Props) {
  return (
    <div className={className}>
      <input
        type={type}
        id={name}
        placeholder={placeholder}
        className=' p-3 rounded w-full border-2 border-gray-200'
        {...register(name, rules)}
      />
      <p className='text-red-600 text-sm h-5'>{errorMessage}</p>
    </div>
  )
}
