namespace HealthcareFSharpApi.Models

open MongoDB.Bson
open MongoDB.Bson.Serialization
open MongoDB.Bson.Serialization.Attributes

[<BsonIgnoreExtraElements>]
type NewUser = {
    firstname: string
    lastname: string
    email:string
    password: string
    [<BsonElement("__v")>]
    Version: int
}

type User = {
    firstname: string
    lastname: string
    email:string
    [<BsonId>]
    [<BsonRepresentation(BsonType.ObjectId)>]
    _id: ObjectId
    password: string
    [<BsonElement("__v")>]
    Version: int
}

 