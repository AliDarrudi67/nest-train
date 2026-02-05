import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import userGuard from 'src/users/dto/userGuards';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private prodctRepository: Repository<Product>,
  ) {}
  async create(createProductDto: CreateProductDto) {
    const newProduct = await this.prodctRepository.save(createProductDto);
    return newProduct;
  }

  findAll() {
    return this.prodctRepository.find({
      relations: {
        user: true,
      },
    });
  }

  async findOne(id: number) {
    const product = await this.prodctRepository.findOne({
      relations: {
        user: true,
      },
      where: {
        id,
      },
    });
    if (!product) throw new HttpException('product not found', 404);
    return product;
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    const check = await this.prodctRepository.update(
      {
        id,
        user: updateProductDto.user,
      },
      { ...updateProductDto },
    );
    if (check.affected === 0) throw new HttpException('product not found', 404);
    return {};
  }

  async remove(id: number, user: userGuard) {
    const check = await this.prodctRepository
      .createQueryBuilder('product')
      .leftJoinAndSelect('product.user', 'users')
      .where('product.id=:id', { id })
      .andWhere('product.user=:user', { user: user.id })
      .getOne();
    if (!check) throw new HttpException('product not found', 404);
    await this.prodctRepository.remove(check);
    return {};
  }
}
