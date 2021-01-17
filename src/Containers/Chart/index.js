import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { getFormValues } from 'redux-form'
import { createStructuredSelector } from 'reselect'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts'
import isEmpty from 'lodash/isEmpty'
import { getWeatherSelector, getErrorSelector } from 'Redux/selectors/weather'

const ChartComponent = ({ weather, isError }) => {
  const [chartData, setChartData] = useState([])

  useEffect(() => {
    !isEmpty(weather) && setChartData(
      weather.slice(0,5).map(({ dt_txt, main: { temp, feels_like }}) => ({
        name: dt_txt,
        temp,
        feels_like,
      }))
    )
  }, [weather])

  return (
    <div>
      {
        (!isEmpty(chartData) && !isError) && (
          <BarChart
            width={1000}
            height={300}
            data={chartData}
            margin={{
              top: 5, right: 20, left: 20, bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="temp" fill="#8884d8" />
            <Bar dataKey="feels_like" fill="#82ca9d" />
          </BarChart>
        )
      }
    </div>
  )
}

const selector = createStructuredSelector({
  formStates: state => getFormValues('form')(state),
  weather: getWeatherSelector,
  isError: getErrorSelector,
})

export default connect(selector, null)(ChartComponent)

