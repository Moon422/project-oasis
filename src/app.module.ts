import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Auth } from './auth/auth.entity';
import { AuthModule } from './auth/auth.module';
import { User } from './auth/user.entity';
import { Product } from './product/product.entity';
import { ProductModule } from './product/product.module';
import { LocationModule } from './location/location.module';
import { Division } from './location/division.entity';
import { District } from './location/district.entity';
import { SubDistrict } from './location/sub-district.entity';
import { Union } from './location/union.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      database: 'oasisdb',
      username: 'oasisuser',
      password: 'hola',
      host: 'localhost',
      synchronize: true,
      entities: [Auth, User, Product, Division, District, SubDistrict, Union]
    }),
    AuthModule,
    ProductModule,
    LocationModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
