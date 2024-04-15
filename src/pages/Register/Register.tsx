/* eslint-disable prettier/prettier */
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { omit } from 'lodash'
import { useContext } from 'react'

// components
import { schema, type schemaType } from 'src/utils/rules'
import Input from 'src/Components/Input'
import { useMutation } from '@tanstack/react-query'
import authApi from 'src/apis/auth.api'
import { isAxiosUnproccessableEntityError } from 'src/utils/utils'
import { ErrorResponsiveApi } from 'src/types/utils.type'
import { AppContext } from 'src/contexts/app.context'
import Button from 'src/Components/Button'
import { path } from 'src/constants/auth'

type FormState = Pick<schemaType, 'email' | 'password' | 'confirm_password'>
const registerSchema = schema.pick(['email', 'password', 'confirm_password'])

export default function Register() {
  const { setIsAuthenticated, setProfile } = useContext(AppContext)
  const navigate = useNavigate()
  const {
    handleSubmit,
    formState: { errors },
    register,
    setError
  } = useForm<FormState>({
    resolver: yupResolver(registerSchema)
  })

  const registerAccountMutation = useMutation({
    mutationFn: (body: Omit<FormState, 'confirm_password'>) =>
      authApi.registerAccount(body)
  })

  // handler function
  const onSubmit = handleSubmit((data) => {
    registerAccountMutation.mutate(omit(data, ['confirm_password']), {
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
          //vi formError co the undefine nen dua vao dieu kien cho dam bao

          // if (formError?.email) {
          //   setError('email', {
          //     message: formError.email,
          //     type: 'server'
          //   })
          // }
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
              action=''
              className='rounded bg-white p-10 shadow-sm'
              onSubmit={onSubmit}
              noValidate
            >
              <div className='text-2xl'>Register</div>
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

              <Input
                type='password'
                name='confirm_password'
                register={register}
                placeholder='Confirm Password'
                className='mt-3'
                errorMessage={errors.confirm_password?.message}
              />

              <div className='mt-3'>
                <Button
                  className='flex w-full items-center justify-center bg-red-500 py-4 px-2 text-sm text-white uppercase hover:bg-red-600'
                  isLoading={registerAccountMutation.isPending}
                  disabled={registerAccountMutation.isPending}
                >
                  Register
                </Button>
              </div>
              <div className='mt-8 flex items-center justify-center'>
                <span className='text-gray-400'>
                  Do you have an account yet?
                </span>
                <Link to={path.login} className='ml-1 text-red-400'>
                  Log In
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
