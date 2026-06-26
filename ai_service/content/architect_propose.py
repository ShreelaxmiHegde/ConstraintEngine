input_data = "Let's add Redis caching."

propose_change_data = {
  "changes": [
    {
      "changeType": "ADD_COMPONENT",
      "target": "cache",
      "oldVal": None,
      "newVal": {
        "cache": "Redis"
      },
      "reasoning": "Reduce database load and improve response latency."
    }
  ],
  "newVersion": {
    "summary": "Added Redis cache layer to improve performance.",
    "architectureState": {
      "database": "PostgreSQL",
      "backend": "Node.js",
      "cache": "Redis",
      "architectureVersioning": True
    },
    "decisions": [
      {
        "decision": "Introduce Redis cache",
        "reason": "Frequently accessed data should not always hit PostgreSQL.",
        "confidence": 0.95
      }
    ]
  },
  "conversation": {
    "responseText": "Redis is a suitable addition for caching and can significantly reduce database load.",
    "exchangeIntent": "PROPOSE_CHANGE",
    "stateChanged": True
  },
  "projectModified": True
}