const { DEFAULT_TEMPLATES } = require('../data/templates')
const { addDays, today } = require('./date')

function buildInitialReminders(pet, form) {
  return DEFAULT_TEMPLATES.map(template => {
    const fieldName = template.type + 'Date'
    const sourceDate = form[fieldName]
    const dueDate = sourceDate
      ? (template.cycleDays > 0 ? addDays(sourceDate, template.cycleDays) : sourceDate)
      : today()

    return {
      petId: pet.id,
      petName: pet.name,
      type: template.type,
      title: template.title,
      dueDate,
      cycleDays: template.cycleDays,
      status: sourceDate ? 'pending' : 'pending',
      uncertain: !sourceDate,
      note: template.description
    }
  })
}

function nextReminderFromRecord(reminder, record) {
  if (!reminder.cycleDays) return null
  return {
    petId: reminder.petId,
    petName: reminder.petName,
    type: reminder.type,
    title: reminder.title,
    dueDate: record.nextDueDate,
    cycleDays: reminder.cycleDays,
    status: 'pending',
    uncertain: false,
    note: reminder.note
  }
}

module.exports = {
  buildInitialReminders,
  nextReminderFromRecord
}
