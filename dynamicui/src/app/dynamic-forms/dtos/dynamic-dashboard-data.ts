import { DynamicCard } from './dynamic-card';
import { DynamicDashboardSection } from './dynamic-dashboard-section';
import { DynamicFormAction } from './dynamic-form-action';

export interface DynamicDashboardData {
  title: string;
  sections: DynamicDashboardSection[];
  record: any;
  actions?: DynamicFormAction[];
}
