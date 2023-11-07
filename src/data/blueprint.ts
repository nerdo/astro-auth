import type { ConfigService } from './config'
import type { SessionService } from './session'
import type { OauthService } from './oauth'

export interface Blueprint {
  config: ConfigService
  session: SessionService
  oauth: OauthService
}
