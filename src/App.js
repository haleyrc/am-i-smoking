import React, {Component} from 'react'

import styled from 'react-emotion'

import './style.css'

class App extends Component {
  state = {
    loading: true
  }

  componentDidMount = () => {
    setTimeout(() => this.setState({
      loading: false
    }, () => console.log(this.state)), 2000)
  }

  render() {
    return this.state.loading
      ? <Splash/>
      : (
        <Main>
          <Title>Am I Smoking</Title>
          <Cards>
            <Card>
              <CardHeader image="time">
                <CardTitle>When</CardTitle>
              </CardHeader>
              <CardBody>
                <Time>10:00 AM</Time>
              </CardBody>
            </Card>
            <Card>
              <CardHeader image="meat">
                <CardTitle>Meat</CardTitle>
              </CardHeader>
              <CardBody>
                <ItemList>
                  <Item>Pork loin</Item>
                  <Item>Sweet Italian sausage</Item>
                  <Item>Hot Italian sausage</Item>
                </ItemList>
              </CardBody>
            </Card>
            <Card>
              <CardHeader image="sides">
                <CardTitle>Sides</CardTitle>
              </CardHeader>
              <CardBody>
                <ItemList>
                  <Item>Stuffed peppers</Item>
                  <Item>Rosemary garlic potatoes</Item>
                  <Item>Sauteed onions</Item>
                </ItemList>
              </CardBody>
            </Card>
            <Card>
              <CardHeader image="beer">
                <CardTitle>Beer</CardTitle>
              </CardHeader>
              <CardBody>
                <ItemList>
                  <Item>Guiness</Item>
                  <Item>Samoa This</Item>
                  <Item>Busch Lite</Item>
                </ItemList>
              </CardBody>
            </Card>
          </Cards>
        </Main>
      )
  }
}

export default App

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

const ItemList = styled('ul')`
  list-style-type: none;
`
const Item = styled('li')`
  @media(min-width: 1000px) {
    font-size: 24px;
  }
`

const CardBody = styled('div')`
  padding-top: 20px;
  padding-bottom: 20px;
  color: white;
  font-size: 20px;
  display: flex;
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
`

const CardHeader = styled('div')`
  background-color: #424242;
  background: url('${props => `images/${props.image}.jpg`}');
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
`

const Main = styled('div')`
  padding-bottom: 30px;
  display: flex;
  flex-direction: column;
  flex: 1;
`