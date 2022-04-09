/* eslint-disable @typescript-eslint/ban-types */
import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import { CreateRunDto } from '../dto/create-run.dto';

@Injectable()
export default class CreateRunPipe implements PipeTransform<any, Promise<CreateRunDto>> {
  async transform(value: any, { metatype }: ArgumentMetadata) {
    const object = plainToClass(metatype, value);
    const errors = await validate(object);

    const startedDate = new Date(value.startedDate);

    if (errors.length > 0 || !(startedDate instanceof Date)) {
      throw new BadRequestException('Object passed in the body is unvalid');
    }

    value.startedDate = startedDate;
    return value;
  }
}
