import React, { useState, useEffect } from 'react'
import './App.css'
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api'
const io = require('socket.io-client')
const socket = io('http://localhost:8000')
let tempMarker = ''

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
    setMarker([...tempMarker, availableCab])
  })

  // map component
  const MapContainer = () => {
    const mapStyles = {
      height: '100vh',
      width: '100%'
    }

    const defaultCenter = { lat: 10.512915, lng: 76.22047 }

    return (
      <LoadScript googleMapsApiKey='AIzaSyCFj_B1Ic6pv9uB7OQlLU6OOa9gvdRlJus'>
        <GoogleMap
          mapContainerStyle={mapStyles}
          zoom={13}
          center={defaultCenter}
        >
          {}
          {marker === null
            ? null
            : marker.map((marker, i) => {
              return (
                <Marker
                  position={{ lat: Number(marker.lat), lng: Number(marker.lon) }}
                  key={i}
                  icon='favicon.ico'
                  title={marker.color}
                />
              )
            })}
        </GoogleMap>
      </LoadScript>
    )
  }

  return (
    <div className='App'>
      <MapContainer />
    </div>
  )
}

export default App
