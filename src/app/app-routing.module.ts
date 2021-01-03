import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {WelcomeComponent} from './components/welcome/welcome.component';
import {ProductsComponent} from './components/products/products.component';
import {AboutComponent} from './components/about/about.component';
import {LoginComponent} from './components/entry/login/login.component';
import {RegisterComponent} from './components/entry/register/register.component';
import {AdminComponent} from './components/admin/admin.component';
import {HomeComponent} from './components/home/home.component';
import {CategoryComponent} from './components/store/category/category.component';
import {ListofcategoryComponent} from './components/store/listofcategory/listofcategory.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'welcome',
    component: WelcomeComponent,
  },
  {
    path: 'store',
    component: ProductsComponent
  },
  {
    path: 'info',
    component: AboutComponent,
  },
  {
    path: 'admin',
    component: AdminComponent,
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'category',
    component: CategoryComponent
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}
export const routingComponents = [
  WelcomeComponent,
  HomeComponent,
  ProductsComponent,
  AboutComponent,
  LoginComponent,
  RegisterComponent,
  AdminComponent
];
