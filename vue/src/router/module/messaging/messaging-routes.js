import MessageDashboard from '@/components/module/messaging/MessageDashboard';
import DirectMessage from '@/components/module/messaging/DirectMessage';
import Announcement from '@/components/module/messaging/Announcement'

export const routes = [
  { path: '/MessageDashboard/in', name: 'MessageDashboard', component: MessageDashboard },
  { path: '/DirectMessage/in', name: 'DirectMessage', component: DirectMessage },
  // { path: '/Announcements/in', name: 'Announcement', component: Announcement },

]
