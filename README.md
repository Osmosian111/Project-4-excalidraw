# Excalidraw Clone
**Tech used till now**
1. turborepo
2. Next.js
3. express
4. websocket
5. jsonwebtoken
6. zod
7. dotenv
8. prisma

**Step to build**

1. Initailise the turbo repo
2. delete docs app
3. Add http-server,ws-server.
4. Add pkg.json in both.
5. Add tsconfig.json in both.
6. add extend and rootdir & outdir in tsconfig.json
7. add build,start and dev script in pkg.json
8. add turbo.json
9. create express and ws server
10. add signup signin and room route
11. Create backend-common in pkgs folder for config.ts and add .env file
11. create middleware for signin check and gate room route
12. gate ws server with jwt
13. create zod endpoint in package: common folder
14. add zod in http-server
15. create db in pkg folder
16. create schema than give db url than migrate than generate
17. export prisma client
18. complete http routes
19. 