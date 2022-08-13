import React, { useEffect, useState } from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";

function App() {
  const [page, setPage] = useState("List");
  const [questions, setQuestions] = useState([])

  useEffect(() => {
    fetch("http://localhost:4000/questions")
      .then((r) => r.json())
      .then((questions) => setQuestions(questions))
  }, [])

  function handleAddQuestion(newQuestion) {
    setQuestions([...questions, newQuestion])
  }

  function handleDeleteQuestion(deletedQuestion) {
    const updateQuestions = questions.filter((question) => question.id !== deletedQuestion.id);
    setQuestions(updateQuestions)
  }

  function handleChangeAnswer(updatedAnswer) {
    const newAnswer = questions.map((question) => {
      if (question.id === updatedAnswer.id) {
        return updatedAnswer;
      } else {
        return question;
      }
    });
    setQuestions(newAnswer)
  }

  return (
    <main>
      <AdminNavBar onChangePage={setPage} />
      {page === "Form" ? 
      <QuestionForm 
      questions={questions}
      onAddQuestion={handleAddQuestion}
      /> : 
      <QuestionList 
      questions={questions}
      onDeleteQuestion={handleDeleteQuestion}
      onChangeAnswer={handleChangeAnswer}
      />}
    </main>
  );
}

export default App;