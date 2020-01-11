const path = require("path")

function getDateString() {
  const date = new Date()
  const day = date.getDate()
  const month = date.getMonth() + 1
  const year = date.getFullYear() - 2000
  const hours = ('0' + date.getHours()).slice(-2)
  const minutes = ('0' + date.getMinutes()).slice(-2)

  return(` ${day}-${month}-${year} ${hours}:${minutes}`)
}

const assetsBase = (...rest) => path.join(__dirname, "assets", ...rest)
const outBase = (...rest) => path.join(__dirname, "../out", ...rest)


module.exports = {
  getDateString,
  assetsBase,
  outBase
}
