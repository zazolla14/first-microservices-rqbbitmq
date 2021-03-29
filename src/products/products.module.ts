import { Module } from '@nestjs/common'
import { ProductsService } from './products.service'
import { ProductsController } from './products.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Product } from './entities/product.entity'
import { ClientsModule, Transport } from '@nestjs/microservices'
import config from './config/key'

@Module({
    imports: [
        TypeOrmModule.forFeature([Product]),
        ClientsModule.register([
            {
                name: config.RMQName,
                transport: Transport.RMQ,
                options: {
                    urls: [config.RMQURL],
                    queue: config.RMQQueue,
                    queueOptions: {
                        durable: true,
                    },
                },
            },
        ]),
    ],
    controllers: [ProductsController],
    providers: [ProductsService],
})
export class ProductsModule {}
