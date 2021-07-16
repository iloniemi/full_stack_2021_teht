import React from 'react'
import LabeledInputfield from './LabeledInputfield'

const Filter = ({ value, onChange }) => (
    <LabeledInputfield name='Filter with'
                        value={value}
                        onChange={onChange} />
  )

  export default Filter