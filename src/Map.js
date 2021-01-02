import React from 'react'
import  {MapContainer,TileLayer} from "react-leaflet"
import {showOnData} from "./util"
//import  TileLayer from "react-leaflet"
import "./Map.css"
function Map({countryMap,caseTypes,zoom,center}) {
  
    return (
        <div className="map">
            <MapContainer center={center} zoom={zoom}>
              <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              {showOnData(countryMap,caseTypes)}
            </MapContainer>
        </div>
    ) 
}

export default Map
