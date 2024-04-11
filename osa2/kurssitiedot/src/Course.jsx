const Header = ({ course }) => <h1>{course}</h1>;

const Total = ({ sum }) => (
  <p>
    <strong>Total of {sum} exercises</strong>
  </p>
);

const Part = ({ part }) => (
  <p>
    {part.name} {part.exercises}
  </p>
);

const Content = ({ parts }) => (
  <>
    {parts.map((part) => (
      <Part key={part.id} part={part} />
    ))}
  </>
);

const Course = ({ course }) => {
  const totalExercises = course.parts.reduce((total, part) => total + part.exercises, 0);
  return (
    <>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total sum={totalExercises}/>
    </>
  );
};

export default Course;
