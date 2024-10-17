import { ContextType, ExecutionContext, Injectable } from '@nestjs/common';

import { ThrottlerGuard } from '@nestjs/throttler';

@Injectable()
export class AllThrottlerGuard extends ThrottlerGuard {
  getRequestResponse(context: ExecutionContext) {
    const reqType = context.getType<ContextType>();
    if (reqType === 'http') {
      return {
        req: context.switchToHttp().getRequest(),
        res: context.switchToHttp().getResponse(),
      };
    }
  }
}
