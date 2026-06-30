export interface ArchitectureChange {
  title: string;
  description: string;
  type: "added" | "updated" | "removed";
}

export interface UiExchange {
  id?: string;
  queryText: string;
  responseText?: string;
  status: "completed" | "pending" | "error";
}