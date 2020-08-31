using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.IdentityModel.Tokens;
using TravellifeChaser.Data;
using TravellifeChaser.Helpers;
using TravellifeChaser.Helpers.Email;
using TravellifeChaser.Helpers.GenericRepositoryAndUnitOfWork.GenericAndConcreteRepositories.Repositories.RepositoriesInterfaces;
using TravellifeChaser.Helpers.GenericRepositoryAndUnitOfWork.UnitOfWork;
using TravellifeChaser.Helpers.Repositories;

namespace TravellifeChaser
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }
        
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddControllers().AddJsonOptions(options => {
                options.JsonSerializerOptions.PropertyNameCaseInsensitive = true;
                options.JsonSerializerOptions.PropertyNamingPolicy = null;
            });

            services.AddControllers().AddNewtonsoftJson(options =>
                options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore
            );

            services.AddDbContext<TravellifeChaserDBContext>(options =>
               options.UseSqlServer(Configuration.GetConnectionString("DevConnection"))
            );

 
            //services.AddScoped(typeof(IRepository<>), typeof(Repository<>));
            /*services.AddScoped(typeof(RegisteredUserRepository));
            services.AddScoped(typeof(UserRepository));
            services.AddScoped(typeof(FriendshipRequestRepository));
            services.AddScoped(typeof(AirlineRepository));
            services.AddScoped(typeof(FlightRepository));*/

            /*services.AddScoped<IRegisteredUserRepository, RegisteredUserRepository>();
            services.AddScoped<IUserRepository, UserRepository>();
            services.AddScoped<IFriendshipRequestRepository, FriendshipRequestRepository>();
            services.AddScoped<IAirlineRepository, AirlineRepository>();
            services.AddScoped<IFlightRepository, FlightRepository>();*/
            services.AddScoped<IUnitOfWork, UnitOfWork>();

            services.Configure<SmtpSettings>(Configuration.GetSection("SmtpSettings"));
            
            services.AddSingleton<IMailer, Mailer>();

            services.AddMvc();

            services.AddCors();

            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
            .AddJwtBearer(options =>
            {
                options.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuer = true,
                    ValidateAudience = true,
                    ValidateLifetime = true,
                    ValidateIssuerSigningKey = true,
                    ValidIssuer = Configuration["Jwt:Issuer"],
                    ValidAudience = Configuration["Jwt:Issuer"],
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Configuration["Jwt:Key"]))
                };
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseAuthentication();

            app.UseAuthorization();

            app.UseCors(builder =>
                builder.WithOrigins(Configuration["ApplicationSettings:Client_URL"].ToString())
                .AllowAnyHeader()
                .AllowAnyMethod()
                );

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
