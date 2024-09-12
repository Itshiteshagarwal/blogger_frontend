import React from 'react'
import AddNote from './AddNote';

const About = (props) => {
  return (
    <div>
     <AddNote showAlert={props.showAlert} />
    </div>
  )
}

export default About
