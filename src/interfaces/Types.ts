export interface Activity {
  id?: number;
  name: string;
  description: string;
  status: string;
  startDate: string;
  endDate: string | null;
  project?: Project | null;
}

export interface Client {
  id?: number;
  name: string;
  email: string;
  phone?: string;
}

export interface Project {
  id?: number;
  name: string;
  description: string | null;
  status: string;
  startDate: string;
  endDate: string | null;
  client: Client | null;
  activities?: Activity[];
}

export enum Status {
  OPEN = "OPEN",
  IN_PROGRESS = "IN_PROGRESS",
  COMPLETED = "COMPLETED",
  PENDING = "PENDING",
}

export const StatusLabels: Record<Status, string> = {
  [Status.OPEN]: "Aberto",
  [Status.IN_PROGRESS]: "Em Progresso",
  [Status.COMPLETED]: "Concluído",
  [Status.PENDING]: "Pendente",
};

export interface StatusCounts {
  IN_PROGRESS: number;
  COMPLETED: number;
  PENDING: number;
  OPEN: number;
}

export interface DashboardIndicators {
  activityStatusCounts: StatusCounts;
  projectStatusCounts: StatusCounts;
}

export interface User {
  id?: number;
  username: string;
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
  role?: string;
}

export enum Role {
  ADMIN = "ADMIN",
}
