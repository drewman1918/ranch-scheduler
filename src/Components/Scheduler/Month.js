import React, { Component } from 'react'
import moment from 'moment'
import Day from './Day'

export default class Month extends Component {    
    render() {
        let { year, month } = this.props
        let monthIndex = month.month()
        let monthName = month.format('MMMM YYYY')
        
        let firstDayOfMonth = month.date(1).day()
        let daysInMonth = month.daysInMonth()
        // let lastDayOfMonth = month.date(daysInMonth).day()

        let beginningFillerDays = Array.apply(null, { length: firstDayOfMonth }).map(Number.call, Number).map((x) => {
            return (
                <div key ={`beginningFiller${x}${monthIndex}`} className = "fillerDay"></div>
            )
        })
        
        let monthDays = Array.apply(null, { length: daysInMonth }).map(Number.call, Number).map((x) => {
            return (
                <Day
                    key={`monthDay${x}${monthIndex}`}
                    day={x + 1}
                    date={moment().year(year).month(monthIndex).date(x + 1)}
                    selectStart={this.props.selectStart}
                    selectEnd={this.props.selectEnd}
                    startingDay={this.props.startingDay}
                />
            )
        })
        
        // let endingFillerDays = Array.apply(null, { length: 6 - lastDayOfMonth }).map(Number.call, Number).map((x) => {
        //     return (
        //         <div key={`endingFiller${x}${monthIndex}`} className="fillerDay"></div> 
        //     )
        // })
        
        let daysArray = ['Sun', 'Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat']
        let daysOfWeek = daysArray.map((day, i) => {
            return (
                <div key={`dayOfWeek${i}${monthIndex}`} className="dayOfWeek">{day}</div>
            )
        })
    return (
        <div className='month'>
            <div className="monthHeader">
                {monthName}
            </div>

            <div className="monthDays">
                {daysOfWeek}
                {beginningFillerDays}
                {monthDays}
                {/* {endingFillerDays} */}
            </div>

        </div>
    )
  }
}
