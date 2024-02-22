import {getAbsolutePath} from "@/common/absolute-path";

export const closeFriend = {
  "DateFormat.Date": "MM/DD/YYYY",
  "DateFormat.Time": "hh:mm A",
  "DatePicker.Date": "dd/MM/yyyy",
  "TableItems.Size": "15",
  "Table.entries": [[-1, 10, 25, 50, 100], ['All', 10, 25, 50, 100]],
  "PatientExportRandDate.Format": "ddMMMyyyy",

  "DateFormat.DateTime": "DD/MM/YYYY HH:mm", //current mount format, earlier format was dd/MM/yyyy HH:mm

  "KitExpirayReport.DateFormat": "dd/MMM/yyyy",
  "RandDate.Format": "dd/MM/yyyy,HH:mm",
  "DOB.Format": "dd/MM/yyyy",
  "StatusUpdatedDate.Format": "dd/MM/yyyy,HH:mm",
  "AssignmentData.Format": "dd/MM/yyyy,HH:mm",
  "ExpirationDate.Format": "dd/MM/yyyy,HH:mm",
  "Time.Format": "HH:mm",
  "KitShipmentOrderDate.Format": "dd/MM/yyyy",
  "GoLiveDateRange": "5",
  "Calendar.DateFormat.Date": "dd/mm/yy",
  "KitExpiryDateRange": "10",
  "MAX_PAGE_SIZE": "30",

}

export const BASE_URL = getAbsolutePath();
// export const BASE_URL = `https://iclinica.serveftp.com/iclinica_rest`;
// export const BASE_URL = `http://localhost:8083/`;
export const TOKEN_AUTH_USERNAME = 'spring-security-oauth2-read-client';
export const TOKEN_AUTH_PASSWORD = 'spring-security-oauth2-read-client-password1234';
export const ACCESS_TOKEN = 'access_token';
export const REMEMBER_ME = 'cf_remember_me';
export const REFRESH_TOKEN = 'refresh_token';
export const MSG_AND_ERROR = 'msgAndError'
export const CUSTOMER_URI = 'c'
export const CUSTOMER_CUSTOM_REQUEST_URI = 'cr'

export const PLATFORM_SNAPCHAT = 'Snapchat';
export const PLATFORM_INSTAGRAM = 'Instagram';
export const PLATFORM_TIKTOK = 'TikTok';
export const PLATFORM_TELEGRAM = 'Telegram';
export const PLATFORM_STELLA = 'Stella';

export const EXCLUSIVE_CUSTOM_REQUEST_INFLUENCERS = ['newinfluencer', 'togaurav', 'tayloralesia'];
