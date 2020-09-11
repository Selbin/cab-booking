import React from 'react'
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api'
import { defaultCenter, mapStyles, apiKey, icon } from '../helper/mapConstants'

// map component
const MapComponent = (props) => {
  return (
    <LoadScript googleMapsApiKey={apiKey}>
      <GoogleMap
        mapContainerStyle={mapStyles}
        zoom={13}
        center={defaultCenter}
      >
        {props.marker === null
          ? null
          : props.marker.map((marker, i) => {
            return (
              <Marker
                position={{ lat: Number(marker.lat), lng: Number(marker.lon) }}
                key={i}
                icon={icon}
                title={marker.color}
              />
            )
          })}
      </GoogleMap>
    </LoadScript>
  )
}

export default MapComponent
