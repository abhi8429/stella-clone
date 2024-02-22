const PAID = 'paid';
const CANCELLED = 'cancelled';
const IN_PROGRESS = 'in-progress';
export const TIP = 'tip';
export const BONUS_CONTENT = 'bonus content';
export const CUSTOM_REQUEST = 'custom request';
export const SUBSCRIPTION = 'subscription';
export const MESSAGE = 'Message';
export const MEDIA_MESSAGE = 'Media message';

export const paymentPaid = (vm, paymentFor, invitee) => {
  if (vm.$gtm.enabled()) {
    let creatorSuffix = invitee ? invitee.name : 'N/A';
    push(PAID, creatorSuffix, paymentFor);
  }
}

export const paymentCancelled = (vm, paymentFor, invitee) => {
  if (vm.$gtm.enabled()) {
    let creatorSuffix = invitee ? invitee.name : 'N/A';
    push(CANCELLED, creatorSuffix, paymentFor);
  }
}

export const paymentInProgress = (vm, paymentFor, invitee) => {
  if (vm.$gtm.enabled()) {
    let creatorSuffix = invitee ? invitee.name : 'N/A';
    push(IN_PROGRESS, creatorSuffix, paymentFor);
  }
}

export const paymentOtherStatus = (vm, status, paymentFor, invitee) => {
  if (vm.$gtm.enabled()) {
    let creatorSuffix = invitee ? invitee.name : 'N/A';
    push(status, creatorSuffix, paymentFor);
  }
}

function push(paymentStatus, creatorSuffix, paymentFor) {
  console.log('stipePay', {
    event: 'stripePay',
    paymentStatus,
    creatorSuffix,
    paymentFor
  });
  window.dataLayer?.push({
    event: 'stripePay',
    paymentStatus,
    creatorSuffix,
    paymentFor
  });
}



