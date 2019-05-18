import React from 'react'

const Filter = (props) => {
  return (
    <div>
      <form onSubmit={props.handleFilterChange}>
        <div>
          find countries: <input value={props.newFilter} onChange={props.handleFilterChange}/>
        </div>
      </form>
    </div>
  )
}
export default Filter