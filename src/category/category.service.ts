import { Injectable } from "@nestjs/common";
import { CategoryDTO } from "./category.dto";

@Injectable()
export class CategoryService {

    private category: Array<CategoryDTO>;
    constructor() {
        this.category = [];
    }

    saveCategory(categoryReq: CategoryDTO) {
        let resObj = { isError: true, errorMsg: "no such category found" }
        if (categoryReq.id) {
            let categoryIndex = this.category.findIndex(order => order.id === categoryReq.id);
            if (categoryIndex != -1) {
                this.category[categoryIndex].name = categoryReq.name;
                resObj.isError = false;
                resObj.errorMsg = "category updated successfully!"
            }
        } else {
            categoryReq.id = new Date().getTime();
            this.category.push(categoryReq)
            resObj.isError = false;
            resObj.errorMsg = "category saved successfully!"
        }
        return resObj;
    }

    getCategories(): any {
        let resObj = { isError: true, errorMsg: "", data: [] }
        resObj.data = this.category || [];
        return resObj;
    }

    getCategory(id: number): any {
        let resObj = { isError: true, errorMsg: "no such category found", data: {} }
        let category = this.category.find(category => category.id === id);
        if (category) {
            resObj.isError = false;
            resObj.errorMsg = ""
            resObj.data = category;

        }
        return resObj;
    }

    deleteCategory(id: number): any {
        let resObj = { isError: true, errorMsg: "no such category found" }
        let categoryIndex = this.category.findIndex(category => category.id === id);
        if (categoryIndex != -1) {
            resObj.isError = false;
            resObj.errorMsg = ""
            this.category.splice(categoryIndex, 1);
        }
        return resObj;
    }
}