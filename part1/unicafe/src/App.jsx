import { useState } from "react";

const Button = (props) => {
  const { onClick, text } = props;
  return <button onClick={onClick}>{text}</button>;
};

const Header = (props) => {
  const { text } = props;
  return <h1>{text}</h1>;
};

const StatisticsLine = (props) => {
  const { text, value } = props;
  return (
    <table>
    <tbody>
    <tr>
      <td>{text} </td>
      <td>{value} </td>
    </tr>
    </tbody>
    </table>
  );
};

const Statistics = (props) => {
  const { good, neutral, bad } = props;
  const all = good + neutral + bad;

  if (all === 0) {
    return <div>No feedback given</div>;
  }
  return (
    <div>
      <StatisticsLine text="good" value={good} />
      <StatisticsLine text="neutral" value={neutral} />
      <StatisticsLine text="bad" value={bad} />
      <StatisticsLine text="all" value={all} />
      <StatisticsLine text="average" value={(good - bad) / all} />
      <StatisticsLine text="positive" value={`${(good / all) * 100} %`} />
    </div>
  );
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleGoodClick = () => {
    console.log("good");
    setGood(good + 1);
  };
  const handleNeutralClick = () => {
    console.log("neutral");
    setNeutral(neutral + 1);
  };
  const handleBadClick = () => {
    console.log("bad");
    setBad(bad + 1);
  };

  return (
    <div>
      <Header text="give feedback" />
      <Button onClick={handleGoodClick} text="good" />
      <Button onClick={handleNeutralClick} text="neutral" />
      <Button onClick={handleBadClick} text="bad" />
      <Header text="statistics" />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

export default App;
