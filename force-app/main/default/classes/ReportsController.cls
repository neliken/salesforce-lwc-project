public with sharing class ReportsController {
    @AuraEnabled(cacheable=true)
    public static List<Report> getReports() {
        return [
            SELECT Id, Name, DeveloperName, FolderName
            FROM Report
            WHERE NamespacePrefix = NULL
            ORDER BY LastModifiedDate DESC
            LIMIT 10
        ];
    }
}
