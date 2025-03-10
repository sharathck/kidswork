import React, { useState, useEffect } from 'react';
import { RefreshCw } from 'lucide-react';
import './App.css';

const mathOperators = ['+', '-', '×', '÷', '%'];
const validNumberOptions = [1, 2, 3, 4, 5, 6, 7];
const validateDigits = (firstDigits, secondDigits) => {
  return secondDigits <= firstDigits;
};
const getSecondNumberDigitsOptions = (firstDigits) => {
  return Array.from({ length: firstDigits }, (_, i) => i + 1);
};

const getFirstNumberDigitsOptions = (secondDigits) => {
  return validNumberOptions.filter(digit => validateDigits(digit, secondDigits));
}

const generateNumber = (digits) => {
  const min = Math.pow(10, digits - 1);
  const max = Math.pow(10, digits) - 1;
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const generateProblem = (digitsOfFirstNumber, digitsOfSecondNumber, operator) => {
  let num1 = generateNumber(digitsOfFirstNumber);
  let num2 = generateNumber(digitsOfSecondNumber);
  if (num2 > num1) {
    [num1, num2] = [num2, num1];
  }
  return { num1, num2, operator };
};

const generateProblems = (digitsOfFirstNumber, digitsOfSecondNumber, operator) => {
  return Array(50).fill(null).map(() => generateProblem(digitsOfFirstNumber, digitsOfSecondNumber, operator));
};

const calculateAnswer = (num1, num2, operator) => {
  switch (operator) {
    case '+':
      return num1 + num2;
    case '-':
      return num1 - num2;
    case '×':
      return num1 * num2;
    case '÷':
      return num1 / num2;
    case '%':
      return num1 % num2;
    default:
      return null;
  }
};

function App() {
  const [problems, setProblems] = useState(generateProblems(3, 3, '-'));
  const [digitsOfFirstNumber, setDigitsOfFirstNumber] = useState(3);
  const [digitsOfSecondNumber, setDigitsOfSecondNumber] = useState(3);
  const [selectedOperator, setSelectedOperator] = useState('-');
  const [answers, setAnswers] = useState(Array(60).fill(''));
  const [correctness, setCorrectness] = useState(Array(60).fill(true));
  const [answersChecked, setAnswersChecked] = useState(false);

  const handleRefresh = () => {
    setProblems(generateProblems(digitsOfFirstNumber, digitsOfSecondNumber, selectedOperator));
    setAnswers(Array(60).fill(''));
    setCorrectness(Array(60).fill(true));
    setAnswersChecked(false);
  };

  const handleCheckAnswers = () => {
    const newCorrectness = problems.map((problem, index) => {
      const correctAnswer = calculateAnswer(problem.num1, problem.num2, problem.operator);
      return parseFloat(answers[index]) === correctAnswer;
    });
    setCorrectness(newCorrectness);
    setAnswersChecked(true);
  };

  const handlePrint = () => {
    window.print();
  };

  useEffect(() => {
    handleRefresh();
  }, [digitsOfFirstNumber, digitsOfSecondNumber, selectedOperator]);

  return (
    <div className="app-container">
      <div className="app-content">
        <div className="controls">
          <button 
            onClick={handleRefresh}
            className="refresh-button"
          >
            <RefreshCw size={20} />
          </button>
          <label className="label">Top Digits
            <select 
              value={digitsOfFirstNumber} 
              onChange={(e) => setDigitsOfFirstNumber(Number(e.target.value))}
              className="select"
            >
              {getFirstNumberDigitsOptions(digitsOfSecondNumber).map(digit => (
                <option key={digit} value={digit}>{digit}</option>
              ))}
            </select>
          </label>
          <label className="label">Bottom Digits
            <select 
              value={digitsOfSecondNumber} 
              onChange={(e) => setDigitsOfSecondNumber(Number(e.target.value))}
              className="select"
            >
              {getSecondNumberDigitsOptions(digitsOfFirstNumber).map(digit => (
                <option key={digit} value={digit}>{digit}</option>
              ))}
            </select> 
          </label>
          <label className="label">Oper
            <select 
              value={selectedOperator} 
              onChange={(e) => setSelectedOperator(e.target.value)}
              className="select"
            >
              {mathOperators.map(operator => (
                <option key={operator} value={operator}>{operator}</option>
              ))}
            </select>
          </label>
          <div className="button-group">
            <button 
              onClick={handleCheckAnswers}
              className="check-button"
            >
              Check
            </button>
            <button 
              onClick={handlePrint}
              className="print-button"
            >
              Print
            </button>
          </div>
        </div>
        <div className="problems-grid">
          {problems.map((problem, index) => (
            <div key={index} className="problem-card">
              <div className="problem-content">
                <div className="problem-number">{problem.num1}</div>
                <div className="problem-operation">
                  <span className="operator">{problem.operator}</span>
                  <span>{problem.num2}</span>
                </div>
                <div className="problem-divider"></div>
                <input 
                  type="text" 
                  value={answers[index]}
                  onChange={(e) => {
                    const newAnswers = [...answers];
                    newAnswers[index] = e.target.value;
                    setAnswers(newAnswers);
                  }}
                  className={answersChecked ? 
                    `answer-input ${correctness[index] ? 'correct' : 'incorrect'}` : 
                    'answer-input'}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;