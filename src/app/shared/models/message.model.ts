export class Message {
    clientuniqueid: string;
    MessageId: string;
    roomId: number;
    username: string; //De naam van de gebruiker die het bericht verzend. 
    message: string;
    date: Date; //onnodig?
    showDate?: Boolean; //voor in de html te weten of de datum gezien moet worden
}
