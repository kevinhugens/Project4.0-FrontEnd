import { Observable } from "rxjs";
import { Option } from "./Option.model";


export class Poll {
    PollID: number;
    RoomID: number;
    Question: String;
    Options?: Observable<Option>;
}
