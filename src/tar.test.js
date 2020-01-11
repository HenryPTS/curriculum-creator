const tar = require('./tar')
const path = require('path')
const { access, unlink } = require('./utils')

test('An archive is created with .gitignore and package.json', async () => {
  const res = await tar.create(
    path.join(__dirname, 'test.tar'),
    path.join(process.cwd()),
    '.gitignore',
    'package.json'
  )
  const hasAccess = await access(path.join(__dirname, 'test.tar'))
  await expect(hasAccess).toBe(true)
  // await unlink(path.join(__dirname, 'test.tar'))
  console.log(res)
})