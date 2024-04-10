/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prettier/prettier */
import React, { Fragment, useRef } from 'react'
import { toast } from 'react-toastify'

interface Props {
  onChange?: (file?: File) => void
}

export default function InputFile({ onChange }: Props) {
  const inputFileRef = useRef<HTMLInputElement>(null)

  // handle f
  const handleUpload = () => {
    const inputFile = inputFileRef.current
    inputFile?.click()
  }

  const handleChangeImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileFromLocal = event.target.files?.[0]
    if (
      fileFromLocal &&
      (fileFromLocal.size >= 1048000 || !fileFromLocal.type.includes('image'))
    ) {
      toast.error('Dụng lượng file tối đa 1 MB, Định dạng:.JPEG, .PNG', {
        position: 'top-center'
      })
    } else {
      onChange && onChange(fileFromLocal)
    }
  }
  return (
    <Fragment>
      <input
        className='hidden'
        type='file'
        accept='.jpg,.jpeg,.png'
        ref={inputFileRef}
        onChange={handleChangeImage}
        onClick={(event) => ((event.target as any).value = null)}
      />
      <button
        className='flex h-10 items-center justify-end rounded-sm border bg-white px-6 text-sm text-gray-600 shadow-sm'
        type='button'
        onClick={handleUpload}
      >
        Chọn ảnh
      </button>
    </Fragment>
  )
}
