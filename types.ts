
export interface FailureData {
  id: number;
  interval: number; // Time since last failure
  cumulativeTime: number;
}

export enum ModelType {
  JM = 'JM',
  GO = 'GO',
  MO = 'MO',
  S_SHAPED = 'Inflection S-Shaped',
  ARIMA = 'ARIMA',
  GM = 'GM(1,1)',
  BP = 'BP Neural Network',
  SVR = 'Support Vector Regression'
}

export interface ModelMetrics {
  mae: number;
  ae: number;
  mspe: number;
  rmse: number;
  r2: number;
}

export interface PredictionPoint {
  index: number;
  actual?: number;
  predicted: number;
}

export interface ModelResult {
  type: ModelType;
  predictions: PredictionPoint[];
  metrics: ModelMetrics;
  parameters: Record<string, number | string>;
}
