import { Avatar, Box, Button, Chip, Container, Divider, Grid, Link, Paper, Stack, Tooltip, Typography } from '@mui/material';
import React from 'react'
import { Chart } from "react-google-charts";
import { signOut, deleteUser } from '../../store/actions/userActions';

const paperStyle = { 
  height: 'auto', 
  p: '20px', 
  display: 'flex',
  flexDirection: 'column',
}

const chartOptions = {
  pieHole: 0.6,
  is3D: false,
  pieSliceText: "label",
  backgroundColor: 'transparent',
  legend: { position: 'none' },
  fontName: 'Roboto',
  chartArea:{left:0,top:10, width:'100%'}
}

const GridItem = ({ title, children, cols }) => (
  <Grid container item md={cols}>
    <Paper sx={paperStyle}>
      { title && <Typography variant='h5'>{title}</Typography> }
      <Box sx={{ p: 1 }}>
        {children}
      </Box>
    </Paper>
  </Grid>
)

const getData = photos => {
  const tagCountMap = new Map();
  photos.forEach(({ tags }) => {
    tags.forEach(tag => {
      const currVal = tagCountMap.get(tag)
      tagCountMap.set(tag, (currVal && currVal + 1) || 1)
    })
  })
  const pieChartData = [ ["Tag", "Photos tagged"], ...Array.from(tagCountMap) ]

  const maxTagFromChart = pieChartData.reduce(
    (currMax, currVal) => {
      return (currVal.value > currMax.value) ?
        currVal : currMax;
    }, 
    // Initial comparison
    {
      title: 'None',
      value: 0
    }
  );
   
  // Convert from piechart data
  const mostCommonTag = {
    tag: maxTagFromChart.title,
    count: maxTagFromChart.value
  }
      
  return { 
    tagsData: pieChartData,
    photosSummary: {
      numPhotos: photos.length,
      numAlbums: 0, //state.albums.all.length,
      numUniqueTags: tagCountMap.size,
      mostCommonTag
    }
  };
}


const Dashboard = () => {
  const {
    numAlbums,
    numPhotos,
    mostCommonTag,
    numUniqueTags
  } = { numAlbums: 0, numPhotos: 0, mostCommonTag: 'None', numUniqueTags:0}; //photosSummary;
  
  const tagsData = [];
  const globalClassify = 0;

  const PieChart = () => {
    if (tagsData.length > 1) {
      return (
        <Chart
          chartType="PieChart"
          height={250}
          data={tagsData}
          options={chartOptions}
        />
      )
    } else {
      return "No photo tags data for pie chart.";
    }
  }

  const user = {
    displayName: 'Test',
    photoURL: 'https://www.google.com',
    email: 'test@google.com'
  }

  return (
      <Container maxWidth="md">
          <Grid container spacing={3}>
              {/* Profile */}
              <GridItem title={`${user.displayName}`} cols={6}>
                <Stack 
                  direction='row' 
                  divider={
                    <Divider
                      orientation="vertical"
                      flexItem
                    />
                  }
                  alignItems="center"
                  justifyContent="center"
                  spacing={5}
                >
                  <Avatar
                      sx={{
                          width: "120px",
                          height: "120px",
                          mt: 1,
                          float: "left",
                      }}
                      src={user.photoURL}
                  />

                  <Box sx={{ float: "right" }}>
                      <Stack>
                          <Button
                              variant="contained"
                              color="success"
                              sx={{ my: 1 }}
                              onClick={signOut}
                          >
                              Sign out
                          </Button>
                          <Tooltip title="Delete all photos and albums">
                              <Button
                                  variant="contained"
                                  color="error"
                                  sx={{ my: 1 }}
                                  onClick={deleteUser}
                              >
                                  Reset account
                              </Button>
                          </Tooltip>
                      </Stack>
                  </Box>
                </Stack>
                <Typography variant='body2' sx={{ mt: 2 }}>
                  {user.email}
                </Typography>
              </GridItem>

              {/* Photos summary */}
              <GridItem title="Photos Summary" cols={6}>
                  You have{" "}
                  <Chip label={`${numPhotos} photos`} sx={{ my: "5px" }} /> with{" "}
                  <Chip label={`${numAlbums} albums`} sx={{ my: "5px" }} />
                  <br />
                  <Chip label={mostCommonTag.tag} sx={{ my: "5px" }} /> is your
                  most common tag with{" "}
                  <Chip
                      label={`${mostCommonTag.count} photos`}
                      sx={{ my: "5px" }}
                  />
                  <br />
                  There are{" "}
                  <Chip
                      label={`${numUniqueTags} unique tags`}
                      sx={{ my: "5px" }}
                  />{" "}
                  in your collection.
              </GridItem>

              {/* Tag piechart */}
              <GridItem cols={3}>
                  <PieChart />
              </GridItem>

              <GridItem title="Image classification" cols={4}>
                  <Typography variant="body2">
                      Photos are tagged using a Convolutional Neural Network
                      trained on ~9000 classed Google images. See my{" "}
                      <Link href="https://github.com/Antony90/image-scene-classifier/">
                          Image Scene Classifier
                      </Link>
                      .
                  </Typography>
              </GridItem>

              <GridItem title="Statistics" cols={5}>
                  <Typography variant="body">
                      <Chip
                          label={`${globalClassify} photos`}
                          sx={{ my: "5px" }}
                      />{" "}
                      have been classified globally
                  </Typography>
              </GridItem>
          </Grid>
      </Container>
  );
}



export default Dashboard;