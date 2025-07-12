// Base types for the Spy Cat Agency system

export interface SpyCat {
  id: number;
  name: string;
  years_of_experience: number;
  breed: string;
  salary: number;
  created_at: string;
  updated_at?: string;
  active_missions_count: number;
  total_missions_count: number;
  success_rate: number;
  is_available?: boolean;
}

export interface Mission {
  id: number;
  cat_id?: number;
  complete: boolean;
  targets: Target[];
  created_at: string;
  updated_at?: string;
  targets_count: number;
  completed_targets_count: number;
  progress_percentage: number;
  is_all_targets_completed: boolean;
  cat?: SpyCat;
}

export interface Target {
  id: string;
  name: string;
  country: string;
  notes?: string;
  complete: boolean;
  mission: string;
  created_at: string;
  updated_at: string;
}

// Breed interface for the available cat breeds
export interface Breed {
  id: string;
  name: string;
}

// Form data types
export interface SpyCatCreateData {
  name: string;
  years_of_experience: number;
  breed: string;
  salary: number;
}

export interface SpyCatUpdateData {
  salary: number;
}

export interface MissionCreateData {
  targets: TargetCreateData[];
}

export interface TargetCreateData {
  name: string;
  country: string;
  notes?: string;
}

export interface TargetUpdateData {
  notes: string;
}

// API Response types
export interface ApiResponse<T> {
  data: T;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
}

export interface SpyCatStats {
  total_cats: number;
  cats_with_active_missions: number;
  available_cats: number;
  average_experience: number;
  average_salary: number;
  most_common_breed: string;
  success_rate?: number;
}

// Search and filter types
export interface SearchFilters {
  query?: string;
  breed?: string;
  experience_min?: number;
  experience_max?: number;
  salary_min?: number;
  salary_max?: number;
  availability?: "available" | "busy" | "all";
}

// API Error type
export interface ApiError {
  message: string;
  field_errors?: Record<string, string>;
  status_code: number;
}
