const fs = require('fs')

function access(path) {
  return new Promise((resolve, reject) => {
    fs.access(path, (err) => {
      if (err) return reject(err)
      return resolve(true)
    })
  })
}

async function unlink(filename) {
  return new Promise((resolve, reject) => {
    fs.unlink(filename, (err) => {
      if (err) return reject(err)
      return resolve(true)
    })
  })
}

function readdir(path) {
  return new Promise((resolve, reject) => {
    fs.readdir(path, (err, files) => {
      if (err) return reject(false)
      resolve(files)
    })
  })
}

async function filesExist(path, fileNames) {
  try {
    const files = await readdir(path)
    return fileNames.every(fname => files.find(file => file.match(fname)))
  } catch (error) {
    throw error
  }
}

function readFile(path) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, { encoding: 'utf8' }, (err, file) => {
      if (err) { return reject(err) }
      resolve(file)
    })
  })
}

function writeFile(path, data) {
  return new Promise((resolve, reject) => {
    fs.writeFile(path, data, (err, file) => {
      if (err) return reject(err)
      resolve(file)
    })
  })
}

function copyPath(src, dest) {
  return new Promise((resolve, reject) => {
    fs.copyFile(src, dest, (err) => {
      if (err) return reject(err)
      resolve()
    })
  })
}

module.exports = {
  readFile,
  writeFile,
  copyPath,
  filesExist,
  access,
  unlink
}
