/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { InputHTMLAttributes, forwardRef } from 'react'

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  className?: string
  classNameInput?: string
  classNameError?: string
  errorMessage?: string
}

const InputNumber = forwardRef<HTMLInputElement, Props>(function InputNumberRef(
  {
    className,
    classNameInput = 'p-3 rounded w-full border-2 border-gray-200',
    classNameError = 'text-red-600 text-sm h-5',
    errorMessage,
    onChange,
    ...rest
  },
  ref
) {
  // handler function
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target
    if ((/^0|[1-9]\d*$/.test(value) || value === '') && onChange) {
      onChange(event)
    }
  }

  return (
    <div className={className}>
      <input
        className={classNameInput}
        {...rest}
        onChange={handleChange}
        ref={ref}
      />
      <p className={classNameError}>{errorMessage}</p>
    </div>
  )
})

export default InputNumber
