import { LightningElement, wire } from 'lwc';
import USER_ID from '@salesforce/user/Id';
import getReports from '@salesforce/apex/FacifyHelper.getReports';
import getOrgId from '@salesforce/apex/FacifyHelper.getOrgId';

export default class ReportsHub extends LightningElement {
  reports;
  error;
  orgId;

  @wire(getReports)
  wiredReports({ error, data }) {
    if (data) {
      this.reports = data.map(r => ({
        ...r,
        createdBy: r.CreatedBy?.Name,
        facifyUrl: this.buildFacifyUrl(r.Id)
      }));
      this.error = undefined;
    } else if (error) {
      this.error = error.body.message;
      this.reports = undefined;
    }
  }

  @wire(getOrgId)
  wiredOrgId({ data, error }) {
    if (data) {
      this.orgId = data;
      if (this.reports) {
        this.reports = this.reports.map(r => ({
          ...r,
          facifyUrl: this.buildFacifyUrl(r.Id)
        }));
      }
    } else {
      console.error('Error fetching org ID:', error);
    }
  }

  get orgName() {
    const host = window.location.hostname;
    return host.split('.')[0];
  }

  buildFacifyUrl(reportId) {
    if (!reportId || !USER_ID || !this.orgId) return '';
    return `https://${this.orgName}.thefacesgroup.org/auth/login?reportId=${reportId}&userId=${USER_ID}&orgId=${this.orgId}`;
  }
}
