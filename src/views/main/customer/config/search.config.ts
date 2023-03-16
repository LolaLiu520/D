import { IForm } from '@/base-ui/form'
import i18n from '@/i18n'
import { customerStyleList, creditList, activeFlag } from '@/constant/option'
export const searchFormConfig: IForm = {
  labelWidth: '120px',
  itemStyle: {
    padding: '10px 40px'
  },
  colLayout: {
    span: 8
  },
  formItems: [
    {
      filter: true,
      field: 'keywords',
      type: 'input',
      // @ts-ignore for the block scope and imports
      placeholder: i18n.global.t('keywordsPlaceholder')
    },
    {
      field: 'enable',
      type: 'select',
      placeholder: i18n.global.t('customerStyle'),
      options: customerStyleList
    },
    {
      field: 'credit',
      type: 'select',
      placeholder: i18n.global.t('openCredit'),
      options: creditList
    },
    {
      field: 'activeFlag',
      type: 'select',
      placeholder: i18n.global.t('activeFlag'),
      options: activeFlag
    }
  ]
}
