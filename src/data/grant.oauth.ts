import { app } from '.'
import type { OauthService, Request, Actions } from './oauth'
import type { Session } from './session'
import type { GrantConfig } from 'grant'
import Grant from 'grant/lib/grant'

const connect = async (provider: string, session: Session, request: Request, actions: Actions) => {
  const grant = await getGrant()

  const granted = await grant({
    method: request.method,
    params: { provider },
    query: request.query,
    body: request.body,
    state: request.state,
    session: await session.get('grant'),
  })

  await session.set('grant', granted.session)

  if (granted.location) {
    return await actions.redirect(granted.location, session.id)
  }
}

const callback = async (provider: string, session: Session, request: Request, actions: Actions) => {
  const grant = await getGrant()

  const granted = await grant({
    method: request.method,
    params: { provider, override: 'callback' },
    query: request.query,
    body: request.body,
    state: request.state,
    session: await session.get('grant'),
  })

  await session.set('grant', granted.session)

  if (granted.location) {
    return await actions.redirect(granted.location, session.id)
  }
}

const getGrant = async () => {
  const [providerConfig] = (await app.config.get('grant')) as GrantConfig[]
  return Grant({
    config: {
      ...providerConfig,
      defaults: {
        origin: import.meta.env.PUBLIC_BASE_URL,
        transport: 'session',
        state: true,
      },
    },
  })
}

export const oauth = {
  connect,
  callback,
} satisfies OauthService

export default oauth
