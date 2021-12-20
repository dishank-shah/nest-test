import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CategoryDTO } from "./category.dto";
import { Category } from "./category.entity";

@Injectable()
export class CategoryService {

    private category: Array<CategoryDTO>;
    constructor(@InjectRepository(Category) private categoryRepository: Repository<Category>) {

        this.category = [];
    }

    async saveCategory(categoryReq: CategoryDTO) {
        let resObj = { isError: true, errorMsg: "no such category found", data: {} }
        if (categoryReq.id) {
            let categoryObj = await this.categoryRepository.findOne(categoryReq.id);
            if (categoryObj) {
                categoryObj.name = categoryReq.name;
                let category = await this.categoryRepository.save(categoryObj)
                resObj.isError = false;
                resObj.errorMsg = "category update successfully!";
                resObj.data = category;
            }
        } else {
            const categoryObj = new Category();
            categoryObj.name = categoryReq.name;
            let category = await this.categoryRepository.save(categoryReq);
            resObj.isError = false;
            resObj.errorMsg = "category saved successfully!";
            resObj.data = category;
        }
        return resObj;
    }

    async getCategories(): Promise<any> {
        let resObj = { isError: true, errorMsg: "", data: [] }
        resObj.data = await this.categoryRepository.find() || [];
        return resObj;
    }

    async getCategory(id: number): Promise<any> {
        let resObj = { isError: true, errorMsg: "no such category found", data: {} }
        let categoryObj = await this.categoryRepository.findOne(id);
        if (categoryObj) {
            resObj.isError = false;
            resObj.errorMsg = "category update successfully!";
            resObj.data = categoryObj;
        }
        return resObj;
    }

    async deleteCategory(id: number): Promise<any> {
        let resObj = { isError: true, errorMsg: "no such category found" }
        let res = await this.categoryRepository.delete(id);
        if (res) {
            resObj.isError = false;
            resObj.errorMsg = ""

        }
        return resObj;
    }
}