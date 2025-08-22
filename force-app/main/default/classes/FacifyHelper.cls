public with sharing class FacifyHelper {

    @AuraEnabled(cacheable=true)
    public static String getOrgId() {
        return UserInfo.getOrganizationId();
    }

    @AuraEnabled(cacheable=true)
    public static List<Report> getReports() {
        return [
            SELECT Id, Name, CreatedBy.Name
            FROM Report
            WHERE NamespacePrefix = NULL
            ORDER BY LastModifiedDate DESC
            LIMIT 10
        ];
    }
}
