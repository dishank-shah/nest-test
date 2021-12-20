import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CategoryModule } from './category/category.module';
import { OrderController } from './order/order.controller';
import { OrderService } from './order/order.service';

@Module({
  imports: [CategoryModule],
  controllers: [AppController, OrderController],
  providers: [AppService, OrderService],
})
export class AppModule { }
