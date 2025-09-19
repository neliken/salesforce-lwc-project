import {LightningElement, track} from 'lwc';
import USER_ID from '@salesforce/user/Id';
import getReports from '@salesforce/apex/FacifyHelper.getReports';
import getOrgId from '@salesforce/apex/FacifyHelper.getOrgId';

export default class ReportsHub extends LightningElement {
  @track reports = [];
  @track currentPage = 1;
  @track pageSize = 10;
  totalPages = 0;
  totalRecords = 0;
  orgId;
  recipientType = 1;

  connectedCallback() {
    this.loadOrgId().then(() => {
      this.loadReports();
    });
  }

  loadReports() {
    getReports({ pageNumber: this.currentPage, pageSize: this.pageSize })
      .then(result => {
        this.totalRecords = result.totalRecords;
        this.totalPages = Math.ceil(this.totalRecords / this.pageSize);

        // result.records is now an array
        this.reports = result.records.map(r => ({
          ...r,
          createdBy: r.CreatedBy?.Name,
          facifyUrl: this.buildFacifyUrl(r.Id)
        }));
      })
      .catch(error => {
        console.error('Error fetching reports:', error);
      });
  }

  loadOrgId() {
    return getOrgId()
        .then(data => {
          this.orgId = data;
        })
        .catch(error => {
          console.error('Error fetching org ID:', error);
        });
  }
  
  get orgName() {
    const host = window.location.hostname;
    return host.split('.')[0];
  }

  buildFacifyUrl(reportId) {
    if (!reportId || !USER_ID || !this.orgId) return '';
    const params = new URLSearchParams({
      recipientId: reportId,
      recipientType: String(this.recipientType ?? ''),
      userId: USER_ID,
      orgId: this.orgId
    });
    return `http://api.facify.md/api/v1/salesforce/oauth/start?${params.toString()}`;
  }
  
  handleNext() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.loadReports();
    }
  }

  handlePrev() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadReports();
    }
  }

  handleRedirect(event) {
    const url = event.target.value;
    if (url) {
      window.open(url, "_blank");
    }
  }

  // ✅ New safe getters
  get paginationInfo() {
    return `Page ${this.currentPage} of ${this.totalPages} (Total ${this.totalRecords} reports)`;
  }

  get isPrevDisabled() {
    return this.currentPage === 1;
  }

  get isNextDisabled() {
    return this.currentPage === this.totalPages;
  }
}
