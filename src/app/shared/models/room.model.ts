import { User } from "./user.model";

export class Room {
    RoomID: number;
    Name: String;
    Password: String;
    LinkStream: String;
    StartStream: Date;
    EndStream: Date;
    Description: String;
    UserID: number;
    Moderator: User;
}
