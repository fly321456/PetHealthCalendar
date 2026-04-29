const storage = require('../../utils/storage')

Page({
  data: {
    pets: []
  },

  onShow() {
    this.setData({ pets: storage.getPets() })
  },

  goAdd() {
    wx.navigateTo({ url: '/pages/pet-form/pet-form' })
  }
})
