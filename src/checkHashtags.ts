import { createHash } from './lib/crypto'
import { filesExist, readFile } from './lib/fs'
import { outBase } from './utils'

const checkHashtags = async(body: string, style: string): Promise<any> => {
  try {
    let hash = await createHash([body, style])
    var filesPresent = await filesExist(
      outBase(), [
        'index.html',
        'style.css',
        /curriculum.+\.pdf/
      ]
    )
    if (!filesPresent) return [hash, false, filesPresent]
    const indexHtml = await readFile(outBase('index.html'))
    const styleCss = await readFile(outBase('style.css'))
    var infoKey = await createHash([indexHtml, styleCss])
    return [hash, hash === infoKey, filesPresent]
  } catch (error) {
    console.error(error)
  }
}

export default checkHashtags