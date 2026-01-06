import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Layout } from './layout/layout';
import { Find } from './pages/find/find';
import { Restaurantdetail } from './pages/restaurantdetail/restaurantdetail';
import { Restaurantbooking } from './pages/restaurantbooking/restaurantbooking';
import { Bookinginfo } from './pages/bookinginfo/bookinginfo';
import { Userprofile } from './pages/userprofile/userprofile';

export const routes: Routes = [

    {
    path: '',
    component: Layout,
    children: [
      { path: '', component: Home },
       { path: 'find', component: Find },
       {path:'restaurantdetail',component:Restaurantdetail},
        {path: 'restaurantbooking', component: Restaurantbooking },
       {path:'bookinginfo',component:Bookinginfo},
       {path:'userprofile',component:Userprofile},
    ],
  },
];
