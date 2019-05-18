import React from 'react'

const Notification = ({ successMessage, errorMessage }) => {
  if (successMessage !== null) {
    return (
      <div className="successMessage">
        {successMessage}
      </div>
    )
  } else if (errorMessage !== null) {
    return (
      <div className="errorMessage">
        {errorMessage}
      </div>
    )
  } else {
    return null
  }
}

export default Notification