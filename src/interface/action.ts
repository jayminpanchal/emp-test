export type ActionStatus = "pending" | "processing" | "completed";

export interface Action {
  description: string;
  key: string;
  title: string;
  status: ActionStatus;
}
