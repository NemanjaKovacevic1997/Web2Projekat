using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace TravellifeChaser.Migrations
{
    public partial class InitialMigration : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Addresses",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    City = table.Column<string>(nullable: true),
                    Country = table.Column<string>(nullable: true),
                    Longitude = table.Column<double>(nullable: true),
                    Latitude = table.Column<double>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Addresses", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Pricelists",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    LuggageOver10kg = table.Column<double>(nullable: false),
                    LuggageOver20kg = table.Column<double>(nullable: false),
                    HandLuggageOverMaxDimensions = table.Column<double>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Pricelists", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Airports",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(nullable: true),
                    AddressId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Airports", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Airports_Addresses_AddressId",
                        column: x => x.AddressId,
                        principalTable: "Addresses",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    FirstName = table.Column<string>(nullable: true),
                    LastName = table.Column<string>(nullable: true),
                    Email = table.Column<string>(nullable: true),
                    Username = table.Column<string>(nullable: true),
                    AddressId = table.Column<int>(nullable: false),
                    MobileNumber = table.Column<string>(nullable: true),
                    Password = table.Column<string>(nullable: true),
                    Role = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Users_Addresses_AddressId",
                        column: x => x.AddressId,
                        principalTable: "Addresses",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Airlines",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(nullable: true),
                    AddressId = table.Column<int>(nullable: false),
                    PromotionalDescription = table.Column<string>(nullable: true),
                    AverageRating = table.Column<double>(nullable: false),
                    PricelistId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Airlines", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Airlines_Addresses_AddressId",
                        column: x => x.AddressId,
                        principalTable: "Addresses",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Airlines_Pricelists_PricelistId",
                        column: x => x.PricelistId,
                        principalTable: "Pricelists",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "RegisteredUsers",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RegisteredUsers", x => x.Id);
                    table.ForeignKey(
                        name: "FK_RegisteredUsers_Users_Id",
                        column: x => x.Id,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AdminAirlinesUsers",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false),
                    AirlineId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AdminAirlinesUsers", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AdminAirlinesUsers_Airlines_AirlineId",
                        column: x => x.AirlineId,
                        principalTable: "Airlines",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_AdminAirlinesUsers_Users_Id",
                        column: x => x.Id,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AirlinesAirports",
                columns: table => new
                {
                    AirlineId = table.Column<int>(nullable: false),
                    AirportId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AirlinesAirports", x => new { x.AirlineId, x.AirportId });
                    table.ForeignKey(
                        name: "FK_AirlinesAirports_Airlines_AirlineId",
                        column: x => x.AirlineId,
                        principalTable: "Airlines",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_AirlinesAirports_Airports_AirportId",
                        column: x => x.AirportId,
                        principalTable: "Airports",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Flights",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    FromId = table.Column<int>(nullable: true),
                    ToId = table.Column<int>(nullable: true),
                    TakeoffTime = table.Column<DateTime>(nullable: false),
                    LandingTime = table.Column<DateTime>(nullable: false),
                    Duration = table.Column<double>(nullable: false),
                    Length = table.Column<int>(nullable: false),
                    Cost = table.Column<double>(nullable: false),
                    AverageRating = table.Column<double>(nullable: false),
                    AirlineId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Flights", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Flights_Airlines_AirlineId",
                        column: x => x.AirlineId,
                        principalTable: "Airlines",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Flights_Airports_FromId",
                        column: x => x.FromId,
                        principalTable: "Airports",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Flights_Airports_ToId",
                        column: x => x.ToId,
                        principalTable: "Airports",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "FrendshipRequests",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    FromId = table.Column<int>(nullable: false),
                    ToId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FrendshipRequests", x => x.Id);
                    table.ForeignKey(
                        name: "FK_FrendshipRequests_RegisteredUsers_FromId",
                        column: x => x.FromId,
                        principalTable: "RegisteredUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_FrendshipRequests_RegisteredUsers_ToId",
                        column: x => x.ToId,
                        principalTable: "RegisteredUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Frendships",
                columns: table => new
                {
                    User1Id = table.Column<int>(nullable: false),
                    User2Id = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Frendships", x => new { x.User1Id, x.User2Id });
                    table.ForeignKey(
                        name: "FK_Frendships_RegisteredUsers_User1Id",
                        column: x => x.User1Id,
                        principalTable: "RegisteredUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Frendships_RegisteredUsers_User2Id",
                        column: x => x.User2Id,
                        principalTable: "RegisteredUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "FlightsAirports",
                columns: table => new
                {
                    FlightId = table.Column<int>(nullable: false),
                    AirportId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FlightsAirports", x => new { x.FlightId, x.AirportId });
                    table.ForeignKey(
                        name: "FK_FlightsAirports_Airports_AirportId",
                        column: x => x.AirportId,
                        principalTable: "Airports",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_FlightsAirports_Flights_FlightId",
                        column: x => x.FlightId,
                        principalTable: "Flights",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Invitations",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    FromId = table.Column<int>(nullable: false),
                    ToId = table.Column<int>(nullable: false),
                    FlightId = table.Column<int>(nullable: false),
                    IsAccepted = table.Column<bool>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Invitations", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Invitations_Flights_FlightId",
                        column: x => x.FlightId,
                        principalTable: "Flights",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Invitations_RegisteredUsers_FromId",
                        column: x => x.FromId,
                        principalTable: "RegisteredUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Invitations_RegisteredUsers_ToId",
                        column: x => x.ToId,
                        principalTable: "RegisteredUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Seats",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false),
                    FlightId = table.Column<int>(nullable: false),
                    Status = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Seats", x => new { x.Id, x.FlightId });
                    table.ForeignKey(
                        name: "FK_Seats_Flights_FlightId",
                        column: x => x.FlightId,
                        principalTable: "Flights",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Tickets",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserId = table.Column<int>(nullable: true),
                    FlightId = table.Column<int>(nullable: false),
                    SeatNumber = table.Column<int>(nullable: false),
                    Cost = table.Column<double>(nullable: false),
                    Discount = table.Column<double>(nullable: true),
                    IsQuickTicket = table.Column<bool>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Tickets", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Tickets_Flights_FlightId",
                        column: x => x.FlightId,
                        principalTable: "Flights",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Tickets_RegisteredUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "RegisteredUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.InsertData(
                table: "Addresses",
                columns: new[] { "Id", "City", "Country", "Latitude", "Longitude" },
                values: new object[,]
                {
                    { 1, "Gajdobra", "Serbia", null, null },
                    { 2, "Pecinci", "Serbia", null, null },
                    { 3, "Novi Sad", "Serbia", null, null },
                    { 4, "Beograd", "Serbia", 44.820500000000003, 20.291699999999999 },
                    { 5, "Nis", "Serbia", 43.337600000000002, 21.866299999999999 },
                    { 6, "Istanbul", "Turkey", 41.008200000000002, 28.978400000000001 },
                    { 7, "Doha", "Qatar", 25.278300000000002, 51.552 },
                    { 8, "London", "England", 51.469999999999999, 0.45429999999999998 },
                    { 9, "Paris", "France", 49.009700000000002, 2.5478999999999998 }
                });

            migrationBuilder.InsertData(
                table: "Pricelists",
                columns: new[] { "Id", "HandLuggageOverMaxDimensions", "LuggageOver10kg", "LuggageOver20kg" },
                values: new object[,]
                {
                    { 1, 3.0, 5.0, 10.0 },
                    { 2, 4.0, 6.0, 12.0 }
                });

            migrationBuilder.InsertData(
                table: "Airlines",
                columns: new[] { "Id", "AddressId", "AverageRating", "Name", "PricelistId", "PromotionalDescription" },
                values: new object[,]
                {
                    { 1, 6, 9.1199999999999992, "Turkish Airlines", 1, "Widen Your World" },
                    { 2, 7, 8.7300000000000004, "Qatar Airways", 2, "Going Places Together" }
                });

            migrationBuilder.InsertData(
                table: "Airports",
                columns: new[] { "Id", "AddressId", "Name" },
                values: new object[,]
                {
                    { 1, 4, "Nikola Tesla" },
                    { 2, 8, "Heathrow" },
                    { 3, 9, "Charles de Gaulle" }
                });

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "Id", "AddressId", "Email", "FirstName", "LastName", "MobileNumber", "Password", "Role", "Username" },
                values: new object[,]
                {
                    { 1, 1, "kovacevicnemanja1997@gmail.com", "Nemanja", "Kovacevic", "+381604520858", "kovac123", 0, "kovac123" },
                    { 2, 2, "radovan.trudic@gmail.com", "Radovan", "Trudic", "+381650000000", "rasa123", 0, "rasaBrt" },
                    { 3, 3, "marko.markovic@gmail.com", "Marko", "Markovic", "+381651111111", "marko123", 0, "markooo" }
                });

            migrationBuilder.InsertData(
                table: "AirlinesAirports",
                columns: new[] { "AirlineId", "AirportId" },
                values: new object[,]
                {
                    { 1, 1 },
                    { 1, 2 },
                    { 1, 3 },
                    { 2, 1 },
                    { 2, 2 }
                });

            migrationBuilder.InsertData(
                table: "Flights",
                columns: new[] { "Id", "AirlineId", "AverageRating", "Cost", "Duration", "FromId", "LandingTime", "Length", "TakeoffTime", "ToId" },
                values: new object[,]
                {
                    { 1, 1, 4.6699999999999999, 300.0, 330.0, null, new DateTime(2020, 6, 2, 20, 30, 0, 0, DateTimeKind.Unspecified), 2506, new DateTime(2020, 6, 2, 15, 0, 0, 0, DateTimeKind.Unspecified), 2 },
                    { 3, 1, 4.2999999999999998, 100.0, 465.0, 2, new DateTime(2020, 6, 6, 4, 0, 0, 0, DateTimeKind.Unspecified), 400, new DateTime(2020, 6, 5, 20, 15, 0, 0, DateTimeKind.Unspecified), 3 },
                    { 2, 2, 3.6699999999999999, 250.0, 30.0, 1, new DateTime(2020, 6, 3, 3, 30, 0, 0, DateTimeKind.Unspecified), 1003, new DateTime(2020, 6, 3, 3, 0, 0, 0, DateTimeKind.Unspecified), null }
                });

            migrationBuilder.InsertData(
                table: "RegisteredUsers",
                column: "Id",
                values: new object[]
                {
                    1,
                    2,
                    3
                });

            migrationBuilder.InsertData(
                table: "FrendshipRequests",
                columns: new[] { "Id", "FromId", "ToId" },
                values: new object[] { 1, 1, 2 });

            migrationBuilder.CreateIndex(
                name: "IX_AdminAirlinesUsers_AirlineId",
                table: "AdminAirlinesUsers",
                column: "AirlineId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Airlines_AddressId",
                table: "Airlines",
                column: "AddressId");

            migrationBuilder.CreateIndex(
                name: "IX_Airlines_PricelistId",
                table: "Airlines",
                column: "PricelistId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_AirlinesAirports_AirportId",
                table: "AirlinesAirports",
                column: "AirportId");

            migrationBuilder.CreateIndex(
                name: "IX_Airports_AddressId",
                table: "Airports",
                column: "AddressId");

            migrationBuilder.CreateIndex(
                name: "IX_Flights_AirlineId",
                table: "Flights",
                column: "AirlineId");

            migrationBuilder.CreateIndex(
                name: "IX_Flights_FromId",
                table: "Flights",
                column: "FromId",
                unique: true,
                filter: "[FromId] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_Flights_ToId",
                table: "Flights",
                column: "ToId",
                unique: true,
                filter: "[ToId] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_FlightsAirports_AirportId",
                table: "FlightsAirports",
                column: "AirportId");

            migrationBuilder.CreateIndex(
                name: "IX_FrendshipRequests_FromId",
                table: "FrendshipRequests",
                column: "FromId");

            migrationBuilder.CreateIndex(
                name: "IX_FrendshipRequests_ToId",
                table: "FrendshipRequests",
                column: "ToId");

            migrationBuilder.CreateIndex(
                name: "IX_Frendships_User2Id",
                table: "Frendships",
                column: "User2Id");

            migrationBuilder.CreateIndex(
                name: "IX_Invitations_FlightId",
                table: "Invitations",
                column: "FlightId");

            migrationBuilder.CreateIndex(
                name: "IX_Invitations_FromId",
                table: "Invitations",
                column: "FromId");

            migrationBuilder.CreateIndex(
                name: "IX_Invitations_ToId",
                table: "Invitations",
                column: "ToId");

            migrationBuilder.CreateIndex(
                name: "IX_Seats_FlightId",
                table: "Seats",
                column: "FlightId");

            migrationBuilder.CreateIndex(
                name: "IX_Tickets_FlightId",
                table: "Tickets",
                column: "FlightId");

            migrationBuilder.CreateIndex(
                name: "IX_Tickets_UserId",
                table: "Tickets",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_Users_AddressId",
                table: "Users",
                column: "AddressId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "AdminAirlinesUsers");

            migrationBuilder.DropTable(
                name: "AirlinesAirports");

            migrationBuilder.DropTable(
                name: "FlightsAirports");

            migrationBuilder.DropTable(
                name: "FrendshipRequests");

            migrationBuilder.DropTable(
                name: "Frendships");

            migrationBuilder.DropTable(
                name: "Invitations");

            migrationBuilder.DropTable(
                name: "Seats");

            migrationBuilder.DropTable(
                name: "Tickets");

            migrationBuilder.DropTable(
                name: "Flights");

            migrationBuilder.DropTable(
                name: "RegisteredUsers");

            migrationBuilder.DropTable(
                name: "Airlines");

            migrationBuilder.DropTable(
                name: "Airports");

            migrationBuilder.DropTable(
                name: "Users");

            migrationBuilder.DropTable(
                name: "Pricelists");

            migrationBuilder.DropTable(
                name: "Addresses");
        }
    }
}
