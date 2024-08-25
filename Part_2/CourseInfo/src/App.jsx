import Course from "./components/Course"


const App = () => {

  const courses = [
    {
      id: 1,
      name: 'Half Stack application development',
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'How to not go insane',
          exercises: 213,
          id: 4
        }
      ]
    },
    {
      id: 2,
      name: 'Some other course',
      parts: [
        {
          name: 'Module 1',
          exercises: 10,
          id: 1
        },
        {
          name: 'Module 2',
          exercises: 5,
          id: 2
        }
      ]
    }
  ]
  return (
    <div>
      <h1>Available courses</h1>
      <ul>
        {courses.map(
          course => {
            return (
              <Course course={course} key={course.id} />
            )
          }
        )}
      </ul>
    </div>
  )
}
export default App