import fs from 'fs'
type FsError = { error: NodeJS.ErrnoException | null, path: string }
export function access(path: string) {
  return new Promise((resolve, reject) => {
    fs.access(path, (err) => {
      if (err) return reject(err)
      return resolve(true)
    })
  })
}

export async function unlink(filename: string) {
  return new Promise((resolve, reject) => {
    fs.unlink(filename, (err) => {
      if (err) return reject(err)
      return resolve(true)
    })
  })
}

export function readdir(path: string) {
  return new Promise<Array<string>>((resolve, reject) => {
    fs.readdir(path, (err, files) => {
      if (err) return reject(false)
      resolve(files)
    })
  })
}

export async function filesExist(path: string, fileNames: Array<RegExp | string>) {
  const files = await readdir(path)
  return fileNames.every(fname => files.find(file => file.match(fname)))
}

export function readFile(path: string) {
  return new Promise<string>((resolve, reject) => {
    fs.readFile(path, { encoding: 'utf8' }, (error, file) => {
      if (error) {
        return reject({
          error, path: path.replace(/(\/).+(\/)/, '')
        })
      }
      resolve(file)
    })
  })
}

export function writeFile(path: string, data: any) {
  return new Promise((resolve, reject) => {
    fs.writeFile(path, data, (err) => {
      if (err) return reject(err)
      return resolve()
    })
  })
}

export function copyPath(src: string, dest: string) {
  return new Promise((resolve, reject) => {
    fs.copyFile(src, dest, (err) => {
      if (err) return reject(err)
      resolve()
    })
  })
}