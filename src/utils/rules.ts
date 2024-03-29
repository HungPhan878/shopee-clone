/* eslint-disable prettier/prettier */
import { RegisterOptions, UseFormGetValues } from 'react-hook-form'
import * as yup from 'yup'

type Rules = {
  [key in 'email' | 'password' | 'confirm_password']?: RegisterOptions
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getRules = (getValues?: UseFormGetValues<any>): Rules => ({
  email: {
    required: {
      value: true,
      message: 'Please Enter To The Email Field'
    },
    pattern: {
      value: /.*@[a-z0-9.-]*/i,
      message: 'Invalid Email'
    },
    minLength: {
      value: 6,
      message: 'Length over 6 characters'
    },
    maxLength: {
      value: 150,
      message: 'Length under 150 characters'
    }
  },
  password: {
    required: {
      value: true,
      message: 'Please Enter To The Password Field'
    },
    minLength: {
      value: 6,
      message: 'Length over 6 characters'
    },
    maxLength: {
      value: 160,
      message: 'Length under 160 characters'
    }
  },
  confirm_password: {
    required: {
      value: true,
      message: 'Please Enter To The Password Field'
    },
    minLength: {
      value: 6,
      message: 'Length over 6 characters'
    },
    maxLength: {
      value: 150,
      message: 'Length under 150 characters'
    },
    validate:
      typeof getValues === 'function'
        ? (value) =>
            value === getValues('password') || 'Password is not exactly'
        : undefined
  }
})

function testPriceMinMax(this: yup.TestContext<yup.AnyObject>) {
  const { price_min, price_max } = this.parent as {
    price_min: string
    price_max: string
  }
  if (price_min !== '' && price_max !== '') {
    return Number(price_max) >= Number(price_min)
  }
  return price_min !== '' || price_max !== ''
}

export const schema = yup.object({
  email: yup
    .string()
    .required('Please Enter To The Email Field')
    .min(6, 'Length over 6 characters')
    .max(150, 'Length under 150 characters')
    .email('Invalid Email'),
  password: yup
    .string()
    .required('Please Enter To The Password Field')
    .min(6, 'Length over 6 characters')
    .max(160, 'Length under 160 characters'),
  confirm_password: yup
    .string()
    .required('Please Enter To The Email Field')
    .min(6, 'Length over 6 characters')
    .max(160, 'Length under 160 characters')
    .oneOf([yup.ref('password')], 'Password is not exactly'),
  // => ref dung de tham chieu den password
  price_min: yup.string().test({
    name: 'price-not-allowed',
    message: 'Price is invalid',
    test: testPriceMinMax
  }),
  price_max: yup.string().test({
    name: 'price-not-allowed',
    message: 'Price is invalid',
    test: testPriceMinMax
  })
})

export type schemaType = yup.InferType<typeof schema>
