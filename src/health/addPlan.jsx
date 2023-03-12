import { Stack, Grid, Container, Paper, Box, Button, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import Select, { SelectProps } from 'react-dropdown-select';
import './health.css'
import axios from "axios";

const AddMedicine = ({setMedicineName, medicineName}) => {
  return (
    <>
      <Container maxWidth='sm'>
        <Stack spacing={2}>
          <Box
            sx={{
              marginTop: 3,
              fontFamily: 'Poppins',
              fontSize: '1rem',
              fontWeight: 'bold',
            }}
          >
            Add a Medication
          </Box>
          <Paper
            sx={{
              marginTop: 2,
              borderRadius: '5px',
              backgroundColor: '#F8F8F6',
              width: '100%',
              height: '75px',
              border: '0.5px solid #000000',
            }}
            elevation={0}
          >
            <Box
              sx={{
                marginTop: 2.5,
                marginLeft: 2,
                fontFamily: 'Poppins',
                columnCount: 2,
              }}
            >
              <Grid
                container
                spacing={5}
              >
                <Grid
                  item
                  xs={2}
                >
                  <Box
                    sx={{
                      marginTop: '1',
                      marginLeft: '1',
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
                      marginTop: '1',
                      justifyContent: 'right',
                    }}
                  >
                    <input
                      type='text'
                      placeholder='Medication Name'
                      value={medicineName}
                      onChange={(e) => {
                        setMedicineName(e.target.value);
                      }}
                      style={{
                        border: '0px solid #9B9B9B',
                        background: '#F8F8F6',
                        borderRadius: '5px',
                        fontFamily: 'Poppins',
                        fontWeight: 'bold',
                        height: '30px',
                        width: '250px',
                        marginLeft: '2',
                      }}
                    />
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Paper>
        </Stack>
      </Container>
    </>
  );
};

const LengthOfMedication = ({ dosage, setDosage, schedule, setScheduleTmp} ) => {
  const [numberOfPills, setNumberOfPills] = useState('');
  const [numberOfDays, setNumberOfDays] = useState('');
  const [selectSchedule, setSelectSchedule] = useState()
  const options = [
    {
      value: 0,
      label: 'Everyday',
    },
    {
      value: 1,
      label: 'Sunday',
    },
    {
      value: 2,
      label: 'Monday',
    },
    {
      value: 3,
      label: 'Tuesday',
    },
    {
      value: 4,
      label: 'Wednesday',
    },
    {
      value: 5,
      label: 'Thursday',
    },
    {
      value: 6,
      label: 'Friday',
    },
    {
      value: 7,
      label: 'Saturday',
    },
  ];
  useEffect(() => {
    setScheduleTmp(numberOfDays)
  }, [selectSchedule])
  return (
    <>
      <Box class-name='LengthOfMedication'>
        <Stack spacing={1}>
          <Box
            sx={{
              marginTop: 2,
              fontFamily: 'Poppins',
              fontSize: '1rem',
              fontWeight: 'bold',
              marginLeft: 1.5,
            }}
          >
            Length of Medication
          </Box>
          <Grid
            container
            spacing={2}
          >
            <Grid
              item
              xs={5}
            >
              <Paper
                sx={{
                  display: 'flex',
                  borderRadius: '5px',
                  backgroundColor: '#F8F8F6',
                  height: '60px',
                  width: '100%',
                  border: '0.5px solid #000000',
                }}
                elevation={0}
              >
                <Grid
                  container
                  spacing={1}
                >
                  <Grid
                    item
                    xs={7}
                  >
                    <Box
                      sx={{
                        marginTop: 2,
                        marginLeft: 1.5,
                        width: '100%',
                      }}
                    >
                      <input
                        type='number'
                        value={numberOfPills}
                        onChange={(e) => {
                          if (!/[0-9]/.test(e.target.value)) return;
                          setNumberOfPills(e.target.value);
                          setDosage(Number(e.target.value));
                        }}
                        style={{
                          width: '70px',
                          height: '20px',
                          marginTop: 1,
                          marginLeft: 1,
                          borderRadius: '5px',
                          fontFamily: 'Poppins',
                          fontSize: '1rem',
                          background: '#F8F8F6',
                          borderWidth: '0px',
                        }}
                      />
                    </Box>
                  </Grid>
                  <Grid
                    item
                    xs={2}
                  >
                    <Box
                      sx={{
                        marginTop: 2,
                        fontFamily: 'Poppins',
                        fontSize: '0.8rem',
                        fontWeight: 'bold',
                        textAlign: 'center',
                      }}
                    >
                      {' mg'}
                    </Box>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
            <Grid
              item
              xs={7}
            >
              <Paper
                sx={{
                  display: 'flex',
                  borderRadius: '5px',
                  backgroundColor: '#F8F8F6',
                  height: '60px',
                  width: '90%',
                  border: '0.5px solid #000000',
                }}
                elevation={0}
              >
                <Grid
                  container
                  spacing={2}
                >
                  <Grid
                    item
                    xs={6}
                  >
                    <Box
                      sx={{
                        marginTop: 1.5,
                        marginLeft: 2,
                        fontFamily: 'Poppins',
                        width: '150px',
                      }}
                    >
                      <Select
                        options={options}
                        placeholder='Repeat'
                        onChange={(e) =>{
                          e.map((item) => {
                            
                            setScheduleTmp(item.label)
                          })
                        }
                        }
                        color='#C2C5FF'
                        multi={false}
                        values={[]}
                      />
                    </Box>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
          </Grid>
        </Stack>
      </Box>
    </>
  );
};


const FoodnPills = ({food, setFood} ) => {
  const [selectedColor, setSelectedColor] = useState({
    before: 'transparent',
    with: 'transparent',
    after: 'transparent',
  });
  const handleClick = (s ) => {
    if (s === 'before') {
      setSelectedColor({
        before: '#C2C5FF',
        with: 'transparent',
        after: 'transparent',
      });
      setFood('before');
    } else if (s === 'with') {
      setSelectedColor({
        before: 'transparent',
        with: '#C2C5FF',
        after: 'transparent',
      });
      setFood('with');
    } else if (s === 'after') {
      setSelectedColor({
        before: 'transparent',
        with: 'transparent',
        after: '#C2C5FF',
      });
      setFood('after');
    }
    console.log(food);
  };


  return (
    <>
      <Box>
        <Stack spacing={2}>
          <Box
            sx={{
              marginTop: 2,
              fontFamily: 'Poppins',
              fontSize: '1rem',
              fontWeight: 'bold',
              marginLeft: 1.5,
            }}
          >
            Food & Pills
          </Box>

          <Container maxWidth='sm'>
            <Box class-name='FoodnPills'>
              <Grid
                container
                spacing={3}
              >
                <Grid
                  item
                  xs={4}
                >
                  <Box
                    sx={{
                      borderRadius: '10%',
                    }}
                  >
                    <button
                      onClick={() => handleClick('before')}
                      style={{
                        background: selectedColor.before,
                        borderRadius: '10%',
                        border: 'none',
                      }}
                    >
                      <svg
                        width='91'
                        height='71'
                        viewBox='0 0 91 71'
                        fill='none'
                        xmlns='http://www.w3.org/2000/svg'
                      >
                        <path
                          d='M62.8499 10C49.1257 10 38 20.5401 38 33.5419C38 46.5437 49.1257 57.0838 62.8499 57.0838C76.5741 57.0838 87.6997 46.5437 87.6997 33.5419C87.6997 20.5401 76.5741 10 62.8499 10ZM62.8497 51.405C52.4529 51.405 43.9944 43.3917 43.9944 33.542C43.9944 23.6924 52.4529 15.6791 62.8497 15.6791C73.2465 15.6791 81.7051 23.6924 81.7051 33.542C81.7051 43.3917 73.2467 51.405 62.8497 51.405Z'
                          fill='#9B9B9B'
                        />
                        <path
                          d='M62.6002 21.0269C54.9138 21.0269 48.6604 26.8025 48.6604 33.9018C48.6604 41.0011 54.9138 46.7768 62.6002 46.7768C70.2866 46.7768 76.54 41.0011 76.54 33.9018C76.54 26.8025 70.2867 21.0269 62.6002 21.0269Z'
                          fill='#9B9B9B'
                        />
                        <path
                          d='M28.293 30.2613C30.2236 29.1812 31.5139 27.2229 31.5139 24.9859L30.5577 10.5455C30.5211 9.99508 30.0272 9.56592 29.43 9.56592C28.7842 9.56592 28.2697 10.0656 28.3018 10.661L28.9236 22.2423C28.9236 22.8934 28.3521 23.421 27.6475 23.421C26.9427 23.421 26.3714 22.8931 26.3714 22.2423L26.0607 10.6658C26.0442 10.054 25.5026 9.56605 24.8399 9.56605C24.1772 9.56605 23.6357 10.0541 23.6191 10.6658L23.3084 22.2423C23.3084 22.8934 22.7369 23.421 22.0323 23.421C21.3275 23.421 20.7561 22.8931 20.7561 22.2423L21.378 10.661C21.41 10.0654 20.8951 9.56592 20.2497 9.56592C19.6526 9.56592 19.1586 9.99508 19.1222 10.5455L18.1655 24.986C18.1655 27.223 19.4557 29.1812 21.3864 30.2614C22.6429 30.9643 23.3433 32.2785 23.1814 33.627C22.0915 42.6994 21.3513 57.5109 21.3513 59.1243C21.3513 61.4679 22.9132 63.3678 24.8397 63.3678C26.7663 63.3678 28.3281 61.4678 28.3281 59.1243C28.3281 57.5109 27.5878 42.6994 26.4981 33.627C26.336 32.2791 27.0372 30.9639 28.293 30.2613Z'
                          fill='#9B9B9B'
                        />
                        <ellipse
                          cx='4.00433'
                          cy='35.2048'
                          rx='3.15789'
                          ry='2.91667'
                          fill='#9B9B9B'
                        />
                      </svg>
                    </button>
                  </Box>
                </Grid>
                <Grid
                  item
                  xs={4}
                >
                  <Box
                    sx={{
                      borderRadius: '10%',
                    }}
                  >
                    <button
                      onClick={() => {
                        handleClick('with');
                      }}
                      style={{
                        background: selectedColor.with,
                        borderRadius: '10%',
                        border: 'none',
                      }}
                    >
                      <svg
                        width='91'
                        height='71'
                        viewBox='0 0 91 71'
                        fill='none'
                        xmlns='http://www.w3.org/2000/svg'
                      >
                        <path
                          d='M64.5772 1.89677C50.2129 1.89677 38.5684 15.4006 38.5684 32.0584C38.5684 48.7162 50.2129 62.2201 64.5772 62.2201C78.9415 62.2201 90.5861 48.7162 90.5861 32.0584C90.5861 15.4006 78.9415 1.89677 64.5772 1.89677ZM64.5771 54.9444C53.6953 54.9444 44.8423 44.6778 44.8423 32.0586C44.8423 19.4394 53.6953 9.17281 64.5771 9.17281C75.4588 9.17281 84.3118 19.4394 84.3118 32.0586C84.3118 44.6778 75.459 54.9444 64.5771 54.9444Z'
                          fill='#9B9B9B'
                        />
                        <path
                          d='M64.5771 15.3073C56.6123 15.3073 50.1323 22.8218 50.1323 32.0585C50.1323 41.2951 56.6123 48.8097 64.5771 48.8097C72.542 48.8097 79.022 41.2951 79.022 32.0585C79.022 22.8218 72.5422 15.3073 64.5771 15.3073Z'
                          fill='#9B9B9B'
                        />
                        <path
                          d='M11.0806 27.3217C13.0811 25.9165 14.4182 23.3685 14.4182 20.458L13.4273 1.67008C13.3894 0.953937 12.8776 0.395569 12.2588 0.395569C11.5896 0.395569 11.0564 1.04572 11.0897 1.82039L11.7341 16.8885C11.7341 17.7356 11.1418 18.422 10.4117 18.422C9.6814 18.422 9.08932 17.7352 9.08932 16.8885L8.76736 1.82662C8.75033 1.0306 8.18908 0.395747 7.50235 0.395747C6.81563 0.395747 6.25453 1.03078 6.23735 1.82662L5.91539 16.8885C5.91539 17.7356 5.32315 18.422 4.59302 18.422C3.86273 18.422 3.27065 17.7352 3.27065 16.8885L3.91504 1.82039C3.94817 1.04537 3.41468 0.395569 2.7459 0.395569C2.12713 0.395569 1.61527 0.953937 1.57754 1.67008L0.586182 20.4582C0.586182 23.3687 1.92312 25.9165 3.92378 27.3219C5.22575 28.2364 5.95159 29.9462 5.78378 31.7008C4.65437 43.5046 3.88743 62.7753 3.88743 64.8745C3.88743 67.9237 5.50584 70.3956 7.5022 70.3956C9.49856 70.3956 11.117 67.9236 11.117 64.8745C11.117 62.7753 10.3499 43.5046 9.22062 31.7008C9.05266 29.9471 9.77927 28.2359 11.0806 27.3217Z'
                          fill='#9B9B9B'
                        />
                        <ellipse
                          cx='25.8717'
                          cy='33.7534'
                          rx='3.27231'
                          ry='3.79479'
                          fill='#9B9B9B'
                        />
                      </svg>
                    </button>
                  </Box>
                </Grid>
                <Grid
                  item
                  xs={4}
                >
                  <Box
                    sx={{
                      borderRadius: '10%',
                    }}
                  >
                    <button
                      onClick={() => {
                        handleClick('after');
                      }}
                      style={{
                        background: selectedColor.after,
                        borderRadius: '10%',
                        border: 'none',
                      }}
                    >
                      <svg
                        width='90'
                        height='70'
                        viewBox='0 0 90 70'
                        fill='none'
                        xmlns='http://www.w3.org/2000/svg'
                      >
                        <path
                          d='M25.5444 1.50113C39.6522 1.50113 51.0889 15.0049 51.0889 31.6628C51.0889 48.3206 39.6522 61.8244 25.5444 61.8244C11.4366 61.8244 -6.38153e-05 48.3206 -6.38153e-05 31.6628C-6.38153e-05 15.0049 11.4366 1.50113 25.5444 1.50113ZM25.5446 54.5487C36.232 54.5487 44.927 44.2822 44.927 31.6629C44.927 19.0437 36.232 8.77717 25.5446 8.77717C14.8571 8.77717 6.16215 19.0437 6.16215 31.6629C6.16215 44.2822 14.8569 54.5487 25.5446 54.5487Z'
                          fill='#9B9B9B'
                        />
                        <path
                          d='M25.5445 14.9116C33.3672 14.9116 39.7314 22.4262 39.7314 31.6628C39.7314 40.8995 33.3672 48.414 25.5445 48.414C17.7218 48.414 11.3576 40.8995 11.3576 31.6628C11.3576 22.4262 17.7217 14.9116 25.5445 14.9116Z'
                          fill='#9B9B9B'
                        />
                        <path
                          d='M62.0667 26.9262C60.1019 25.5209 58.7887 22.9729 58.7887 20.0625L59.7619 1.27452C59.7991 0.558368 60.3018 0 60.9096 0C61.5669 0 62.0905 0.650155 62.0578 1.42483L61.4249 16.4929C61.4249 17.34 62.0066 18.0264 62.7237 18.0264C63.441 18.0264 64.0225 17.3396 64.0225 16.4929L64.3387 1.43105C64.3554 0.635034 64.9066 0.000177783 65.5811 0.000177783C66.2556 0.000177783 66.8066 0.635212 66.8235 1.43105L67.1397 16.4929C67.1397 17.34 67.7214 18.0264 68.4385 18.0264C69.1557 18.0264 69.7372 17.3396 69.7372 16.4929L69.1044 1.42483C69.0718 0.649799 69.5958 0 70.2526 0C70.8603 0 71.3631 0.558368 71.4001 1.27452L72.3738 20.0626C72.3738 22.9731 71.0607 25.5209 69.0958 26.9263C67.8171 27.8408 67.1042 29.5506 67.269 31.3052C68.3782 43.109 69.1315 62.3798 69.1315 64.4789C69.1315 67.5282 67.542 70 65.5812 70C63.6205 70 62.031 67.528 62.031 64.4789C62.031 62.3798 62.7844 43.109 63.8935 31.3052C64.0585 29.5515 63.3448 27.8403 62.0667 26.9262Z'
                          fill='#9B9B9B'
                        />
                        <ellipse
                          cx='3.21388'
                          cy='3.79479'
                          rx='3.21388'
                          ry='3.79479'
                          transform='matrix(-1 0 0 1 90 29.5631)'
                          fill='#9B9B9B'
                        />
                      </svg>
                    </button>
                  </Box>
                </Grid>
              </Grid>
              <Grid
                container
                spacing={2}
              >
                <Grid
                  item
                  xs={4}
                >
                  <Box
                    sx={{
                      justifyContent: 'center',
                      alignItems: 'center',
                      display: 'flex',
                      fontFamily: 'Poppins',
                    }}
                  >
                    Before
                  </Box>
                </Grid>
                <Grid
                  item
                  xs={4}
                >
                  <Box
                    sx={{
                      justifyContent: 'center',
                      alignItems: 'center',
                      display: 'flex',
                      fontFamily: 'Poppins',
                    }}
                  >
                    With
                  </Box>
                </Grid>
                <Grid
                  item
                  xs={4}
                >
                  <Box
                    sx={{
                      justifyContent: 'center',
                      alignItems: 'center',
                      display: 'flex',
                      fontFamily: 'Poppins',
                    }}
                  >
                    After
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Container>
        </Stack>
      </Box>
    </>
  );
};

const TimeInput = ({value, setValue}) => {
  useEffect(() => {
    console.log(value);
  }, [value]);

  return (
    <Container maxWidth='sm'>
      <Stack spacing={2}>
        <Box
          sx={{
            marginTop: 2,
            fontFamily: 'Poppins',
            fontSize: '1rem',
            fontWeight: 'bold',
            marginLeft: -1,
          }}
        >
          Notification
        </Box>
        <Box
          sx={{
            backgroundColor: '#F5F5F5',
            height: '50px',
            borderRadius: '10px',
          }}
        >
          <Grid
            container
            spacing={2}
          >
            <Grid
              item
              xs={2}
            >
              <Box
                sx={{
                  marginTop: '6px',
                  marginLeft: '10px',
                }}
              >
                <svg
                  width='32'
                  height='35'
                  viewBox='0 0 32 35'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <g clip-path='url(#clip0_6_2098)'>
                    <path
                      d='M29.1223 28.7259H3.41699V25.9111H4.70226V16.1029C4.70226 9.08276 9.88188 3.39261 16.2697 3.39261C22.6574 3.39261 27.8371 9.08276 27.8371 16.1029V25.9111H29.1223V28.7259ZM13.0565 30.1334H19.4828C19.4828 31.0665 19.1443 31.9615 18.5417 32.6213C17.9391 33.2812 17.1218 33.6519 16.2697 33.6519C15.4175 33.6519 14.6002 33.2812 13.9976 32.6213C13.395 31.9615 13.0565 31.0665 13.0565 30.1334Z'
                      fill='#9B9B9B'
                    />
                  </g>
                  <defs>
                    <clipPath id='clip0_6_2098'>
                      <rect
                        width='30.8464'
                        height='33.7778'
                        fill='white'
                        transform='translate(0.846436 0.577789)'
                      />
                    </clipPath>
                  </defs>
                </svg>
              </Box>
            </Grid>
            <Grid
              item
              xs={2}
            >
              <Box>
                <input
                  type='time'
                  value={value}
                  onChange={(e) => {
                    setValue(e.target.value);
                    setValue(e.target.value);
                  }}
                  style={{
                    background: 'none',
                    fontFamily: 'Poppins',
                    fontSize: '1rem',
                    fontWeight: 'bold',
                    marginLeft: '10px',
                    width: '200px',
                    marginTop: '10px',
                    border: '0px solid #9B9B9B',
                    borderRadius: '5px',
                  }}
                />
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Stack>
    </Container>
  );
}

export const fullWeekNameToShortName = (fullWeekName) => {
  console.log(fullWeekName);
  switch (fullWeekName) {
    case 'Monday':
      return 'MON';
    case 'Tuesday':
      return 'TUE';
    case 'Wednesday':
      return 'WED';
    case 'Thursday':
      return 'THU';
    case 'Friday':
      return 'FRI';
    case 'Saturday':
      return 'SAT';
    case 'Sunday':
      return 'SUN';
    default:
      return ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];
  }
};

