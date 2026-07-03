export interface ArchitectureChange {
  title: string;
  description: string;
  type: "added" | "updated" | "removed";
}