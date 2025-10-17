// Visualization modes registry
import { LineVisualizer } from './lineVisualizer.js';

const visualizerRegistry = {
  line: LineVisualizer,
  // Add more visualizer modes here in the future
  // bars: BarsVisualizer,
  // circle: CircleVisualizer,
  // etc.
};

export function createVisualizer(mode, config) {
  const VisualizerClass = visualizerRegistry[mode];
  if (!VisualizerClass) {
    console.warn(`[viz] Unknown visualizer mode: ${mode}, falling back to 'line'`);
    return new LineVisualizer(config);
  }
  return new VisualizerClass(config);
}

export function registerVisualizer(mode, VisualizerClass) {
  visualizerRegistry[mode] = VisualizerClass;
}
