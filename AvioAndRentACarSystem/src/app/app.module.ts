import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { NgbDropdownModule, NgbModalModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
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

import {MatTabsModule} from '@angular/material/tabs';
import { BranchesModalComponent } from './ModalsRAC/branches-modal/branches-modal.component';
import { PriceListModalComponent } from './ModalsRAC/price-list-modal/price-list-modal.component';
import { AdminAirlineAuthGuardService } from './Services/AuthGuards/adminAirline/admin-airline-auth-guard.service';
import { RegisteredUserAuthGuardService } from './Services/AuthGuards/registeredUser/registered-user-auth-guard.service';
import { UnregisteredUserAuthGuardService } from './Services/AuthGuards/unregisteredUser/unregistered-user-auth-guard.service';
import { UnregisteredOrRegisteredUserAuthGuardServiceService } from './Services/AuthGuards/unregisteredOrRegistered/unregistered-or-registered-user-auth-guard-service.service';
import { NotUnregisteredUserAuthGuardService } from './Services/AuthGuards/notUnregistered/not-unregistered-user-auth-guard.service';
import { SeatMapAdminComponent } from './AdministratorAirline/seat-map-admin/seat-map-admin.component';
import { SeatsModifyAdminComponent } from './AdministratorAirline/seats-modify-admin/seats-modify-admin.component';
import { InfoRacComponent } from './AdministratorRAC/info-rac/info-rac.component';
import { ReportRacComponent } from './AdministratorRAC/report-rac/report-rac.component';
import { AddCarRacComponent } from './AdministratorRAC/add-car-rac/add-car-rac.component';
import { FilterRacComponent } from './filter-rac/filter-rac.component';
import { MenuRacComponent } from './AdministratorRAC/menu-rac/menu-rac.component';
import { ChangeCarModalComponent } from './ModalsRAC/change-car-modal/change-car-modal.component';
import { AddressRacModalComponent } from './ModalsRAC/address-rac-modal/address-rac-modal.component';
import { AdminRacAuthGuardService } from './Services/AuthGuards/adminRAC/admin-rac-auth-guard.service';
import { NameRacModalComponent } from './ModalsRAC/name-rac-modal/name-rac-modal.component';
import { PromotionalDescriptionRacComponent } from './ModalsRAC/promotional-description-rac/promotional-description-rac.component';
import { RentACarRentsComponent } from './AdministratorRAC/rent-a-car-rents/rent-a-car-rents.component';
import { AdminSysAuthGuardService } from './Services/AuthGuards/adminSys/admin-sys-auth-guard.service';
import { AddRentACarComponent } from './AdministratorSystem/add-rent-a-car/add-rent-a-car.component';
import { AddAirlineComponent } from './AdministratorSystem/add-airline/add-airline.component';
import { AddAdminComponent } from './AdministratorSystem/add-admin/add-admin.component';
import { PageRentACarComponent } from './AdministratorSystem/page-rent-a-car/page-rent-a-car.component';
import { PageAirlinesComponent } from './AdministratorSystem/page-airlines/page-airlines.component';
import { PageAdministratorsComponent } from './AdministratorSystem/page-administrators/page-administrators.component';
import { AdminsComponent } from './AdministratorSystem/admins/admins.component';
import { AdministratorRacModalComponent } from './ModalsRAC/administrator-rac-modal/administrator-rac-modal.component';
//import { NgbTooltip } from '@ng-bootstrap/ng-bootstrap';
import { MatExpansionModule } from  '@angular/material/expansion';
import { BusinessDestinationsModalComponent } from './ModalsRAC/business-destinations-modal/business-destinations-modal.component';
import { RentModalComponent } from './ModalsRAC/rent-modal/rent-modal.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

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
    FastTicketsComponent,
    AddressModalComponent,
    BranchesModalComponent,
    PriceListModalComponent,
    SeatMapAdminComponent,
    SeatsModifyAdminComponent,
    InfoRacComponent,
    ReportRacComponent,
    AddCarRacComponent,
    FilterRacComponent,
    MenuRacComponent,
    ChangeCarModalComponent,
    AddressRacModalComponent,
    NameRacModalComponent,
    PromotionalDescriptionRacComponent,
    RentACarRentsComponent,
    AddRentACarComponent,
    AddAirlineComponent,
    AddAdminComponent,
    PageRentACarComponent,
    PageAirlinesComponent,
    PageAdministratorsComponent,
    AdminsComponent,
    AdministratorRacModalComponent,
    BusinessDestinationsModalComponent,
    RentModalComponent
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
    MatTabsModule,
    MatExpansionModule,
    NgbTooltipModule,
    MatButtonModule,
    MatIconModule,
    RouterModule.forRoot([

      //for UNREGISTERED and REGISTERED users
      { path: '', component: HomeComponent},
      { path: 'home', component: HomeComponent},
      { path: 'airlines', component: AirlinesSearchComponent, canActivate: [UnregisteredOrRegisteredUserAuthGuardServiceService]},
      { path: 'airline/:id', component: AirlineComponent, canActivate: [UnregisteredOrRegisteredUserAuthGuardServiceService]},
      { path: ':airlineId/flights', component: FlightsFilterComponent, canActivate: [UnregisteredOrRegisteredUserAuthGuardServiceService] },
      { path: ':flightId/seats', component: SeatsComponent, canActivate: [UnregisteredOrRegisteredUserAuthGuardServiceService]},
      { path: 'rent-a-car-search', component: RentACarSearchComponent, canActivate: [UnregisteredOrRegisteredUserAuthGuardServiceService]},
      { path: 'rent-a-car-search-selected/:id', component: RentACarSelectedComponent, canActivate: [UnregisteredOrRegisteredUserAuthGuardServiceService]},

      //for UNREGISTERED users
      { path: 'sign-in', component: SignInComponent, canActivate: [UnregisteredUserAuthGuardService]},
      { path: 'sign-up', component: SignUpComponent, canActivate: [UnregisteredUserAuthGuardService]},

      //for REGISTERED users
      { path: 'passengers', component: PassengersComponent, canActivate: [RegisteredUserAuthGuardService]},
      { path: 'invite', component: InviteComponent, canActivate: [RegisteredUserAuthGuardService]},
      { path: 'invitations', component: InvitationsComponent, canActivate: [RegisteredUserAuthGuardService]},
      { path: ':airlineId/fastTickets', component: FastTicketsComponent, canActivate: [RegisteredUserAuthGuardService]},
      { path: ':username/history', component: HistoryComponent, canActivate: [RegisteredUserAuthGuardService]},
      { path: ':username/invitations', component: InvitationsComponent, canActivate: [RegisteredUserAuthGuardService]},
      { path: ':username/friends', component: FriendsComponent, canActivate: [RegisteredUserAuthGuardService]},
      
      
      //for ADMIN AIRLINES (add username prefix later)
      { path: 'adminAirlines/airlineProfile', component: AirlineProfileComponent, canActivate: [AdminAirlineAuthGuardService]},
      { path: 'adminAirlines/airline-flights', component: AirlineFlightsComponent, canActivate: [AdminAirlineAuthGuardService]},
      { path: 'adminAirlines/flight-details', component: FilghtDetailsComponent, canActivate: [AdminAirlineAuthGuardService]},
      { path: 'adminAirlines/report', component: ReportComponent, canActivate: [AdminAirlineAuthGuardService]},
      { path: 'adminAirlines/:flightId/remove', component: SeatsModifyAdminComponent, canActivate: [AdminAirlineAuthGuardService]},

      { path: ':username', component: ProfileShowComponent, canActivate: [NotUnregisteredUserAuthGuardService]},

      //for ADMIN RAC (add username prefix later)
      { path: 'adminRAC/rent-a-car-search', component: RentACarSearchComponent, canActivate: [AdminRacAuthGuardService]},
      { path: 'adminRAC/rent-a-car-selected', component: RentACarSelectedComponent, canActivate: [AdminRacAuthGuardService]},
      { path: 'adminRAC/rent-a-car-rents', component: RentACarRentsComponent, canActivate: [AdminRacAuthGuardService]},
      //{ path: 'adminRAC/rent-a-car-profile', component: RentACarProfileComponent, canActivate: [AdminRacAuthGuardService]},
      //{ path: 'adminRAC/report', component: ReportComponent, canActivate: [AdminRacAuthGuardService]},
      //{ path: 'adminRAC/:flightId/remove', component: SeatsModifyAdminComponent, canActivate: [AdminRacAuthGuardService]},

      //{ path: ':username', component: ProfileShowComponent, canActivate: [NotUnregisteredUserAuthGuardService]}
      
      //for ADMIN SYS (add username prefix later)
      { path: 'adminSys/page-rent-a-car', component: PageRentACarComponent, canActivate: [AdminSysAuthGuardService]},
      { path: 'adminSys/page-airlines', component: PageAirlinesComponent, canActivate: [AdminSysAuthGuardService]},
      { path: 'adminSys/page-administrators', component: PageAdministratorsComponent, canActivate: [AdminSysAuthGuardService]},
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
    HttpInterceptProviders,
    AdminAirlineAuthGuardService,
    RegisteredUserAuthGuardService,
    UnregisteredUserAuthGuardService,
    UnregisteredOrRegisteredUserAuthGuardServiceService,
    NotUnregisteredUserAuthGuardService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
