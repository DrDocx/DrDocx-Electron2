export const apiUrl = "https://localhost:1211/api";
export const fullUrl = (route) => { return `${apiUrl}${route}` };
export const idUrl = (baseUrl, id) => { return `${baseUrl}/${id}` };

export const patientsApiUrl = fullUrl("/patient");
export const patientApiUrl = (id) => idUrl(patientsApiUrl, id);

export const fieldsApiUrl = fullUrl("/field");
export const fieldApiUrl = (id) => idUrl(fieldsApiUrl, id);

export const fieldGroupsApiUrl = fullUrl("/fieldGroup");
export const fieldGroupApiUrl = (id) => idUrl(fieldGroupsApiUrl, id);
export const fieldGroupDefaultsApiUrl = `${fieldGroupsApiUrl}/default`;

export const fieldValueGroupsApiUrl = fullUrl("/fieldValueGroup");
export const fieldValueGroupApiUrl = (id) => idUrl(fieldValueGroupsApiUrl, id);

export const testsApiUrl = fullUrl("/test");
export const testApiUrl = (id) => idUrl(testsApiUrl, id);

export const reportsApiUrl = fullUrl("/report");
export const reportApiUrl = (id) => idUrl(reportsApiUrl, id);
