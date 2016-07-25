'use strict';

const Script = require('smooch-bot').Script;

module.exports = new Script({
    processing: {
        //prompt: (bot) => bot.say('Beep boop...'),
        receive: () => 'processing'
    },

    start: {
        receive: (bot) => {
            return bot.say('Hello! What would you like to do today?')
                .then(() => 'askToDo');
        }
    },

    askToDo: {
        prompt: (bot) => bot.say('%[Get FREE Consultation](postback:enquire) %[Play Dating Quiz](postback:quiz) %[Learn More](postback:learnmore)'),
        receive: (bot, message) => {
            const txt = message.text;
            switch (txt) {
                case "enquire":
                    return bot.say('To get a free consultation. Tell me more about yourself.\n What\'s your name?')
                        .then(() => 'askName');
                case "quiz":
                    //
                    return false;
                case "learnmore":
                    return bot.say('![](http://www.fnstatic.co.uk/images/source/article/omg-chocolate-cake-1_2.jpg)')
                        .then(() => 'morecake1');
            }
        }
    },

    askName: {
        receive: (bot, message) => {
            const name = message.text;
            return bot.setProp('name', name)
                .then(() => bot.say(`Thanks ${name}!`))
                .then(() => 'askGender');
        }
    },

    askGender: {
        prompt: (bot) => bot.say('How about your gender?\n %[Male](postback:male) %[Female](postback:female)'),
        receive: (bot, message) => {
            const gender = message.text;
            switch (gender) {
                case "male":
                    return bot.setProp('gender', gender)
                        .then(() => bot.say('Thanks ma\'am!'))
                        .then(() => 'askAge');
                case "female":
                    return bot.setProp('gender', gender)
                        .then(() => bot.say('Thank you sir!'))
                        .then(() => 'askAge');
            }
        }
    },

    askAge: {
        prompt: (bot) => bot.say('How old are you this year?'),
        receive: (bot, message) => {
            const age = message.text;
            return bot.setProp('age', age)
                .then(() => bot.say(`Great! Now, we're half way there.`))
                .then(() => 'askEmail');
        }
    },

    askEmail: {
        prompt: (bot) => bot.say('What is your email address?'),
        receive: (bot, message) => {
            const email = message.text;
            return bot.setProp('email', email)
                .then(() => bot.say(`Thanks you, I will be sending you some instruction emails later.`))
                .then(() => 'askMobile');
        }
    },

    askMobile: {
        prompt: (bot) => bot.say('What is your mobile number?'),
        receive: (bot, message) => {
            const mobile = message.text;
            return bot.setProp('mobile', mobile)
                .then(() => bot.say(`Thanks you, we'll use this to call you later.`))
                .then(() => 'hearUsFrom');
        }
    },

    hearUsFrom: {
        prompt: (bot) => bot.say('Oh and one last thing, how did you hear about us?'),
        receive: (bot, message) => {
            const hearus = message.text;
            return bot.setProp('hearus', hearus)
                .then(() => bot.say(`Thanks you, you've been very patient.`))
                .then(() => 'bookAppointment');
        }
    },

    bookAppointment: {
        prompt: (bot) => bot.say('To facilitate your enquiry faster, why not you book your appointment with is now?\n %[Book Appointment](postback:book) %[Later](postback:later)'),
        receive: (bot, message) => {
            const appointmentStatus = message.text;
            switch (appointmentStatus) {
                case "book":
                    return bot.setProp('gender', gender)
                        .then(() => bot.say('Thanks ma\'am!'))
                        .then(() => 'askAge');
                case "later":
                    return bot.setProp('gender', gender)
                        .then(() => bot.say('Thank you sir!'))
                        .then(() => 'askAge');
            }
        }
    },

    finish: {
        receive: (bot, message) => {
            return bot.getProp('name')
                .then((name) => bot.say('Nice chatting with you, this is my limit at this moment! Have a good day!'))
                .then(() => 'finish');
        }
    }
});
