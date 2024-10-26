import React, { useState } from 'react';
import { RefreshCw } from 'lucide-react';

const generateNumber = () => {
  return Math.floor(Math.random() * 900) + 100; // Generate number between 100-999
};

const generateProblem = () => {
  const num1 = generateNumber();
  const num2 = Math.floor(Math.random() * (num1 - 10)) + 10; // Ensure num2 < num1
  return { num1, num2 };
};

const generateProblems = () => {
  return Array(12).fill(null).map(() => generateProblem());
};

function App() {
  const [problems, setProblems] = useState(generateProblems());

  const handleRefresh = () => {
    setProblems(generateProblems());
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-800">Subtraction Practice</h1>
          <button 
            onClick={handleRefresh}
            className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors"
          >
            <RefreshCw size={20} />
            Refresh Problems
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {problems.map((problem, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex flex-col items-end font-mono text-xl">
                <div className="mb-1">{problem.num1}</div>
                <div className="flex items-center">
                  <span className="mr-2">-</span>
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