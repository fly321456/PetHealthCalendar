function pad(value) {
  return value < 10 ? '0' + value : String(value)
}

function formatDate(date) {
  const value = date instanceof Date ? date : new Date(date)
  return value.getFullYear() + '-' + pad(value.getMonth() + 1) + '-' + pad(value.getDate())
}

function today() {
  return formatDate(new Date())
}

function addDays(dateText, days) {
  const date = dateText ? new Date(dateText.replace(/-/g, '/')) : new Date()
  date.setDate(date.getDate() + days)
  return formatDate(date)
}

function diffDays(dateText) {
  const target = new Date(dateText.replace(/-/g, '/'))
  const now = new Date(today().replace(/-/g, '/'))
  const oneDay = 24 * 60 * 60 * 1000
  return Math.ceil((target.getTime() - now.getTime()) / oneDay)
}

function statusOf(dateText, done) {
  if (done) return 'done'
  const days = diffDays(dateText)
  if (days < 0) return 'overdue'
  if (days === 0) return 'today'
  return 'pending'
}

module.exports = {
  addDays,
  diffDays,
  formatDate,
  statusOf,
  today
}
