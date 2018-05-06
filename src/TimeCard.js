import React from 'react'
import styled from 'react-emotion'
import Moment from 'react-moment'

import { Card, CardHeader, CardTitle, CardBody } from './Card'

const TimeCard = ({ next }) => (
  <Card>
    <CardHeader image='time'>
      <CardTitle>When</CardTitle>
    </CardHeader>
    <CardBody>
      <Time>
        <Moment format='MM/DD/YYYY'>{next.toString()}</Moment>
      </Time>
      <Time>
        <Moment format='HH:mm A'>{next.toString()}</Moment>
      </Time>
    </CardBody>
  </Card>
)

export default TimeCard

const Time = styled('h3')`
  font-size: 36px;
  font-weight: 300;

`
