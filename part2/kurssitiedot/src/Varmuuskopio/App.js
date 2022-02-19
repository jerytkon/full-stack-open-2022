const Course = (props) => {

  return (
    <div>
    <h1>{props.course.name}</h1>
    <GetCourses course={props.course}/>
    <GetTotal course={props.course}/>
    </div>
  )
}

const GetCourses = (props) => {
  const data = props.course.parts
  return (data.map(x => 
    <li key={x.id}> {x.name} {x.exercises}</li>)
  )
}

const GetTotal = (props) => {
  const data = props.course.parts
  const sum = 0
  const total = (data.reduce((sum, data) => 
      sum + data.exercises, sum ))
  console.log(total)
  return (
    <li>total of {total} exercises</li>
  )

}
const App = () => {
  const course = {
    name: 'Half Stack application development',
    id: 1,
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
        name: 'State of a component II',
        exercises: 14,
        id: 3
      }
    ]
  }
  console.log(course.parts[0])
  return (
    <div>
     <Course course={course}/>
    </div>
  )
}






export default App
