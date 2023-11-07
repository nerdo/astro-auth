export interface ConfigService {
  get: (key: string) => Promise<unknown>
}
