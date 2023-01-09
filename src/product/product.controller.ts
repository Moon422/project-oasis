import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Auth } from 'src/auth/auth.entity';
import { GetAuth } from 'src/auth/get-auth.decorator';
import { CreateProductDto } from './dtos/create-product.dto';
import { ProductService } from './product.service';

@Controller('product')
@UseGuards(AuthGuard())
export class ProductController {
    constructor(
        private productService: ProductService
    ) { }

    @Get()
    getAll(@GetAuth() auth: Auth) {
        return this.productService.getAll(auth);
    }

    @Post()
    addProduct(@Body() createProductDto: CreateProductDto, @GetAuth() auth: Auth) {
        return this.productService.addProduct(createProductDto, auth);
    }
}
