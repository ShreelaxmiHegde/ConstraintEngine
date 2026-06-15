export interface ConversationMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  createdAt: string;
}

export interface ArchitectureChange {
  title: string;
  description: string;
  type: "added" | "updated" | "removed";
}