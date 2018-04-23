// import {
//   CalendarEvent,
//   CalendarEventAction,
//   CalendarEventTimesChangedEvent
// } from 'angular-calendar';

// import {
//   startOfDay,
//   endOfDay,
//   subDays,
//   addDays,
//   endOfMonth,
//   isSameDay,
//   isSameMonth,
//   addHours
// } from 'date-fns';

class Event {

    id: Object;
    title: string;
    image: String;
    number: Number;
    location: string;
    description: string;
    create_date: Date;
    start_date: Date;
    end_date: Date;
    employee: Object;
    game: Object;
    constructor(){
        this.id = 0;
        this.image = '';
        this.title = '';
        this.number = 0;
        this.location = '';
        this.description = '';
        this.create_date = new Date();
        this.start_date = new Date();
        this.end_date = new Date();
        this.employee = '';
        this.game = '';
    }
}

export default Event;