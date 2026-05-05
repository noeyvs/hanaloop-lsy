export interface PCFData {
  month: string;
  electricity: number;
  rawMaterials: number;
  transportation: number;
  total: number;
}

export const mockDashboardData: PCFData[] = [
  { month: 'Jan', electricity: 50.16, rawMaterials: 529.0, transportation: 143.5, total: 722.66 },
  { month: 'Feb', electricity: 51.07, rawMaterials: 782.0, transportation: 738.5, total: 1571.57 },
  { month: 'Mar', electricity: 52.44, rawMaterials: 1062.3, transportation: 430.5, total: 1545.24 },
  { month: 'Apr', electricity: 59.28, rawMaterials: 1173.0, transportation: 147.0, total: 1379.28 },
  { month: 'May', electricity: 54.72, rawMaterials: 1103.2, transportation: 430.5, total: 1588.42 },
  { month: 'Jun', electricity: 50.16, rawMaterials: 1035.0, transportation: 430.5, total: 1515.66 },
  { month: 'Jul', electricity: 54.72, rawMaterials: 919.6, transportation: 143.5, total: 1117.82 },
  { month: 'Aug', electricity: 50.62, rawMaterials: 529.0, transportation: 430.5, total: 1010.12 },
];

export const emissionFactors = [
  { category: 'Electricity', factor: 0.456, unit: 'kgCO2e/kWh', source: 'KEPCO' },
  { category: 'Plastic 1', factor: 2.3, unit: 'kgCO2e/kg', source: 'IPCC' },
  { category: 'Plastic 2', factor: 3.2, unit: 'kgCO2e/kg', source: 'IPCC' },
  { category: 'Truck', factor: 3.5, unit: 'kgCO2e/ton-km', source: 'National Database' },
];
