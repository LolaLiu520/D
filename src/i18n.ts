import { createI18n, LocaleMessages, VueMessageType } from 'vue-i18n'

/**
 * Load locale messages
 *
 * The loaded `JSON` locale messages is pre-compiled by `@intlify/vue-i18n-loader`, which is integrated into `vue-cli-plugin-i18n`.
 * See: https://github.com/intlify/vue-i18n-loader#rocket-i18n-resource-pre-compilation
 */
function loadLocaleMessages(): LocaleMessages<VueMessageType> {
  const locales = require.context(
    `${'./locales/'}`,
    true,
    /[A-Za-z0-9-_,\s]+\.json$/i
  )
  const messages: LocaleMessages<VueMessageType> = {}
  let obj: any = {}
  locales.keys().forEach((key) => {
    const path = key.split('/')
    if (path.length === 3) {
      const locale = path[1]
      obj = Object.assign({}, obj, locales(key).default)
      messages[locale] = obj
    }
  })
  return messages
}

export default createI18n({
  legacy: false,
  // 全局可以使用 $t 函数
  globalInjection: true,
  locale: sessionStorage.getItem('locales') || 'zh',
  fallbackLocale: process.env.VUE_APP_I18N_FALLBACK_LOCALE || 'en',
  messages: loadLocaleMessages() as any
})
