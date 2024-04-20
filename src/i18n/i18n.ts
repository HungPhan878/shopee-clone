/* eslint-disable import/no-named-as-default-member */
import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

// Components
import HOME_EN from '../locales/en/home.json'
import PRODUCT_EN from '../locales/en/product.json'
import HOME_VI from '../locales/vi/home.json'
import PRODUCT_VI from '../locales/vi/product.json'

// Dùng làm đoạn text cho language
export const locales = {
  vi: 'Tiếng Việt',
  en: 'English'
}

export const resources = {
  en: {
    home: HOME_EN,
    product: PRODUCT_EN
  },
  vi: {
    home: HOME_VI,
    product: PRODUCT_VI
  }
}

export const defaultNS = 'home'

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: 'vi', // language to use, more information here: https://www.i18next.com/overview/configuration-options#languages-namespaces-resources
    // you can use the i18n.changeLanguage function to change the language manually: https://www.i18next.com/overview/api#changelanguage
    // if you're using a language detector, do not define the lng option
    // Khai báo ns cần dùng tại đây mặc đinh là translate
    ns: ['home', 'product'],
    defaultNS,
    fallbackLng: 'vi',
    interpolation: {
      escapeValue: false // react already safes from xss
    }
  })
