import { Poll } from "./poll.model";

export class Option {
    OptionID: number;
    Content: String;
    PollID: number;
    Poll: Poll;
}
