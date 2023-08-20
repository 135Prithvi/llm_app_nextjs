"use client"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis,  LineChart, Line,CartesianGrid, Tooltip, Legend  } from "recharts"

export function Overview({data}) {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <LineChart width={600} height={300} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="created_at" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="impressions" stroke="#26a7de" activeDot={{ r: 8 }} />
        <Line type="monotone" dataKey="likes" stroke="#ce3655" activeDot={{ r: 8 }} />
        <Line type="monotone" dataKey="re_tweets_count" stroke="#ffc658" activeDot={{ r: 8 }} />
      </LineChart>
    </ResponsiveContainer>
  )
}