import React, { Component } from 'react'
import DatePicker from 'react-datepicker'
import moment from 'moment'

import 'react-datepicker/dist/react-datepicker.css'

class Calendar extends Component {
  state = {
    startDate: null
  }

  componentDidMount = () => {
    const { startDate } = this.props
    const next = moment(startDate)
    const now = moment()

    console.log({ next: next.toString(), now: now.toString(), isAfter: next.isAfter(now) })
    next.isAfter(now) ? this.handleChange(next) : this.handleChange(now)
  }

  handleChange = date => {
    this.setState({ startDate: date }, () => this.props.onChange(date))
  }

  render() {
    return (
      <DatePicker
        withPortal
        showTimeSelect
        selected={this.state.startDate}
        onChange={this.handleChange}
      />
    )
  }
}

export default Calendar
