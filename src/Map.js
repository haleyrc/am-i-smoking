import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { GoogleApiWrapper } from 'google-maps-react'
import styled from 'react-emotion'

import config from './config'

class MapContainer extends Component {
  componentDidMount () {
    this.loadMap()
  }

  componentDidUpdate () {
    this.loadMap()
  }

  loadMap () {
    if (this.props && this.props.google) {
      const { google } = this.props
      const maps = google.maps

      const mapRef = this.refs.map
      const node = ReactDOM.findDOMNode(mapRef)

      const mapConfig = {
        center: config.maps.location,
        zoom: 18,
        mapTypeId: 'satellite'
      }
      const map = new maps.Map(node, mapConfig)
      new google.maps.Marker({
        position: config.maps.location,
        map,
        title: config.maps.title
      })
    }
  }

  render () {
    return <Map ref='map'>loading map...</Map>
  }
}

const Map = styled('div')`
  height: 300px;
  width: calc(100% - 60px);
  margin: 30px 20px;
  display: flex;
  justify-content: center;
  align-items: center;
`

export default GoogleApiWrapper({ apiKey: config.maps.apiKey })(MapContainer)
