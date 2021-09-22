import { LightningElement,wire,api } from 'lwc';
import { publish, MessageContext } from 'lightning/messageService';
import PRODUCTDATA_UPDATED_CHANNEL from '@salesforce/messageChannel/Product__c';
import getProducts from '@salesforce/apex/ShoppingClass.getProducts';

export default class ProductsList extends LightningElement {

    @api products=[];
    @wire(MessageContext) messageContext;
    @wire(getProducts) wiredProducts(result){
        //this.wireddataResult = result;
        if(result.data){
          this.products = result.data;
          console.log(this.products);
        }
        //return refreshApex(this.wireddataResult);
    }

    handleProductSelected(event){
        publish(this.messageContext, PRODUCTDATA_UPDATED_CHANNEL, {
            productId: event.detail
        });
    }

    connectedCallback(){
        // getProducts()
        // .then(result=>{
        //     console.log('result');
        //     console.log(result);
        // })
        // .catch(error=>{
        //     console.log('error');
        //     console.log(error.message)
        // })
    }
    
}