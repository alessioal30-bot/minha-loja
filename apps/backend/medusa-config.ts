import { defineConfig } from "@medusajs/utils"

export default defineConfig({
  projectConfig: {
    databaseUrl: process.env.DATABASE_URL,
    redisUrl: process.env.REDIS_URL,
    http: {
      storeCors: process.env.STORE_CORS || 'http://localhost:8000',
      adminCors: process.env.ADMIN_CORS || 'http://localhost:7001',
      authCors: process.env.AUTH_CORS || 'http://localhost:7001',
      jwtSecret: process.env.JWT_SECRET || 'supersecret',
      cookieSecret: process.env.COOKIE_SECRET || 'supersecret',
    }
  },
  admin: {
disable: false,
vite: (config) => {
config.server.allowedHosts = [
...(config.server.allowedHosts || []),
"api.apcmcomercioesrvltda.com.br",
]
return config
},
},
});
