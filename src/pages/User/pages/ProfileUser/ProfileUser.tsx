/* eslint-disable prettier/prettier */
import { yupResolver } from '@hookform/resolvers/yup'
import { useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
import { useForm, Controller } from 'react-hook-form'

// components
import Button from 'src/Components/Button'
import Input from 'src/Components/Input'
import InputNumber from 'src/Components/InputNumber'
import userApi from 'src/apis/user.api'
import { userSchema, userSchemaType } from 'src/utils/rules'

type FormData = Pick<
  userSchemaType,
  'name' | 'phone' | 'address' | 'date_of_birth' | 'avatar'
>

const profileSchema = userSchema.pick([
  'name',
  'phone',
  'address',
  'date_of_birth',
  'avatar'
])

export default function ProfileUser() {
  const {
    register,
    formState: { errors },
    control,
    setValue
  } = useForm<FormData>({
    defaultValues: {
      name: '',
      phone: '',
      address: '',
      date_of_birth: new Date(1990, 0, 1),
      avatar: ''
    },
    resolver: yupResolver(profileSchema)
  })

  // useQuery
  const { data: profileDataQuery } = useQuery({
    queryKey: ['profile'],
    queryFn: userApi.getUser
  })

  const profileData = profileDataQuery?.data.data

  useEffect(() => {
    if (profileData) {
      setValue('name', profileData.name)
      setValue('phone', profileData.phone)
      setValue('address', profileData.address)
      setValue(
        'date_of_birth',
        profileData.date_of_birth
          ? new Date(profileData.date_of_birth)
          : new Date(1990, 0, 1)
      )
      setValue('avatar', profileData.avatar)
    }
  }, [profileData, setValue])

  return (
    <div className='rounded-sm bg-white px-2 pb-10 shadow md:px-7 md:pb-20'>
      <div className='border-b border-b-gray-200 py-6'>
        <h1 className='text-lg font-medium capitalize text-gray-900'>
          Hồ Sơ Của Tôi
        </h1>
        <div className='mt-1 text-sm text-gray-700'>
          Quản lý thông tin hồ sơ để bảo mật tài khoản
        </div>
      </div>

      <form className='mt-8 flex flex-col-reverse lg:flex-row lg:items-start'>
        <div className='mt-6 flex-grow lg:mt-0 md:pr-12'>
          <div className='flex flex-col flex-wrap sm:flex-row'>
            <div className='truncate pt-3 capitalize sm:w-[20%] sm:text-right'>
              Email
            </div>
            <div className='sm:w-[80%] sm:pl-5'>
              <div className='pt-3 text-gray-700'>{profileData?.email}</div>
            </div>
          </div>

          <div className='mt-2 flex flex-col flex-wrap sm:flex-row'>
            <div className='truncate pt-3 capitalize sm:w-[20%] sm:text-right'>
              Tên
            </div>
            <div className='sm:w-[80%] sm:pl-5 pt-3 sm:pt-0'>
              <Input
                classNameInput='w-full rounded-sm border border-gray-300 px-3 py-2 outline-none focus:border-gray-500 focus:shadow-sm'
                name='name'
                placeholder='Tên'
                register={register}
                errorMessage={errors.name?.message}
              />
            </div>
          </div>

          <div className='mt-2 flex flex-col flex-wrap sm:flex-row'>
            <div className='truncate pt-3 capitalize sm:w-[20%] sm:text-right'>
              Phone Number
            </div>
            <div className='sm:w-[80%] sm:pl-5 pt-3 sm:pt-0'>
              <Controller
                control={control}
                name='phone'
                render={({ field }) => {
                  return (
                    <InputNumber
                      classNameInput='w-full rounded-sm border border-gray-300 px-3 py-2 outline-none focus:border-gray-500 focus:shadow-sm'
                      placeholder='Phone Number'
                      {...field}
                      onChange={field.onChange}
                    />
                  )
                }}
              />
            </div>
          </div>

          <div className='mt-2 flex flex-col flex-wrap sm:flex-row'>
            <div className='truncate pt-3 capitalize sm:w-[20%] sm:text-right'>
              Address
            </div>
            <div className='sm:w-[80%] sm:pl-5 pt-3 sm:pt-0'>
              <Input
                classNameInput='w-full rounded-sm border border-gray-300 px-3 py-2 outline-none focus:border-gray-500 focus:shadow-sm'
                name='address'
                placeholder='Address'
                register={register}
                errorMessage={errors.address?.message}
              />
            </div>
          </div>

          <div className='mt-2 flex flex-col flex-wrap sm:flex-row sm:items-center'>
            <div className='truncate  capitalize sm:w-[20%] sm:text-right'>
              Date of Birth
            </div>
            <div className='flex flex-col flex-grow sm:flex-row sm:items-center pt-3 sm:pt-0 sm:pl-5 gap-2'>
              <select
                name='day'
                id='day'
                className='w-full rounded-sm border cursor-pointer border-gray-300 px-3 py-2 outline-none focus:border-gray-500 focus:shadow-sm'
                value=''
              >
                <option value='' disabled>
                  Day
                </option>
              </select>
              <select
                name='month'
                id='month'
                value=''
                className='w-full  rounded-sm border cursor-pointer border-gray-300 px-3 py-2 outline-none focus:border-gray-500 focus:shadow-sm'
              >
                <option value='' disabled>
                  Month
                </option>
              </select>
              <select
                name='year'
                id='year'
                value=''
                className='w-full  rounded-sm border cursor-pointer border-gray-300 px-3 py-2 outline-none focus:border-gray-500 focus:shadow-sm'
              >
                <option value='' disabled>
                  Year
                </option>
              </select>
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

        <div className='flex justify-center lg:w-72 lg:border-l lg:border-l-gray-200'>
          <div className='flex flex-col items-center'>
            <div className='my-5 h-24 w-24'>
              <img
                src='https://th.bing.com/th/id/OIP.Z-vfTZPXyrE9p8PCY1FB8AHaEn?w=338&h=180&c=7&r=0&o=5&pid=1.7'
                alt='Porche'
                className='h-full w-full rounded-full object-cover'
              />
            </div>
            <input className='hidden' type='file' accept='.jpg,.jpeg,.png' />
            <button
              className='flex h-10 items-center justify-end rounded-sm border bg-white px-6 text-sm text-gray-600 shadow-sm'
              type='button'
            >
              Chọn ảnh
            </button>
            <div className='mt-3 text-gray-400'>
              <div>Dụng lượng file tối đa 1 MB</div>
              <div>Định dạng:.JPEG, .PNG</div>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}
