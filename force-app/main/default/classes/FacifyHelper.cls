public with sharing class FacifyHelper {

    @AuraEnabled(cacheable=true)
    public static String getOrgId() {
        return UserInfo.getOrganizationId();
    }

    @AuraEnabled(cacheable=true)
    public static Map<String, Object> getReports(Integer pageNumber, Integer pageSize) {
        Integer offset = (pageNumber - 1) * pageSize;

        // Query reports
        List<Report> reports = [
            SELECT Id, Name, CreatedBy.Name
            FROM Report
            ORDER BY CreatedDate DESC
            LIMIT :pageSize
            OFFSET :offset
        ];

        // Count total
        Integer totalRecords = [SELECT COUNT() FROM Report];

        // Build response
        Map<String, Object> response = new Map<String, Object>();
        response.put('totalRecords', totalRecords);
        response.put('records', reports);
        return response;
    }

}
