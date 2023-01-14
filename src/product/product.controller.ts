import { Body, Controller, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Auth } from 'src/auth/auth.entity';
import { GetAuth } from 'src/auth/get-auth.decorator';
import { CreateProductDto } from './dtos/create-product.dto';
import { ProductService } from './product.service';

@Controller('products')
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

    @Patch(":productId/price")
    updateProductPrice(@Param("productId") productId: string, @Body("price") price: number, @GetAuth() auth: Auth) {
        return this.productService.updateProductPrice(productId, price, auth);
    }

    @Patch(":productId/quantity")
    updateProductQuantity(@Param("productId") productId: string, @Body("quantity") quantity: number, @GetAuth() auth: Auth) {
        return this.productService.updateProductQuantity(productId, quantity, auth);
    }
}
