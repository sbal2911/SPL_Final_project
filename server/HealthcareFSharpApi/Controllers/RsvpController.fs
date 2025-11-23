namespace HealthcareFSharpApi.Controllers

open System
open System.Collections.Generic
open System.Linq
open System.Threading.Tasks
open Microsoft.AspNetCore.Mvc
open Microsoft.Extensions.Logging
open HealthcareFSharpApi.Models
open HealthcareFSharpApi
open MongoDB.Driver
open MongoDB.Bson
open Newtonsoft.Json

[<ApiController>]
[<Route("[controller]")>]
type RsvpController (logger : ILogger<RsvpController>) =
    inherit ControllerBase()

    static let connectionUri = "mongodb+srv://demo:demo123@cluster0.pcywg4i.mongodb.net/?retryWrites=true&w=majority&appName=cluster0"

    static let settings =
        let s = MongoClientSettings.FromConnectionString(connectionUri)
        s.ServerApi <- ServerApi(ServerApiVersion.V1)
        s

    static let client = MongoClient(settings)

    static let database = client.GetDatabase("spl-project1")


    static let mutable events = []
    
    [<HttpPost("GetRsvps")>]
    member _.GetRsvps() =
        let rsvpsCollection = database.GetCollection<GetRsvp>("rsvps")
        let all = rsvpsCollection.Find(Builders<GetRsvp>.Filter.Empty).ToList()
        logger.LogInformation("Found rsvps: {@all}", all)
        let all = JsonConvert.SerializeObject(all)
        OkObjectResult(all)

    [<HttpPost("CreateRsvp")>]
    member _.CreateEvent([<FromBody>] rsvp: NewRsvp) =
        logger.LogInformation("CreateEvent event: {@Event}", rsvp)
        let eventsCollection = database.GetCollection<NewRsvp>("events")
        let result = eventsCollection.InsertOne(rsvp)
        let result = JsonConvert.SerializeObject(result)
        OkObjectResult(result)

    [<HttpPost("DeleteRsvp")>]
    member _.DeleteRsvp([<FromBody>] rsvp: Rsvp) =
        logger.LogInformation("DeleteRsvp event: {@Rsvp}", rsvp)
        let rsvpsCollection = database.GetCollection<Rsvp>("rsvps")

        let filter = Builders<Rsvp>.Filter.Eq((fun e -> e._id), rsvp._id)
        let result = rsvpsCollection.DeleteOne(filter)
        let result = JsonConvert.SerializeObject(result)
        OkObjectResult(result)


   
   