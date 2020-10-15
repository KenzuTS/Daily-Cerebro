import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationService } from './services/authentication.service';
import { LoginComponent } from './login/login.component';
import { AlertService } from './services/alert.service';
import { AlertComponent } from './alert/alert.component';
import { CrudUserComponent } from './crud-user/crud-user.component';
import { AuthGuard } from './guards/auth.guard';
import { HomeComponent } from './home/home.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { UserService } from './services/user.service';
import { CommonModule } from '@angular/common';

const appRoutes: Routes = [

	{ path: '', component: HomeComponent },
	{ path: 'cruduser', component: CrudUserComponent, canActivate: [AuthGuard] },
	{ path: 'cruduser/:id', component: EditUserComponent, canActivate: [AuthGuard] },
	{ path: 'login', component: LoginComponent },

	// otherwise redirect to home
	{ path: '**', redirectTo: '' } // TODO 404 this page doesn't exist
]

@NgModule({
	declarations: [
		AppComponent,
		LoginComponent,
		AlertComponent,
		CrudUserComponent,
		HomeComponent,
		EditUserComponent
	],
	imports: [
		BrowserModule,
		FormsModule,
		ReactiveFormsModule,
		AppRoutingModule,
		HttpClientModule,
		RouterModule.forRoot(appRoutes)
	],
	providers: [
		AuthenticationService,
		AlertService,
		AuthGuard,
		UserService
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
