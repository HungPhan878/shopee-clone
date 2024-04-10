/* eslint-disable prettier/prettier */
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'
import { omit } from 'lodash'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import Button from 'src/Components/Button'
import Input from 'src/Components/Input'
import userApi from 'src/apis/user.api'
import { ErrorResponsiveApi } from 'src/types/utils.type'
import { userSchema, userSchemaType } from 'src/utils/rules'
import { isAxiosUnproccessableEntityError } from 'src/utils/utils'

type FormData = Pick<
  userSchemaType,
  'password' | 'new_password' | 'confirm_password'
>

const passwordSchema = userSchema.pick([
  'password',
  'new_password',
  'confirm_password'
])

export default function ChangePurchase() {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    setError
  } = useForm<FormData>({
    defaultValues: {
      password: '',
      new_password: '',
      confirm_password: ''
    },
    resolver: yupResolver(passwordSchema)
  })

  const updateProfileMutate = useMutation({
    mutationFn: userApi.updateUser
  })

  // handler F
  const onSubmit = handleSubmit(async (data) => {
    console.log(data)
    try {
      await updateProfileMutate.mutateAsync(omit(data, ['confirm_password']))
      toast.success('Change password successfully')
      reset()
    } catch (error) {
      if (
        isAxiosUnproccessableEntityError<ErrorResponsiveApi<FormData>>(error)
      ) {
        const formError = error.response?.data.data

        if (formError) {
          Object.keys(formError).forEach((key) => {
            setError(key as keyof FormData, {
              message: formError[key as keyof FormData],
              type: 'server'
            })
          })
        }
      }
    }
  })

  return (
    <div className='rounded-sm bg-white px-2 pb-10 shadow md:px-7 md:pb-20'>
      <div className='border-b border-b-gray-200 py-6'>
        <h1 className='text-lg font-medium capitalize text-gray-900'>
          Đổi mật khẩu
        </h1>
        <div className='mt-1 text-sm text-gray-700'>
          Quản lý thông tin hồ sơ để bảo mật tài khoản
        </div>
      </div>
      <form
        className='mt-8 flex flex-col-reverse lg:flex-row lg:items-start'
        onSubmit={onSubmit}
      >
        <div className='mt-6 flex-grow lg:mt-0 md:pr-12'>
          <div className='mt-2 flex flex-col flex-wrap sm:flex-row'>
            <div className='truncate pt-3 capitalize sm:w-[20%] sm:text-right'>
              Password
            </div>
            <div className='sm:w-[60%] sm:pl-5 pt-3 sm:pt-0'>
              <Input
                classNameInput='w-full rounded-sm border border-gray-300 px-3 py-2 outline-none focus:border-gray-500 focus:shadow-sm'
                name='password'
                type='password'
                placeholder='password'
                register={register}
                errorMessage={errors.password?.message}
              />
            </div>
          </div>

          <div className='mt-2 flex flex-col flex-wrap sm:flex-row'>
            <div className='truncate pt-3 capitalize sm:w-[20%] sm:text-right'>
              New Password
            </div>
            <div className='sm:w-[60%] sm:pl-5 pt-3 sm:pt-0'>
              <Input
                classNameInput='w-full rounded-sm border border-gray-300 px-3 py-2 outline-none focus:border-gray-500 focus:shadow-sm'
                name='new_password'
                type='password'
                placeholder='New Password'
                register={register}
                errorMessage={errors.new_password?.message}
              />
            </div>
          </div>

          <div className='mt-2 flex flex-col flex-wrap sm:flex-row'>
            <div className='truncate pt-3 capitalize sm:w-[20%] sm:text-right'>
              Confirm Password
            </div>
            <div className='sm:w-[60%] sm:pl-5 pt-3 sm:pt-0 '>
              <Input
                classNameInput='w-full rounded-sm border border-gray-300 px-3 py-2 outline-none focus:border-gray-500 focus:shadow-sm'
                name='confirm_password'
                type='password'
                placeholder='Confirm Password'
                register={register}
                errorMessage={errors.confirm_password?.message}
              />
            </div>
          </div>

          <div className='mt-2 flex flex-col flex-wrap sm:flex-row'>
            <div className='truncate pt-3 capitalize sm:w-[20%] sm:text-right' />
            <div className='sm:w-[80%] sm:pl-5'>
              <Button
                className='flex h-9 items-center rounded-sm bg-orange px-5 text-center text-sm text-white hover:bg-orange/80'
                type='submit'
              >
                Lưu
              </Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}
