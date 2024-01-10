import { Grid, Typography } from "@mui/material";
import React from "react";
import './home.css'

const Homepage: React.FC = () => {

    return(

        <>
    
        <Grid
          container
          className='HomePage'
          style={{ height: '100vh' }}
          spacing={1}
          justifyContent="space-between" // Adjust alignment as needed
        >

        <Grid item xs={12} md={2} lg={4} xl={6} style={{}}>
            <div className="Category">
                <Typography      
                    sx={{
                    fontSize: { xs: '1rem', sm: '0.9rem', md: '0.9rem', lg: '1.1rem', xl: '1.2rem' },
                    color: '#007bff',
                    padding: '10px',
                    borderRadius: '5px',margin: '10px',
                    fontWeight: 'bold', textAlign: 'center',}}>
                    GENERAL LEDGER SYSTEM
                </Typography>

            </div>
   
            <div className="Category">
                <Typography      
                    sx={{
                    fontSize: { xs: '1rem', sm: '0.9rem', md: '0.9rem', lg: '1.1rem', xl: '1.2rem' },
                    color: '#007bff',
                    padding: '10px',
                    borderRadius: '5px',margin: '10px',
                    fontWeight: 'bold', textAlign: 'center',}}>
                    INVINTORY MANAGEMENT SYSTEM
                </Typography>

            </div>

            <div className="Category">
                <Typography      
                    sx={{
                    fontSize: { xs: '1rem', sm: '0.9rem', md: '0.9rem', lg: '1.1rem', xl: '1.2rem' },
                    color: '#007bff',
                    padding: '10px',
                    borderRadius: '5px',margin: '10px',
                    fontWeight: 'bold', textAlign: 'center',}}>
                    TREASURY MANAGEMENT SYSTEM
                </Typography>

            </div>

            <div className="Category">
                <Typography      
                    sx={{
                    fontSize: { xs: '1rem', sm: '0.9rem', md: '0.9rem', lg: '1.1rem', xl: '1.2rem' },
                    color: '#007bff',
                    padding: '10px',
                    borderRadius: '5px',margin: '10px',
                    fontWeight: 'bold', textAlign: 'center',}}>
                   POINT OF SALE SYSTEM
                </Typography>

            </div>


            <div className="Category">
                <Typography      
                    sx={{
                    fontSize: { xs: '1rem', sm: '0.9rem', md: '0.9rem', lg: '1.1rem', xl: '1.2rem' },
                    color: '#007bff',
                    padding: '10px',
                    borderRadius: '5px',margin: '10px',
                    fontWeight: 'bold', textAlign: 'center',}}>
                   SCHOOL BILLING SYSTEM
                </Typography>

            </div>

            <div className="Category">
                <Typography      
                    sx={{
                    fontSize: { xs: '1rem', sm: '0.9rem', md: '0.9rem', lg: '1.1rem', xl: '1.2rem' },
                    color: '#007bff',
                    padding: '10px',
                    borderRadius: '5px',margin: '10px',
                    fontWeight: 'bold', textAlign: 'center',}}>
                   PAYROLL MANAGEMENT SYSTEM
                </Typography>

            </div>


            <div className="Category">
                <Typography      
                    sx={{
                    fontSize: { xs: '1rem', sm: '0.9rem', md: '0.9rem', lg: '1.1rem', xl: '1.2rem' },
                    color: '#007bff',
                    padding: '10px',
                    borderRadius: '5px',margin: '10px',
                    fontWeight: 'bold', textAlign: 'center',}}>
                   BUDGETING MANAGEMENT SYSTEM
                </Typography>

            </div>
            </Grid>



        </Grid>
        </>
    )
}

export default Homepage;