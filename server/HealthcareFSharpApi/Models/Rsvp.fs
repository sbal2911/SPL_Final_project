namespace HealthcareFSharpApi.Models

open MongoDB.Bson
open MongoDB.Bson.Serialization
open MongoDB.Bson.Serialization.Attributes

[<BsonIgnoreExtraElements>]
type NewRsvp = {
    status: string
    event: string
    user:string
    [<BsonElement("__v")>]
    Version: int
}

type Rsvp = {
    status: string
    event: string
    user:string
    [<BsonId>]
    [<BsonRepresentation(BsonType.ObjectId)>]
    _id: ObjectId
    [<BsonElement("__v")>]
    Version: int
}

type GetRsvp = {
    status: string
    [<BsonRepresentation(BsonType.ObjectId)>]
    event: string
    [<BsonRepresentation(BsonType.ObjectId)>]
    user:string
    [<BsonId>]
    [<BsonRepresentation(BsonType.ObjectId)>]
    _id: ObjectId
    [<BsonElement("__v")>]
    Version: int
}
