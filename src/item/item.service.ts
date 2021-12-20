import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ItemDTO } from './item.dto';
import { Item } from './item.entity';

@Injectable()
export class ItemService {

    constructor(@InjectRepository(Item) private itemRepository: Repository<Item>) {

    }

    async saveItem(itemReq: ItemDTO) {
        let resObj = { isError: true, errorMsg: "no such item found", data: {} }
        if (itemReq.id) {
            let itemObj = await this.itemRepository.findOne(itemReq.id);
            if (itemObj) {
                itemObj.name = itemReq.name;
                itemObj.price = itemReq.price;
                itemObj.category = itemReq.category;
                let item = await this.itemRepository.save(itemObj)
                resObj.isError = false;
                resObj.errorMsg = "item update successfully!";
                resObj.data = item;
            }
        } else {
            const itemObj = new Item();
            itemObj.name = itemReq.name;
            itemObj.price = itemReq.price;
            itemObj.category = itemReq.category;
            let item = await this.itemRepository.save(itemObj);
            resObj.isError = false;
            resObj.errorMsg = "item saved successfully!";
            resObj.data = item;
        }
        return resObj;
    }

    async getItems(): Promise<any> {
        let resObj = { isError: true, errorMsg: "", data: [] }
        resObj.data = await this.itemRepository.find() || [];
        return resObj;
    }

    async getItem(id: number): Promise<any> {
        let resObj = { isError: true, errorMsg: "no such item found", data: {} }
        let itemObj = await this.itemRepository.findOne(id);
        if (itemObj) {
            resObj.isError = false;
            resObj.errorMsg = "item update successfully!";
            resObj.data = itemObj;
        }
        return resObj;
    }

    async deleteItem(id: number): Promise<any> {
        let resObj = { isError: true, errorMsg: "no such item found" }
        let res = await this.itemRepository.delete(id);
        if (res) {
            resObj.isError = false;
            resObj.errorMsg = ""

        }
        return resObj;
    }
}
