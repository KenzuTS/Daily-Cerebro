import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

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
import { ErrorInterceptor } from './helpers/error.interceptor';
import { JwtInterceptor } from './helpers/jwt.interceptor';
import { RegisterComponent } from './register/register.component';
import { RoleGuard } from './guards/role.guard';
import { fakeBackendProvider } from './helpers/fake-backend';
import { RegisterGuard } from './guards/register.guard';

const appRoutes: Routes = [

	{ path: '', component: HomeComponent },
	{ path: 'cruduser', component: CrudUserComponent, canActivate: [RoleGuard] },
	{ path: 'edituser/:id', component: EditUserComponent, canActivate: [RoleGuard] },
	{ path: 'login', component: LoginComponent },
	{ path: 'register', component: RegisterComponent, canActivate: [RegisterGuard] },

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
		EditUserComponent,
		RegisterComponent
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
		RoleGuard,
		RegisterGuard,
		UserService,
		{ provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
		{ provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },

		//fakeBackendProvider
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
