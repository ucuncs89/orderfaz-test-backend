import { Controller, Get, UseGuards, Query } from '@nestjs/common';

import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { SearchCourierDto } from 'src/dto/serch-courier.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { LogisticProvider } from 'src/providers/logistic.providers';
import { failedResponse } from 'src/utils/failed-response';

@ApiBearerAuth()
@ApiTags('logistic')
@Controller('logistic')
export class LogisticController {
  constructor(private logisticProvider: LogisticProvider) {}

  @UseGuards(AuthGuard)
  @Get('all')
  async getAll(): Promise<any> {
    const data: any = await this.logisticProvider.send(
      { cmd: 'find-all-courier' },
      {},
    );

    if (data.error) {
      return failedResponse(data.error, data.error.code);
    }
    return { data };
  }

  @UseGuards(AuthGuard)
  @Get('search')
  async search(@Query() querySearch: SearchCourierDto): Promise<any> {
    const data: any = await this.logisticProvider.send(
      { cmd: 'search-courier' },
      { ...querySearch },
    );

    if (data.error) {
      return failedResponse(data.error, data.error.code);
    }
    return { data };
  }
}
