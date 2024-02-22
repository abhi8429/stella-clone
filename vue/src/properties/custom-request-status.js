//Actual Valid status
export const CR_STATUS_COUNTER = 'Counter';
export const CR_STATUS_ACCEPTED = 'Accepted';
export const CR_STATUS_READY = 'Ready';
export const CR_STATUS_DECLINED = 'Declined';
export const CR_STATUS_REVIEW = 'Review';
export const CR_STATUS_COMPLETED = 'Completed';
export const CR_STATUS_EXPIRED = 'Expired';
export const CR_STATUS_CUSTOMER_COUNTER = 'CustomerCounter';
//For view purpose
export const CR_STATUS_ACTION = 'Action';
export const CR_STATUS_PENDING = 'Pending';
export const CR_STATUS_RESUBMIT = 'Resubmit';

export const CR_STATUS_COLOR = {
  //Actual Valid status
  [CR_STATUS_COUNTER]: 'bedge-counter', [CR_STATUS_ACCEPTED]: 'btn-bg-purple font-purple',
  [CR_STATUS_READY]: 'bedge-ready', [CR_STATUS_DECLINED]: 'bedge-declined',
  [CR_STATUS_REVIEW]: 'bedge-review', [CR_STATUS_COMPLETED]: 'bedge-complete',
  [CR_STATUS_EXPIRED]: 'bedge-expired',

  //For view purpose
  [CR_STATUS_ACTION]: 'btn-bg-purple font-purple',
  [CR_STATUS_PENDING]: 'bedge-pending',
  [CR_STATUS_RESUBMIT]: 'btn-bg-white font-grey'};

export const CR_TYPE_CUSTOMER = 'Customer';
export const CR_TYPE_INFLUENCER = 'Influencer';
