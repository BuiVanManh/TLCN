class GameShow {

    id: Object;
    title_first: String;
    prize_first: Number;
    image_first: String;

    title_second: String;
    prize_second: Number;
    image_second: String;

    title_third: String;
    prize_third: Number;
    image_third: String;

    winner1: Object;
    winner2: Object;
    winner3: Object;
    game: Object;
    employee: Object;

    constructor(){
        this.id = 0;
        this.title_first = '';
        this.prize_first = 0;
        this.image_first = '';

        this.title_second = '';
        this.prize_second = 0;
        this.image_second = '';

        this.title_third = '';
        this.prize_third = 0,
        this.image_third = '';

        this.winner1 = '';
        this.winner2 = '';
        this.winner3 = '';
        this.game = '';
        this.employee = '';
    }
}

export default GameShow;