import React, { useState, useEffect } from 'react';
import { RefreshCw } from 'lucide-react';

const mathOperators = ['+', '-', '×', '÷'];

const generateNumber = (digits) => {
  const min = Math.pow(10, digits - 1);
  const max = Math.pow(10, digits) - 1;
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const generateProblem = (digitsOfFirstNumber, digitsOfSecondNumber, operator) => {
  const num1 = generateNumber(digitsOfFirstNumber);
  const num2 = generateNumber(digitsOfSecondNumber);
  return { num1, num2, operator };
};

const generateProblems = (digitsOfFirstNumber, digitsOfSecondNumber, operator) => {
  return Array(60).fill(null).map(() => generateProblem(digitsOfFirstNumber, digitsOfSecondNumber, operator));
};

function App() {
  const [problems, setProblems] = useState(generateProblems(3, 3, '-'));
  const [digitsOfFirstNumber, setDigitsOfFirstNumber] = useState(3);
  const [digitsOfSecondNumber, setDigitsOfSecondNumber] = useState(3);
  const [selectedOperator, setSelectedOperator] = useState('-');

  const handleRefresh = () => {
    setProblems(generateProblems(digitsOfFirstNumber, digitsOfSecondNumber, selectedOperator));
  };

  useEffect(() => {
    handleRefresh();
  }, [digitsOfFirstNumber, digitsOfSecondNumber, selectedOperator]);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-2xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <button 
            onClick={handleRefresh}
            className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded-lg transition-colors"
          >
            <RefreshCw size={20} />
            Refresh
          </button>
          <div>
            <label className="block mb-2">First Number Digits</label>
            <select 
              value={digitsOfFirstNumber} 
              onChange={(e) => setDigitsOfFirstNumber(Number(e.target.value))}
              className="p-2 border rounded"
            >
              {[1, 2, 3, 4, 5].map(digit => (
                <option key={digit} value={digit}>{digit}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block mb-2">Second Number Digits</label>
            <select 
              value={digitsOfSecondNumber} 
              onChange={(e) => setDigitsOfSecondNumber(Number(e.target.value))}
              className="p-2 border rounded"
            >
              {[1, 2, 3, 4, 5].map(digit => (
                <option key={digit} value={digit}>{digit}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block mb-2">Operation</label>
            <select 
              value={selectedOperator} 
              onChange={(e) => setSelectedOperator(e.target.value)}
              className="p-2 border rounded"
            >
              {mathOperators.map(operator => (
                <option key={operator} value={operator}>{operator}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          {problems.map((problem, index) => (
            <div key={index} className="bg-white p-4 rounded-lg shadow-md">
              <div className="flex flex-col items-end font-mono text-xl">
                <div className="mb-1">{problem.num1}</div>
                <div className="flex items-center">
                  <span className="mr-2">{problem.operator}</span>
                  <span>{problem.num2}</span>
                </div>
                <div className="w-full border-t-2 border-gray-400 mt-1 mb-2"></div>
                <div className="h-8 w-full border-2 border-gray-200 rounded"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;