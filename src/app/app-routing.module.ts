import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { MultiComponent } from './multi/multi.component';
import { CustomComponent } from './custom/custom.component';
import { AutostartComponent } from './autostart/autostart.component';

const routes: Routes = [
  { pathMatch: 'full', path: '', redirectTo: 'default' },
  { path: 'default', component: HomeComponent },
  { path: 'multi', component: MultiComponent },
  { path: 'custom', component: CustomComponent },
  { path: 'autostart', component: AutostartComponent },
  { pathMatch: 'full', path: '**', redirectTo: 'default' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
