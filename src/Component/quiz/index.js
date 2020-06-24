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
            value: 3,
        }
    }


    componentDidMount() {
        Axios.get('https://demo4757926.mockable.io/question').then((response) => {
            if (response.data) {
                this.setState({ questions: response.data }, () => {
                    console.log('My QUESTIONS:', unescape(this.state.questions[0].question))
                })
            }
        }).catch(err => console.log(err))
    }

    onNext = () => {
        const { index } = this.state;

        if(index < 20){
            this.setState({index: index + 1, correct: '',})
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
    handleChange = (value) => {
        // this.setState({ vlaue });
    };


    render() {
        const desc = ['easy', 'medium', 'hard'];
        const { questions, index, value } = this.state;
        return (

            <div>
                <div className="header">
                    <div className="logo">
                        <img src="https://raw.githubusercontent.com/Expertizo/React-Test/master/Expertizo-logo.png" alt="logo" />
                    </div>
                </div>
                <div className="content">
                    <div className="heading-section" >
                        <h1>Question {index + 1} of {questions.length}</h1>
                        <p>{questions.length > 0 && unescape(questions[index].category)}</p>

                        <span>
                            
                            <Rate tooltips={desc} value={value} />
                            { questions.length > 0 && unescape(questions[index].difficulty)}
                            {/* {value ? <span className="ant-rate-text">{desc[value - 1]}</span> : ''} */}
                            </span>
                    </div>

                    <div className="question-section">
                        <h4>{questions.length > 0 && unescape(questions[index].question)}</h4>
                    </div>
                    <div className="awnser-options">

                        {questions.length > 0 && questions[index].answers.sort(() => Math.random() - 0.5).map((item, index) => {
                            return (
                                <button key={index} className="awnser-btn" onClick={() => this.getAnswer(item)}>{unescape(item)}</button>
                            )
                        })}
                        {/* <div className="buttons">
                            <button>Electric Company</button>
                            <button>Electric Company</button>
                        </div>
                        <div className="buttons">
                            <button>Electric Company</button>
                            <button>Electric Company</button>
                        </div> */}
                    </div>

                    <div className="result-section">
                        <h2>{this.state.correct}</h2>
                        <Button className="next-btn"  onClick={this.onNext}>Next Question</Button>

                    </div>

                </div>
            </div>
        );
    }
}