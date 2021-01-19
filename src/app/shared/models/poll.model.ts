import { Option } from "./option.model";

export class Poll {
    id: number;
    question: String;
    antwoorden : Option[] = [];
}
