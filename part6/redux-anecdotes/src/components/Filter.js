import React from 'react'
import { connect } from 'react-redux'
import { filterChange } from '../reducers/filterReducer'

const Filter = (props) => {
  const filterSelected = event => {
    props.filterChange(event.target.value)
  }

  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      filter <input type="text" name="filter"
      onChange={filterSelected} />
    </div>
  )
}

const ConnectedFilter = connect(null, { filterChange })(Filter)
export default ConnectedFilter