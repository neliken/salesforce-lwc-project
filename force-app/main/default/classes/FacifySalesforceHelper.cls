public with sharing class FacifySalesforceHelper {
    @AuraEnabled(cacheable=true)
    public static Id getAnyContactId() {
        return [SELECT Id FROM Contact LIMIT 1].Id;
    }

    @AuraEnabled(cacheable=true)
    public static String getOrgId() {
        return UserInfo.getOrganizationId();
    }
}
