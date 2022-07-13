import React, { useState, useEffect } from "react";

import QuestionItem from "./QuestionItem";

function QuestionList() {
  let [questions, setQuestions] = useState([]);
  // Somehow, I need to probably use 'useState' to store the state accordingly for later use in case the
  // the question items change
  // Or, I just need to use 'useEffect()' to piggyback off of a page load:
  useEffect(() => {
    fetch("http://localhost:4000/questions")
      .then((response) => response.json())
      .then((data) => {
        questions = data;
        // console.log("data: ", data);
        setQuestions(questions);
      });
  }, []);

  function handleDeleteQuestion(deletedQuestion) {
    console.log(
      "Deleted Question (from handleDeleteItem() in QuestionList component: )",
      deletedQuestion
    );
    const updatedQuestions = questions.filter(
      (question) => question.id !== deletedQuestion.id
    );
    setQuestions(updatedQuestions);
  }

  function handleUpdateQuestion(updatedQuestion) {
    console.log("handleUpdateQuestion() called");
    const updatedQuestions = questions.map((question) => {
      if (question.id === updatedQuestion.id) {
        return updatedQuestion;
      } else {
        return question;
      }
    });
    setQuestions(updatedQuestions);
  }
  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>
        {questions
          ? questions.map((question) => {
              // {id: 1, prompt: 'What special prop should always be included for lists of elements?', answers: Array(4), correctIndex: 2}
              {
                console.log("From QuestionList component: ");
                console.log(question);
              }
              return (
                <QuestionItem
                  key={question["id"]}
                  question={question}
                  onDeleteQuestion={handleDeleteQuestion}
                  onUpdateQuestion={handleUpdateQuestion}
                />
              );
            })
          : null}
      </ul>
    </section>
  );
}

export default QuestionList;
