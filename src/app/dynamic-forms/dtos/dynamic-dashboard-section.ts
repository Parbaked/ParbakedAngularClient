import { DynamicDashboardRow } from './dynamic-dashboard-row';

export interface DynamicDashboardSection {
  sectionTitle: string;
  rows: DynamicDashboardRow[];
}
