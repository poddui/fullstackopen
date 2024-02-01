import { useState } from 'react'

const Button = ({text, handleClick}) => (
  <button onClick={handleClick}>{text}</button>
);


const StatisticText = ({ text }) => (
  <p>
    {text}
  </p>
);

const StatisticNumber = ({ number }) => (
  <p>
    {number}
  </p>
);

const Statistics = ({ good, neutral, bad, total, average, positivePercentage }) => {
  
  if (total === 0) {
    return <p>No feedback given</p>;
  }
  
  return (
    <div>
      <table>
        <tbody>
          <tr>
            <th><StatisticText text="good"/></th>
            <td><StatisticNumber number={good} /></td>
          </tr>
          <tr>
            <th><StatisticText text="neutral"/></th>
            <td><StatisticNumber number={neutral} /></td>
          </tr>
          <tr>
            <th><StatisticText text="bad"/></th>
            <td><StatisticNumber number={bad} /></td>
          </tr>
          <tr>
            <th><StatisticText text="total"/></th>
            <td><StatisticNumber number={total} /></td>
          </tr>
          <tr>
            <th><StatisticText text="average"/></th>
            <td><StatisticNumber number={average} /></td>
          </tr>
          <tr>
            <th><StatisticText text="positive"/></th>
            <td><StatisticNumber number={`${positivePercentage}%`} /></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};


const App = () => {

  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const total = good + neutral + bad;
  const average = (good - bad) / total || 0;
  const positivePercentage = (good / total) * 100 || 0;
  
  const handleGoodClick = () => {
    setGood(good + 1);
  };

  const handleNeutralClick = () => {
    setNeutral(neutral + 1);
  };

  const handleBadClick = () => {
    setBad(bad + 1);
  };

  return (
    <div>
      <h1>give feedback</h1>
      <Button text="good" handleClick={handleGoodClick}></Button>
      <Button text="neutral" handleClick={handleNeutralClick}></Button>
      <Button text="bad" handleClick={handleBadClick}></Button>
      <h1>statistics</h1>
      <Statistics
        good={good}
        neutral={neutral}
        bad={bad}
        total={total}
        average={average}
        positivePercentage={positivePercentage}
      />
    </div>
  );
};

export default App;