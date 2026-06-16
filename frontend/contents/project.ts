export const project = {
  title: "Ecommerce Platform",

  description:
    "Building ecommerce system with realtime inventory.",

  constraints: [
    {
      category: "Database",
      value: "PostgreSQL",
      source: "User Description",
      confidence: 0.95,
    },
    {
      category: "Authentication",
      value: "RBAC",
      source: "User Description",
      confidence: 0.91,
    },
  ],

  architectureState: {
    frontend: {
      framework: "Next.js",
    },

    backend: {
      runtime: "Node.js",
      framework: "Express",
    },

    database: {
      engine: "PostgreSQL",
    },
  },
};

export const messages = [
  {
    id: "1",
    role: "user" as const,
    content:
      "How should I handle inventory cache invalidation?",
    createdAt: "",
  },

  {
    id: "2",
    role: "assistant" as const,
    content:
      "Introduce Redis with write-through caching.",
    createdAt: "",
  },
];

export const changes = [
  {
    title: "Redis Cache Added",
    description:
      "Recommended write-through cache for inventory reads.",
    type: "added" as const,
  },

  {
    title: "Read Replica Introduced",
    description:
      "Analytical workloads separated from primary database.",
    type: "updated" as const,
  },
];

export const data = {
  constraints: [
    {
      category: "Database",
      value: "PostgreSQL",
      source: "User Description",
      confidence: 0.96,
    },
    {
      category: "Scale",
      value: "100k concurrent users",
      source: "User Description",
      confidence: 0.87,
    },
    {
      category: "Authentication",
      value: "RBAC",
      source: "User Description",
      confidence: 0.91,
    },
  ],

  decisions: [
    {
      decision:
        "Use relational database",
      reason:
        "Strong transactional consistency required.",
      confidence: 0.93,
    },
  ],

  unresolvedQuestions: [
    {
      question:
        "Expected inventory update rate?",
      reason:
        "Impacts caching and replication strategy.",
    },
  ],

  architectureState: {
    frontend: {
      framework: "Next.js",
    },
    backend: {
      runtime: "Node.js",
    },
    database: {
      engine: "PostgreSQL",
    },
  },
};