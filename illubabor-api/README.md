# illubabor-api

NestJS backend for the Illubabor Zone Administration System.

## Status: Phase 1 (foundation) complete

- [x] Prisma schema — Zone → Woreda (13, real names) → Kebele hierarchy, Department, News, Service, ServiceApplication, Document, User/Role, RefreshToken, AuditLog, SiteConfig
- [x] Seed script with real zone data (Illubabor, capital Metu, 13 woredas, 8 departments, super admin)
- [x] PrismaModule/PrismaService
- [x] AuthModule — login + refresh token rotation, JWT strategy, RolesGuard + @Roles decorator (RBAC: SUPER_ADMIN, ZONE_ADMIN, WOREDA_ADMIN, DEPARTMENT_HEAD, STAFF, PUBLIC)
- [x] main.ts bootstrap — global prefix `api/v1`, validation pipe, CORS pattern for Vercel prod + preview URLs
- [x] Dockerfile for Render deployment

## Next up (Phase 2)

- [ ] ZonesModule, WoredasModule (public read endpoints + admin CRUD)
- [ ] DepartmentsModule
- [ ] NewsModule (with trilingual fields already in schema)
- [ ] ServicesModule + ServiceApplication submission flow
- [ ] DocumentsModule (transparency/document downloads)
- [ ] UsersModule (admin user management)
- [ ] common/filters (global exception filter), common/interceptors (audit logging interceptor)
- [ ] `npm install`, `prisma migrate dev`, `npm run prisma:seed` against a real Supabase instance
- [ ] Deploy to Render, wire DATABASE_URL (Supabase pooled, port 6543) + DIRECT_URL (port 5432)

## Local dev

```bash
npm install
cp .env.example .env   # fill in Supabase connection strings
npx prisma migrate dev --name init
npm run prisma:seed
npm run start:dev
```
