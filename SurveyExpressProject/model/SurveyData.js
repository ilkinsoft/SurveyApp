class Question {
    type;
    title;
    name;

    constructor(type,title,name){
        this.type = type;
        this.title = title;
        this.name = name;
    }
}

class Choice {
    text;
    value;

    constructor(text,value){
        this.text = text;
        this.value = value;
    }
}

module.exports = {Question:Question,Choice:Choice};