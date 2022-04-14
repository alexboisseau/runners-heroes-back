import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const UserId = createParamDecorator<string>((_, context: ExecutionContext) => {
  const request = context.switchToHttp().getRequest();
  const { userId } = request.user;

  return userId;
});
