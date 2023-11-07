import type { ConfigService } from './config'
import { connect } from './surrealdb'

const get = async (key: string) => {
  const db = await connect()
  return await db.select(`config:${key}`)
}

export const config = {
  get,
} satisfies ConfigService

export default config
