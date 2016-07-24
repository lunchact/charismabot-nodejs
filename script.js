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

    hi: {
        receive: (bot) => {
            return bot.say('Hello! What would you like to do today?')
                .then(() => 'askToDo');
        }
    },

    hello: {
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
                    return bot.say('To get a free consultation. Tell me more about yourself.')
                        .then(() => 'askName');
                case "quiz":
                    return bot.say('![](http://www.fnstatic.co.uk/images/source/article/omg-chocolate-cake-1_2.jpg)')
                        .then(() => 'morecake1');
                case "learnmore":
                    return bot.say('![](http://www.fnstatic.co.uk/images/source/article/omg-chocolate-cake-1_2.jpg)')
                        .then(() => 'morecake1');
            }
        }
    },

    morecake1: {
        prompt: (bot) => bot.say('%[More](postback:more1) %[Something else](postback:somethingelse1)'),
        receive: (bot, message) => {
            const txt = message.text;
            switch (txt) {
                case "more1": //postback reply
                    return bot.say('![](http://www.bbcgoodfood.com/sites/default/files/styles/recipe/public/recipe_images/recipe-image-legacy-id--1043451_11.jpg)')
                        .then(() => 'morecake1');
                case "somethingelse1": //postback reply
                    return bot.say('OK. What do you want to do?')
                        .then(() => 'something1');
            }
        }
    },

    morecake2: {
        prompt: (bot) => bot.say('%[More](postback:more2) %[Something else](postback:somethingelse2)'),
        receive: (bot, message) => {
            const txt = message.text;
            switch (txt) {
                case "more2": //postback reply
                    return bot.say('![](http://www.bbcgoodfood.com/sites/default/files/styles/recipe/public/recipe_images/recipe-image-legacy-id--1043451_11.jpg)')
                        .then(() => 'morecake2');
                case "somethingelse2": //postback reply
                    return bot.say('OK. What do you want to do?')
                        .then(() => 'something1');
            }
        }
    },

    something1: {
        prompt: (bot) => bot.say('%[Post a comment](postback:postcomment1) %[Send us feedback](postback:sendfeedback1)'),
        receive: (bot, message) => {
            const txt = message.text;
            switch (txt) {
                case "postcomment1":
                    return bot.say('Ok!') 
                        .then(() => 'getComment');
                case "sendfeedback1":
                    return bot.say('Great! We’d love to hear from you!')
                        .then(() => 'askName');
            }
        }
    },

    getComment: {
        prompt: (bot) => bot.say('You can send it here'),
        receive: (bot, message) => {
            const comment = message.text;
            return bot.setProp('comment', comment)
                .then(() => 'thanksComment');
        }
    },

    askName: {
        prompt: (bot) => bot.say('What\'s your name?'),
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
