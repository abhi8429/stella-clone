import CustomerDashboardMobile from "@/components/module/customer/CustomerDashboardMobile";
import CustomerBonusContentList from "@/components/module/customer/content/CustomerBonusContentList";
import CustomerRouter from "@/components/module/customer/CustomerRouter";
import CreateCustomerAccount from "@/components/module/customer/account/CreateAccount";
import Subscription from "@/components/module/customer/account/Subscription";
import SubscriptionComplete from "@/components/module/customer/account/SubscriptionComplete";
import TipPayment from "@/components/module/customer/account/TipPayment";
import TipComplete from "@/components/module/customer/account/TipPaymentComplete";
import CreateAccountComplete from "@/components/module/customer/account/CreateAccountComplete";
import Platform from "@/components/module/customer/account/Platform";
import CreatorPage from "@/components/module/customer/account/CreatorPage";
import CreatorPageOrg from "@/components/module/shared/CreatorPageOrg";
import CreateAccountExclInfluencer from "@/components/module/customer/account/CreateAccountExclInfluencer";
import CustomerDirectMessage from "@/components/module/customer/direct-message/CustomerDirectMessage";
import MessageCta from "@/components/module/customer/MessageCta";
//Load these lazily
const CustomerCardDetail = () => import( /* webpackChunkName: "customer" */ "@/components/module/customer/payment/CustomerCardDetail");
const CustomerSettings = () => import( /* webpackChunkName: "customer" */ '@/components/module/customer/CustomerSettings');
const PaymentOption = () => import( /* webpackChunkName: "customer" */ '@/components/module/customer/payment/PaymentOption');
const CustomerRecentTransaction = () => import( /* webpackChunkName: "customer" */ '@/components/module/customer/payment/CustomerRecentTransaction')
const CustomerCustomRequestList = () => import( /* webpackChunkName: "customer" */ '@/components/module/customer/custom-request/CustomerCustomRequestList')

export const ROUTE_CREATE_CUSTOMER_INSTAGRAM = 'CreateCustomerAccount';
export const ROUTE_CREATE_CUSTOMER_SNAPCHAT = 'CreateCustomerAccount1';
export const ROUTE_CREATE_CUSTOMER_TIKTOK = 'CreateCustomerAccount2';
export const ROUTE_CREATE_CUSTOMER_PLATFORM = 'CreateCustomerAccount3';
export const ROUTE_CREATE_CUSTOMER_PLATFORM_EXCL_CUSTOM_REQUEST = 'CreateCustomerAccount4';

export const routes = [
  // {path: '/c/:urlPrefix', name: 'CreateCustomerAccountMobile', component: CreateCustomerAccountMobile},

/*
  {path: '/customerSubscriptionMobile', name: 'CustomerSubscriptionMobile', component: CustomerSubscriptionMobile},
  {path: '/customerCheckOutMobile', name: 'CustomerCheckOutMobile', component: CustomerCheckOutMobile},
  {path: '/customerCheckoutCompleteMobile', name: 'CustomerCheckoutCompleteMobile', component: CustomerCheckoutCompleteMobile},
*/

  {path: '/customerDashboardMobile/cu/:urlPrefix?', name: 'CustomerDashboardMobile', component: CustomerDashboardMobile},
  {path: '/customerRouter/cu/:urlPrefix?', name: 'CustomerRouter', component: CustomerRouter},

 /* {path: '/customerStripeCheckout', name: 'CustomerStripeCheckout', component: CustomerStripeCheckout},
  {path: '/customerTip', name: 'CustomerTip', component: CustomerTip},
  {path: '/customerTipComplete/:tip', name: 'CustomerTipComplete', component: CustomerTipComplete},*/

  {path: '/customerSettings/cu', name: 'CustomerSettings', component: CustomerSettings},

  {path: '/customerCardDetail/:cardId?/cu', name: 'CustomerCardDetail', component: CustomerCardDetail},
  {path: '/paymentOption/cu', name: 'PaymentOption', component: PaymentOption},
  {path: '/customerRecentTransaction/cu', name: 'CustomerRecentTransaction', component: CustomerRecentTransaction},

  {path: '/bonusContentList/cu', name: 'CustomerBonusContentList', component: CustomerBonusContentList},
  {path: '/c/:urlPrefix/cr', name: 'CustomerCustomRequestList1', component: CustomerCustomRequestList},
  {path: '/customerCustomRequestList/cu', name: 'CustomerCustomRequestList', component: CustomerCustomRequestList},

 /* {path: '/platform/cu/:urlPrefix', name: 'Platform', component: Platform},*/
  {path: '/c/:urlPrefix', name: ROUTE_CREATE_CUSTOMER_INSTAGRAM, component: CreateCustomerAccount},
  {path: '/snapchat/:urlPrefix', name: ROUTE_CREATE_CUSTOMER_SNAPCHAT, component: CreateCustomerAccount},
  {path: '/tiktok/:urlPrefix', name: ROUTE_CREATE_CUSTOMER_TIKTOK, component: CreateCustomerAccount},
  {path: '/platform/:urlPrefix', name: ROUTE_CREATE_CUSTOMER_PLATFORM, component: CreateCustomerAccount},
  {path: '/exclCustomRequest/:urlPrefix', name: ROUTE_CREATE_CUSTOMER_PLATFORM_EXCL_CUSTOM_REQUEST, component: CreateAccountExclInfluencer},
  {path: '/creatorPage/cu/:urlPrefix', name: 'CreatorPage', component: CreatorPage},
  {path: '/platform/cu/:urlPrefix', name: 'Platform', component: CreatorPage},
  {path: '/creatorPageOrg/cu/:urlPrefix', name: 'CreatorPageOrg', component: CreatorPageOrg},

  {path: '/customerSubscription/cu', name: 'Subscription', component: Subscription},
  {path: '/subscriptionComplete/cu', name: 'SubscriptionComplete', component: SubscriptionComplete},
  {path: '/tipPayment/cu', name: 'TipPayment', component: TipPayment},
  {path: '/tipComplete/cu', name: 'TipComplete', component: TipComplete},
  {path: '/createAccountComplete/cu', name: 'CreateAccountComplete', component: CreateAccountComplete},

  {path: '/customerDirectMessage/cu/:customerId?', name: 'CustomerDirectMessage', component: CustomerDirectMessage},
  {path:'/messageCta/cu',name:'MessageCta',component: MessageCta},

]
