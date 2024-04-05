/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { InputHTMLAttributes, useState } from 'react'
import {
  FieldPath,
  FieldValues,
  useController,
  UseControllerProps
} from 'react-hook-form'

export interface InputNumberProps
  extends InputHTMLAttributes<HTMLInputElement> {
  className?: string
  classNameInput?: string
  classNameError?: string
  errorMessage?: string
}

function InputV2<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>(props: UseControllerProps<TFieldValues, TName> & InputNumberProps) {
  const {
    type,
    onChange,
    className,
    classNameInput = 'p-3 rounded w-full border-2 border-gray-200',
    classNameError = 'text-red-600 text-sm h-5',
    value = '',
    ...rest
  } = props
  const { field, fieldState } = useController(props)
  const [localValue, setLocalValue] = useState<string>(field.value)

  // handler function
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const valueFromInput = event.target.value
    const numberCondition =
      type === 'number' &&
      (/^0|[1-9]\d*$/.test(valueFromInput) || valueFromInput === '')
    if (numberCondition || type !== 'number') {
      // cap nhật lại value khi user không truyền value
      setLocalValue(valueFromInput)
      // cập nhật state cho react-h-f
      field.onChange(event)
      // cập nhật onChange khi user nhập onchange vào
      onChange && onChange(event)
    }
  }

  return (
    <div className={className}>
      <input
        className={classNameInput}
        {...rest}
        {...field}
        onChange={handleChange}
        value={value || localValue}
      />
      <p className={classNameError}>{fieldState.error?.message}</p>
    </div>
  )
}

export default InputV2

// type Gen<TFunc> = {
//   getName: TFunc
// }

// function Hexa<
//   TFunc extends () => string,
//   TLastName extends ReturnType<TFunc>
// >(props: { person: Gen<TFunc>; lastName: TLastName }) {
//   return null
// }

// const getName: () => 'Hexa' = () => 'Hexa'

// function App() {
//   return <Hexa person={{ getName: getName }} lastName='Hexa' />
// }
