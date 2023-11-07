export interface Session {
  id: string
  get: (key: string | undefined) => Promise<unknown>
  set: (key: string, value: unknown) => Promise<unknown>
}

export interface SessionService {
  makeSession: (maybeSessionId: string | undefined) => Promise<Session>
}
