import path from 'path'

export function getDateString() {
  const date = new Date()
  const day = date.getDate()
  const month = date.getMonth() + 1
  const year = date.getFullYear() - 2000
  const hours = ('0' + date.getHours()).slice(-2)
  const minutes = ('0' + date.getMinutes()).slice(-2)

  return(` ${day}-${month}-${year} ${hours}:${minutes}`)
}
type File = 'style.css' | 'view.json' | 'info_key.md5' | 'index.mst'
type FilePath = Array<string> | File
type Func = (...filePath: Array<string>) => string

export const assetsBase: Func = (...filePath) => path.join(process.cwd(), 'config', ...filePath)
export const outBase: Func = (...filePath) => path.join(process.cwd(), 'out', ...filePath)
