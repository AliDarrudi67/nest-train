import { ApiProperty } from '@nestjs/swagger';

export class ProductForbiddenResponse {
  @ApiProperty({
    type: String,
    description: 'http error code',
    example: 403,
  })
  statusCode: number;

  @ApiProperty({
    type: String,
    description: 'description about the error',
    example: 'you dont have permission to access',
  })
  message: string;
}
