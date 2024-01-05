import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { ModalModule } from 'ngx-bootstrap/modal';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { LayoutComponent } from './layout/layout.component';
import { UserFormComponent } from './userform/userform.component';
import { TypeuserformComponent } from './typeuserform/typeuserform.component';
import { HttpClientModule } from '@angular/common/http';
import { UserService } from './user.service';
import { ReactiveFormsModule } from '@angular/forms';
import { UsertableComponent } from './usertable/usertable.component';
import { TypeusertableComponent } from './typeusertable/typeusertable.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LayoutComponent,
    UserFormComponent,
    TypeuserformComponent,
    UserFormComponent,
    UsertableComponent,
    TypeusertableComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    ModalModule.forRoot(),
  ],
  providers: [
    UserService,
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
