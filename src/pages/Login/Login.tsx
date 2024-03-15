/* eslint-disable prettier/prettier */
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'

// components
import Input from 'src/Components/Input'
import { loginAccount } from 'src/apis/auth.api'
import { ResponsiveApi } from 'src/types/utils.type'
import { schema, schemaType } from 'src/utils/rules'
import { isAxiosUnproccessableEntityError } from 'src/utils/utils'

type FormState = Omit<schemaType, 'confirm_password'>
const loginSchema = schema.omit(['confirm_password'])

export default function Login() {
  const {
    handleSubmit,
    formState: { errors },
    register,
    setError
  } = useForm<FormState>({
    resolver: yupResolver(loginSchema)
  })

  const loginAccountMutation = useMutation({
    mutationFn: (body: Omit<FormState, 'confirm_password'>) =>
      loginAccount(body)
  })

  // handler function
  const onSubmit = handleSubmit((data) => {
    loginAccountMutation.mutate(data, {
      onSuccess: (data) => {
        console.log(data)
      },
      onError: (error) => {
        if (
          isAxiosUnproccessableEntityError<
            ResponsiveApi<Omit<FormState, 'confirm_password'>>
          >(error)
        ) {
          const formError = error.response?.data.data

          if (formError) {
            Object.keys(formError).forEach((key) => {
              setError(key as keyof Omit<FormState, 'confirm_password'>, {
                message:
                  formError[key as keyof Omit<FormState, 'confirm_password'>],
                type: 'server'
              })
            })
          }
        }
      }
    })
  })

  return (
    <div className='bg-orange'>
      <div className='container'>
        <div className='grid grid-cols-1 py-12 lg:grid-cols-5 lg:py-32 lg:pr-10'>
          <div className='lg:col-span-2 lg:col-start-4'>
            <form
              onSubmit={onSubmit}
              noValidate
              className='rounded bg-white p-10 shadow-sm'
            >
              <div className='text-2xl'>Log In</div>
              <Input
                type='email'
                name='email'
                register={register}
                placeholder='Email'
                className='mt-8'
                errorMessage={errors.email?.message}
              />

              <Input
                type='password'
                name='password'
                register={register}
                placeholder='Password'
                className='mt-3'
                errorMessage={errors.password?.message}
              />

              <div className='mt-3'>
                <button className='flex w-full items-center justify-center bg-red-500 py-4 px-2 text-sm text-white uppercase hover:bg-red-600'>
                  Log In
                </button>
              </div>
              <div className='mt-8 flex items-center justify-center'>
                <span className='text-gray-400'>
                  Are you new know to shopee?
                </span>
                <Link to='/register' className='ml-1 text-red-400'>
                  Register
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
