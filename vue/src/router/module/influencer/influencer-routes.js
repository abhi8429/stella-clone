import SignUpSomnium from "@/components/module/influencer/StartMobile";
import LoginMobile from "@/components/module/influencer/LoginMobile";
import CreatorDashboardMobile from "@/components/module/influencer/CreatorDashboardMobile";
import CreateAccountMobile from "@/components/module/influencer/CreateAccountMobile";
import SetPriceMobile from "@/components/module/influencer/payment/SetPriceMobile";
import YourLinkMobile from "@/components/module/influencer/YourLinkMobile";
import FriendMenuMobile from "@/components/module/influencer/FriendMenuMobile";
import BlockedFriendsMobile from "@/components/module/influencer/BlockedFriendsMobile";
import BonusContentAdd from "@/components/module/influencer/content/BonusContentAdd";
import BonusContentList from "@/components/module/influencer/content/BonusContentList";
import BonusContentEdit from "@/components/module/influencer/content/BonusContentEdit";
import DisabledAccount from "@/components/module/shared/DisabledAccount";
import Platforms from "../../../components/module/influencer/Platforms";
import CreatorMessageDashboard from "@/components/module/influencer/direct-message/CreatorMessageDashboard";
import CreatorDirectMessage from "@/components/module/influencer/direct-message/CreatorDirectMessage";
import Announcement from "@/components/module/influencer/direct-message/Announcement";
import CreatorSetUpProfile from "@/components/module/influencer/shared/CreatorSetUpProfile";
import PrivateMessageCharge from "@/components/module/influencer/custom-request/PrivateMessageCharge";
import CreatorDone from "@/components/module/influencer/custom-request/CreatorDone";
import NewCustomRequest from "@/components/module/influencer/custom-request/NewCustomRequest";
import CreateAccountMobileDigis from "@/components/module/influencer/CreateAccountMobileDigis";
import {AGENCY_DIGIS} from "@/properties/agency";
//Load these lazily /* webpackChunkName: "influencer" */
const HelpMobile = () => import(/* webpackChunkName: "influencer" */ "@/components/module/shared/HelpMobile");
// const FAQ = () => import(/* webpackChunkName: "influencer" */ "@/components/module/influencer/FAQ");
const RecentTransactionMobile = () => import(/* webpackChunkName: "influencer" */ "@/components/module/influencer/payment/RecentTransactionMobile");
// const TermsOfService = () => import(/* webpackChunkName: "influencer" */ "@/components/module/shared/TermsOfService");
const PrivacyPolicy = () => import(/* webpackChunkName: "influencer" */ "@/components/module/shared/PrivacyPolicy");
const BillingMobile = () => import(/* webpackChunkName: "influencer" */ "@/components/module/influencer/payment/BillingMobile");
const SettingsMobile = () => import(/* webpackChunkName: "influencer" */ "@/components/module/influencer/SettingsMobile");
const CustomRequestList = () => import(/* webpackChunkName: "influencer" */ "@/components/module/influencer/custom-request/CustomRequestList");
const CustomRequestOptionList = () => import(/* webpackChunkName: "influencer" */ "@/components/module/influencer/custom-request/CustomRequestOptionList");
const CustomRequestOptionCreate = () => import(/* webpackChunkName: "influencer" */ "@/components/module/influencer/custom-request/CustomRequestOptionCreate");
/* new routes for home page routes */
const HomePage = () => import(/* webpackChunkName: "front" */ "@/components/module/front/HomePage");
const AboutPage = () => import(/* webpackChunkName: "front" */ "@/components/module/front/AboutPage");
const BlogList = () => import(/* webpackChunkName: "front" */ "@/components/module/front/BlogList");
const BlogDetails = () => import(/* webpackChunkName: "front" */ "@/components/module/front/BlogDetails");
const FAQ = () => import(/* webpackChunkName: "influencer" */ "@/components/module/front/FAQ");
const TermsOfService = () => import(/* webpackChunkName: "influencer" */ "@/components/module/front/TermsOfService");
/* new routes for home page routes */

