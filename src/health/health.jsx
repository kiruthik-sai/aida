import { Stack, Grid, Container, Paper, Box, Button } from "@mui/material";
import { useState, useEffect } from "react";
import axios from "axios";
import { AddPlan } from "./addPlan";

export const TodaysReview = () => {
  return (
    <Container maxWidth='lg'>
      <Paper
        sx={{
          display: 'flex',
          marginTop: 2,
          borderRadius: '20px',
          backgroundColor: '#B6B9FF',
          height: '75px',
        }}
        elevation={0}
      >
        <Box
          sx={{
            marginTop: 2,
            marginLeft: 2,
            fontFamily: 'Poppins',
            fontSize: '1.3rem',
            fontWeight: 'bold',
          }}
        >
          Today's Review
        </Box>
        <Box>
          <Button>

          </Button>
        </Box>
      </Paper>
    </Container>
  );
}


export const AddAmedicationTab = ({setPage}) => {
  //Handle routing to add medication page
  return (
    <Container maxWidth='lg'>
      <Paper
        sx={{
          display: 'flex',
          marginTop: 2,
          borderRadius: '20px',
          backgroundColor: '#B6B9FF',
          height: '75px',
        }}
        elevation={0}
      >
        <Box
          sx={{
            marginTop: 2.5,
            marginLeft: 2,
            fontFamily: 'Poppins',
            fontSize: '1.1rem',
            fontWeight: 'bold',
          }}
          onClick={() => setPage('addPlan')}
        >
          Add a medication
        </Box>
        <Box
          style={{
            marginLeft: 'auto',
            marginTop: '10px',
            marginRight: '2%',
          }}
          onClick={() => setPage('addPlan')}
        >
          <svg
            width='61'
            height='52'
            viewBox='0 0 61 52'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <g clip-path='url(#clip0_6_2570)'>
              <path
                d='M27.9583 23.8333V10.8333H33.0416V23.8333H48.2916V28.1667H33.0416V41.1667H27.9583V28.1667H12.7083V23.8333H27.9583Z'
                fill='#6B6EAB'
              />
            </g>
            <defs>
              <clipPath id='clip0_6_2570'>
                <rect
                  width='61'
                  height='52'
                  fill='white'
                />
              </clipPath>
            </defs>
          </svg>
        </Box>
      </Paper>
    </Container>
  );
}

