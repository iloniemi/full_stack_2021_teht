import React, { useState, useEffect } from 'react'
import { UsageState } from 'webpack';
import LabeledInputfield from './modules/LabeledInputfield'

function App() {

  const [searchtext, setSearchtext] = UsageState('')

  const handleChangeSearchtext = (event) => (setSearchtext(event.target.value))

  return (
    <p>jou</p>
    //<LabeledInputfield name='Find countries' value={searchtext} onChange={handleChangeSearchtext} />
  )
}

export default App;
