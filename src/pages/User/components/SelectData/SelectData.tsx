/* eslint-disable prettier/prettier */

import { range } from 'lodash'
import { useEffect, useState } from 'react'

interface Props {
  value?: Date
  onChange?: (value: Date) => void
  errorMessage?: string
}

export default function SelectData({ value, onChange, errorMessage }: Props) {
  const [date, setDate] = useState({
    date: value?.getDate() || 1,
    month: value?.getMonth() || 0,
    year: value?.getFullYear() || 1990
  })

  useEffect(() => {
    if (value) {
      setDate({
        date: value.getDate(),
        month: value.getMonth(),
        year: value.getFullYear()
      })
    }
  }, [value])

  // handle function
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value: valueForm, name } = event.target
    const newDate = {
      date: value?.getDate() || date.date,
      month: value?.getMonth() || date.month,
      year: value?.getFullYear() || date.year,
      [name]: Number(valueForm)
    }

    setDate(newDate)

    onChange && onChange(new Date(newDate.year, newDate.month, newDate.date))
  }

  return (
    <div className='mt-2 flex flex-col flex-wrap sm:flex-row'>
      <div className='truncate  capitalize sm:w-[20%] sm:mt-2 sm:text-right'>
        Date of Birth
      </div>
      <div className='sm:w-[80%] pt-3 sm:pt-0 sm:pl-5 '>
        <div className='flex flex-col flex-grow sm:flex-row  sm:items-center gap-2'>
          <select
            name='date'
            id='date'
            value={value?.getDate() || date.date}
            className='w-full rounded-sm border cursor-pointer border-gray-300 px-3 py-2 outline-none focus:border-gray-500 focus:shadow-sm hover:border-orange'
            onChange={handleChange}
          >
            <option value='' disabled hidden>
              Day
            </option>
            {range(1, 32).map((item) => {
              return (
                <option value={item} key={item}>
                  Ngày {item}
                </option>
              )
            })}
          </select>

          <select
            name='month'
            id='month'
            value={value?.getMonth() || date.month}
            className='w-full  rounded-sm border cursor-pointer border-gray-300 px-3 py-2 outline-none focus:border-gray-500 focus:shadow-sm hover:border-orange'
            onChange={handleChange}
          >
            <option value='' disabled hidden>
              Month
            </option>
            {range(0, 12).map((item) => {
              return (
                <option value={item} key={item}>
                  Tháng {item + 1}
                </option>
              )
            })}
          </select>

          <select
            name='year'
            id='year'
            value={value?.getFullYear() || date.year}
            className='w-full  rounded-sm border cursor-pointer border-gray-300 px-3 py-2 outline-none focus:border-gray-500 focus:shadow-sm hover:border-orange'
            onChange={handleChange}
          >
            <option value='' disabled hidden>
              Year
            </option>
            {range(1990, 2025).map((item) => {
              return (
                <option value={item} key={item}>
                  Năm {item}
                </option>
              )
            })}
          </select>
        </div>
        <div className='text-red-600 text-sm h-5'>{errorMessage}</div>
      </div>
    </div>
  )
}
