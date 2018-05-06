import React from 'react'
import styled from 'react-emotion'

const AppBar = ({ user, onLogout, onLogin }) => (
  <AppBarGrid>
    <Greeting>
      {user ? <Avatar src={user.photo} /> : null}
      {user ? <Hello>Hello, {user.name}!</Hello> : null}
    </Greeting>
    <Title>Am I Smoking</Title>
    {user ? (
      <AuthButton onClick={onLogout}>Log Out</AuthButton>
    ) : (
      <AuthButton onClick={onLogin}>Log In</AuthButton>
    )}
  </AppBarGrid>
)

export default AppBar

const Hello = styled('span')`
  @media (max-width: 859px) {
    display: none;
  }
`
const Avatar = styled('img')`
  height: 40px;
  width: 40px;
  border-radius: 20px;
  margin-right: 10px;

  @media (max-width: 470px) {
    display: none;
  }
`
const AppBarGrid = styled('div')`
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  padding: 5px 20px;
  padding-bottom: 5px;
  background-color: #424242;
`

const Greeting = styled('h4')`
  font-size: 24px;
  font-weight: 200;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  color: rgba(255, 255, 255, .7);
`

const AuthButton = styled('button')`
  font-size: 24px;
  text-align: right;
  color: rgba(255, 255, 255, .7);

  @media (max-width: 550px) {
    grid-column: 1 / -1;
    grid-row: 2 / 2;
    text-align: center;
    border-top: 1px solid rgba(255, 255, 255, .5);
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
