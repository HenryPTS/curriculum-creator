const HTML5ToPDF = require('html5-to-pdf')
const { getDateString, assetsBase, outBase } = require('./utils')
const { readFile, writeFile } = require('./lib/fs')
const checkHashtags = require('./checkHashtags')
const createTar = require('./createTar')
const renderBody = require('./renderBody')

async function start(inputBody) {
  const outputPath = 'curriculum' + getDateString() + '.pdf'
  this.html5ToPDF = new HTML5ToPDF({
    inputBody,
    outputPath: outBase(outputPath),
    include: [
      assetsBase("style.css"),
    ],
  })
  try {
    await this.html5ToPDF.start()
  } catch(error) {
    throw error
  }
}

async function build(key, style, inputBody) {
  try {
    await this.html5ToPDF.build()
    await writeFile(outBase('.info_key.md5'), key)
    await writeFile(outBase("index.html"), inputBody)
    await writeFile(outBase("style.css"), style)
    console.log('files written')
  } catch(error) {
    throw error
  }
}

async function run() {
  try {
    const inputBody = await renderBody()
    const style = await readFile(assetsBase('style.css'));
    const [key, isMatch, filesPresent] = await checkHashtags(inputBody, style)
    await start(inputBody)
    if (isMatch) return console.log("Files unchanged since last compile")
    if (!isMatch && filesPresent) await createTar()
    await build(key, style, inputBody)
    return this.html5ToPDF.close()
  } catch (error) {
    this.html5ToPDF.close()
    throw error
  }
}
run()
  .then(
    () => {
      process.exit(0)
    }
  )
  .catch(
    () => {
      process.exit(0)
    }
  )