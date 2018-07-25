import React, { Component } from 'react'
import moment from 'moment'
import Month from './Month'
import Snackbar from '@material-ui/core/Snackbar'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import './Calendar.css'

export default class Year extends Component {  
    constructor() {
        super()

        this.state = {
            year: moment().year(),
            startingDay: '',
            endingDay: '',
            betweenDays: [],
            open: false
        }
    }

    handleClick = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    selectStartingDay = (day) => {
        this.setState({
            startingDay: day
        })
        document.getElementById(day.startOf('day')._d).className = 'day firstDay'
    }
    
    selectEndingDay = (day) => {
        console.log(moment(day)._d.toDateString() <= moment(this.state.startingDay)._d.toDateString())
        console.log(moment(day)._d.toDateString(), '<=', moment(this.state.startingDay)._d.toDateString())
        if (moment(day)._d.toDateString() < moment(this.state.startingDay)._d.toDateString()) {
            this.handleClick()
        } else if (day < this.state.endingDay) {
            let unstyleArr = this.state.betweenDays.filter(date => date > day)
            unstyleArr.map(day => {
                document.getElementById(day.startOf('day')._d).className = 'day'
            })
            document.getElementById(this.state.endingDay.startOf('day')._d).className = 'day'
            document.getElementById(day.startOf('day')._d).className = 'day lastDay'
            this.setState({
                endingDay: day
            })
        } else {
            this.setState({
                endingDay: day
            })
            document.getElementById(day.startOf('day')._d).className = 'day lastDay'
            this.styleBetweenDates(moment(this.state.startingDay), day)
        }
    }

    styleBetweenDates = (start, end) => {
        let arr = []
        let date = start.add(1, 'days')
        while (date < end) {
            arr.push(moment(date))
            date.add(1, 'days')
        }
        this.setState({
            betweenDays: arr
        })
        arr.map(day => {
            document.getElementById(day.startOf('day')._d).className = 'day betweenDay'
        })
        date = this.state.startingDay
    }
    
    render() {
        let months = Array.apply(null, { length: 6 }).map(Number.call, Number).map((month, i) => {
            return (
                <Month
                    year={this.state.year}
                    month={moment().month(month + 4)}
                    key={`month${i}`}
                    selectStart={this.selectStartingDay}
                    selectEnd={this.selectEndingDay}
                    startingDay={this.state.startingDay}
                />
            )
        })
    return (
        <div className = 'scheduler'>
            {months}
            <Snackbar
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                open={this.state.open}
                autoHideDuration={6000}
                onClose={this.handleClose}
                ContentProps={{
                    'aria-describedby': 'message-id',
                }}
                message={<span id="message-id">Sorry, you can't choose that date!</span>}
                action={[
                    <IconButton
                        key="close"
                        aria-label="Close"
                        color="inherit"
                        onClick={this.handleClose}
                    >
                        <CloseIcon />
                    </IconButton>,
                ]}
            />
        </div>
    )
  }
}
