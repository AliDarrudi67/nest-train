import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiHeader,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { I18n, I18nContext } from 'nestjs-i18n';
import { JwtAuthGuard } from 'src/jwt-auth/jwt-auth.guard';
import userGuard from 'src/users/dto/userGuards';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductForbiddenResponse } from './dto/forbiddenDto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductsService } from './products.service';

@Controller('products')
@ApiTags('Products')
@ApiBearerAuth()
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post('create')
  @UseGuards(JwtAuthGuard)
  @ApiResponse({
    status: 403,
    description: 'Forbidden',
    type: ProductForbiddenResponse,
  })
  @ApiResponse({ status: 201, description: 'Created', type: CreateProductDto })
  @ApiHeader({
    name: 'Lang',
    description: 'send your lang',
  })
  create(@Body() createProductDto: CreateProductDto, @Request() request) {
    const user: userGuard = request.user;
    createProductDto.user = user;
    return this.productsService.create(createProductDto);
  }

  @Get()
  findAll(@I18n() i18n: I18nContext) {
    return { message: i18n.t('tr.hello', { args: { name: 'ali' } }) };
    return this.productsService.findAll();
  }

  @Get(':id')
  @ApiParam({
    name: 'id',
    description: 'id of product',
  })
  findOne(@Param('id') id: number) {
    return this.productsService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  update(
    @Param('id') id: number,
    @Body() updateProductDto: UpdateProductDto,
    @Request() request,
  ) {
    updateProductDto.user = request.user;
    return this.productsService.update(id, updateProductDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: string, @Request() request) {
    return this.productsService.remove(+id, request.user);
  }
}
