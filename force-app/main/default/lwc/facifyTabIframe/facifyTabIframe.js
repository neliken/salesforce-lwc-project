import { LightningElement, wire } from 'lwc';
import getAnyContactId from '@salesforce/apex/FacifySalesforceHelper.getAnyContactId';
import getOrgId from '@salesforce/apex/FacifySalesforceHelper.getOrgId';
import USER_ID from '@salesforce/user/Id';

export default class FacifyTabIframe extends LightningElement {
    contactId;
    orgId;

    @wire(getAnyContactId)
    wiredContact({ data, error }) {
        if (data) {
            this.contactId = data;
        } else {
            console.error('Error fetching contact:', error);
        }
    }

    @wire(getOrgId)
    wiredOrgId({ data, error }) {
        if (data) {
            this.orgId = data;
        } else {
            console.error('Error fetching org ID:', error);
        }
    }

    get computedUrl() {
        if (!this.contactId || !this.orgId) return '';

        return `https://api.thefacesgroup.org/api/v1/salesforce/oauth/start?contactId=${this.contactId}&userId=${USER_ID}&orgId=${this.orgId}`;
    }
}
