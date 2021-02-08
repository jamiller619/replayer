const ref = (obj, path, defaultValue) =>
  path
    .split('.')
    .reduce((o, x) => (o && o[x] ? o[x] : defaultValue || null), obj)

module.exports = {
  ref,
}
