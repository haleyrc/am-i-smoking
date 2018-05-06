import React from 'react'
import styled from 'react-emotion'

import Calendar from './Calendar'

const Scheduler = ({ onChange, onClear, onSchedule }) => (
  <StyledScheduler>
    <Calendar onChange={onChange} />
    <ScheduleButton onClick={onClear}>Clear</ScheduleButton>
    <ScheduleButton onClick={onSchedule}>Schedule</ScheduleButton>
  </StyledScheduler>
)

export default Scheduler

const StyledScheduler = styled('div')`
  display: grid;
  grid-template-columns: 8fr 1fr 1fr;
  padding: 0 20px;
  margin-top: 20px;

  @media (max-width: 859px) {
    grid-template-columns: 1fr;
    grid-row-gap: 20px;
  }
`

const ScheduleButton = styled('button')`
  font-size: 24px;

  @media (max-width: 859px) {
    border: 2px solid rgba(255, 255, 255, 0.7);
    padding: 10px;
  }
`
