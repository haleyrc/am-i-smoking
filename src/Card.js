import React, { Component } from 'react'
import styled from 'react-emotion'
import firebase from 'firebase'

import { Context } from './App'

class ConnectedCard extends Component {
    state = {
        loading: true,
        items: {},
        ref: null
    }

    componentDidMount = () => {
        console.log(`${this.props.subject} mounted`)
        const ref = firebase.database().ref(this.props.subject.toLowerCase())
        ref.on('value', (snapshot) => {
            this.setState({ ref, loading: false, items: snapshot.val() || {} }, () =>
                console.log(`${this.props.subject} loaded from firebase`)
            )
        })
    }

    componentWillUnmount = () => {
        this.state.ref.off('value')
    }

    removeItem = (key) => {
        this.state.ref.child(key).remove()
    }

    addItem = () => {
        const item = prompt(
            `What ${this.props.subject.toLowerCase()} would you like to add?`,
            ''
        )
        if (item == null || item === '') {
            return
        }
        this.state.ref.push(item)
    }

    render() {
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
                                    Object.keys(items).map((key) => (
                                        <Context.Consumer key={key}>
                                            {(user) => (
                                                <Item
                                                    key={key}
                                                    onClick={() =>
                                                        user && user.admin && this.removeItem(key)}
                                                >
                                                    {items[key]}
                                                </Item>
                                            )}
                                        </Context.Consumer>
                                    ))
                                ) : (
                                        <Item>No {subject.toLowerCase()} added yet.</Item>
                                    )}
                            </ItemList>
                        )}
                </CardBody>
                <CardFooter>
                    <Context.Consumer>
                        {(user) => {
                            console.log('context user:', user)
                            return (
                                user &&
                                user.admin && <NewItem onClick={this.addItem}>+</NewItem>
                            )
                        }}
                    </Context.Consumer>
                </CardFooter>
            </Card>
        )
    }
}

export default ConnectedCard

export const CardBody = styled('div') `
  padding-top: 20px;
  padding-bottom: 20px;
  color: white;
  font-size: 24px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex: 1;
`

export const Card = styled('div') `
  background-color: #212121;
  box-shadow: 0 10px 10px rgba(0, 0, 0, .26);
  display: flex;
  flex-direction: column;
`

export const CardHeader = styled('div') `
  background-color: #424242;
  background: url('${(props) => `images/${props.image}_sm.jpg`}');
  background-size: cover;
  background-position: center;
`

export const CardTitle = styled('h2') `
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

const NewItem = styled('button') `
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

const ItemList = styled('ul') `
  list-style-type: none;
`

const Item = styled('li') `
  @media(min-width: 1000px) {
    font-size: 24px;
  }
`

const CardFooter = styled('div') `
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
`
