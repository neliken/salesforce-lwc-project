import { LightningElement, wire } from "lwc";
import USER_ID from "@salesforce/user/Id";
import { CurrentPageReference } from "lightning/navigation";

export default class FacifyTabIframe extends LightningElement {
  contactId;

  @wire(CurrentPageReference)
  getStateParameters(currentPageReference) {
    if (currentPageReference) {
      this.contactId = currentPageReference.attributes.recordId;
    }
  }

  get orgName() {
    const host = window.location.hostname;
    return host.split(".")[0];
  }

  get computedUrl() {
    const orgName = this.orgName;

    if (!this.contactId || !USER_ID) return "";

    return `https://${orgName}.thefacesgroup.org/auth/login?contactId=${this.contactId}&userId=${USER_ID}&orgId=00DgL000001Qgsf`;
  }
}
