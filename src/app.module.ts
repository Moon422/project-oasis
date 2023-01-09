import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Auth } from './auth/auth.entity';
import { AuthModule } from './auth/auth.module';
import { User } from './auth/user.entity';
import { Product } from './product/product.entity';
import { ProductModule } from './product/product.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      database: 'oasisdb',
      username: 'oasisuser',
      password: 'hola',
      host: 'localhost',
      synchronize: true,
      entities: [Auth, User, Product]
    }),
    AuthModule,
    ProductModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
