import React from 'react'
import LabeledInputfield from './LabeledInputfield'

const InputForm = ({ handleSubmit, fields }) => (
    <form onSubmit={handleSubmit}>
      {
        fields.map(field => (
          <LabeledInputfield key={field.name} 
                              name={field.name} 
                              value={field.value} 
                              onChange={field.handleChange} />
        ))
      }
      <div>
        <button type="submit">Add</button>
      </div>
    </form>
  )
  
  export default InputForm