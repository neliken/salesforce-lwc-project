import { LightningElement, wire } from "lwc";
import getAnyContactId from "@salesforce/apex/FacifySalesforceHelper.getAnyContactId";
import getOrgId from "@salesforce/apex/FacifySalesforceHelper.getOrgId";
import getOrgName from "@salesforce/apex/FacifySalesforceHelper.getOrgName";
import USER_ID from "@salesforce/user/Id";

export default class FacifyTabIframe extends LightningElement {
  contactId;
  orgName;
  orgId;

  @wire(getAnyContactId)
  wiredContact({ data, error }) {
    if (data) {
      this.contactId = data;
    } else {
      console.error("Error fetching contact:", error);
    }
  }

  @wire(getOrgId)
  wiredOrgId({ data, error }) {
    if (data) {
      this.orgId = data;
    } else {
      console.error("Error fetching org ID:", error);
    }
  }

  @wire(getOrgName)
  wiredOrgName({ data, error }) {
    if (data) {
      this.orgName = data;
    } else {
      console.error("Error fetching org name:", error);
    }
  }

  get computedUrl() {
    if (!this.contactId || !this.orgId || !this.orgName) return "";

    return `https://nelly-dev-ed.thefacesgroup.org/auth/login?contactId=${this.contactId}&userId=${USER_ID}&orgId=${this.orgId}`;
  }
}
