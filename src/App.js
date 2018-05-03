import React, { Component } from 'react'

import styled from 'react-emotion'
import Moment from 'react-moment'
import moment from 'moment'

import firebase, { auth, provider } from './firebase'
import ConnectedCard from './Card'
import Calendar from './Calendar'
import './style.css'

class App extends Component {
  state = { loading: true, upcoming: true, next: null, pendingNext: null, user: null }
  componentDidCatch = (error, info) => {
    console.log({ error, info })
  }

  componentDidMount = async () => {
    const nextEventRef = firebase.database().ref('nextEvent')

    auth.onAuthStateChanged(async (user) => {
      if (user) {
        console.log({ user })
        const userRef = firebase.database().ref('users').child(user.uid)
        const snapshot = await userRef.once('value')
        const saved = snapshot.val()
        console.log({ saved })
        const record = {
          email: user.email,
          name: user.displayName,
          photo: user.photoURL,
          admin: saved ? saved.admin || false : false
        }
        await userRef.set(record)
        this.setState({ user: record })
      }
    })

    nextEventRef.on('value', (snapshot) => {
      const next = new Date(snapshot.val())
      const now = new Date()
      this.setState({
        upcoming: next > now,
        next: next,
        loading: false
      })
    })
  }

  setNextEvent = (date) =>
    firebase
      .database()
      .ref('nextEvent')
      .set(this.state.pendingNext ? this.state.pendingNext.toString() : moment().toString())

  clearEvent = () => firebase.database().ref('nextEvent').remove()

  login = () => {
    auth.signInWithPopup(provider).then((result) => {
      console.log(result)
      const user = result.user
      firebase.database().ref('users').child(user.uid).set(
        {
          email: user.email,
          name: user.displayName,
          photo: user.photoURL
        },
        this.setState({ user })
      )
    })
  }

  logout = () => {
    auth.signOut().then(() => {
      this.setState({ user: null })
    })
  }

  render () {
    return this.state.loading ? (
      <Splash />
    ) : (
      <Main>
        <AppBar>
          <Greeting>{this.state.user ? `Hello, ${this.state.user.name}!` : null}</Greeting>
          <Title>Am I Smoking</Title>
          {this.state.user ? (
            <CabinButton onClick={this.logout}>Log Out</CabinButton>
          ) : (
            <CabinButton onClick={this.login}>Log In</CabinButton>
          )}
        </AppBar>
        {this.state.user &&
        this.state.user.admin && (
          <Scheduler>
            <Calendar onChange={(date) => this.setState({ pendingNext: date })} />
            <ScheduleButtons>
              <CabinButton onClick={this.clearEvent}>Clear</CabinButton>
              <CabinButton onClick={this.setNextEvent}>Schedule</CabinButton>
            </ScheduleButtons>
          </Scheduler>
        )}
        {this.state.upcoming ? (
          <Cards>
            <Card>
              <CardHeader image='time'>
                <CardTitle>When</CardTitle>
              </CardHeader>
              <CardBody>
                <Time>
                  <Moment format='MM/DD/YYYY'>{this.state.next.toString()}</Moment>
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

const Greeting = styled('h4')`
    font-size: 24px;
    font-weight: 200;
    display: flex;
    align-items: center;
    justify-content: center;
    color: rgba(255,255,255,.7);
    margin-left: 30px;
`

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
  font-family: 'Oswald', sans-serif;
  font-size: 24px;
  background: none;
  color: white;
  border: none;
  padding: 0 10px;
  margin-left: 20px;

  :hover {
    text-decoration: underline;
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
  text-align: center;

  @media(max-width: 367px) {
    font-size: 36px;
  }
`

const AppBar = styled('div')`
  display: grid;
  grid-template-columns: 1fr 3fr 1fr;
  padding-top: 5px;
  padding-bottom: 5px;
  background-color: #424242;
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
