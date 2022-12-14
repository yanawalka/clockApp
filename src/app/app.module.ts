import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { ClockComponent } from './components/clock/clock.component';
import { RecurrentAlarmComponent } from './components/recurrent-alarm/recurrent-alarm.component';

@NgModule({
  declarations: [
    AppComponent,
    ClockComponent,
    RecurrentAlarmComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    HttpClientModule
  ],
  providers: [HttpClientModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
