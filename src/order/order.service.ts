import { Injectable } from "@nestjs/common";
import { CreateORderDTO } from "./order.interace";

@Injectable()
export class OrderService {

   private order: Array<CreateORderDTO>;
   constructor() {
      this.order = [];
   }

   saveOrder(orderReq: CreateORderDTO) {
      let resObj = { isError: true, errorMsg: "no such order found" }
      if (orderReq.id) {
         let orderIndex = this.order.findIndex(order => order.id === orderReq.id);
         if (orderIndex != -1) {
            this.order[orderIndex].name = orderReq.name;
            this.order[orderIndex].price = orderReq.price;
            resObj.isError = false;
            resObj.errorMsg = "order updated successfully!"
         }
      } else {
         orderReq.id = new Date().getTime();
         this.order.push(orderReq)
         resObj.isError = false;
         resObj.errorMsg = "order saved successfully!"
      }
      return resObj;
   }

   getOrders(): any {
      let resObj = { isError: true, errorMsg: "", data: [] }
      resObj.data = this.order || [];
      return resObj;
   }

   getOrder(id: number): any {
      let resObj = { isError: true, errorMsg: "no such order found", data: {} }
      let order = this.order.find(order => order.id === id);
      if (order) {
         resObj.isError = false;
         resObj.errorMsg = ""
         resObj.data = order;
      }
      return resObj;
   }

   deleteOrder(id: number): any {
      let resObj = { isError: true, errorMsg: "no such order found" }
      let orderIndex = this.order.findIndex(order => order.id === id);
      if (orderIndex != -1) {
         resObj.isError = false;
         resObj.errorMsg = ""
         this.order.splice(orderIndex, 1);
      }
      return resObj;
   }
}