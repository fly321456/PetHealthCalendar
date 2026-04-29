const PETS_KEY = 'pets'
const REMINDERS_KEY = 'reminders'
const RECORDS_KEY = 'records'

function getList(key) {
  return wx.getStorageSync(key) || []
}

function setList(key, value) {
  wx.setStorageSync(key, value)
}

function createId(prefix) {
  return prefix + '_' + Date.now() + '_' + Math.floor(Math.random() * 10000)
}

function getPets() {
  return getList(PETS_KEY)
}

function savePet(pet) {
  const pets = getPets()
  const nextPet = Object.assign({}, pet, {
    id: pet.id || createId('pet'),
    updatedAt: Date.now()
  })

  if (!pet.id) {
    nextPet.createdAt = Date.now()
    pets.unshift(nextPet)
  } else {
    const index = pets.findIndex(item => item.id === pet.id)
    if (index >= 0) pets[index] = Object.assign({}, pets[index], nextPet)
  }

  setList(PETS_KEY, pets)
  return nextPet
}

function getReminders() {
  return getList(REMINDERS_KEY)
}

function saveReminder(reminder) {
  const reminders = getReminders()
  const nextReminder = Object.assign({}, reminder, {
    id: reminder.id || createId('reminder'),
    updatedAt: Date.now()
  })

  if (!reminder.id) {
    nextReminder.createdAt = Date.now()
    reminders.unshift(nextReminder)
  } else {
    const index = reminders.findIndex(item => item.id === reminder.id)
    if (index >= 0) reminders[index] = Object.assign({}, reminders[index], nextReminder)
  }

  setList(REMINDERS_KEY, reminders)
  return nextReminder
}

function saveReminders(items) {
  const reminders = getReminders()
  const nextItems = items.map(item => Object.assign({}, item, {
    id: item.id || createId('reminder'),
    createdAt: Date.now(),
    updatedAt: Date.now()
  }))
  setList(REMINDERS_KEY, nextItems.concat(reminders))
  return nextItems
}

function getRecords() {
  return getList(RECORDS_KEY)
}

function saveRecord(record) {
  const records = getRecords()
  const nextRecord = Object.assign({}, record, {
    id: record.id || createId('record'),
    createdAt: Date.now()
  })
  records.unshift(nextRecord)
  setList(RECORDS_KEY, records)
  return nextRecord
}

module.exports = {
  getPets,
  getRecords,
  getReminders,
  savePet,
  saveRecord,
  saveReminder,
  saveReminders
}
