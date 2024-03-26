/* eslint-disable prettier/prettier */
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'
import { useContext } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import Button from 'src/Components/Button'

// components
import Input from 'src/Components/Input'
import authApi from 'src/apis/auth.api'
import { path } from 'src/constants/auth'
import { AppContext } from 'src/contexts/app.context'
import { ErrorResponsiveApi } from 'src/types/utils.type'
import { schema, schemaType } from 'src/utils/rules'
import { isAxiosUnproccessableEntityError } from 'src/utils/utils'

type FormState = Pick<schemaType, 'email' | 'password'>
const loginSchema = schema.pick(['email', 'password'])

export default function Login() {
  const { setIsAuthenticated, setProfile } = useContext(AppContext)
  const navigate = useNavigate()
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
      authApi.loginAccount(body)
  })

  // handler function
  const onSubmit = handleSubmit((data) => {
    loginAccountMutation.mutate(data, {
      onSuccess: (data) => {
        setIsAuthenticated(true)
        setProfile(data.data.data.user)
        navigate(path.login)
      },
      onError: (error) => {
        if (
          isAxiosUnproccessableEntityError<
            ErrorResponsiveApi<Omit<FormState, 'confirm_password'>>
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
                <Button
                  className='flex w-full items-center justify-center bg-red-500 py-4 px-2 text-sm text-white uppercase hover:bg-red-600'
                  isLoading={loginAccountMutation.isPending}
                  disabled={loginAccountMutation.isPending}
                >
                  Log In
                </Button>
              </div>
              <div className='mt-8 flex items-center justify-center'>
                <span className='text-gray-400'>
                  Are you new know to shopee?
                </span>
                <Link to={path.register} className='ml-1 text-red-400'>
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
