const storage = require('../../utils/storage')

Page({
  data: {
    pets: [],
    summary: []
  },

  onShow() {
    const pets = storage.getPets().map(item => Object.assign({}, item, {
      typeText: item.type === 'cat' ? '猫' : '狗',
      ageText: item.ageText || '年龄未填写'
    }))

    this.setData({
      pets,
      summary: [
        { label: '宠物档案', value: pets.length, helper: '已添加' },
        { label: '猫咪', value: pets.filter(item => item.type === 'cat').length, helper: '档案数' },
        { label: '狗狗', value: pets.filter(item => item.type === 'dog').length, helper: '档案数' }
      ]
    })
  },

  goAdd() {
    wx.navigateTo({ url: '/pages/pet-form/pet-form' })
  }
})
