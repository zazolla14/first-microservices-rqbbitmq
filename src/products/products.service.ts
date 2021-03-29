import { Inject, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CreateProductDto } from './dto/create-product.dto'
import { UpdateProductDto } from './dto/update-product.dto'
import { Product } from './entities/product.entity'
import config from './config/key'
import { ClientProxy } from '@nestjs/microservices'

@Injectable()
export class ProductsService {
    constructor(
        @InjectRepository(Product)
        private readonly productRepository: Repository<Product>,

        @Inject(config.RMQName) private readonly client: ClientProxy,
    ) {}

    async create(createProductDto: CreateProductDto): Promise<Product> {
        const product = await this.productRepository.save(createProductDto)
        console.log(product)
        this.client.emit('create_product', product)
        return product
    }

    async findAll(): Promise<Product[]> {
        return this.productRepository.find()
    }

    async findOne(id: number): Promise<Product> {
        return this.productRepository.findOne(id)
    }

    async update(
        id: number,
        updateProductDto: UpdateProductDto,
    ): Promise<Product> {
        await this.productRepository.update(id, updateProductDto)
        const product = await this.productRepository.findOne(id)
        this.client.emit('update_product', product)
        return product
    }

    async remove(id: number): Promise<any> {
        await this.productRepository.delete(id)
        this.client.emit('delete_product', id)
        return 'ok'
    }
}
