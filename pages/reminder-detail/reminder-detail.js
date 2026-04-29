const storage = require('../../utils/storage')
const { statusOf } = require('../../utils/date')

function decorate(item) {
  if (item.uncertain) {
    return Object.assign({}, item, {
      statusText: '待确认',
      tagClass: 'warn'
    })
  }

  const status = statusOf(item.dueDate, item.status === 'done')
  const map = {
    overdue: ['已逾期', 'danger'],
    today: ['今天', 'warn'],
    pending: ['待办', ''],
    done: ['已完成', '']
  }
  return Object.assign({}, item, {
    statusText: map[status][0],
    tagClass: map[status][1]
  })
}

Page({
  data: {
    saving: false,
    reminderId: '',
    reminder: null
  },

  onLoad(options) {
    const reminder = storage.getReminders().find(item => item.id === options.id)
    this.setData({
      reminderId: options.id,
      reminder: reminder ? decorate(reminder) : null
    })
  },

  onDateChange(event) {
    this.setData({
      'reminder.dueDate': event.detail.value,
      'reminder.uncertain': false
    })
  },

  onNoteInput(event) {
    this.setData({ 'reminder.note': event.detail.value })
  },

  save() {
    if (this.data.saving || !this.data.reminder) return

    this.setData({ saving: true })
    storage.saveReminder(this.data.reminder)
    wx.showToast({ title: '已保存', icon: 'success' })
    setTimeout(() => this.setData({ saving: false }), 400)
  },

  goRecord() {
    wx.navigateTo({ url: '/pages/record-form/record-form?id=' + this.data.reminderId })
  }
})
