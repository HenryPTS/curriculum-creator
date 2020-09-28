import HTML5ToPDF from 'html5-to-pdf'
import commander, { program } from 'commander'

import { getDateString, assetsBase, outBase } from './utils'
import { readFile, writeFile } from './lib/fs'
import { createHash } from './lib/crypto'

import renderBody from './renderBody'

program
  .option('-v, --verbose')
  .option('-f, --force')
program.parse(process.argv)

async function curriculum() {
  const outputPath = 'curriculum' + getDateString() + '.pdf'
  var oldInfoKey = null
  
  const styleCss = await readFile(assetsBase('style.css'))
  const viewJson = await readFile(assetsBase('view.json'))
  const indexMst = await readFile(assetsBase('index.mst'))
  if (program.verbose) console.log(`imported: ${assetsBase('style.css')}\n${assetsBase('view.json')}\n${assetsBase('index.mst')}`)
  try {
    oldInfoKey = await readFile(outBase('.info_key.md5'))
  } catch ({ error, path }) {
    console.log('No hashtag found in output directory')
  }

  const renderedTemplate = await renderBody(indexMst, viewJson)
  const infoKey = await createHash([renderedTemplate, styleCss])
  if (program.verbose)
    console.log('Created hash key', infoKey)
  if (oldInfoKey === infoKey && !program.force)
    return console.log('Files unchanged since last compile')

  const html5ToPDF = new HTML5ToPDF({
    launchOptions: { executablePath: '/usr/bin/chromium-browser' },
    inputBody: renderedTemplate,
    outputPath: outBase(outputPath),
    include: [
      assetsBase('style.css'),
    ],
  })
  await html5ToPDF.start()
  if (program.verbose) console.log('Starting headless browser...')

  await html5ToPDF.build()
  if (program.verbose) console.log('New pdf file outputted')

  await writeFile(outBase('.info_key.md5'), infoKey)
  await writeFile(outBase('index.html'), renderedTemplate)
  await writeFile(outBase('style.css'), styleCss)
  if (program.verbose) console.log('New markup files written to output')
  html5ToPDF.close()

  process.exit(0)
}

curriculum() 