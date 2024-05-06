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
  <Part part={parts[0]}/>
  <Part part={parts[1]}/>
  <Part part={parts[2]}/>
  </div>
  )
}

const Part = (props) => {
  return (
  <div>
  <p>{props.part['name']} {props.part['excercises']}</p>
  </div>
  )
}

const Total = (props) => {
  const parts = props.course.parts
  const all = parts[0]['excercises'] + parts[1]['excercises'] + parts[2]['excercises']
  return (
  <div>
  <p>Number of exercises {all}</p>
  </div>
  )
}

const App = () => {
  const course = {
    name: "Half Stack application development",
    parts: [
      {
        name: 'Fundamentals of React',
        excercises: 10
      },
      {
        name: 'Using props to pass data',
        excercises: 7
      },
      {
        name: 'State of a component',
        excercises: 14
      }
    ]
  }

  return (
    <div>
      <Header course={course}/>
      <Content course={course}/>
      <Total course={course}/>
    </div>
  )
}

export default App
