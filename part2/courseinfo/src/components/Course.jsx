const Course = ({ courses }) => {
  return (
    <div>
      {courses.map((course) => (
        <div key={course.id}>
          <Header course={course.name} />
          <Content content={course.parts} />
          <Total content={course.parts} />
        </div>
      ))}
    </div>
  );
};

const Header = (props) => {
  return <h2>{props.course}</h2>;
};

const Content = (props) => {
  console.log(props);
  return (
    <div>
      {props.content.map((part, index) => (
        <Part key={index} part={part} />
      ))}
    </div>
  );
};

const Part = (props) => {
  return (
    <p>
      {props.part.name} - {props.part.exercises} exercises
    </p>
  );
};

const Total = (props) => {
  console.log(props);
  const totalExercises = props.content.reduce(
    (sum, part) => sum + part.exercises,
    0
  );
  return <p><b>Total number of exercises: {totalExercises}</b></p>;
};

export default Course