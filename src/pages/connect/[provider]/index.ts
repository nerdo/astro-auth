import { app } from '../../../data'
import type { APIRoute } from 'astro'

export const prerender = false

export const GET: APIRoute = async (context) => {
  const url = new URL(context.request.url)
  const query = [...url.searchParams.entries()].reduce(
    (o, [k, v]) => {
      o[k] = v
      return o
    },
    {} as Record<string, unknown>
  )
  const maybeSessionId = context.cookies.get('sid')?.value
  const session = await app.session.makeSession(maybeSessionId)
  const authRequest = {
    method: context.request.method,
    query,
    body: {},
    state: {},
  }
  const actions = {
    redirect: async (location: string, sessionId: string) => {
      context.cookies.set('sid', sessionId, { path: '/' })
      return context.redirect(location)
    },
    getSessionId: async () => context.cookies.get('sid')?.value,
  }

  const maybeRedirectResponse = (await app.oauth.connect(context.params.provider!, session, authRequest, actions)) as Response
  return (
    maybeRedirectResponse ||
    new Response(JSON.stringify({}), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    })
  )
}
