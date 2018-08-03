import React, { Component } from 'react'
import moment from 'moment'
import Month from './Month'
import Snackbar from '@material-ui/core/Snackbar'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import Arrow from '@material-ui/icons/ArrowRightAlt'
import Check from '@material-ui/icons/Done'
import Clear from '@material-ui/icons/Clear'
import Visit from './../Visit/Visit'
import './Calendar.css'

export default class Year extends Component {  
    constructor() {
        super()

        this.state = {
            year: moment().year(),
            startingDay: '',
            endingDay: '',
            betweenDays: [],
            open: false,
            visit: false
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
        if (moment(day).format('x') <= moment(this.state.startingDay).format('x')) {
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

    clearDates = () => {
        document.getElementById(this.state.startingDay.startOf('day')._d).className = 'day'
        if (this.state.endingDay !== '') {
            document.getElementById(this.state.endingDay.startOf('day')._d).className = 'day'
            this.state.betweenDays.map(day => {
                document.getElementById(day.startOf('day')._d).className = 'day'
            }) 
        }
        this.setState({
            startingDay: '',
            endingDay: '',
            betweenDays: []
        })
    }

    openVisit = () => {
        this.setState({
            visit: true
        })
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
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
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
            
            {(this.state.startingDay !== '') ?
                <div className="tripDetails">
                    <IconButton
                        onClick={this.clearDates}
                    >
                        <Clear
                            style={{
                                color: '#fff',
                                height: '30px',
                                width: '30px'
                            }}
                        />
                    </IconButton>

                    <div className="datesDisplay">
                        {this.state.startingDay.format('MM/DD/YYYY')}
                        <Arrow
                            style={{
                                padding: '0px 5px'
                            }}
                        />
                        {(this.state.endingDay !== '') ?
                            this.state.endingDay.format('MM/DD/YYYY')
                            :
                            null
                    }
                    </div>

                    {(this.state.endingDay !== '') ?
                        <IconButton
                            onClick={this.openVisit}
                        >
                            <Check
                                style={{
                                    color: '#fff',
                                    height: '30px',
                                    width: '30px'
                                }}
                            />
                        </IconButton>
                        :
                        null}
    
                </div>
                :
                null
            }
            {(this.state.visit) ? <Visit/> : null}
        </div>
    )
  }
}
