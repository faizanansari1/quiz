import React, { Component } from 'react';
import Axios from 'axios';
import { Rate, Button } from 'antd';
import 'antd/dist/antd.css';


export default class Quiz extends Component {
    constructor(props) {
        super(props)
        this.state = {
            questions: [],
            index: 0,
            correct: '',
            allanswers: []
        }
    }


    componentDidMount() {
        const { index } = this.state;
        Axios.get('https://demo4757926.mockable.io/question').then((response) => {
            const allanswers = response.data[index].answers.sort(() => Math.random() - 0.5);
            this.setState({ questions: response.data, allanswers });
        }).catch(err => console.log(err))
    }

    onNext = () => {
        const { index, questions } = this.state;

        if (index < 20) {
            this.setState({ index: index + 1, correct: '' }, () => {
                const allanswers = questions[this.state.index].answers.sort(() => Math.random() - 0.5);
                this.setState({ allanswers })
            })
        }

    }
    getAnswer = (answer) => {
        const { questions, index } = this.state;
        console.log("answer: ", answer);
        if (questions[index].correct_answer === answer) {
            // alert("correct answer")
            this.setState({ correct: 'Correct!' })
        } else {
            this.setState({ correct: 'Sorry!' })
        }
    }

    render() {
        const { questions, index, allanswers } = this.state;
        return (
            <div>
                {questions.length > 0 && <div>
                    <div className="header">
                        <div className="logo">
                            <img src={require('../Images/Expertizo-logo.png')} alt="logo" />
                        </div>
                    </div>
                    <div className="content">
                        <div className="heading-section" >
                            <h1>Question {index + 1} of {questions.length}</h1>
                            <p>{unescape(questions[index].category)}</p>
                            <span>

                                <Rate
                                    value={questions[index].difficulty === "easy" ? 1
                                        : questions[index].difficulty === "medium" ? 2
                                            : 3}
                                    disabled
                                />
                            </span>
                        </div>

                        <div className="question-section">
                            <h4>{unescape(questions[index].question)}</h4>
                        </div>
                        <div className="awnser-options">

                            {allanswers.map((item, index) => {
                                return (
                                    <button key={index} className="awnser-btn" onClick={() => this.getAnswer(item)}>{unescape(item)}</button>
                                );
                            })}
                        </div>

                        <div className="result-section">
                            <h2>{this.state.correct}</h2>
                            <Button className="next-btn" onClick={this.onNext}>Next Question</Button>

                        </div>
                    </div>
                </div>}
            </div>
        );
    }
}