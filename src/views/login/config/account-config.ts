import i18n from '@/i18n'
// 编写好规则
export const rules = {
  name: [
    {
      required: true,
      // @ts-ignore for the block scope and imports
      message: `${i18n.global.t('account')}${i18n.global.t('isRequired')}`,
      trigger: 'blur'
    },
    {
      pattern: /^[a-z0-9]{5,10}$/,
      message: `${i18n.global.t('accountTips')}`,
      trigger: 'blur'
    }
  ],
  password: [
    {
      required: true,
      message: `${i18n.global.t('password')}${i18n.global.t('isRequired')}`,
      trigger: 'blur'
    },
    {
      pattern: /^[a-z0-9]{3,}$/,
      message: `${i18n.global.t('passwordTips')}`,
      trigger: 'blur'
    }
  ]
}
