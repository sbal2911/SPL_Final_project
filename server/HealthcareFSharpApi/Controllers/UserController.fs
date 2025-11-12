namespace MyFSharpApi.Controllers

open System
open System.Collections.Generic
open System.Linq
open System.Threading.Tasks
open Microsoft.AspNetCore.Mvc
open Microsoft.Extensions.Logging
open MyFSharpApi.Models
open MyFSharpApi
open MongoDB.Driver
open MongoDB.Bson
open Newtonsoft.Json
open HealthcareFSharpApi.Models

[<ApiController>]
[<Route("[controller]")>]
type UserController (logger : ILogger<UserController>) =
    inherit ControllerBase()

    static let connectionUri = "mongodb+srv://demo:demo123@cluster0.pcywg4i.mongodb.net/?retryWrites=true&w=majority&appName=cluster0"

    static let settings =
        let s = MongoClientSettings.FromConnectionString(connectionUri)
        s.ServerApi <- ServerApi(ServerApiVersion.V1)
        s

    static let client = MongoClient(settings)

    static let database = client.GetDatabase("spl-project1")


    static let mutable events = []
    
    [<HttpPost("GetUsers")>]
    member _.GetUsers() =
        let usersCollection = database.GetCollection<User>("users")
        let allUsers = usersCollection.Find(Builders<User>.Filter.Empty).ToList()
        logger.LogInformation("Found users: {@allUsers}", allUsers)
        let allUsers = JsonConvert.SerializeObject(allUsers)
        OkObjectResult(allUsers)

    [<HttpPost("CreateUser")>]
    member _.CreateUser([<FromBody>] user: NewUser) =
        logger.LogInformation("CreateEvent event: {@User}", user)
        let usersCollection = database.GetCollection<NewUser>("users")
        let result = usersCollection.InsertOne(user)
        let result = JsonConvert.SerializeObject(result)
        OkObjectResult(result)

    [<HttpPost("Login")>]
    member _.Login([<FromBody>] user: NewUser) =
        logger.LogInformation("CreateEvent event: {@User}", user)
        let usersCollection = database.GetCollection<NewUser>("users")
        let result = usersCollection.InsertOne(user)
        let result = JsonConvert.SerializeObject(result)
        OkObjectResult(result)

    // [<HttpPost("UpdateEvent")>]
    // member _.UpdateEvent([<FromBody>] event: Event) =
    //     logger.LogInformation("UpdateEvent event: {@Event}", event)
    //     let eventsCollection = database.GetCollection<Event>("events")

    //     let eventId = ObjectId.Parse("64f4c2e9e3b1a2d5c1a9f123")
    //     let eventId = event._id

    //     let filter = Builders<Event>.Filter.Eq((fun e -> e._id), eventId)
    //     let update =
    //         Builders<Event>.Update.Combine(
    //             Builders<Event>.Update.Set((fun e -> e.category), event.category),
    //             Builders<Event>.Update.Set((fun e -> e.detail), event.detail),
    //             Builders<Event>.Update.Set((fun e -> e.endDate), event.endDate),
    //             Builders<Event>.Update.Set((fun e -> e.filename), event.filename),
    //             Builders<Event>.Update.Set((fun e -> e.host), event.host),
    //             Builders<Event>.Update.Set((fun e -> e.location), event.location),
    //             Builders<Event>.Update.Set((fun e -> e.startDate), event.startDate),
    //             Builders<Event>.Update.Set((fun e -> e.title), event.title)                                                                     
    //         )
    //     let result = eventsCollection.UpdateOne(filter, update)        // base.CreatedAtAction("GetEvent", {| id = event.Id |}, event)
    //     let result = JsonConvert.SerializeObject(result)
    //     OkObjectResult(result)

    // [<HttpPost("DeleteEvent")>]
    // member _.DeleteEvent([<FromBody>] event: Event) =
    //     logger.LogInformation("DeleteEvent event: {@Event}", event)
    //     let eventsCollection = database.GetCollection<Event>("events")

    //     let filter = Builders<Event>.Filter.Eq((fun e -> e._id), event._id)
    //     let result = eventsCollection.DeleteOne(filter)
    //     let result = JsonConvert.SerializeObject(result)
    //     OkObjectResult(result)


   
   
