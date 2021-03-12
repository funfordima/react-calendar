export interface Members {
  id: string;
  isActive: boolean;
  isAdmin?: boolean;
  name: string;
}

export interface Events {
  title: string;
  participants: string[];
  day: string;
  time: string;
  complete: boolean;
  id: string;
}
