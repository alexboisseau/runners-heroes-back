import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { RunsService } from '../runs.service';

@Injectable()
export default class UserIsTheOwner implements CanActivate {
  constructor(private readonly runService: RunsService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const {
      user: { userId },
      params: { id },
    } = context.switchToHttp().getRequest();

    const userOwnTheRun = await this.runService.userIsTheOwner(id, userId);

    if (!userOwnTheRun) throw new UnauthorizedException('User can get/update/remove only his runs.');

    return true;
  }
}
