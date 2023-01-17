import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { LocationService } from './location.service';
import { LocationController } from './location.controller';

@Module({
  imports: [
    AuthModule
  ],
  providers: [LocationService],
  controllers: [LocationController]
})
export class LocationModule { }
