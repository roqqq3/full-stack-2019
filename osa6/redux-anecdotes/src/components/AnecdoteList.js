import React from 'react'
import { connect } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = (props) => {

  const vote = (id) => {
    props.voteAnecdote(id)
    props.setNotification('You voted ' + props.anecdotes.find(i => i.id === id).content, 3)
  }

  return (
    <div>
      <h2>Anecdotes</h2>
      {props.anecdotesToShow.sort((a, b) => b.votes - a.votes).map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

const mapDispatchToProps = {
  setNotification,
  voteAnecdote
}

const mapStateToProps = (state) => {
  // joskus on hyödyllistä tulostaa mapStateToProps:ista...
  return {
    anecdotes: state.anecdotes,
    filter: state.filter,
    anecdotesToShow: state.anecdotes.filter(i => i.content.toLowerCase().includes(state.filter.toLowerCase()))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AnecdoteList)