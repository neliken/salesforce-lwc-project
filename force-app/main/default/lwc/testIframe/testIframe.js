import { LightningElement, api } from 'lwc';
import USER_ID from '@salesforce/user/Id';

export default class TestIframe extends LightningElement {
    @api recordId;

    get computedUrl() {
        const orgId = '00DgL000001Qgsf'; // hardcoded or retrieve via Apex for multi-org apps
        return `https://api.thefacesgroup.org/api/v1/salesforce/oauth/start?contactId=${this.recordId}&userId=${USER_ID}&orgId=${orgId}`;
    }
}
