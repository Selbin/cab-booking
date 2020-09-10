import React from 'react'
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api'

// map component
const MapComponent = (props) => {
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
        {props.marker === null
          ? null
          : props.marker.map((marker, i) => {
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

export default MapComponent
