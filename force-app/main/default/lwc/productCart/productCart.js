import { LightningElement,wire } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
import { subscribe, MessageContext } from 'lightning/messageService';
import PRODUCTDATA_UPDATED_CHANNEL from '@salesforce/messageChannel/Product__c';

import { getFieldValue } from 'lightning/uiRecordApi';

import PRODUCT_OBJECT from '@salesforce/schema/Product2';
import NAME_FIELD from '@salesforce/schema/Product2.Name';
import PICTURE_URL_FIELD from '@salesforce/schema/Product2.DisplayUrl';
import FAMILY_FIELD from '@salesforce/schema/Product2.Family';
import DESCRIPTION_FIELD from '@salesforce/schema/Product2.Description';
import PRODUCT_CODE_FIELD from '@salesforce/schema/Product2.ProductCode';

export default class ProductCart extends  NavigationMixin(LightningElement){
    Name=NAME_FIELD;
    DisplayUrl=PICTURE_URL_FIELD;
    Family=FAMILY_FIELD;
    Description=DESCRIPTION_FIELD;
    ProductCode=PRODUCT_CODE_FIELD;

    recordId;
    productName;
    productPictureUrl;

    @wire(MessageContext) messageContext;

    productSelectionSubscription;

    connectedCallback() {
        // Subscribe to ProductSelected message
        this.productSelectionSubscription = subscribe(
            this.messageContext,
            PRODUCTDATA_UPDATED_CHANNEL,
            (message) => this.handleProductSelected(message.productId)
        );
    }

    handleRecordLoaded(event) {
        const { records } = event.detail;
        const recordData = records[this.recordId];
        this.productName = getFieldValue(recordData, NAME_FIELD);
        this.productPictureUrl = getFieldValue(recordData, PICTURE_URL_FIELD);
    }

    handleProductSelected(productId) {
        this.recordId = productId;
    }

    handleNavigateToRecord() {
        console.log('entered--->');
        console.log(this.recordId);
        this[NavigationMixin.Navigate]({
            type: 'standard__recordPage',
            attributes: {
                recordId: this.recordId,
                objectApiName: PRODUCT_OBJECT.objectApiName,
                actionName: 'view'
            }
        });
    }
}