const storage = require('../../utils/storage')
const { diffDays, statusOf } = require('../../utils/date')

function decorateReminder(item) {
  if (item.uncertain) {
    return Object.assign({}, item, {
      status: 'uncertain',
      statusText: '待确认',
      tagClass: 'warn',
      countdownText: '请确认日期'
    })
  }

  const status = statusOf(item.dueDate, item.status === 'done')
  const days = diffDays(item.dueDate)
  const statusMap = {
    overdue: ['已逾期', 'danger'],
    today: ['今天', 'warn'],
    pending: ['待办', ''],
    done: ['已完成', '']
  }
  let countdownText = '还有 ' + days + ' 天'
  if (days === 0) countdownText = '今天该处理'
  if (days < 0) countdownText = '已逾期 ' + Math.abs(days) + ' 天'

  return Object.assign({}, item, {
    status,
    statusText: statusMap[status][0],
    tagClass: statusMap[status][1],
    countdownText
  })
}

Page({
  data: {
    pets: [],
    activePetId: '',
    reminders: [],
    nextReminder: null
  },

  onShow() {
    this.loadData()
  },

  loadData() {
    const pets = storage.getPets()
    const activePetId = this.data.activePetId || (pets[0] && pets[0].id) || ''
    const reminders = storage.getReminders()
      .filter(item => !activePetId || item.petId === activePetId)
      .filter(item => item.status !== 'done')
      .map(decorateReminder)
      .sort((a, b) => {
        if (a.uncertain && !b.uncertain) return 1
        if (!a.uncertain && b.uncertain) return -1
        return diffDays(a.dueDate) - diffDays(b.dueDate)
      })

    this.setData({
      pets,
      activePetId,
      reminders,
      nextReminder: reminders[0] || null
    })
  },

  switchPet(event) {
    this.setData({ activePetId: event.currentTarget.dataset.id }, () => this.loadData())
  },

  goAddPet() {
    wx.navigateTo({ url: '/pages/pet-form/pet-form' })
  },

  goDetail(event) {
    wx.navigateTo({ url: '/pages/reminder-detail/reminder-detail?id=' + event.currentTarget.dataset.id })
  },

  goHistory() {
    wx.switchTab({ url: '/pages/history/history' })
  }
})
