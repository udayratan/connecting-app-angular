import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppComponent } from './app.component';
import { LoginComponent } from './login';
import { RegisterComponent } from './register';
import { routing } from './app.routing';
import { CommonServices } from './common.service';
import { MaterialModule } from './material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DashboardComponent, UpdateUserComponent, RemoveUserComponent } from './Dashboard';
import { AuthGuard } from "./auth.guard";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    UpdateUserComponent,
    RemoveUserComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    routing,
    MaterialModule,
    FormsModule
  ],
  providers: [CommonServices, AuthGuard],
  bootstrap: [AppComponent],
  entryComponents: [UpdateUserComponent, RemoveUserComponent]
})
export class AppModule { }
