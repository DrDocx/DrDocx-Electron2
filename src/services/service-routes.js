export const apiUrl = "http://localhost:1211/api";
export const fullUrl = (route) => `${apiUrl}${route}`;
export const idUrl = (baseUrl, id) => `${baseUrl}/${id}`;

export const pingApiUrl = fullUrl('/ping');

export const patientsApiUrl = fullUrl("/patient");
export const patientApiUrl = (id) => idUrl(patientsApiUrl, id);

export const fieldsApiUrl = fullUrl("/field");
export const fieldApiUrl = (id) => idUrl(fieldsApiUrl, id);

export const fieldGroupsApiUrl = fullUrl("/fieldGroup");
export const fieldGroupApiUrl = (id) => idUrl(fieldGroupsApiUrl, id);
export const fieldGroupDefaultsApiUrl = `${fieldGroupsApiUrl}/default`;
export const fieldGroupDownloadApiUrl = `${fieldGroupsApiUrl}/download`;
export const fieldGroupUploadApiUrl = `${fieldGroupsApiUrl}/upload`;

export const fieldValueGroupsApiUrl = fullUrl("/fieldValueGroup");
export const fieldValueGroupApiUrl = (id) => idUrl(fieldValueGroupsApiUrl, id);

export const testsApiUrl = fullUrl("/test");
export const testApiUrl = (id) => idUrl(testsApiUrl, id);

export const testGroupsApiUrl = fullUrl("/testGroup");
export const testGroupApiUrl = (id) => idUrl(testGroupsApiUrl, id);

export const reportsApiUrl = fullUrl("/report");
export const reportApiUrl = (id) => idUrl(reportsApiUrl, id);
export const reportsUploadApiUrl = `${reportsApiUrl}/upload`;
export const reportsDownloadApiUrl = (reportTemplateId, patientId) => `${reportApiUrl(reportTemplateId)}/download/${patientId}`;
