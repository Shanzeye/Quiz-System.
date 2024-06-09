#! /usr/bin/env node

import inquirer from 'inquirer';


// Define the quiz questions
const questions = [
    {
        question: "What is the capital of Pakistan?",
        choices: ["Islamabad", "Karachi", "Multan"],
        correctAnswer: "Islamabad"
    },
    {
        question: "Who is the founder of microsoft?",
        choices: ["Harper Lee", "Bill gates", "Charles Dickens"],
        correctAnswer: "Bill gates"
    },
    {
        question: "What is 2 + 2?",
        choices: ["3", "4", "5"],
        correctAnswer: "4"
    }
];

// Function to shuffle the questions array
function shuffleQuestions(questions: any[]): void {
    for (let i = questions.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [questions[i], questions[j]] = [questions[j], questions[i]];
    }
}

// Function to run the quiz
async function runQuiz(): Promise<void> {
    let score = 0;
    shuffleQuestions(questions);

    console.log("Welcome to the Quiz!\n");

    for (const question of questions) {
        console.log(question.question);
        const answer = await inquirer.prompt([
            {
                type: 'list',
                name: 'userAnswer',
                message: 'Your answer:',
                choices: question.choices
            }
        ]);

        if (answer.userAnswer === question.correctAnswer) {
            console.log("Correct!\n");
            score++;
        } else {
            console.log("Incorrect!\n");
        }
    }

    console.log(`Quiz ended. You got ${score} out of ${questions.length} questions correct.`);

    const retry = await inquirer.prompt([
        {
            type: 'confirm',
            name: 'retry',
            message: 'Do you want to retry the quiz?'
        }
    ]);

    if (retry.retry) {
        runQuiz();
    } else {
        console.log("Thank you for playing!");
    }
}

// Run the quiz
runQuiz();
