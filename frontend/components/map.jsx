import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'

// import MarkerCluster from './MarkerCluster'

const position = [51.505, -0.09]
const mapStyle = { height: '90vh' }


const Map = (props) => {

  return (
    <MapContainer center={[51.505, -0.09]} zoom={13} scrollWheelZoom={false} style={{height: 400, width: "100%"}}>
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[51.505, -0.09]}>
        <Popup>
          Event Name: Hack Off <br></br>
          Event Start: 16 August 2022, 6am       <br></br>
          Event End: 16 August 2022, 9am           <br></br>   
          Event Capacity: 50    <br></br>
        </Popup>
      </Marker>
      <Marker position={[52.505, -0.09]}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
      {console.log(props.x)}
      {console.log(props.y)}
    </MapContainer>
  )
}

export default Map
