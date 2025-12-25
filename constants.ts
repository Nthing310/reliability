
import { FailureData } from './types';

// The NTDS Dataset from page 4/26 of the document
export const NTDS_DATASET: FailureData[] = [
  { id: 1, interval: 9, cumulativeTime: 9 },
  { id: 2, interval: 12, cumulativeTime: 21 },
  { id: 3, interval: 11, cumulativeTime: 32 },
  { id: 4, interval: 4, cumulativeTime: 36 },
  { id: 5, interval: 7, cumulativeTime: 43 },
  { id: 6, interval: 2, cumulativeTime: 45 },
  { id: 7, interval: 5, cumulativeTime: 50 },
  { id: 8, interval: 8, cumulativeTime: 58 },
  { id: 9, interval: 5, cumulativeTime: 63 },
  { id: 10, interval: 7, cumulativeTime: 70 },
  { id: 11, interval: 1, cumulativeTime: 71 },
  { id: 12, interval: 6, cumulativeTime: 77 },
  { id: 13, interval: 1, cumulativeTime: 78 },
  { id: 14, interval: 9, cumulativeTime: 87 },
  { id: 15, interval: 4, cumulativeTime: 91 },
  { id: 16, interval: 1, cumulativeTime: 92 },
  { id: 17, interval: 3, cumulativeTime: 95 },
  { id: 18, interval: 8, cumulativeTime: 103 },
  { id: 19, interval: 6, cumulativeTime: 109 },
  { id: 20, interval: 1, cumulativeTime: 110 },
  { id: 21, interval: 1, cumulativeTime: 111 },
  { id: 22, interval: 33, cumulativeTime: 144 },
  { id: 23, interval: 7, cumulativeTime: 151 },
  { id: 24, interval: 91, cumulativeTime: 242 },
  { id: 25, interval: 2, cumulativeTime: 244 },
  { id: 26, interval: 1, cumulativeTime: 245 },
  { id: 27, interval: 87, cumulativeTime: 332 },
  { id: 28, interval: 47, cumulativeTime: 379 },
  { id: 29, interval: 12, cumulativeTime: 391 },
  { id: 30, interval: 9, cumulativeTime: 400 },
  { id: 31, interval: 135, cumulativeTime: 535 },
  { id: 32, interval: 258, cumulativeTime: 793 },
  { id: 33, interval: 16, cumulativeTime: 809 },
  { id: 34, interval: 35, cumulativeTime: 844 },
];

export const MODEL_DESCRIPTIONS: Record<string, string> = {
  JM: "Jelinski-Moranda: A classic growth model assuming failure rate is proportional to the number of remaining faults.",
  GO: "Goel-Okumoto: Based on Non-Homogeneous Poisson Process (NHPP) with an exponential failure intensity function.",
  MO: "Musa-Okumoto: Logarithmic Poisson execution time model assuming failure intensity decreases exponentially with expected failures.",
  'Inflection S-Shaped': "Assumes a learning process where error detection rate is initially low, peaks, and then decreases.",
  ARIMA: "AutoRegressive Integrated Moving Average: Time-series forecasting based on historical failure intervals.",
  'GM(1,1)': "Grey Model: Predicting system behavior with small datasets and uncertainty.",
  'BP Neural Network': "Backpropagation Neural Network: Using multi-layer perceptrons to learn complex non-linear failure patterns.",
  'Support Vector Regression': "Structural risk minimization approach to capture high-dimensional non-linear reliability trends."
};
