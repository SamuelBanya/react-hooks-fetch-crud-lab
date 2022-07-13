import React, { useState } from "react";

function QuestionItem({ question, onDeleteQuestion, onUpdateQuestion }) {
  const { id, prompt, answers, correctIndex } = question;

  const options = answers.map((answer, index) => (
    <option key={index} value={index}>
      {answer}
    </option>
  ));

  function handleDeleteClick(e) {
    console.log("handleDeleteClick() function called");
    e.preventDefault();

    console.log("id: ", id);

    fetch(`http://localhost:4000/questions/${id}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then(() => onDeleteQuestion(question));
  }

  function handleQuestionChange(e) {
    console.log("handleQuestionChange() function called");
    e.preventDefault();
    console.log("e.target.value: ", e.target.value);
    const newCorrectAnswer = e.target.value;

    fetch(`http://localhost:4000/questions/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        correctIndex: newCorrectAnswer,
      }),
    })
      .then((response) => response.json())
      .then((updatedQuestion) => {
        onUpdateQuestion(updatedQuestion);
        console.log("updatedQuestion: ", updatedQuestion);
      });
  }

  return (
    <li>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select onChange={handleQuestionChange} defaultValue={correctIndex}>
          {options}
        </select>
      </label>
      <button onClick={handleDeleteClick}>Delete Question</button>
    </li>
  );
}

export default QuestionItem;
