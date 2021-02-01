export class Message {
    clientuniqueid: string;
    roomId: number;
    username: string; //De naam van de gebruiker die het bericht verzend. 
    message: string;
    date: Date; //onnodig?
    IsQuestion: Boolean;
    IsValidatedQuestion: Boolean; //validated betekend dat de moderator het bekeken heeft, niet of de vraag goegekeurt is
    IsAcceptedQuestion: Boolean; //betekend dat moderator het goedgekeurt heeft.
}
