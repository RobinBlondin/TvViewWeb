import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import React from 'react';
import { DepartureModel } from '../../models/DepartureModel';

interface CommuteComponentProps {
    departures: DepartureModel[];
}

const CommuteComponent: React.FC<CommuteComponentProps> = ({departures}) => {
    
    const formatTimeAndCountMinutesLeft = (time: string) => {
        const now = new Date();
        const timeParts = time.split(":");
        const hours = parseInt(timeParts[0]);
        const minutes = parseInt(timeParts[1]);
        const departureTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hours, minutes);
        const diff = departureTime.getTime() - now.getTime();
        const minutesLeft = Math.floor(diff / 60000);
        return `${minutesLeft} min`;
    }

    const fixLineName = (line: string) => {
        const arr = line.split(" ");
        return arr[arr.length - 1];
    }


  return (
    <Box sx={{ width: "100%", height: "100%"}}>
        <TableContainer className="table-container" sx={{height: "100%", borderRadius: "0.3em 0.3em 0 0"}}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow sx={{width: "100%", height: "calc(100% / 6)", backgroundColor: "rgba(100, 250, 113, 0.7)", color: "#FFFFFF"}}>
                  <TableCell sx={{width: "20%", fontWeight: "bold"}}>Line</TableCell>
                  <TableCell sx={{width: "60%", fontWeight: "bold"}}>Destination</TableCell>
                  <TableCell sx={{width: "20%", fontWeight: "bold"}}>Time</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                { [0, 1, 2, 3, 4, 5].map((index) => (
                  
                  <TableRow sx={{backgroundColor: index % 2 === 0 ? "white" : "rgba(100, 250, 113, 0.7)", color: index % 2 === 0 ? "#000000" : "#FFFFFF", height: "calc(100% / 6)"}} key={index}>
                    <TableCell>{ departures[index]? fixLineName(departures[index].name) : "---"}</TableCell>
                    <TableCell>{departures[index] ? departures[index].direction : "---"}</TableCell>
                    <TableCell>
                        {departures[index]? formatTimeAndCountMinutesLeft(departures[index].time) : "---"}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
    </Box>
  )
}
    

export default CommuteComponent