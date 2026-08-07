import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class AuditLogInterceptor implements NestInterceptor {
  constructor(private prisma: PrismaService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest();
    const method = req.method;

    if (!['POST', 'PATCH', 'DELETE'].includes(method) || !req.user) {
      return next.handle();
    }

    const entity = context.getClass().name.replace('Controller', '');

    return next.handle().pipe(
      tap((result) => {
        this.prisma.auditLog
          .create({
            data: {
              action: `${method}_${entity.toUpperCase()}`,
              entity,
              entityId: result?.id ?? req.params?.id ?? null,
              userId: req.user.userId,
              metadata: { path: req.url },
            },
          })
          .catch(() => {});
      }),
    );
  }
}