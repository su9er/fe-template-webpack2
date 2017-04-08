const fs = require('fs')

module.exports = getEntries = () => {
  const test = /(.*)\.js$/i
  let entries = {}
  fs.readdirSync(path).forEach(file => {
    let t
    const stats = fs.lstatSync(file)
    if (stats.isFile() && (t = test.exec(file)) !== null) {
      entries[t[1]] = `${path}/${file}`
    }
  })
  return entries
}
