import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { ProductsModule } from './products/products.module'

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'mysql',
            host: 'localhost',
            port: 3306,
            username: 'root',
            password: '',
            database: 'nest_admin',
            autoLoadEntities: true,
            synchronize: true,
        }),
        ProductsModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
