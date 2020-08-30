import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { NgbDropdownModule, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { AirlinesComponent } from './airlines/airlines.component';
import { SearchComponent } from './search/search.component';
import { NgbDatepickerModule , NgbTimepickerModule , NgbRatingModule} from '@ng-bootstrap/ng-bootstrap';
import { MatGridListModule } from '@angular/material/grid-list';
import { AirlinesSearchComponent } from './airlines-search/airlines-search.component';
import { FriendsComponent } from './friends/friends.component';
import { RouterModule } from '@angular/router';
import { ProfileShowComponent } from './profile-show/profile-show.component';
import { FlightComponent } from './flight/flight.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { HomeComponent } from './home/home.component';
import { RentACarComponent } from './rent-a-car/rent-a-car.component';
import { RentACarSearchComponent } from './rent-a-car-search/rent-a-car-search.component';
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
import { SearchRacComponent } from './search-rac/search-rac.component';
import { TimepickerComponent } from './timepicker/timepicker.component';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { RentACarProfileComponent } from './AdministratorRAC/rent-a-car-profile/rent-a-car-profile.component';
import { RentACarReportComponent } from './AdministratorRAC/rent-a-car-report/rent-a-car-report.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TimepickerBasicComponent } from './timepicker-basic/timepicker-basic.component';
import { RentACarSelectedComponent } from './rent-a-car-selected/rent-a-car-selected.component';
import { ImageLightboxComponent } from './image-lightbox/image-lightbox.component';
//import { LightBoxModule, CarouselModule, ModalModule, WavesModule } from 'angular-bootstrap-md';
import { SeatsMapComponent } from './seats-map/seats-map.component';
import { SeatsComponent } from './seats/seats.component';
import { InviteComponent } from './invite/invite.component';
import { PassengersComponent } from './passengers/passengers.component';
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
import { ChartCardsComponent } from './AdministratorAirline/chart-cards/chart-cards.component';
import { ChartsModule } from 'ng2-charts';
import { ChartEarningsComponent } from './AdministratorAirline/chart-earnings/chart-earnings.component';
import { LoginService } from './Services/Login/login.service';
import { HttpInterceptProviders } from './http-interceptors';
import { UsernameModalComponent } from './ProfileModals/username-modal/username-modal.component';
import { RegisteredUserService } from './Services/RegisteredUser/registeredUser.service';
import { DataService } from './Services/Data/data.service';
import { UserService } from './Services/User/user.service';
import { FriendshipRequestService } from './Services/FriendshipRequest/friendship-request.service';
import { FriendshipService } from './Services/Friendship/friendship.service';
import { AirlineService } from './Services/Airline/airline.service';
import { AirlineComponent } from './airline/airline.component';
import { FlightService } from './Services/Flights/flight.service';
import { InvitationsComponent } from './invitations/invitations.component';
import { HistoryComponent } from './history/history.component';
import { NameModalComponent } from './AdministratorAirline/AirlineProfileModals/name-modal/name-modal.component';
import { PromotionalDescriptionModalComponent } from './AdministratorAirline/AirlineProfileModals/promotional-description-modal/promotional-description-modal.component';
import { AddressModalComponent } from './AdministratorAirline/AirlineProfileModals/address-modal/address-modal.component';
import { PricelistModalComponent } from './AdministratorAirline/AirlineProfileModals/pricelist-modal/pricelist-modal.component';
import { FastTicketsComponent } from './fast-tickets/fast-tickets.component';


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
    RentACarComponent,
    RentACarSearchComponent,
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
    SearchRacComponent,
    TimepickerComponent,
    RentACarProfileComponent,
    RentACarReportComponent,
    TimepickerBasicComponent,
    RentACarSelectedComponent,
    ImageLightboxComponent,
    SeatsMapComponent,
    SeatsComponent,
    InviteComponent,
    PassengersComponent,
    BackNextComponent,
    AirlineProfileComponent,
    AirlineFlightsComponent,
    FilghtDetailsComponent,
    ReportComponent,
    MapComponent,
    QuickResevationComponent,
    FlightAddComponent,
    FlightsAdminComponent,
    FlightAdminComponent,
    ChartCardsComponent,
    ChartEarningsComponent,
    UsernameModalComponent,
    AirlineComponent,
    InvitationsComponent,
    HistoryComponent,
    NameModalComponent,
    PromotionalDescriptionModalComponent,
    AddressModalComponent,
    PricelistModalComponent,
    FastTicketsComponent
  ],
  imports: [
    BrowserAnimationsModule,
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
    ChartsModule,
    NgbRatingModule,
    HttpClientModule,
    RouterModule.forRoot([

      //for ALL users
      { path: '', component: HomeComponent },
      { path: 'home', component: HomeComponent },
      { path: 'airlines', component: AirlinesSearchComponent },
      { path: 'airline/:id', component: AirlineComponent },
      { path: ':airlineId/flights', component: FlightsFilterComponent },
      { path: ':flightId/seats', component: SeatsComponent},
      { path: 'rent-a-car-search', component: RentACarSearchComponent},
      { path: 'rent-a-car-search-selected', component: RentACarSelectedComponent},

      //for UNREGISTERED users
      { path: 'sign-in', component: SignInComponent},
      { path: 'sign-up', component: SignUpComponent},

      //for REGISTERED users
      { path: 'passengers', component: PassengersComponent},
      { path: 'invite', component: InviteComponent},
      { path: 'invitations', component: InvitationsComponent},
      { path: ':airlineId/fastTickets', component: FastTicketsComponent},
      { path: ':username/history', component: HistoryComponent},
      { path: ':username/invitations', component: InvitationsComponent},
      { path: ':username/friends', component: FriendsComponent},
      { path: ':username', component: ProfileShowComponent},
      
      //for ADMIN AIRLINES (add username prefix later)
      { path: 'adminAirlines/airlineProfile', component: AirlineProfileComponent},
      { path: 'adminAirlines/airline-flights', component: AirlineFlightsComponent},
      { path: 'adminAirlines/flight-details', component: FilghtDetailsComponent},
      { path: 'adminAirlines/report', component: ReportComponent}
    ])
  ],
  providers: [
    LoginService,
    RegisteredUserService,
    UserService,
    DataService,
    FriendshipRequestService,
    FriendshipService,
    AirlineService,
    FlightService,
    HttpInterceptProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
