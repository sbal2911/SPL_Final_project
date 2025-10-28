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
open Microsoft.AspNetCore.Http

// Define a struct to hold summary info
[<Struct>]
type EventSummary =
    val mutable Name: string
    val mutable IsValid: bool
    new(name, isValid) = { Name = name; IsValid = isValid }


[<ApiController>]
[<Route("[controller]")>]
type EventController(logger: ILogger<EventController>) =
    inherit ControllerBase()

    static let connectionUri =
        "mongodb+srv://demo:demo123@cluster0.pcywg4i.mongodb.net/?retryWrites=true&w=majority&appName=cluster0"

    static let settings =
        let s = MongoClientSettings.FromConnectionString(connectionUri)
        s.ServerApi <- ServerApi(ServerApiVersion.V1)
        s

    static let client = MongoClient(settings)

    static let database = client.GetDatabase("spl-project1")


    static let mutable events = []



    [<HttpPost("GetEvents")>]
    member _.GetEvents() : IActionResult =
        try
            // let res: IMongoCollection<obj> = database.GetCollection("events");
            let eventsCollection = database.GetCollection<GetEvent>("events")
            let allEvents = eventsCollection.Find(Builders<GetEvent>.Filter.Empty).ToList()
            let firstEvent =  allEvents.FirstOrDefault()
            let totalEvents:int = allEvents.Count
            let isEqual = totalEvents.Equals(100)
            logger.LogInformation("Total events: {@allEvents}", totalEvents.ToString())
            logger.LogInformation("Found events: {@allEvents}", allEvents)
            let allEvents = JsonConvert.SerializeObject(allEvents)
            OkObjectResult(allEvents)
        with ex ->
            let message: string = "GetEvents:Error:" + ex.Message
            logger.LogError(ex, message)
            base.StatusCode(500, message)

    [<HttpPost("CreateEvent")>]
    member _.CreateEvent([<FromBody>] event: NewEvent) : IActionResult =
        try
            logger.LogInformation("CreateEvent event: {@Event}", event)

            // Add to list
            events <- event :: events

            // Use array to simulate validation flags
            let validations = [| true; false; true; true |]
            logger.LogInformation("CreateEvent validations: {@validations}", validations)

            // Use for loop to count valid flags
            let mutable validCount = 0
            for isValid in validations do
                logger.LogInformation("CreateEvent isValid: {@isValid}", isValid)
                if isValid then validCount <- validCount + 1

            // Use lambda to filter events with non-empty category
            let categories = events |> List.filter (fun e -> not (String.IsNullOrWhiteSpace(e.category)))

            // Use if-else to determine status
            let statusMessage =
                if categories.Length > 0 then
                    "Event accepted"
                    
                else
                    "Event rejected: missing category"

            // Create a struct summary
            let summary = EventSummary(event.category, categories.Length > 0)

            // Combine result
            let result =
                {| 
                    Status = statusMessage
                    ValidFlags = validCount
                    Summary = summary
                    NamedEventCount = categories.Length
                |}

            let json = JsonConvert.SerializeObject(result)
            OkObjectResult(json) :> IActionResult

        with ex ->
            let message = "CreateEvent:Error:" + ex.Message
            logger.LogError(ex, message)
            base.StatusCode(500, message)

    

    [<HttpPost("DeleteEvent")>]
    member _.DeleteEvent([<FromBody>] event: UpdateEvent) : IActionResult =
        try
            logger.LogInformation("DeleteEvent event: {@Event}", event)
            let eventsCollection = database.GetCollection<Event>("events")

            let eventId = ObjectId.Parse(event._id)

            let filter: FilterDefinition<Event> =
                Builders<Event>.Filter.Eq((fun e -> e._id), eventId)

            let result = eventsCollection.DeleteOne(filter)
            let result = JsonConvert.SerializeObject(result)
            OkObjectResult(result)
        with ex ->
            let message: string = "DeleteEvent:Error:" + ex.Message
            logger.LogError(ex, message)
            base.StatusCode(500, message)


    [<HttpPost("UpdateEvent")>]
    member _.UpdateEvent([<FromBody>] event: UpdateEvent) : IActionResult =
        try
            logger.LogInformation("UpdateEvent event: {@Event}", event)
            let eventsCollection = database.GetCollection<Event>("events")

            let eventId = ObjectId.Parse("68b9fef49e406be69906b419")
            let eventId = ObjectId.Parse(event._id)
            let host = ObjectId.Parse(event.host)

            let filter: FilterDefinition<Event> =
                Builders<Event>.Filter.Eq((fun e -> e._id), eventId)

            let update =
                Builders<Event>.Update
                    .Combine(
                        Builders<Event>.Update.Set((fun e -> e.category), event.category),
                        Builders<Event>.Update.Set((fun e -> e.detail), event.detail),
                        Builders<Event>.Update.Set((fun e -> e.endDate), event.endDate),
                        Builders<Event>.Update.Set((fun e -> e.filename), event.filename),
                        Builders<Event>.Update.Set((fun e -> e.host), host),
                        Builders<Event>.Update.Set((fun e -> e.location), event.location),
                        Builders<Event>.Update.Set((fun e -> e.startDate), event.startDate),
                        Builders<Event>.Update.Set((fun e -> e.title), event.title)
                    )

            let result = eventsCollection.UpdateOne(filter, update)

            // let update = Builders<Event>.Update.Set((fun e -> e.detail), "Updated Detail")

            // let result = eventsCollection.UpdateOne(filter, update)
            let result = JsonConvert.SerializeObject(result)
            OkObjectResult(result)
        with ex ->
            let message: string = "UpdateEvent:Error:" + ex.Message
            logger.LogError(ex, message)
            base.StatusCode(500, message)


   