const storage = require('../../utils/storage')
const { buildInitialReminders } = require('../../utils/schedule')

Page({
  data: {
    saving: false,
    errors: {},
    form: {
      type: 'cat',
      name: '',
      ageText: '',
      vaccineDate: '',
      internalDewormDate: '',
      externalDewormDate: ''
    }
  },

  onInput(event) {
    const field = event.currentTarget.dataset.field
    this.setData({
      ['form.' + field]: event.detail.value,
      ['errors.' + field]: ''
    })
  },

  onTypeChange(event) {
    this.setData({ 'form.type': event.detail.value })
  },

  onDateChange(event) {
    const field = event.currentTarget.dataset.field
    this.setData({ ['form.' + field]: event.detail.value })
  },

  save() {
    if (this.data.saving) return

    const form = this.data.form
    if (!form.name.trim()) {
      this.setData({ 'errors.name': '请填写宠物名，之后可以随时修改。' })
      return
    }

    this.setData({ saving: true })

    const pet = storage.savePet({
      type: form.type,
      name: form.name.trim(),
      ageText: form.ageText.trim()
    })
    const reminders = buildInitialReminders(pet, form)
    storage.saveReminders(reminders)

    wx.showToast({ title: '已生成日历', icon: 'success' })
    setTimeout(() => wx.navigateBack(), 500)
  }
})
