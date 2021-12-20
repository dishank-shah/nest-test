import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ItemDTO } from './item.dto';
import { ItemService } from './item.service';

@Controller('item')
export class ItemController {

    constructor(private itemService: ItemService) {

    }
    @Get()
    getAll(): Promise<Array<ItemDTO>> {
        return this.itemService.getItems();
    }

    @Get(':id')
    getById(@Param('id') id: string): Promise<ItemDTO> {
        return this.itemService.getItem(+id);
    }

    @Post()
    saveItem(@Body() body: ItemDTO): Object {
        return this.itemService.saveItem(body);
    }

    @Delete(':id')
    deleteItem(@Param('id') id: string): Object {
        return this.itemService.deleteItem(+id);
    }
}
