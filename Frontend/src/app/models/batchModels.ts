export interface Batch {
  batch_NR: string;
  machine_ID: string;
  packaging_code: number;
  DB: string;
  leave_datetime: Date;
  forward_datetime: Date;
  remarks_end_control: string;
  checked_by: string;
  start_datetime: Date;
  end_datetime: Date;
  inspector: string;
  batch_started: Date;
  total_NR_bags: number;
  bags_checked: number;
  total_NR_patients: number;
  bags_rejected: number;
  NR_to_double_check: number;
  double_checked: number;
}

export interface BatchRow {
  batch_NR: string;
  department: string;
  split_NR: number;
  start_datetime: Date;
  end_datetime: Date;
  NR_patients: number;
  NR_bags: number;
  MC_CD: string;
  remarks: string;
}
