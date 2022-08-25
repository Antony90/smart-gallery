import React from 'react'
import { PieChart } from 'react-minimal-pie-chart';
import { connect } from 'react-redux';

const Dashboard = ({ tagsData }) => {
  return (
    <PieChart
     data={tagsData} 
     label={({ dataEntry }) => `${Math.round(dataEntry.percentage)} %`}
    />
  )
}

const mapStateToProps = state => {
  const colors = ["red","orange","yellow","lime","blue", "white"]

  const photos = state.photos.all;
  const tagCount = new Map();
  photos.forEach(({ tags }) => {
    tags.forEach(tag => {
      const currVal = tagCount.get(tag)
      tagCount.set(tag, (currVal && currVal + 1) || 1)
    })
  })

  const pieChartData = Array.from(tagCount, ([ title, value ]) => {
    const color = colors[Math.floor(Math.random()*colors.length)]
    return { title, value, color }
  })
  return { tagsData: pieChartData };
}

export default connect(mapStateToProps)(Dashboard);