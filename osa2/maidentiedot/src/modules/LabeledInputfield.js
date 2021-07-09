import React from 'react'

const LabeledInputfield = ({name, value, onChange}) => (
    <div>
      {name}: <input value={value} onChange={onChange} />
    </div>
  )

export default LabeledInputfield