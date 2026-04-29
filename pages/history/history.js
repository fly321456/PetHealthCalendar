const storage = require('../../utils/storage')

function decorateRecord(item) {
  return Object.assign({}, item, {
    completedShort: item.completedDate ? item.completedDate.slice(5).replace('-', '/') : '未知',
    nextShort: item.nextDueDate ? item.nextDueDate.slice(5).replace('-', '/') : ''
  })
}

Page({
  data: {
    records: [],
    summary: []
  },

  onShow() {
    const records = storage.getRecords().map(decorateRecord)
    this.setData({
      records,
      summary: [
        { label: '完成记录', value: records.length, helper: '累计次数' },
        { label: '有下次提醒', value: records.filter(item => item.nextDueDate).length, helper: '继续跟进' },
        { label: '备注', value: records.filter(item => item.note).length, helper: '已留档' }
      ]
    })
  }
})
