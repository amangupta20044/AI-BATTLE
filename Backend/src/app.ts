import express from 'express';
import runGraph from './ai/graph.ai.js'

import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json());

// Health check route
app.get('/', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

// Define a route that accepts a problem as input and runs the graph with that problem, returning the result as JSON
app.post('/invoke', async (req, res) => {
  try {
    const { input } = req.body;

    if (typeof input !== 'string' || !input.trim()) {
      return res.status(400).json({
        message: 'Invalid input provided',
        success: false,
      });
    }

    const result = await runGraph(input.trim());

    return res.status(200).json({
      message: 'graph executed successfully',
      success: true,
      result,
    });
  } catch (error) {
    console.error('Invoke failed:', error);

    const statusCode = error?.statusCode || 500;
    const sanitizedStatus = Number.isInteger(statusCode) && statusCode >= 400 && statusCode < 600 ? statusCode : 500;
    const message = error?.message || 'Failed to execute graph';

    return res.status(sanitizedStatus).json({
      message: 'Failed to execute graph',
      success: false,
      error: message,
    });
  }
});

export default app;