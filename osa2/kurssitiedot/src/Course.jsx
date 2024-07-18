const Course = ( {course} ) => {
    return (
      <div>
        <Header course={course}/>
        <Content course={course}/>
        <Total course={course}/>
      </div>
    )
  }

  const Header = (props) => {
    console.log(props.course.parts)
    return (
    <div>
    <h1>{props.course.name}</h1>
    </div>
    )
  }

  const Content = (props) => {
    const parts = props.course.parts
    return (
    <div>
      {parts.map(part =>
        <Part key={part.id} part={part}/>
      )}
    </div>
    )
  }

  const Part = ({ part }) => {
    console.log(part)
    return (
    <div>
    <p>{part['name']} {part['exercises']}</p>
    </div>
    )
  }

  const Total = (props) => {
    const parts = props.course.parts
    const amounts = parts.map(part => part.exercises)
  
    const sum = amounts.reduce(
      (summa, nykynen) => summa + nykynen
    )
  
    const summa = sum
    console.log(summa)
  
    return (
    <div>
    <p>Number of exercises {summa}</p>
    </div>
    )
  }

export default Course
