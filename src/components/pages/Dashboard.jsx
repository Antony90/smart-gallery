import { Avatar, Box, Button, Chip, Container, Divider, Grid, Link, Paper, Stack, Tooltip, Typography } from '@mui/material';
import React from 'react'
import { Chart } from "react-google-charts";
import { connect } from 'react-redux';

const paperStyle = { 
  height: '200px', 
  p: '10px', 
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
  <Grid item md={cols}>
    <Paper sx={paperStyle}>
      { title && <Typography variant='h5'>{title}</Typography> }
      <Box sx={{ p: 1 }}>
        {children}
      </Box>
    </Paper>
  </Grid>
)

const Dashboard = ({ tagsData, photosSummary, globalClassify }) => {
  const {
    numAlbums,
    numPhotos,
    mostCommonTag,
    numUniqueTags
  } = photosSummary;

  return (
    <Container maxWidth='md'>
      <Grid container spacing={3}>
        {/* Profile */}
        <GridItem title='Profile' cols={6}>
            <Avatar sx={{ width: '120px', height: '120px', mt: 1, float: 'left' }} src="https://i.pravatar.cc/900" />
            <Divider orientation='vertical' sx={{ display: 'inline-block', ml: 7 }} />
            <Box sx={{ float: 'right' }}>
              <Stack>   
                <Typography variant='h5' component='div' sx={{ my: 'auto', float: 'left' }}>
                  Username
                </Typography>
                <Button variant='contained' color='success' sx={{ my: 1 }}>Sign out</Button>
                <Tooltip title='Delete all photos and albums'>
                  <Button variant='contained' color='error' sx={{ my: 1 }}>Reset account</Button>
                </Tooltip>
              </Stack>
            </Box>
        </GridItem>

        {/* Photos summary */}
        <GridItem title='Photos Summary' cols={6}>
          You have <Chip label={`${numPhotos} photos`} sx={{ my: '5px' }}/> with <Chip label={`${numAlbums} albums`} sx={{ my: '5px' }}/><br/>
          <Chip label={mostCommonTag.tag} sx={{ my: '5px' }} /> is your most common tag with <Chip label={`${mostCommonTag.count} photos`} sx={{ my: '5px' }}/><br/>
          There are <Chip label={`${numUniqueTags} unique tags`} sx={{ my: '5px' }} /> in your collection.
        </GridItem>

        {/* Tag piechart */}
        <GridItem cols={3}>
          <Chart
            chartType="PieChart"
            height={250}
            data={tagsData}
            options={chartOptions}
          />
        </GridItem>

        <GridItem title='Image classification' cols={4}>
          <Typography variant='body2'>
            Photos are tagged using a Convolutional Neural Network trained on ~9000 classed Google images.
            See my <Link href='https://github.com/Antony90/image-scene-classifier/'>Image Scene Classifier</Link>.
          </Typography>
        </GridItem>

        
        <GridItem title='Statistics' cols={5}>
          <Typography variant='body'>
            <Chip label={`${globalClassify} photos`} sx={{ my: '5px' }}/> have been classified globally
          </Typography>
        </GridItem>
      </Grid>
    </Container>
  )
}

const mapStateToProps = state => {
  const photos = state.photos.all;
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
      numAlbums: state.albums.all.length,
      numUniqueTags: tagCountMap.size,
      mostCommonTag
    }
  };
}

export default connect(mapStateToProps)(Dashboard);