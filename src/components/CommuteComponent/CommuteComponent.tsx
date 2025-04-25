import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { DepartureModel } from '../../models/DepartureModel';
import './CommuteComponent.css'

interface CommuteComponentProps {
    departures: DepartureModel[];
}

const CommuteComponent: React.FC<CommuteComponentProps> = ({departures}) => {
    const [filteredDepartures, setFilteredDepartures] = useState<DepartureModel[]>([]);

    useEffect(() => {
      const filtered = departures.filter((dep) => parseInt(formatTimeAndCountMinutesLeft(dep.time).split(" ")[0]) > 0
      );

      setFilteredDepartures(filtered)
    }, [])
    
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
    <Box className="commute-container">
        <TableContainer className="table-container">
            <Table className="table" aria-label="simple table">
              <TableHead>
                <TableRow className="table-row title-row">
                  <TableCell className="table-cell table-cell-title">Line</TableCell>
                  <TableCell className="table-cell table-cell-title destination">Destination</TableCell>
                  <TableCell className="table-cell table-cell-title">Time</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                { [0, 1, 2, 3, 4].map((index) => (
                  <TableRow className="table-row" sx={{backgroundColor: index % 2 === 0 ? "white" : "rgba(100, 250, 113, 0.7)", color: index % 2 === 0 ? "#000000" : "#FFFFFF"}} key={index}>
                    <TableCell className="table-cell">{ filteredDepartures[index]? fixLineName(filteredDepartures[index].name) : "---"}</TableCell>
                    <TableCell className="table-cell">{filteredDepartures[index] ? filteredDepartures[index].direction : "---"}</TableCell>
                    <TableCell className="table-cell">
                        {filteredDepartures[index]? formatTimeAndCountMinutesLeft(filteredDepartures[index].time) : "---"}
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