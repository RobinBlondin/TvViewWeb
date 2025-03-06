import React from "react";
import { Button, Container, Typography, Paper, Box } from "@mui/material";

const LoginFailed: React.FC = () => {
    const handleClick = () => {
        window.location.href = "/";
    }

    return (
        <Container maxWidth="sm">
            <Paper elevation={3} sx={{ padding: 4, textAlign: "center", marginTop: 6 }}>
                <Box mb={2}>
                    <Typography variant="h4" color="error" fontWeight="bold">
                        Login Failed
                    </Typography>
                    <Typography variant="body1" color="textSecondary" mt={1}>
                        You are not authorized to access this site. Reload the site and try again!
                    </Typography>
                </Box>
                <Button 
                    variant="contained" 
                    color="primary" 
                    onClick={handleClick} 
                    sx={{ marginTop: 2 }}
                >
                    🔄 Try Again
                </Button>
            </Paper>
        </Container>
    );
};

export default LoginFailed;
