/* eslint-disable @typescript-eslint/ban-types */
import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { UpdateRunDto } from '../dto/update-run.dto';

@Injectable()
export default class RunsPipe implements PipeTransform<any, Promise<UpdateRunDto>> {
  async transform(value: any, metadata: ArgumentMetadata) {
    if (metadata.metatype === UpdateRunDto) {
      if (!value.startedDate) {
        return value;
      }
    }

    const startedDate = new Date(value.startedDate);

    if (isNaN(startedDate.getTime())) {
      throw new BadRequestException('startedDate is unvalid');
    }

    value.startedDate = startedDate;
    return value;
  }
}
