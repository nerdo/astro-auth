import { Surreal } from 'surrealdb.js'

const db = new Surreal()
let hasConnected = false

export const connect = async () => {
  if (hasConnected) {
    await db.wait()
    return db
  }

  await db.connect(import.meta.env.SURREAL_ENDPOINT)

  if (import.meta.env.SURREAL_CREDENTIALS) {
    const credentials = JSON.parse(import.meta.env.SURREAL_CREDENTIALS)
    await db.signin(credentials)
  }

  if (import.meta.env.SURREAL_USE) {
    const use = JSON.parse(import.meta.env.SURREAL_USE)
    await db.use(use)
  }

  return db
}
