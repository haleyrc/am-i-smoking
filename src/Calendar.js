import React, { Component } from 'react'
import DatePicker from 'react-datepicker'
import moment from 'moment'

import 'react-datepicker/dist/react-datepicker.css'

class Calendar extends Component {
  state = {
    startDate: moment()
  }

  handleChange = (date) => {
    this.setState({ startDate: date }, () => this.props.onChange(date))
  }

  render () {
    return (
      <DatePicker
        showTimeSelect
        selected={this.state.startDate}
        onChange={this.handleChange}
      />
    )
  }
}

export default Calendar
