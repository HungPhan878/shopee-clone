/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { InputHTMLAttributes, forwardRef, useState } from 'react'

export interface InputNumberProps
  extends InputHTMLAttributes<HTMLInputElement> {
  className?: string
  classNameInput?: string
  classNameError?: string
  errorMessage?: string
}

const InputNumber = forwardRef<HTMLInputElement, InputNumberProps>(
  function InputNumberRef(
    {
      className,
      classNameInput = 'p-3 rounded w-full border-2 border-gray-200',
      classNameError = 'text-red-600 text-sm h-5',
      errorMessage,
      value ,
      onChange,
      ...rest
    },
    ref
  ) {
    const [localValue, setLocalValue] = useState(value)

    // handler function
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = event.target
      if (/^0|[1-9]\d*$/.test(value) || value === '') {
        onChange && onChange(event)

        setLocalValue(value)
      }
    }

    return (
      <div className={className}>
        <input
          className={classNameInput}
          {...rest}
          onChange={handleChange}
          ref={ref}
          value={value === undefined ? localValue : value}
        />
        <p className={classNameError}>{errorMessage}</p>
      </div>
    )
  }
)

export default InputNumber
