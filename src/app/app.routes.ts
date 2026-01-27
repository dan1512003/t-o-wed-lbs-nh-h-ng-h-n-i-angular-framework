import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Layout } from './layout/layout';
import { Find } from './pages/find/find';
import { Restaurantdetail } from './pages/restaurantdetail/restaurantdetail';
import { viewfullreviewrestaurant} from './pages/viewfullreviewrestaurant/viewfullreviewrestaurant';
import { Bookinginfo } from './pages/bookinginfo/bookinginfo';
import { Userprofile } from './pages/userprofile/userprofile';
import { Direction } from './pages/direction/direction';
import { Wardrestaurant } from './pages/wardrestaurant/wardrestaurant';
import { ViewAll } from './pages/view-all/view-all';
import { Accountdetail } from './pages/accountdetail/accountdetail';
import { Saverestaurant } from './pages/saverestaurant/saverestaurant';
import { Reviewrestaurant } from './pages/reviewrestaurant/reviewrestaurant';


export const routes: Routes = [

    {
    path: '',
    component: Layout,
    children: [
      { path: '', component: Home },
      { path: 'find', component: Find },
      {path:'restaurantdetail',component:Restaurantdetail},
      {path: 'review', component: viewfullreviewrestaurant},
      {path:'bookinginfo',component:Bookinginfo},
      {path:'direction',component:Direction},
      {path:'wardrestaurant',component:Wardrestaurant},
      {path:'viewall',component:ViewAll},
      {path:'userprofile',component:Userprofile,  children: [

      { path: '', redirectTo: 'account', pathMatch: 'full' },
          { path: 'reservation', component: Reviewrestaurant },
          { path: 'saved', component: Saverestaurant },
          { path: 'account', component: Accountdetail },
    ]},
    ],
  },
];
