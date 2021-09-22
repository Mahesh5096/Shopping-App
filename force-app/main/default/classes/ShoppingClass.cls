public with sharing class ShoppingClass {

    @AuraEnabled(cacheable=true)
    public static List<Product2> getProducts(){
        return [SELECT Id,DisplayUrl,ProductCode,Description,Family,Name,StockKeepingUnit,Cost__c,QuantityUnitOfMeasure FROM Product2];
    }

    @AuraEnabled
    public static Product2 getProduct(string productId){
        return [SELECT Id,DisplayUrl,ProductCode,Description,Family,Name,StockKeepingUnit,Cost__c,QuantityUnitOfMeasure FROM Product2 WHERE id=:productId];
    }
}
