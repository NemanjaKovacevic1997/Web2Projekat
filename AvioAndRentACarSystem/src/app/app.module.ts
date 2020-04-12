import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { NgbDropdownModule, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from 'src/app/Services/User/user.service';
import { AirlinesComponent } from './airlines/airlines.component';
import { SearchComponent } from './search/search.component';
import { NgbDatepickerModule , NgbTimepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { MatGridListModule } from '@angular/material/grid-list';
import { AirlinesSearchComponent } from './airlines-search/airlines-search.component';
import { FriendsComponent } from './friends/friends.component';
import { RouterModule } from '@angular/router';
import { ProfileShowComponent } from './profile-show/profile-show.component';
import { FlightComponent } from './flight/flight.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { HomeComponent } from './home/home.component';
import { FlightsFilterComponent } from './flights-filter/flights-filter.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FilterFlightsComponent } from './filter-flights/filter-flights.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { Ng5SliderModule } from 'ng5-slider';
import { FlightsComponent } from './flights/flights.component';
import { FrendsListComponent } from './frends-list/frends-list.component';
import { FirstNameModalComponent } from './ProfileModals/first-name-modal/first-name-modal.component';
import { LastNameModalComponent } from './ProfileModals/last-name-modal/last-name-modal.component';
import { EmailModalComponent } from './ProfileModals/email-modal/email-modal.component';
import { CityModalComponent } from './ProfileModals/city-modal/city-modal.component';
import { MobileNumberModalComponent } from './ProfileModals/mobile-number-modal/mobile-number-modal.component';
import { PasswordModalComponent } from './ProfileModals/password-modal/password-modal.component';
import { SeatsMapComponent } from './seats-map/seats-map.component';
import { SeatsComponent } from './seats/seats.component';
import { InviteComponent } from './invite/invite.component';
import { PassengersComponent } from './passengers/passengers.component';
import { PassengerComponent } from './passenger/passenger.component';
import { BackNextComponent } from './back-next/back-next.component';
import { AirlineProfileComponent } from './AdministratorAirline/airline-profile/airline-profile.component';
import { AirlineFlightsComponent } from './AdministratorAirline/airline-flights/airline-flights.component';
import { FilghtDetailsComponent } from './AdministratorAirline/filght-details/filght-details.component';
import { ReportComponent } from './AdministratorAirline/report/report.component';
import { MapComponent } from './map/map.component';
import { QuickResevationComponent } from './AdministratorAirline/quick-resevation/quick-resevation.component';
import { FlightAddComponent } from './AdministratorAirline/flight-add/flight-add.component';
import { FlightsAdminComponent } from './AdministratorAirline/flights-admin/flights-admin.component';
import { FlightAdminComponent } from './AdministratorAirline/flight-admin/flight-admin.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    AirlinesComponent,
    SearchComponent,
    AirlinesSearchComponent,
    FriendsComponent,
    ProfileShowComponent,
    FlightComponent,
    SignUpComponent,
    HomeComponent,
    FlightsFilterComponent,
    FilterFlightsComponent,
    FlightsComponent,
    FrendsListComponent,
    FirstNameModalComponent,
    LastNameModalComponent,
    EmailModalComponent,
    CityModalComponent,
    MobileNumberModalComponent,
    PasswordModalComponent,
    SeatsMapComponent,
    SeatsComponent,
    InviteComponent,
    PassengersComponent,
    PassengerComponent,
    BackNextComponent,
    AirlineProfileComponent,
    AirlineFlightsComponent,
    FilghtDetailsComponent,
    ReportComponent,
    MapComponent,
    QuickResevationComponent,
    FlightAddComponent,
    FlightsAdminComponent,
    FlightAdminComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbDropdownModule,
    NgbDatepickerModule,
    MatGridListModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
    Ng5SliderModule,
    NgbModalModule,
    NgbTimepickerModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent },
      { path: 'home', component: HomeComponent },
      { path: 'friends', component: FriendsComponent},
      { path: 'profile/show', component: ProfileShowComponent},
      { path: 'airlines', component : AirlinesSearchComponent},
      { path: 'sign-in', component: SignInComponent},
      { path: 'sign-up', component: SignUpComponent},
      { path: 'flights', component: FlightsFilterComponent},
      { path: 'seats', component: SeatsComponent},
      { path: 'invite', component: InviteComponent},
      { path: 'airlineProfile', component: AirlineProfileComponent},
      { path: 'admin/airline-flights', component: AirlineFlightsComponent}
    ])
  ],
  providers: [
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
