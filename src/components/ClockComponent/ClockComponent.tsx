import { Container } from '@mui/material'
import React, { useEffect, useState } from 'react'

const ClockComponent: React.FC = () => {
    const [currentTime, setCurrentTime] = useState<String>()
    
    const updateTime = () => {
        const now = new Date();
        const hour = now.getHours().toString();
        const minute = now.getMinutes().toString()

        return `${hour}:${minute.length == 1? "0" + minute : minute}`
    }

    useEffect(() => {
        setInterval(() => {
            setCurrentTime(updateTime())
        }, 1000)
    }, [])
 
    
    return (
        <Container 
            className="clock-main-container"
            sx={{ 
                display: "flex", 
                alignItems: "center", 
                justifyContent: "center",
                height: "100%",
                width: "100%",
                padding: "0 !important"
            }}
        >
            <Container 
                className="clock-time-container"
                sx={{ textAlign: "center", color: "white", fontSize: "5em", fontWeight: "600", padding: "0 !important" }}
            >
                { currentTime }
            </Container>
        </Container>
  )
}

export default ClockComponent
