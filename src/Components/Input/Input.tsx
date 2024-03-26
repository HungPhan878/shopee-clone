/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { InputHTMLAttributes } from 'react'
import { UseFormRegister } from 'react-hook-form'

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  className?: string
  classNameInput?: string
  classNameError?: string
  register?: UseFormRegister<any>
  name: string
  rules?: object
  errorMessage?: string
}

export default function Input({
  className,
  classNameInput = 'p-3 rounded w-full border-2 border-gray-200',
  classNameError = 'text-red-600 text-sm h-5',
  register,
  name,
  rules,
  errorMessage,
  ...rest
}: Props) {
  const registerInput = register ? { ...register(name, rules) } : {}

  return (
    <div className={className}>
      <input
        id={name}
        className={classNameInput}
        {...registerInput}
        {...rest}
      />
      <p className={classNameError}>{errorMessage}</p>
    </div>
  )
}
