import React from 'react'
const Filter = (props) => {

  return (
    <div>
      <form onSubmit={props.handleFilterChange}>
        <div>
          rajaa näytettäviä: <input value={props.newFilter} onChange={props.handleFilterChange}/>
        </div>
      </form>
    </div>
  )
}
export default Filter