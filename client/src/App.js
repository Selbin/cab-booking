import React, { useState, useEffect } from 'react'
import io from 'socket.io-client'
import './App.css'
import MapComponent from './component/MapComponent'

const socket = io('http://localhost:8000')
let tempMarker

function App () {
  const [marker, setMarker] = useState(null)

  useEffect(() => {
    socket.on('list vehicle', cabList => {
      tempMarker = cabList
      setMarker(cabList)
    })
  }, [])

  // listen to book trip event and update marker
  socket.on('book trip', unavailableCab => {
    tempMarker = tempMarker.filter(
      cab => cab.cab_id !== unavailableCab.cabInfo.cab_id
    )
    setMarker(tempMarker)
  })

  // listen to end trip event and update marker
  socket.on('end trip', availableCab => {
    tempMarker = [...tempMarker, availableCab]
    setMarker(tempMarker)
  })
  return (
    <div className='App'>
      <MapComponent marker={marker} />
    </div>
  )
}

export default App
