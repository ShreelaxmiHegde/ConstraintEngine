input_data = "Build an AI-powered system design assistant for developers. Must support chat conversations, architecture versioning, PostgreSQL storage, and future scaling"

extraction_data = {
  "constraints": [
    {
      "category": "Database",
      "value": "Use PostgreSQL as primary datastore",
      "source": "User requirement",
      "confidence": 0.97
    },
    {
      "category": "Feature",
      "value": "Support architecture versioning",
      "source": "User requirement",
      "confidence": 0.95
    },
    {
      "category": "Scalability",
      "value": "Architecture should support future scaling",
      "source": "User requirement",
      "confidence": 0.88
    }
  ],
  "architectureState": {
    "database": "PostgreSQL",
    "backend": "Node.js",
    "architectureVersioning": True
  },
  "decisions": [
    {
      "decision": "Use PostgreSQL for persistence",
      "reason": "Relational data and version tracking fit well",
      "confidence": 0.94
    },
    {
      "decision": "Maintain architecture state separately from conversations",
      "reason": "Enables version history and rollback",
      "confidence": 0.91
    }
  ],
  "summary": "ConstraintEngine uses PostgreSQL for persistence and maintains versioned architecture state alongside conversational interactions."
}