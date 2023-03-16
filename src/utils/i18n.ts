// import { createI18n, LocaleMessages, VueMessageType } from 'vue-i18n'
// import Vue from 'vue'
// import VueI18n from 'vue-i18n'
// function loadLocaleMessages(): LocaleMessages<VueMessageType> {
//     const locales = require.context(
//       `${'./locales/'}`,
//       true,
//       /[A-Za-z0-9-_,\s]+\.json$/i
//     )
//     const messages: LocaleMessages<VueMessageType> = {}
//     let obj: any = {}
//     locales.keys().forEach((key) => {
//       const path = key.split('/')
//       if (path.length === 3) {
//         const locale = path[1]
//         obj = Object.assign({}, obj, locales(key).default)
//         messages[locale] = obj
//       }
//     })
//     return messages
//   }
// Vue.use(VueI18n)

// const i18n = new VueI18n({
//     locale: sessionStorage.getItem('locales') || 'en',
//     messages: {
//         'en_us':en,
//         'zh_cn': zhHans,
//     }
// })
// export default i18n
