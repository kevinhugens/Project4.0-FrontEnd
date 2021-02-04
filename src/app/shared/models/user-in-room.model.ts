import { Room } from "./room.model";
import { User } from "./user.model";

export class UserInRoom {
    UserInRoomID: number;
    UserID?: number;
    User?: User;
    RoomID: number;
    Room: Room;
}
