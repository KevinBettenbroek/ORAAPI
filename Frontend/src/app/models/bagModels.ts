export interface Bag {
  bag_NR: string;
  roll_NR: string;
  bag_type: string;
}

export interface Error {
  bag_NR: string;
  error_NR: number;
  error: string;
  patient: string;
  error_desc: string;
  free_text: string;
  error_datetime: Date;
  corrected_by: string;
  checked_by: string;
}

export interface MissingPictures {
  bag_NR: string;
  patient: string;
  corrected_by: string;
  checked_by: string;
}

export interface MissingPills {
  bag_NR: string;
  pil_ID: number;
  medication_name: string;
  free_text: string;
}
