import tar from 'tar'

export default async function create(file: string, C = '/', ...files: readonly string[]) {
  try {
    const res = await tar.c({
      C,
      gzip: false,
      file
    }, [
      ...files
    ])
    console.log(file, 'created')
    return res
  } catch (error) {
    console.log(error)
    return error
  }
}