export const MedicationCard = ({ medicationName, medicationDosage, medicationTime}) => {
  const [status, setStatus] = useState('');
  useEffect(() => {
    const currentDate = new Date();
    const currentHour = currentDate.getHours();
    const currentMinute = currentDate.getMinutes();
    const medicationDate = new Date(medicationTime);
    const medicationHour = medicationTime.split(':')[0];
    const medicationMinute = medicationTime.split(':')[1];
    if (currentHour > parseInt(medicationHour)) {
      setStatus('Taken');
    } else{
      setStatus('Pending');
    }
  }, [medicationTime]);

  return (
    <Container maxWidth='lg'>
      <Paper
        sx={{
          display: 'flex',
          marginTop: 2,
          borderRadius: '20px',
          backgroundColor: '#F8F8F6',
          height: '75px',
        }}
        elevation={0}
      >
        <Grid
          container
          spacing={1}
        >
          <Grid
            item
            xs={3}
          >
            <Box
              sx={{
                marginTop: 2.5,
                marginLeft: 2,
                marginBottom: 2.5,
              }}
            >
              <svg
                width='30'
                height='30'
                viewBox='0 0 30 30'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <g clip-path='url(#clip0_89_95)'>
                  <path
                    d='M27.6678 2.31253C24.5826 -0.770966 19.5642 -0.770966 16.4791 2.31253L9.95605 8.83554L17.3619 16.2414C18.8862 14.9721 20.8187 14.1774 22.9525 14.1774C24.1764 14.1774 25.3411 14.4316 26.4008 14.8856L27.6678 13.5014C30.7521 10.417 30.7521 5.39778 27.6678 2.31253Z'
                    fill='#9B9B9B'
                  />
                  <path
                    d='M16.1293 17.4947L8.71312 10.0786L2.32886 16.4691C-0.755454 19.5534 -0.755454 24.5727 2.32886 27.6579C5.414 30.7412 10.491 30.8 13.5762 27.7164L14.8704 26.416C14.4165 25.3563 14.1622 24.1916 14.1622 22.9677C14.1623 20.8887 14.9181 19.0014 16.1293 17.4947Z'
                    fill='#9B9B9B'
                  />
                  <path
                    d='M15.9202 22.9677C15.9202 26.5504 18.6092 29.4742 22.0734 29.9113V16.024C18.6092 16.4611 15.9202 19.3849 15.9202 22.9677Z'
                    fill='#9B9B9B'
                  />
                  <path
                    d='M23.8313 16.024V29.9113C27.2955 29.4742 29.9845 26.5504 29.9845 22.9676C29.9845 19.3849 27.2955 16.4611 23.8313 16.024Z'
                    fill='#9B9B9B'
                  />
                </g>
                <defs>
                  <clipPath id='clip0_89_95'>
                    <rect
                      width='30'
                      height='30'
                      fill='white'
                    />
                  </clipPath>
                </defs>
              </svg>
            </Box>
          </Grid>
          <Grid
            item
            xs={6}
          >
            <Box
              sx={{
                marginTop: 1,
                fontFamily: 'Poppins',
                fontSize: '0.9rem',
                fontWeight: 'bold',
              }}
            >
              {`${medicationName} - ${medicationDosage}`}
            </Box>
            <Box
              sx={{
                marginTop: 0.75,
                fontFamily: 'Poppins',
                fontSize: '0.9rem',
                fontWeight: 'bold',
                color: '#9B9B9B',
              }}
            >
              {medicationTime}
            </Box>
          </Grid>
          <Grid
            item
            xs={3}
          >
            <Box
              sx={{
                marginTop: 3,
                fontFamily: 'Poppins',
                fontSize: '1.3rem',
                fontWeight: 'bold',
                color: '#9B9B9B',
                marginRight: 2.5,
              }}
            >
              {status}
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
}

const uid = 'some-uid';

const numberToDay = (number) => {
  switch (number) {
    case 0:
      return 'SUN';
    case 1:
      return 'MON';
    case 2:
      return 'TUE';
    case 3:
      return 'WED';
    case 4:
      return 'THU';
    case 5:
      return 'FRI';
    case 6:
      return 'SAT'
    default:
      return 'Sunday';
  }
};


const fetchAllData = async () => {
  try{
    const currentDate = new Date();
    const currentDay = numberToDay(currentDate.getDay());
    const response = await axios.get(`http://35.153.51.197/get-data-by-day/${uid}/${currentDay}`);
    return response.data;
  } catch (e) {
    return null;
  }
 
};

export const HealthReview = ({setPage}) => {
  const [todaysData, setTodaysData] = useState(null);
  useEffect(() => {
    fetchAllData().then((data) => {
      setTodaysData(data);
    });
  }, []);
  return (
    <Container maxWidth='sm'>
      <Stack>
        <Box
          sx={{
            fontFamily: 'Poppins',
            fontSize: '1.5rem',
            justifyContent: 'left',
            fontWeight: 'bold',
          }}
        >
          Medicine Logs
        </Box>

        <TodaysReview />
        <AddAmedicationTab 
          setPage={setPage}
        />
        <Box
          sx={{
            fontFamily: 'Poppins',
            fontSize: '1.5rem',
            justifyContent: 'left',
            fontWeight: 'bold',
            marginTop: 2,
          }}
        >
          Daily Review
        </Box>
   
            {todaysData && todaysData.map((element) => {
              return(
              <MedicationCard
                medicationName={element.Name}
                medicationDosage={element.Dosage}
                medicationTime={element.Time}
                />
            )
            })}
      </Stack>
    </Container>
  );
};

export const Health = () => {
  const [ page , setPage ] = useState('health');
  switch (page) {
    case 'health':
      return (
        <div className="helth"> 
        <HealthReview 
          setPage={setPage}
        />
        </div>
      );
    case 'addPlan':
      return (
        <div className="helth"> 
        <AddPlan 
          setPage={setPage}
        />
        </div>
      );
    default:
      return (
        <div className="helth"> 
        <HealthReview 
          setPage={setPage}
        />
        </div>
      );
  }
};