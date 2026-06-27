export interface Constraint {
  value: string
  source: string
  category: string
  confidence: number
}

interface Project {
  constraints: Constraint[]
  desc: string
  version: number
}

interface Change {
  changeType: string
  target: string
  newVal: Record<string, unknown>
  oldVal: Record<string, unknown>
  reasoning: string
}

export interface Decision {
  reason: string
  decision: string
  confidence: number
}

export interface ArchitectureVersion {
  architectureState: Record<string, unknown>
  summary: string
  version: number
  changes: Change[]
  decisions: Decision[]
}

export interface Exchange {
  queryText: string
  responseText: string
}

interface Conversation {
  exchanges: Exchange[]
}

export interface ProjectType {
  id: string
  project: Project
  archVersions: ArchitectureVersion[]
  conversation: Conversation
}