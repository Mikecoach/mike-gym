import { NavbarComponent } from './components/commons/navbar/navbar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TimerComponent } from './components/timer/timer/timer.component'; 
import { MatProgressBarModule } from '@angular/material/progress-bar'; 
import { MatToolbarModule } from '@angular/material/toolbar'; 
import { MatButtonModule } from '@angular/material/button';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { MatIconModule } from '@angular/material/icon'; 
import { AppComponent } from './app.component';
import { NgModule } from '@angular/core';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    TimerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatProgressBarModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
