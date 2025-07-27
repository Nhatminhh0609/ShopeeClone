// utils/rules.ts
import type { RegisterOptions, UseFormGetValues } from 'react-hook-form'
import * as yup from 'yup'
interface FormData {
  email: string
  password: string
  confirm_password: string
}

type Rules = {
  [K in keyof FormData]: RegisterOptions<FormData, K>
}

export const getRules = (getValues?: UseFormGetValues<FormData>): Rules => ({
  email: {
    required: 'Email là bắt buộc',
    pattern: {
      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
      message: 'Email không hợp lệ'
    },
    maxLength: {
      value: 160,
      message: 'Email tối đa 160 ký tự'
    },
    minLength: {
      value: 5,
      message: 'Email tối thiểu 5 ký tự'
    }
  },
  password: {
    required: 'Mật khẩu là bắt buộc',
    maxLength: {
      value: 160,
      message: 'Mật khẩu tối đa 160 ký tự'
    },
    minLength: {
      value: 6,
      message: 'Mật khẩu tối thiểu 6 ký tự'
    }
  },
  confirm_password: {
    required: 'Xác nhận mật khẩu là bắt buộc',
    maxLength: {
      value: 160,
      message: 'Xác nhận mật khẩu tối đa 160 ký tự'
    },
    minLength: {
      value: 6,
      message: 'Xác nhận mật khẩu tối thiểu 6 ký tự'
    },
    validate: getValues
      ? (value: string) => value === getValues('password') || 'Nhập lại password không khớp'
      : undefined
  }
})

export const schema = yup.object({
  email: yup
    .string()
    .required('Email là bắt buộc')
    .email('Email không đúng định dạng')
    .min(5, 'Độ dài 5 - 160 ký tự')
    .max(160, 'Độ dài 5 - 160 ký tự'),
  password: yup
    .string()
    .required('Password là bắt buộc')
    .min(6, 'Độ dài 6 - 160 ký tự')
    .max(160, 'Độ dài 6 - 160 ký tự'),
  confirm_password: yup
    .string()
    .required('Xác nhận mật khẩu là bắt buộc')
    .min(6, 'Độ dài 6 - 160 ký tự')
    .max(160, 'Độ dài 6 - 160 ký tự')
    .oneOf([yup.ref('password')], 'Nhập lại password không khớp'),
  price_min: yup.string().test({
    name: 'price-not-allowed',
    message: 'Giá không phù hợp',
    test: function (value) {
      const price_min = value
      const { price_max } = this.parent
      if (price_min != '' && price_max != '') {
        return Number(price_max) >= Number(price_min)
      }
      return price_min != '' || price_max != ''
    }
  }),
  price_max: yup.string().test({
    name: 'price-not-allowed',
    message: 'Giá không phù hợp',
    test: function (value) {
      const price_max = value
      const { price_min } = this.parent
      if (price_min != '' && price_max != '') {
        return Number(price_max) >= Number(price_min)
      }
      return price_min != '' || price_max != ''
    }
  }),
  name: yup.string().trim().required('Tên sản phẩm là bắt buộc').max(160, 'Tên sản phẩm tối đa 160 ký tự')
})

export type Schema = yup.InferType<typeof schema>