const uid = 'some-uid';

export const AddPlan = ({setPage} ) => {
  const [medicineName, setMedicineName] = useState('');
  const [dosage, setDosage] = useState(0);
  const [frequency, setFrequency] = useState();
  const [food, setFood] = useState('');
  const [notification, setNotification] = useState('15:53');
  useEffect(() => {
    console.log(medicineName);
    console.log(dosage);
    console.log(frequency);
  }, [medicineName, dosage, frequency, food, notification]);
  const HandleSubmit = () => {
    let data = {
                user_id: uid,
                name: medicineName,
                when: food,
                dosage: dosage,
                weekly: [
                  fullWeekNameToShortName(frequency)
                ],
                freq: dosage,
                time: notification,
              }
    axios.post('http://35.153.51.197/log-med', data).then((res) => {
       setPage('health');
    });
  };

  const handleButtonClick = () => {
    setPage('health');
  };
  return (
    <div
    style={
      {
        maxWidth: '400px',
        marginBottom: 100,
      }
    }
    >
    <Container maxWidth='sm'>
      <Stack spacing={2}>
        <Grid
          container
          spacing={2}
        >
          <Grid
            item
            xs={4}
          >
            <button
              className='BackButton'
              onClick={handleButtonClick}
              style={{
                border: 'none',
                background: 'none',
              }}
            >
              <svg
                width='81'
                height='75'
                viewBox='0 0 81 75'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <rect
                  width='81'
                  height='75'
                  rx='14'
                  fill='#F8F8F6'
                />
                <g clip-path='url(#clip0_6_2010)'>
                  <path
                    d='M33.4598 35.9375H54V39.0625H33.4598L42.5115 47.4438L40.1254 49.6531L27 37.5L40.1254 25.3469L42.5115 27.5563L33.4598 35.9375Z'
                    fill='#9B9B9B'
                  />
                </g>
                <defs>
                  <clipPath id='clip0_6_2010'>
                    <rect
                      width='40.5'
                      height='37.5'
                      fill='white'
                      transform='translate(20.25 18.75)'
                    />
                  </clipPath>
                </defs>
              </svg>
            </button>
          </Grid>
          <Grid
            item
            xs={8}
          >
            <Box
              sx={{
                marginTop: 3,
                fontFamily: 'Poppins',
                fontSize: '1.3rem',
                fontWeight: 'bold',
              }}
            >
              Add Plan
            </Box>
          </Grid>
        </Grid>
        <Box>
          <AddMedicine
            medicineName={medicineName}
            setMedicineName={setMedicineName}
          />
          <LengthOfMedication
            dosage={dosage}
            setDosage={setDosage}
            schedule={frequency}
            setScheduleTmp={setFrequency}
          />
          <FoodnPills
            food={food}
            setFood={setFood}
          />
          <TimeInput
            value={notification}
            setValue={setNotification}
          />
        </Box>
        <Box
          sx={{
            marginTop: 1,
            height: '50px',
            backgroundColor: '#6B6EAB',
            borderRadius: '10px',
          }}
          onClick={HandleSubmit}
        >
          <div
            style={{
              marginTop: '10px',
              color: 'white',
              fontFamily: 'Poppins',
              textAlign: 'center',
            }}
          >
            Done
          </div>
        </Box>
      </Stack>
    </Container>
    </div>
  );
};
