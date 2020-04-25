import mustache from 'mustache'


export default async function renderBody(template: string, viewJson: string) {
  try {
    return mustache.render(template, JSON.parse(viewJson))  
  } catch (error) {
    console.error(error)
    throw error
  }
}