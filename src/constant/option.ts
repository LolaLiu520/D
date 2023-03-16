import i18n from '@/i18n'
export interface options {
  value: any
  label: string
}
export const language: options[] = [
  {
    value: 'zh',
    // @ts-ignore for the block scope and imports
    label: i18n.global.t('chinese')
  },
  {
    value: 'en',
    label: i18n.global.t('english')
  },
  {
    value: 'frn',
    label: i18n.global.t('french')
  }
]
export const settingsList: options[] = [
  {
    value: 1,
    label: i18n.global.t('useInformation')
  },
  {
    value: 2,
    label: i18n.global.t('paymentMethod')
  },
  {
    value: 3,
    label: i18n.global.t('accountFunds')
  },
  {
    value: 4,
    label: i18n.global.t('multiAddressInformation')
  },
  {
    value: 5,
    label: i18n.global.t('messageNotifications')
  },
  {
    value: 6,
    label: i18n.global.t('modifyPassword')
  }
]
export const customerStyleList: options[] = [
  {
    value: 1,
    label: i18n.global.t('vipCustomer')
  },
  {
    value: 2,
    label: i18n.global.t('normalCustomer')
  }
]
export const creditList: options[] = [
  {
    value: 1,
    label: i18n.global.t('yes')
  },
  {
    value: 2,
    label: i18n.global.t('no')
  }
]
export const activeFlag: options[] = [
  {
    value: 1,
    label: i18n.global.t('creatStatus')
  },
  {
    value: 2,
    label: i18n.global.t('openStatus')
  },
  {
    value: 3,
    label: i18n.global.t('closeStatus')
  }
]
