import { LightningElement,api,wire } from 'lwc';
import { publish, MessageContext } from 'lightning/messageService';
import PRODUCTDATA_UPDATED_CHANNEL from '@salesforce/messageChannel/Product__c';

export default class Products extends LightningElement {
@api product;

@api
get addedToCart(){
    return this.isAddedToCart;
}
set addedToCart(value){
    this.isAddedToCart = value;
}

@api
get defaultQuantity(){
    return this.quantity;
}
set defaultQuantity(value){
    this.quantity = value;
} 

quantity=1;
isAddedToCart;

@wire(MessageContext) messageContext;

handleAddToCart(){
    this.isAddedToCart = true;
    this.dispatchEvent(
        new CustomEvent('addedtocart',{
            detail:{
                productId:this.product.Id,
                selectedQuantity: this.quantity
            }
        })
    );
}

handleRemoveFromCart(){
    this.isAddedToCart = false;
    this.dispatchEvent(
        new CustomEvent('removedfromcart',{
            detail:{
                productId: this.product.Id
            }
        })
    );
}

handleChange(event){
    this.quantity = event.target.value;
}

handleClick() {
    const selectedEvent = new CustomEvent('selected', {
        detail: this.product.Id
    });
    this.dispatchEvent(selectedEvent);
}

get backgroundStyle(){
    return `background-image:url(${this.product.DisplayUrl})`;
}

get totalPrice() {
    return this.quantity*this.product.Cost__c;;
}

connectedCallback(){
    console.log()
}

}
