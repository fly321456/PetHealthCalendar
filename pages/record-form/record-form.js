const storage = require('../../utils/storage')
const { addDays, today } = require('../../utils/date')
const { nextReminderFromRecord } = require('../../utils/schedule')

Page({
  data: {
    saving: false,
    reminder: null,
    form: {
      completedDate: '',
      nextDueDate: '',
      note: ''
    }
  },

  onLoad(options) {
    const reminder = storage.getReminders().find(item => item.id === options.id)
    if (!reminder) return

    this.setData({
      reminder,
      form: {
        completedDate: today(),
        nextDueDate: reminder.cycleDays ? addDays(today(), reminder.cycleDays) : '',
        note: ''
      }
    })
  },

  onDateChange(event) {
    const field = event.currentTarget.dataset.field
    this.setData({ ['form.' + field]: event.detail.value })
  },

  onNoteInput(event) {
    this.setData({ 'form.note': event.detail.value })
  },

  save() {
    if (this.data.saving || !this.data.reminder) return

    this.setData({ saving: true })

    const reminder = this.data.reminder
    const form = this.data.form
    storage.saveRecord({
      petId: reminder.petId,
      petName: reminder.petName,
      reminderId: reminder.id,
      type: reminder.type,
      title: reminder.title,
      completedDate: form.completedDate,
      nextDueDate: form.nextDueDate,
      note: form.note
    })

    storage.saveReminder(Object.assign({}, reminder, {
      status: 'done',
      completedDate: form.completedDate,
      uncertain: false
    }))

    const nextReminder = nextReminderFromRecord(reminder, form)
    if (nextReminder && form.nextDueDate) {
      storage.saveReminder(nextReminder)
    }

    wx.showToast({ title: '已记录', icon: 'success' })
    setTimeout(() => wx.navigateBack({ delta: 2 }), 500)
  }
})
