import { Container } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { CalendarEventModel } from '../../models/CalendarEventModel'
import { getAllCalendarEvents } from '../../service/calendarService'
import './CalendarComponent.css'

const CalendarComponent: React.FC = () => {
  const [events, setEvents] = useState<CalendarEventModel[]>()
  const [eventsMap, setEventsMap] = useState<Map<number, CalendarEventModel[]>>(new Map())

  useEffect(() => {
    const fetchEvents = async () => {
      const events = await getAllCalendarEvents()
      setEvents(events)
    }
    fetchEvents()
    const interval = setInterval(fetchEvents, 1000 * 60 * 5)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    if(events) {
      const eventsMap = new Map()
      events.forEach((event) => {
        const date = new Date(event.startTime)
        const dateKey = date.getDay()
        if(eventsMap.has(dateKey)) {
          const events = eventsMap.get(dateKey)
          events?.push(event)
          eventsMap.set(dateKey, events)
        } else {
          eventsMap.set(dateKey, [event])
        }
      })
      setEventsMap(eventsMap)
    }
  }, [events])

  const getDatesOfCurrentWeekFromSundayToSaturday = () => {
    const dates = []
    const today = new Date()
    const day = today.getDay()
    const diff = today.getDate() - day
    for (let i = 0; i < 7; i++) {
      const date = new Date(today)
      date.setDate(diff + i)
      dates.push(date)
    }
    return dates
  }

  const getEventColor = (index: number) => {
    const colors = [
      'rgba(46, 134, 222, 0.85)',
      'rgba(40, 180, 99, 0.85)',
      'rgba(175, 122, 197, 0.85)',
      'rgba(231, 76, 60, 0.85)',
      'rgba(23, 165, 137, 0.85)',
    ];
    return colors[index % colors.length];
  };

  return (
    <Container className="calendar-container">
        <Container className="days-container">
            <Container className="day">S</Container>
            <Container className="day">M</Container>
            <Container className="day">T</Container>
            <Container className="day">W</Container>
            <Container className="day">T</Container>
            <Container className="day">F</Container>
            <Container className="day">S</Container>
        </Container>
        <Container className="dates-container">
            {
                getDatesOfCurrentWeekFromSundayToSaturday().map((date, index) => {
                    return (
                        <Container key={index} className="date">
                          {date.getDate() === new Date().getDate() ?
                          <Container className='marked-date'>{date.getDate()}</Container> : date.getDate()}
                        </Container>
                    )
                })
            }
        </Container>
        <Container className="events-container">
              {
              getDatesOfCurrentWeekFromSundayToSaturday().map((_, i) => {
                return (
                  <Container key={i} className="events">
                    {
                      eventsMap.get(i)?.map((event, j) => {
                        return (
                          <Container 
                            key={j} 
                            className="event" 
                            sx={{ background: getEventColor(i-j) }} lang="sv"
                          >
                            <Container className="event-time">{new Date(event.startTime).toTimeString().substring(0, 5)}</Container>
                            <Container className="event-title">{event.title}</Container>
                          </Container>
                        )
                      })
                    }
                  </Container>
                )
              }
              )
            }
        </Container>
    </Container>
  )
}

export default CalendarComponent