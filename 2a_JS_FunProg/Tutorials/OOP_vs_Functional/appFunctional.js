//Functional Approach
let userFld = document.getElementById('user');
let statusFld = document.getElementById('score');

const createUser = function(id) {
    return {
        userId: id,
        questions: []
    };
};

const addQuestion = function(qID, response, result, weight, user) {
    const questions = clone(user.questions);
    const newQuestion = {
        qID: qID,
        response: response,
        result: result,
        weight: weight
    };
    return {
        userId: user.userId,
        questions: [...questions, newQuestion]
    };
}

const calcScore = function(user) {
    return user.questions.reduce((tot, quest) => tot + (quest.result ? quest.weight : 0), 0);
}

const calcPossible = function(user) {
    return user.questions.reduce((tot, quest) => tot + quest.weight, 0);
};

const formatResults = (user) => calcScore(user) + " out of " + calcPossible(user);

const getProp = (prop, obj) => obj[prop];


/* IMPURE */
const setDOMelem = (elem, data) => elem.innerHTML = data;
    
const displayResults = pipe(
    formatResults,
    curry(setDOMelem)(statusFld));

const displayUser = pipe(
    curry(getProp)('userId'),
    curry(setDOMelem)(userFld));


const updateScore = function(user, qID, response, result, weight) {
    let usr = addQuestion(qID, response, result, weight, user);
    /* side effects */
    displayResults(usr);
    displayUser(usr);
    return usr;
};

/*
To test at console:

const usr1 = createUser(1);

const usr2 = updateScore(usr1, "q1", "answer", true, 1);
const usr3 = updateScore(usr2, "q2", "wrong answer", false, 2);
*/




