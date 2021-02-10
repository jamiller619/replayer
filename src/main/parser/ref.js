const ref = (obj, path, defaultValue) =>
  path
    .split('.')
    .reduce((o, x) => (o != null && o[x] != null ? o[x] : defaultValue), obj)

module.exports = ref
