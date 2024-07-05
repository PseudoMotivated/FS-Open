const Header = (props) => {
  return (
    <div>
      <h1>{props.course.name}</h1>
    </div>
  )
}

const Content = (props) => {
  return (
    <div>
      <ol>

        <li><Part part={props.course.parts[0]} /></li>

        <li><Part part={props.course.parts[1]} /></li>

        <li><Part part={props.course.parts[2]} /></li>

      </ol>
    </div>
  )
}

const Part = (props) => {

  return (
    <div>
      <p>{props.part.name} has {props.part.exercises} exercises.</p>
    </div>
  )
}

const Total = (props) => {

  return (
    <div>
      <p><strong>The total number of exercises is: {props.course.parts[0].exercises + props.course.parts[1].exercises + props.course.parts[2].exercises}</strong></p>
    </div>
  )
}

const App = () => {

  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }
  return (
    <div>

      <Header course={course} />

      <Content course={course} />

      <Total course={course} />

    </div>
  )
}
export default App