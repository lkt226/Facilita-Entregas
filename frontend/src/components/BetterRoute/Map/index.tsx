'use client';

import 'leaflet/dist/leaflet.css';

import React, { useRef, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Map, Icon } from 'leaflet';

import { useSelector } from 'react-redux';
import { RootState } from '@/app/store';

const defaultIcon = new Icon({
 iconUrl: '/marker.png',
 iconSize: [24,24]
})

export default function FakeMap () {
  const { loading, data: usersList, error } = useSelector((state: RootState) => state.client.orderedUsersList)
  const mapRef = useRef<Map>(null);

  const sorocaba = [-23.4969, -47.4558]

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (mapRef.current) {
        mapRef.current.setView([sorocaba[0], sorocaba[1]], 11);
      }
    }
  }, []);

  return (
    <>
      {
        typeof window !== 'undefined' && (
          <MapContainer
            center={[sorocaba[0], sorocaba[1]]}
            zoom={11}
            style={{ width: '100%', height: '100%' }}
          >
            
            {
              usersList.map((user, index) => (
                <Marker 
                  key={user.email} 
                  position={[
                    (user.coordinates[0] + sorocaba[0]), 
                    (user.coordinates[1] + sorocaba[1])
                  ]} 
                  icon={defaultIcon}
                >
                  <Popup>{ user.name } - { user.telphone }</Popup>
                </Marker>
              ))
            }
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
          </MapContainer>
        )
      }
    </>
  )
}