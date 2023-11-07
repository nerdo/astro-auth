import type { Session } from './session'

export interface OauthService {
  connect: (provider: string, session: Session, request: Request, actions: Actions) => Promise<unknown>
  callback: (provider: string, session: Session, request: Request, actions: Actions) => Promise<unknown>
}

export interface Request {
  method: string
  query: Record<string, unknown>
  body: Record<string, unknown>
  state: Record<string, unknown>
}

export interface Actions {
  redirect: (location: string, sessionId: string) => Promise<unknown>
  getSessionId: () => Promise<string | undefined>
}
