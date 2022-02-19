const Courses = (props) => {
    const data = props.courses
    console.log(data)
    return (data.map(x => 
      <Course course={x}/>)
    )
  }
  
  const Course = (props) => {
    return (
      <div>
      <h1>{props.course.name}</h1>
      <GetCourse course={props.course}/>
      <GetTotal course={props.course}/>
      </div>
    )
  }
  
  const GetCourse = (props) => {
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

  export default Courses