import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from '@angular/cdk/layout';
import { Routing } from './app.routing';

import {
  TranslatePipe,
  CapitalizePipe,
} from './pipes';

import {
  TranslateService,
} from './services';

// Material imports
import {
  MatButtonModule,
  MatCardModule,
  MatGridListModule,
  MatIconModule,
  MatListModule,
  MatMenuModule,
  MatSidenavModule,
  MatToolbarModule,
  MatFormFieldModule,
  MatInputModule,
  MatExpansionModule, MatTableModule, MatPaginatorModule, MatSortModule,
  MatProgressSpinnerModule,
  MatSnackBarModule,
  MAT_SNACK_BAR_DEFAULT_OPTIONS
} from '@angular/material';

import { NgxChartsModule } from '@swimlane/ngx-charts';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { BrandComponent } from './pages/brand/brand.component';
import { LoginComponent } from './pages/login/login.component';
import { JwtInterceptor } from './interceptors';

import { FlexLayoutModule } from '@angular/flex-layout';
import { SignupComponent } from './signup/signup.component';
import { AuthenticatedLayoutComponent } from './layouts/authenticated/authenticated-layout.component';
import { RegisterComponent } from './pages/register/register.component';

export function setupTranslateFactory(service: TranslateService): Function {
  return () => service.use('da');
}

@NgModule({
  declarations: [
    AppComponent,
    TranslatePipe,
    CapitalizePipe,
    HomeComponent,
    AboutComponent,
    BrandComponent,
    LoginComponent,
    SignupComponent,
    AuthenticatedLayoutComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    LayoutModule,
    FormsModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatExpansionModule,
    Routing,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    NgxChartsModule,
    FlexLayoutModule,
    MatProgressSpinnerModule,
    MatSnackBarModule
  ],

  exports: [MatProgressSpinnerModule],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    },
    TranslateService,
    {
      provide: APP_INITIALIZER,
      useFactory: setupTranslateFactory,
      deps: [TranslateService],
      multi: true
    },
    {
      provide: MAT_SNACK_BAR_DEFAULT_OPTIONS,
      useValue: {duration: 2500}
    },
    TranslatePipe,
    CapitalizePipe,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