export const routes = [

  {path: '/:urlPrefix?', name: 'HomePage', component: HomePage},
  // {path: `/${AGENCY_DIGIS}/:urlPrefix?`, name: 'DigisHomePage', component: HomePage},
  {path: '/about-us/in', name: 'AboutPage', component: AboutPage},
  {path: '/blog-list/in', name: 'BlogList', component: BlogList},
  {path: '/blog-details/in', name: 'BlogDetails', component: BlogDetails},

  // {path: '/:urlPrefix?', name: 'StartMobile', component: StartMobile},
  {path: '/disabledAccount/in', name: 'DisabledAccount', component: DisabledAccount},
  {path: '/a/:agencyName', name: 'SignUpSomnium', component: HomePage},

  {path: '/loginMobile/in/:urlPrefix?', name: 'LoginMobile', component: LoginMobile},
  {path: '/creatorDashboardMobile/in', name: 'CreatorDashboardMobile', component: CreatorDashboardMobile},
  {path: '/createAccountMobile/in', name: 'CreateAccountMobile', component: CreateAccountMobile},
  {path: '/digis/signup', name: 'DigisSignUp', component: CreateAccountMobile},
  {path: '/setPriceMobile/in', name: 'SetPriceMobile', component: SetPriceMobile},
  {path: '/yourLinkMobile/in', name: 'YourLinkMobile', component: YourLinkMobile},
  {path: '/friendMenuMobile/in', name: 'FriendMenuMobile', component: FriendMenuMobile},
  {path: '/blockedFriendsMobile/in', name: 'BlockedFriendsMobile', component: BlockedFriendsMobile},
  {path: '/billingMobile/in', name: 'BillingMobile', component: BillingMobile},
  {path: '/recentTransactionMobile/in', name: 'RecentTransactionMobile', component: RecentTransactionMobile},
  {path: '/settingsMobile/in', name: 'SettingsMobile', component: SettingsMobile},

  {path: '/helpMobile/in', name: 'HelpMobile', component: HelpMobile},
  {path: '/termsOfService/in', name: 'TermsOfService', component: TermsOfService},
  {path: '/privacyPolicy/in', name: 'PrivacyPolicy', component: PrivacyPolicy},
  {path: '/faq/in', name: 'FAQ', component: FAQ},

  {path: '/bonusContentAdd/in', name: 'BonusContentAdd', component: BonusContentAdd},
  {path: '/bonusContentEdit/in/:contentId', name: 'BonusContentEdit', component: BonusContentEdit},
  {path: '/bonusContentList/in', name: 'BonusContentList', component: BonusContentList},

  {path: '/customRequestList/in', name: 'CustomRequestList', component: CustomRequestList},
  {path: '/customRequestOptionList/in', name: 'CustomRequestOptionList', component: CustomRequestOptionList},
  {
    path: '/customRequestOptionCreate/in/:customRequestOptionId?',
    name: 'CustomRequestOptionCreate',
    component: CustomRequestOptionCreate
  },
  {path: '/platforms/in', name: 'Platforms', component: Platforms},

  {path: '/creatorMessageDashboard/in', name: 'CreatorMessageDashboard', component: CreatorMessageDashboard},
  {path: '/creatorDirectMessage/in/:customerId?', name: 'CreatorDirectMessage', component: CreatorDirectMessage},
  {path: '/announcement/in', name: 'Announcement', component: Announcement},

  {path: '/newCustomRequest/in', name: 'NewCustomRequest', component: NewCustomRequest},
  // {path:'/shoutOut/in',name:'ShoutOut',component:ShoutOut},
  {path: '/privateMessageCharge/in', name: 'PrivateMessageCharge', component: PrivateMessageCharge},
  {path: '/creatorDone/in', name: 'CreatorDone', component: CreatorDone},
  // {path: '/viewPosts/in',name:'ViewPosts',component:ViewPosts},
  {path: '/creatorSetUpProfile/in', name: 'CreatorSetUpProfile', component: CreatorSetUpProfile},
  // {path:'/previewPost/in',name:'PreviewPost',component:PreviewPost},
  {path:'/createAccountMobileDigis/in',name:'CreateAccountMobileDigis',component:CreateAccountMobileDigis},


]
