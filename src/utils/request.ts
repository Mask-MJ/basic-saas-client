import type { paths } from '#/openapi' // 由openapi-typescript生成
import createClient, { type Middleware } from 'openapi-fetch'

const UNPROTECTED_ROUTES = ['/api/authentication/refresh-token', '/api/authentication/sign-in']

const authMiddleware: Middleware = {
  async onRequest({ request, schemaPath }) {
    // 获取令牌，如果不存在
    const { token } = useUserStore()
    if (UNPROTECTED_ROUTES.some(pathname => schemaPath.startsWith(pathname))) {
      return undefined // don’t modify request for certain paths
    }

    request.headers.set('Authorization', `Bearer ${token}`)
  },

  async onResponse({ response }) {
    const data = await response.clone().json()
    if (data.statusCode === 200) {
      return new Response(JSON.stringify(data.data))
    }
    else {
      return window.$message.error(data.message)
    }
  },
}

export const client = createClient<paths>()
client.use(authMiddleware)
