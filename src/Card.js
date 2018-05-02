import React, { Component } from 'react'
import styled from 'react-emotion'
import firebase from 'firebase'

class ConnectedCard extends Component {
  state = {
    loading: true,
    items: {}
  }

  componentDidMount = () => {
    const me = this
    const ref = firebase.database().ref(this.props.subject.toLowerCase())
    ref.on('value', function (snapshot) {
      me.setState({ loading: false, items: snapshot.val() || {} })
    })
  }

  render () {
    const { items, loading } = this.state
    const subject = this.props.subject

    return (
      <Card>
        <CardHeader image={subject.toLowerCase()}>
          <CardTitle>{subject}</CardTitle>
        </CardHeader>
        <CardBody>
          {loading ? (
            <div>Loading...</div>
          ) : (
            <ItemList>
              {Object.keys(items).length ? (
                Object.keys(items).map((key) => <Item key={key}>{items[key]}</Item>)
              ) : (
                <Item>No {subject.toLowerCase()} added yet.</Item>
              )}
            </ItemList>
          )}
        </CardBody>
        <CardFooter>
          <NewItem onClick={() => addItem(subject.toLowerCase())}>+</NewItem>
        </CardFooter>
      </Card>
    )
  }
}

export default ConnectedCard

const addItem = (to) => {
  const ref = firebase.database().ref(to)
  ref.push('Frog legs')
}

const NewItem = styled('button')`
  background: none;
  border: none;
  font-family: 'Cabin Sketch', cursive;
  color: rgba(255,255,255,1);
  font-size: 48px;
  height: 30px;
  margin-top: -20px;
  margin-bottom: 10px;
  line-height: 40px;
  padding: 0 10px;
`

const ItemList = styled('ul')`
  list-style-type: none;
`
const Item = styled('li')`
  @media(min-width: 1000px) {
    font-size: 24px;
  }
`

const CardFooter = styled('div')`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
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
