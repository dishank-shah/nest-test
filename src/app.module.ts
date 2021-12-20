import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CategoryController } from './category/category.controller';
import { CategoryModule } from './category/category.module';
import { LoggerMiddleware } from './middleware/logger.moddleware';
import { OrderController } from './order/order.controller';
import { OrderService } from './order/order.service';

@Module({
  imports: [CategoryModule],
  controllers: [AppController, OrderController],
  providers: [AppService, OrderService],
})
export class AppModule implements NestModule {
  constructor() {

  }

  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware) // which middlewere apply
      .forRoutes(CategoryController, OrderController) // '*' for all routes , 'category/(.*)' for all routes of category controller
  }
}