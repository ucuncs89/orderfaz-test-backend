import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class SearchCourierDto {
  @ApiProperty()
  @IsNotEmpty()
  origin_name: string;

  @ApiProperty()
  @IsNotEmpty()
  destination_name: string;
}
