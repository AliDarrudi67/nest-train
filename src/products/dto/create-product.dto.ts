import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';
import userGuard from 'src/users/dto/userGuards';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  title: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(10)
  @ApiProperty({
    description: 'this is help',
    minLength: 100,
    maxLength: 1000,
    example: 'this is help',
  })
  description: string;

  @IsNumber()
  @IsOptional()
  @ApiProperty({
    description: 'this is price desc',
    minimum: 100,
    maximum: 1000,
    example: 'this is price',
    default: 0,
  })
  price: number;

  @IsOptional()
  @ApiProperty({
    enum: ['ali', 'reza'],
  })
  user: userGuard;
}
