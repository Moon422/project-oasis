import { BadRequestException, Injectable } from '@nestjs/common';
import { Auth } from 'src/auth/auth.entity';
import { UserType } from 'src/auth/user-type.enum';
import { EntityManager } from 'typeorm';
import { CreateProductDto } from './dtos/create-product.dto';
import { Product } from './product.entity';

@Injectable()
export class ProductService {
    constructor(
        private entityManager: EntityManager
    ) { }

    async getAll(auth: Auth): Promise<Product[]> {
        // console.log(auth);
        const { user } = auth;
        return await this.entityManager.findBy(Product, {
            user
        })
    }

    async addProduct(createProductDto: CreateProductDto, auth: Auth): Promise<Product> {
        const user = auth.user;
        // console.log(auth);

        if (user.userType !== UserType.FARMER && user.userType !== UserType.ADMIN) {
            throw new BadRequestException("Sorry you cannot add a product");
        }

        const { name, details, quantity, price } = createProductDto;

        const product = this.entityManager.create(Product, {
            name, details, quantity, price, user
        })

        return await this.entityManager.save(product)
    }

    async updateProductPrice(productId: string, price: number, auth: Auth) {
        const user = auth.user;

        const updateResult = await this.entityManager
            .update(Product, {
                id: productId,
                user
            }, { price });

        if (updateResult.affected === 0) {
            throw new BadRequestException("Failed to update price. Please check correct product is selected.");
        }
    }

    async updateProductQuantity(productId: string, quantity: number, auth: Auth) {
        const user = auth.user;

        const updateResult = await this.entityManager
            .update(Product, {
                id: productId,
                user
            }, { quantity });

        if (updateResult.affected === 0) {
            throw new BadRequestException("Failed to update quantity. Please check correct product is selected.");
        }
    }
}
