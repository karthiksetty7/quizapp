// Importing required packages
import { Component } from "react";

import QuizContext from "../../context/QuizContext";

// Importing components
import Header from "../../components/Header";
import LoaderView from "../../components/LoaderView";
import FailureView from "../../components/FailureView";
import QuestionCard from "../../components/QuestionCard";

// Importing utilities
import { getApiData } from "../../utils/api";

import {
  apiStatusConstants,
  questionsApiUrl,
  TIMER_LIMIT,
} from "../../utils/constants";

// Importing CSS file
import "./index.css";

// Quiz game component
class QuizGame extends Component {
  // Question card reference
  questionCardRef = null;

  // Component state
  state = {
    apiStatus: apiStatusConstants.initial,

    questionsList: [],

    currentQuestionIndex: 0,

    timer: TIMER_LIMIT,

    answeredQuestions: [],
  };

  // Lifecycle method
  componentDidMount() {
    this.getQuestionsData();
  }

  // Cleanup
  componentWillUnmount() {
    clearInterval(this.timerId);
  }

  // Fetching questions
  getQuestionsData = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    });

    const responseData = await getApiData(questionsApiUrl);

    if (responseData.ok === true) {
      const formattedData = responseData.data.questions.map((eachQuestion) => ({
        id: eachQuestion.id,

        question_text: eachQuestion.question_text,

        options_type: eachQuestion.options_type,

        options: eachQuestion.options.map((eachOption) => ({
          id: eachOption.id,

          text: eachOption.text,

          image_url: eachOption.image_url,

          is_correct: eachOption.is_correct,
        })),
      }));

      this.setState(
        {
          questionsList: formattedData,

          apiStatus: apiStatusConstants.success,
        },
        this.startTimer,
      );
      // SAVE TO CONTEXT HERE
      const { setQuestionsList } = this.context;
      setQuestionsList(formattedData);
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      });
    }
  };

  // Starting timer
  startTimer = () => {
    clearInterval(this.timerId);

    this.timerId = setInterval(() => {
      // Check timer first
      if (this.state.timer <= 1) {
        clearInterval(this.timerId);

        // Use a small timeout to ensure the state is stable before moving
        this.autoMoveTimeout = setTimeout(() => {
          this.handleUnAttemptedQuestion();
        }, 500);

        this.setState({ timer: 0 });
      } else {
        this.setState((prevState) => ({ timer: prevState.timer - 1 }));
      }
    }, 1000);
  };

  // Stop timer
  stopTimer = () => {
    clearInterval(this.timerId);
  };

  // Handling unanswered question
  handleUnAttemptedQuestion = () => {
    const { questionsList, currentQuestionIndex } = this.state;

    // Prevent errors if list is empty
    if (questionsList.length === 0) return;

    const currentQuestion = questionsList[currentQuestionIndex];
    const correctOption = currentQuestion.options.find(
      (eachOption) =>
        eachOption.is_correct === "true" || eachOption.is_correct === true,
    );

    const questionReport = {
      questionId: currentQuestion.id,
      questionNumber: currentQuestionIndex + 1,
      questionText: currentQuestion.question_text,
      options: currentQuestion.options,
      selectedOptionId: "",
      correctOptionId: correctOption ? correctOption.id : "",
      optionsType: currentQuestion.options_type,
      isCorrect: false,
      isUnattempted: true,
    };

    // Add to context
    this.context.addAnswer(questionReport);

    // Check if it's the last question
    if (currentQuestionIndex >= questionsList.length - 1) {
      this.onSubmitQuiz();
    } else {
      // Move to exactly the next index
      this.setState(
        (prevState) => ({
          currentQuestionIndex: prevState.currentQuestionIndex + 1,
          timer: TIMER_LIMIT,
        }),
        this.startTimer, // Restart timer for the new question
      );
    }
  };

  // Next question
  onClickNextQuestion = () => {
    // Clear everything to ensure a clean slate for the next question
    clearInterval(this.timerId);
    if (this.autoMoveTimeout) {
      clearTimeout(this.autoMoveTimeout);
    }

    const { questionsList, currentQuestionIndex } = this.state;

    if (currentQuestionIndex >= questionsList.length - 1) {
      this.onSubmitQuiz();
    } else {
      this.setState(
        (prevState) => ({
          currentQuestionIndex: prevState.currentQuestionIndex + 1,
          timer: TIMER_LIMIT, // Reset the timer value
        }),
        this.startTimer, // Restart the countdown for the new question
      );
    }
  };

  // Submit quiz
  onSubmitQuiz = () => {
    clearInterval(this.timerId);

    const { history } = this.props;

    history.replace("/game-results");
  };

  // Retry API
  onClickRetry = () => {
    this.getQuestionsData();
  };

  // Handling answered question
  onAnswerQuestion = (answerData) => {
    // 1. Stop the timer immediately so it doesn't expire while the user sees the feedback
    clearInterval(this.timerId);
    if (this.autoMoveTimeout) {
      clearTimeout(this.autoMoveTimeout);
    }

    const {
      isCorrect,
      questionDetails,
      selectedOptionId,
      correctOptionId,
    } = answerData;

    const questionReport = {
      questionId: questionDetails.id,
      questionNumber: this.state.currentQuestionIndex + 1,
      questionText: questionDetails.question_text,
      options: questionDetails.options,
      selectedOptionId,
      correctOptionId,
      optionsType: questionDetails.options_type,
      isCorrect,
      isUnattempted: false,
    };

    this.context.addAnswer(questionReport);

    if (isCorrect) {
      this.context.updateScore();
    }

    // 2. Mark as answered so the side panel updates
    this.setState((prevState) => ({
      answeredQuestions: [
        ...new Set([
          ...prevState.answeredQuestions,
          prevState.currentQuestionIndex,
        ]),
      ],
    }));
  };

  // Clicking question number
  onClickQuestionNumber = (index) => {
    clearInterval(this.timerId);

    if (this.autoMoveTimeout) {
      clearTimeout(this.autoMoveTimeout);
    }

    this.setState(
      {
        currentQuestionIndex: index,
        timer: TIMER_LIMIT,
      },
      this.startTimer,
    );
  };

  // Rendering question numbers
  renderQuestionNumbers = () => {
    const {
      questionsList,
      currentQuestionIndex,
      answeredQuestions,
    } = this.state;

    return (
      <ul className="question-numbers-list">
        {questionsList.map((eachQuestion, index) => {
          const isActive = currentQuestionIndex === index;

          const isAnswered = answeredQuestions.includes(index);

          return (
            <li key={eachQuestion.id} className="question-number-item">
              <button
                type="button"
                className={`
                  question-number-button
                  ${isActive ? "active-question" : ""}
                  ${isAnswered ? "answered-question" : ""}
                `}
                onClick={() => this.onClickQuestionNumber(index)}
              >
                {index + 1}
              </button>
            </li>
          );
        })}
      </ul>
    );
  };

  // Success view
  renderSuccessView = () => {
    const { questionsList, currentQuestionIndex, timer } = this.state;

    const currentQuestion = questionsList[currentQuestionIndex];

    return (
      <div className="quiz-layout-container">
        {/* REMOVED: The entire .question-navigation-container 
          This removes the stats, navigation grid, and the second submit button.
      */}

        {/* Only render the Question Card */}
        <QuestionCard
          questionDetails={currentQuestion}
          currentQuestionIndex={currentQuestionIndex}
          totalQuestions={questionsList.length}
          timer={timer}
          stopTimer={this.stopTimer}
          onAnswerQuestion={this.onAnswerQuestion}
          onClickNextQuestion={this.onClickNextQuestion}
          onClickSubmitQuiz={this.onSubmitQuiz}
        />
      </div>
    );
  };

  // Rendering content
  renderQuizContent = () => {
    const { apiStatus } = this.state;

    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        return <LoaderView />;

      case apiStatusConstants.success:
        return this.renderSuccessView();

      case apiStatusConstants.failure:
        return <FailureView onClickRetry={this.onClickRetry} />;

      default:
        return null;
    }
  };

  // Main render
  render() {
    return (
      <div className="quiz-game-page-container">
        {/* Header */}
        <Header />

        {/* Quiz Content */}
        <div className="quiz-game-content-container">
          {this.renderQuizContent()}
        </div>
      </div>
    );
  }
}

// Connecting context
QuizGame.contextType = QuizContext;

export default QuizGame;
