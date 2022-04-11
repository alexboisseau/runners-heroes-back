/* eslint-disable @typescript-eslint/ban-types */
import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { CreateRunDto } from '../dto/create-run.dto';

@Injectable()
export default class CreateRunPipe implements PipeTransform<any, Promise<CreateRunDto>> {
  async transform(value: any) {
    const startedDate = new Date(value.startedDate);

    if (isNaN(startedDate.getTime())) {
      throw new BadRequestException('startedDate is unvalid');
    }

    value.startedDate = startedDate;
    console.log(value);
    return value;
  }
}
