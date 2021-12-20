import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CategoryDTO } from './category.dto';
import { CategoryService } from './category.service';

@Controller('category')
export class CategoryController {

    constructor(private categoryService: CategoryService) {

    }
    @Get()
    getAll(): Array<CategoryDTO> {
        return this.categoryService.getCategories();
    }

    @Get(':id')
    getById(@Param('id') id: string): CategoryDTO {
        return this.categoryService.getCategory(+id);
    }

    @Post()
    saveCategory(@Body() body: CategoryDTO): Object {
        return this.categoryService.saveCategory(body);
    }

    @Delete(':id')
    deleteCategory(@Param('id') id: string): Object {
        return this.categoryService.deleteCategory(+id);
    }
}
