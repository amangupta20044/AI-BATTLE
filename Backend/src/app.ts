import express from 'express';
import runGraph from './ai/graph.ai.js'

import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json());

// Define a route that runs the graph with a sample problem and returns the result as JSON
app.get('/', async (req, res) => {
  const result = await runGraph("write the factorial of n in c++ code")
  res.json(result)
});
// Define a route that accepts a problem as input and runs the graph with that problem, returning the result as JSON
app.post('/invoke', async(req, res)=>{
  const {input} = req.body;
  const result = await runGraph(input);
  res.status(200).json({
    message:"graph executed successfully",
    success:true,
    result
  })
})

export default app;