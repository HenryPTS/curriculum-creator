const tar = require('./lib/tar')

async function createTar(key, inputBody, style){
  await tar.create(
    path.join(__dirname, '../out', 'archived', 'test.tar'),
    path.join(process.cwd(), 'out'),
    '.info_key.md5',
    'index.html',
    'style.css'
  )
  await writeFile(outBase('.info_key.md5'), key)
  await writeFile(outBase("index.html"), inputBody)
  await writeFile(outBase("style.css"), style)
}

module.exports = createTar