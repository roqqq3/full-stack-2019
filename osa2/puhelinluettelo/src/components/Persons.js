import React from 'react'

const Persons = (props) => {
  return (
    <div>
      {props.persons
        .filter(i => i.name.toLowerCase().includes(props.newFilter.toLowerCase()))
        .map(i => 
          <li key={i.id}>
            {i.name} {i.number}
            <button type='submit' onClick={props.handlePersonRemove} value={i.id}>
              poista
            </button>
          </li>)
      }
    </div>
  )
}

export default Persons