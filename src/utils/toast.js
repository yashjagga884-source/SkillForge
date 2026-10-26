// Browser alerts are intentionally used instead of an external notification package.
const toast = {
  success(message) {
    window.alert(message)
  },
  error(message) {
    window.alert(message)
  },
}

export default toast
