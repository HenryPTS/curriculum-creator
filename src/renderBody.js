const mustache = require('mustache')
const { readFile } = require('./lib/fs')
const { assetsBase } = require('./utils')


async function renderBody() {
  try {
    const viewJson = await readFile(assetsBase('view.json'))
    const template = await readFile(assetsBase('index.mst'))
    return mustache.render(template, JSON.parse(viewJson))  
  } catch (error) {
    throw error
  }
}

module.exports = renderBody