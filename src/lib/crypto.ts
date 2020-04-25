import crypto from 'crypto'

export const createHash: (data:any) => Promise<string> = (data) => {
  return new Promise<string>((resolve, reject) => {
    if (Array.isArray(data)) data = data.join('__')
    const hash = crypto
      .createHash('md5')
      .update(data, 'utf8')
      .digest('hex')
    if (!hash) return reject('No hash')
    return resolve(hash)
  })
}