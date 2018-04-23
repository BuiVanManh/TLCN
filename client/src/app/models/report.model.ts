class Report {

    id: Object;
    username: String;
    email: String;
    phone: String;
    content: String
    event: Object;

    constructor(){
        this.id = 0;
        this.username = '';
        this.email = '';
        this.phone = '';
        this.content = '';
        this.event = '';
    }
}

export default Report;