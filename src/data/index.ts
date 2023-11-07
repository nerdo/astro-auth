export * from './blueprint'
import type { Blueprint } from './blueprint'
import { config } from './surrealdb.config'
import { session } from './surrealdb.session'
import { oauth } from './grant.oauth'

export const app = { config, session, oauth } satisfies Blueprint
