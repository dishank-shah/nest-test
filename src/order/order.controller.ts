import { Body, Controller, Delete, Get, Param, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { CategoryService } from 'src/category/category.service';
import { CreateORderDTO } from './order.interace';
import { OrderService } from './order.service';

@Controller('order')
export class OrderController {
    constructor(private orderService: OrderService, private categoryService: CategoryService) {

    }

    @Get()
    getAll(@Res() res: Response) {

        //const category = this.categoryService.getCategories();
        let orders = this.orderService.getOrders();
        // let tempOrd = orders.data.slice(0);

        // orders.data = {
        //     orders: tempOrd,
        //     categories: category.data
        // };
        res.status(200).send(orders);
    }

    @Get(":id")
    getOrder(@Param('id') id: string) {
        return this.orderService.getOrder(+id);
    }

    @Post("save")
    saveOrder(@Body() body: CreateORderDTO): any {
        return this.orderService.saveOrder(body);
    }

    @Delete("remove")
    deleteOrder(@Param('id') id: string): any {
        return this.orderService.deleteOrder(+id);
    }
}
