// import tar from './lib/tar'
// import path from 'path'
// import { writeFile } from './lib/fs'
// import { outBase } from './utils'

// export default async function createTar(key: string, inputBody: string, style: string){
//   await tar.create(
//     path.join(__dirname, '../out', 'archived', 'test.tar'),
//     path.join(process.cwd(), 'out'),
//     '.info_key.md5',
//     'index.html',
//     'style.css'
//   )
//   await writeFile(outBase('.info_key.md5'), key)
//   await writeFile(outBase('index.html'), inputBody)
//   await writeFile(outBase('style.css'), style)
// }
