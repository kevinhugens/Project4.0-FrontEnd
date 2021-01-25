import { Option } from "./Option.model";
import { Poll } from "./poll.model";
import { User } from "./user.model";

export class UserPoll {
    UserPollID: number;
    UserID: number;
    User: User;
    PollID: number;
    Poll: Poll;
    OptionID: number;
    Option: Option;
}
