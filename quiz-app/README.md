# Quiz-App (React + TypeScript + TailwindCSS + Vite + external API - no server)

Work in progress...

## About project

This project is a single page Quiz App. There are three general components: Start, QuizApp, Summary.
The quiz data is taken from https://opentdb.com. Background is fog component taken from Vanta.

### Start

In Start component there is:

- Number input for questions quantity(1 - 50)
- Select field with many categories to choose from(eg. Video Games, Geography, History, Art)
- Select field with three difficulties(easy, medium, hard)
  _You can choose Any Category or Any Difficulty in selects, default questions number is 10_
- Button to confirm form data and go to quiz

### QuizApp

QuizApp is made of <- QuizCard <- ButtonsPanel <- Button components:

- QuizApp is packaging for other components
- In QuizApp is fetch which takes data from opentdb and save it in LocalStorage to prevent quiz reset when refreshed
- In QuizCard there is info about question: category, difficulty, question
- There are two buttons: Previous Question, Next Question
- In the last question there is button named Go to summary
- In ButtonsPanel the answers are randomly sorted
- The answers data is forwarded to 4 Button components
- In Button components there is function that reveals correct answer
- The answers are saved in LocalStorage

### Summary

In progress...

## Styles

Styles are made in CSS and TailwindCSS - in progress...
