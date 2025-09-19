import { LightningElement, wire } from "lwc";
import USER_ID from "@salesforce/user/Id";
import { CurrentPageReference } from "lightning/navigation";
import getOrgId from "@salesforce/apex/FacifyHelper.getOrgId";

export default class FacifyTabIframe extends LightningElement {
  contactId;
  orgId;
  recipientType = 0;

  @wire(CurrentPageReference)
  getStateParameters(currentPageReference) {
    if (currentPageReference) {
      this.contactId = currentPageReference.attributes.recordId;
    }
  }

  @wire(getOrgId)
  wiredOrgId({ data, error }) {
    if (data) {
      this.orgId = data;
    } else {
    }
  }

  get orgName() {
    const host = window.location.hostname;
    return host.split(".")[0];
  }

  get computedUrl() {
    const orgName = this.orgName;

    if (!this.contactId || !USER_ID || !this.orgId) return "";

    return `https://${orgName}.thefacesgroup.org/auth/login?recipientId=${this.contactId}&userId=${USER_ID}&orgId=${this.orgId}&recipientType=${this.recipientType}`;
  }
}
