namespace MyFSharpApi.Models

open MongoDB.Bson
open MongoDB.Bson.Serialization
open MongoDB.Bson.Serialization.Attributes

[<BsonIgnoreExtraElements>]
type NewEvent = {
    category: string
    title: string
    host:string
    startDate:System.DateTime
    endDate:System.DateTime
    location:string
    // [<BsonId>]
    // [<BsonRepresentation(BsonType.ObjectId)>]
    // Id: ObjectId
    detail: string
    filename: string
    [<BsonElement("__v")>]
    Version: int
}

type Event = {
    category: string
    title: string
    host:ObjectId
    startDate:System.DateTime
    endDate:System.DateTime
    location:string
    [<BsonId>]
    [<BsonRepresentation(BsonType.ObjectId)>]
    _id: ObjectId
    detail: string
    filename: string
    [<BsonElement("__v")>]
    Version: int
}

type GetEvent = {
    category: string
    title: string
    [<BsonRepresentation(BsonType.ObjectId)>]
    host:string
    startDate:System.DateTime
    endDate:System.DateTime
    location:string
    [<BsonId>]
    [<BsonRepresentation(BsonType.ObjectId)>]
    _id: ObjectId
    detail: string
    filename: string
    [<BsonElement("__v")>]
    Version: int
}

[<BsonIgnoreExtraElements>]
type UpdateEvent = {
    category: string
    title: string
    host:string
    startDate:System.DateTime
    endDate:System.DateTime
    location:string
    _id:string
    detail: string
    filename: string
    // [<BsonElement("__v")>]
    // Version: int
}
 