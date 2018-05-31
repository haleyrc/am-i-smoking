import React, { Component } from 'react'
import moment from 'moment'
import styled from 'react-emotion'

import firebase, { auth, provider } from './firebase'
import ConnectedCard from './Card'
// import Map from './Map'
import AppBar from './AppBar'
import Scheduler from './Scheduler'
import TimeCard from './TimeCard'

import './style.css'

export const Context = React.createContext()

class App extends Component {
  state = {
    loading: true,
    upcoming: true,
    next: null,
    pendingNext: null,
    user: null
  }

  componentDidCatch = (error, info) => {
    console.log({ error, info })
  }

  componentDidMount = async () => {
    auth.onAuthStateChanged(async lastUser => {
      if (lastUser) {
        const userRef = firebase
          .database()
          .ref('users')
          .child(lastUser.uid)
        userRef.on('value', snapshot => {
          this.setState({ user: snapshot.val() })
        })
      }
    })

    const nextEventRef = firebase.database().ref('nextEvent')
    nextEventRef.on('value', snapshot => {
      const next = new Date(snapshot.val())
      const now = new Date()
      this.setState({
        upcoming: moment(next).isAfter(moment(now).startOf('day')),
        next: next,
        loading: false
      })
    })
  }

  setNextEvent = date =>
    firebase
      .database()
      .ref('nextEvent')
      .set(this.state.pendingNext ? this.state.pendingNext.toString() : moment().toString())

  clearEvent = () =>
    firebase
      .database()
      .ref('nextEvent')
      .remove()

  login = async () => {
    const result = await auth.signInWithPopup(provider)
    let user = await firebase
      .database()
      .ref('users')
      .child(result.user.uid)
      .once('value')

    if (!user.val()) {
      if (!result.user.emailVerified) {
        return
      }

      await firebase
        .database()
        .ref('users')
        .child(result.user.uid)
        .set({
          email: result.user.email,
          name: result.user.displayName,
          photo: result.user.photoURL,
          admin: false,
          friend: false
        })

      user = await firebase
        .database()
        .ref('users')
        .child(result.user.uid)
        .once('value')
    }

    this.setState({ user: user.val() })
  }

  logout = () => auth.signOut().then(() => this.setState({ user: null }))

  render() {
    const { loading, user, upcoming, next } = this.state
    return loading ? (
      <Splash />
    ) : (
      <Context.Provider value={this.state.user}>
        <Main>
          <AppBar user={user} onLogout={this.logout} onLogin={this.login} />
          {user &&
            user.admin && (
              <Scheduler
                startDate={next}
                onChange={date => this.setState({ pendingNext: date })}
                onClear={this.clearEvent}
                onSchedule={this.setNextEvent}
              />
            )}
          {(user && user.admin) || upcoming ? (
            <React.Fragment>
              <Cards>
                <TimeCard next={next.toString()} />
                <ConnectedCard subject="Meat" />
                <ConnectedCard subject="Sides" />
                <ConnectedCard subject="Beer" />
              </Cards>
              {/* {user && user.friend && <Map />} */}
            </React.Fragment>
          ) : (
            <Notice>No Upcoming Smoking Events</Notice>
          )}
        </Main>
      </Context.Provider>
    )
  }
}

export default App

const Notice = styled('div')`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2em;
`

const Splash = styled('div')`
  height: 100vh;
  background: url('images/splash_sm.jpg');
  background-size: cover;
  background-position: center;
  filter: blur(10px);
`

const Cards = styled('div')`
  display: grid;
  flex-direction: 1fr;
  padding: 0 20px;
  margin-top: 20px;
  grid-gap: 20px;

  @media (min-width: 860px) {
    grid-template-columns: 1fr 1fr;
  }
`

const Main = styled('div')`
  padding-bottom: 30px;
  display: flex;
  flex-direction: column;
  flex: 1;
`
