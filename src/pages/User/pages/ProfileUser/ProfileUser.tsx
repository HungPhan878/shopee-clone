/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prettier/prettier */
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useContext, useEffect, useMemo, useState } from 'react'
import {
  useForm,
  Controller,
  FormProvider,
  useFormContext
} from 'react-hook-form'
import { toast } from 'react-toastify'

// components
import Button from 'src/Components/Button'
import Input from 'src/Components/Input'
import InputNumber from 'src/Components/InputNumber'
import userApi from 'src/apis/user.api'
import { userSchema, userSchemaType } from 'src/utils/rules'
import SelectData from '../../components/SelectData'
import { AppContext } from 'src/contexts/app.context'
import authLS from 'src/utils/auth'
import {
  getAvatarName,
  isAxiosUnproccessableEntityError
} from 'src/utils/utils'
import { ErrorResponsiveApi } from 'src/types/utils.type'
import InputFile from 'src/Components/InputFile'

// Component form
function Info() {
  const {
    register,
    formState: { errors },
    control
  } = useFormContext<FormData>()

  return (
    <>
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
                  errorMessage={errors.phone?.message}
                />
              )
            }}
          />
        </div>
      </div>
    </>
  )
}

type FormData = Pick<
  userSchemaType,
  'name' | 'phone' | 'address' | 'date_of_birth' | 'avatar'
>
// đầy là kế thừa láy FormData và loại bỏ date sau đó chuyển date mới vào có type string
type FormDataError = Omit<FormData, 'date_of_birth'> & {
  date_of_birth: string
}

const profileSchema = userSchema.pick([
  'name',
  'phone',
  'address',
  'date_of_birth',
  'avatar'
])

export default function ProfileUser() {
  const { setProfile } = useContext(AppContext)
  const [file, setFile] = useState<File>()
  const previewImage = useMemo(() => {
    if (file) {
      return URL.createObjectURL(file)
    }
  }, [file])

  const methods = useForm<FormData>({
    defaultValues: {
      name: '',
      phone: '',
      address: '',
      date_of_birth: new Date(1990, 0, 1),
      avatar: ''
    },
    resolver: yupResolver(profileSchema)
  })

  const {
    register,
    formState: { errors },
    control,
    setValue,
    handleSubmit,
    watch,
    setError
  } = methods

  // useQuery
  const { data: profileDataQuery, refetch } = useQuery({
    queryKey: ['profile'],
    queryFn: userApi.getUser
  })

  const updateProfileMutate = useMutation({
    mutationFn: userApi.updateUser
  })

  const uploadAvatarMutation = useMutation({
    mutationFn: userApi.updateAvatar
  })

  const profileData = profileDataQuery?.data.data
  const avatar = watch('avatar')

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

  // handler function
  const onSubmit = handleSubmit(async (data) => {
    try {
      let avatarName = avatar
      if (file) {
        const form = new FormData()
        form.append('image', file)
        const resAvatar = await uploadAvatarMutation.mutateAsync(form)
        avatarName = resAvatar.data?.data
        setValue('avatar', avatarName)
      }
      const res = await updateProfileMutate.mutateAsync({
        ...data,
        date_of_birth: data.date_of_birth?.toISOString(),
        avatar: avatarName
      })
      setProfile(res.data.data)
      authLS.setProfileToLS(res.data.data)
      toast.success(res.data.message)
      refetch()
    } catch (error) {
      if (
        isAxiosUnproccessableEntityError<ErrorResponsiveApi<FormDataError>>(
          error
        )
      ) {
        const formError = error.response?.data.data

        if (formError) {
          Object.keys(formError).forEach((key) => {
            setError(key as keyof FormDataError, {
              message: formError[key as keyof FormDataError],
              type: 'server'
            })
          })
        }
      }
    }
  })

  const handleChangeInputFile = (value?: File) => {
    setFile(value)
  }

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
      <FormProvider {...methods}>
        <form
          className='mt-8 flex flex-col-reverse lg:flex-row lg:items-start'
          onSubmit={onSubmit}
        >
          <div className='mt-6 flex-grow lg:mt-0 md:pr-12'>
            <div className='flex flex-col flex-wrap sm:flex-row'>
              <div className='truncate pt-3 capitalize sm:w-[20%] sm:text-right'>
                Email
              </div>
              <div className='sm:w-[80%] sm:pl-5'>
                <div className='pt-3 text-gray-700'>{profileData?.email}</div>
              </div>
            </div>

            <Info />

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

            <Controller
              control={control}
              name='date_of_birth'
              render={({ field }) => (
                <SelectData
                  errorMessage={errors.date_of_birth?.message}
                  value={field.value}
                  onChange={field.onChange}
                />
              )}
            />

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
                  src={previewImage || getAvatarName(avatar)}
                  alt='Porche'
                  className='h-full w-full rounded-full object-cover'
                />
              </div>
              {/* input file */}
              <InputFile onChange={handleChangeInputFile} />

              <div className='mt-3 text-gray-400'>
                <div>Dụng lượng file tối đa 1 MB</div>
                <div>Định dạng:.JPEG, .PNG</div>
              </div>
            </div>
          </div>
        </form>
      </FormProvider>
    </div>
  )
}
