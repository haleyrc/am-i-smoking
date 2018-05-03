import React, { Component } from 'react'

import styled from 'react-emotion'
import firebase from 'firebase'
import Moment from 'react-moment'
import moment from 'moment'

import ConnectedCard from './Card'
import Calendar from './Calendar'
import './style.css'

class App extends Component {
  state = { loading: true, upcoming: true, next: null, pendingNext: null }
  componentDidCatch = (error, info) => {
    console.log({ error, info })
  }

  componentDidMount = () => {
    const ref = firebase.database().ref('nextEvent')
    ref.on('value', (snapshot) => {
      const next = new Date(snapshot.val())
      const now = new Date()
      this.setState({
        upcoming: next > now,
        next: next,
        loading: false,
        ref
      })
    })
  }

  setNextEvent = (date) =>
    this.state.ref.set(
      this.state.pendingNext
        ? this.state.pendingNext.toString()
        : moment().toString()
    )

  clearEvent = () => this.state.ref.remove()

  render () {
    return this.state.loading ? (
      <Splash />
    ) : (
      <Main>
        <Title>Am I Smoking</Title>
        <Scheduler>
          <Calendar onChange={(date) => this.setState({ pendingNext: date })} />
          <ScheduleButtons>
            <CabinButton onClick={this.clearEvent}>Clear</CabinButton>
            <CabinButton onClick={this.setNextEvent}>Schedule</CabinButton>
          </ScheduleButtons>
        </Scheduler>
        {this.state.upcoming ? (
          <Cards>
            <Card>
              <CardHeader image='time'>
                <CardTitle>When</CardTitle>
              </CardHeader>
              <CardBody>
                <Time>
                  <Moment format='MM/DD/YYYY'>
                    {this.state.next.toString()}
                  </Moment>
                </Time>
                <Time>
                  <Moment format='HH:mm A'>{this.state.next.toString()}</Moment>
                </Time>
              </CardBody>
            </Card>
            <ConnectedCard subject='Meat' />
            <ConnectedCard subject='Sides' />
            <ConnectedCard subject='Beer' />
          </Cards>
        ) : (
          <div>No Upcoming Smoking Events</div>
        )}
      </Main>
    )
  }
}

export default App

const Scheduler = styled('div')`
  display: flex;
  flex-direction: row;
  padding: 20px 60px;
  justify-content: space-between;

  & > :first-child {
    flex: 1;
  }
`

const ScheduleButtons = styled('div')`
  display: flex;
  flex-direction: row;
`

const CabinButton = styled('button')`
  font-family: 'Cabin Sketch', cursive;
  font-size: 24px;
  background: none;
  border: 3px solid white;
  color: white;
  padding: 5px 5px;
  border-radius: 10px;
  margin-left: 20px;

  :hover {
    background: #424242;
    cursor: pointer;
  }
`

const Splash = styled('div')`
  height: 100vh;
  background: url('images/splash.jpg');
  background-size: cover;
  background-position: center;
  filter: blur(10px);
`

const Time = styled('h3')`
  font-size: 36px;
  font-weight: 300;

`

const Cards = styled('div')`
  display: flex;
  flex-direction: column;
  flex: 1;

  @media (min-width: 800px) {
    flex-flow: row wrap;
    justify-content: center;
  }
`

const CardBody = styled('div')`
  padding-top: 20px;
  padding-bottom: 20px;
  color: white;
  font-size: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex: 1;
`

const Card = styled('div')`
  margin-left: 20px;
  margin-right: 20px;
  margin-top: 30px;
  background-color: #212121;
  box-shadow: 0 10px 10px rgba(0, 0, 0, .26);
  display: flex;
  flex-direction: column;

  @media(min-width: 800px) {
    width: calc(50% - 80px);
    min-width: calc(50% - 80px);
  }
`

const Title = styled('h1')`
  font-family: 'Cabin Sketch', cursive;
  font-weight: 700;
  color: rgba(255,255,255,.7);
  font-size: 52px;
  text-transform: uppercase;
  display: flex;
  justify-content: center;
  alignItems: center;
  padding-top: 5px;
  padding-bottom: 5px;
  background-color: #424242;
  @media(max-width: 367px) {
    font-size: 36px;
  }
`

const CardHeader = styled('div')`
  background-color: #424242;
  background: url('${(props) => `images/${props.image}.jpg`}');
  background-size: cover;
  background-position: center;
`

const CardTitle = styled('h2')`
  font-family: 'Cabin Sketch', cursive;
  color: rgba(255,255,255,1);
  font-size: 48px;
  background-color: rgba(33,33,33,.7);
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 10px;
  padding-bottom: 10px;
    
  @media(min-width: 1000px) {
    padding-top: 20px;
    padding-bottom: 20px;
  }

  @media(max-width: 367px) {
    font-size: 24px;
  }
`

const Main = styled('div')`
  padding-bottom: 30px;
  display: flex;
  flex-direction: column;
  flex: 1;
`
