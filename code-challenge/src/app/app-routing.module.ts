import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfileComponent } from './profile/profile.component';
import { OverviewComponent } from './overview/overview.component';

const routes: Routes = [
	{
		path: '',
		component: OverviewComponent
	},
	{
		path: 'dashboard/:id',
		component: DashboardComponent
	},
	{
		path: 'profile/:id',
		component: ProfileComponent
	},
	{
		path: '**',
		component: OverviewComponent
	}
];

@NgModule({
  imports: [
  RouterModule.forRoot(
    routes,
    { preloadingStrategy: PreloadAllModules },
  )],
  exports: [RouterModule]
})

export class AppRoutingModule { }
