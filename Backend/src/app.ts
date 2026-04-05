import express from 'express';
import runGraph from './ai/graph.ai.js'

const app = express();

// Define a route that runs the graph with a sample problem and returns the result as JSON
app.get('/', async (req, res) => {
  const result = await runGraph("write the factorial of n in c++ code")
  res.json(result)
});

export default app;