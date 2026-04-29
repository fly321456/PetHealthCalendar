const REMINDER_TYPES = {
  vaccine: '疫苗',
  internalDeworm: '体内驱虫',
  externalDeworm: '体外驱虫',
  checkup: '体检',
  custom: '自定义'
}

const DEFAULT_TEMPLATES = [
  {
    type: 'vaccine',
    title: '下一次疫苗提醒',
    cycleDays: 0,
    description: '根据宠物医生建议填写下一次日期'
  },
  {
    type: 'internalDeworm',
    title: '体内驱虫',
    cycleDays: 90,
    description: '默认每 3 个月提醒一次，可按医生建议修改'
  },
  {
    type: 'externalDeworm',
    title: '体外驱虫',
    cycleDays: 30,
    description: '默认每 1 个月提醒一次，可按医生建议修改'
  },
  {
    type: 'checkup',
    title: '年度体检',
    cycleDays: 365,
    description: '默认每 12 个月提醒一次'
  }
]

module.exports = {
  REMINDER_TYPES,
  DEFAULT_TEMPLATES
}
