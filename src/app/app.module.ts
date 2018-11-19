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
} from '@angular/material';

import { NgxChartsModule } from '@swimlane/ngx-charts';

import { FormsModule } from '@angular/forms';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { BrandComponent } from './pages/brand/brand.component';
import { LoginComponent } from './pages/login/login.component';
import { JwtInterceptor } from './interceptors';

import { FlexLayoutModule } from '@angular/flex-layout';

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
    LoginComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    LayoutModule,
    FormsModule,
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
    FlexLayoutModule
  ],
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
    TranslatePipe,
    CapitalizePipe,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
