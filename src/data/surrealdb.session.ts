import type { Session, SessionService } from './session'
import { connect } from './surrealdb'

const makeSession = async (maybeSessionId: string | undefined) => {
  const db = await connect()
  const [store] = (await db.query('fn::session::get($maybeSessionId)', { maybeSessionId })) as [Record<string, unknown>]

  const get = async (key: string | undefined) => {
    if (key === undefined) {
      return store || {}
    }
    return store ? store[key] : undefined
  }
  const set = async (key: string, value: unknown) => {
    const db = await connect()
    await db.query('fn::session::set($sessionId, $update)', { sessionId: store.id, update: { [key]: value } })
    store[key] = value
  }

  return {
    get,
    set,
    id: store.id as string,
  } as Session
}

export const session = {
  makeSession,
} satisfies SessionService

export default session
