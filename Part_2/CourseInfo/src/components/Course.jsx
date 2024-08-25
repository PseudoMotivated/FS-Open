const Header = ({ course }) => {
    return (
        <div>
            <h2>{course.name}</h2>
        </div>
    )
}

const Content = ({ course }) => {
    return (
        <div>
            <ol>
                {
                    course.parts.map(part => <Part key={part.id} part={part} />)
                }
            </ol>
        </div>
    )
}

const Part = ({ part }) => {
    return (
        <div>
            <li> <p>{part.name} has {part.exercises} exercises.</p> </li>
        </div>
    )
}

const Total = ({ course }) => {
    
    const sumExercises = (soFar, currentElement) => {
        console.log(currentElement, soFar, currentElement.exercises)
        return soFar + currentElement.exercises
    }

    return (
        <div>
            <p><strong>The total number of exercises is: {course.parts.reduce(sumExercises, 0)}</strong></p>
        </div>
    )
}

const Course = ({ course }) => {

    return (
        <div>

            <Header course={course} />

            <Content course={course} />

            <Total course={course} />

        </div>
    )
}


export default Course