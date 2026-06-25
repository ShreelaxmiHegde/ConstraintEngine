import ArchitectureStatePanel from "./dump/ArchitectureStatePanel";
import ConstraintsPanel from "./dump/ConstraintsPanel";
import ProjectHeader from "./dump/ProjectHeader";


interface Constraints {
  category: string,
  value: string,
  confidence: number
}

interface Decision {
  decision: string,
  reason: string,
  confidence: string
}

interface Exchange {
  query: string,
  response: string
}

interface Project {
  desc: string,
  version: number
}

interface Version {
  summary: string,
  architectureState: Record<string, unknown>,
  decisions: Decision[],
}

const constraints = [
  {
    "category": "Database",
    "value": "Use PostgreSQL as primary datastore",
    "confidence": 0.97
  },
  {
    "category": "Feature",
    "value": "Support architecture versioning",
    "confidence": 0.95
  },
  {
    "category": "Scalability",
    "value": "Architecture should support future scaling",
    "confidence": 0.88
  }
];

const exchanges = [
  {
    query: "lorem ipsum",
    response: "dolor sit amet"
  },
  {
    query: "lorem ipsum",
    response: "dolor sit amet"
  },
  {
    query: "lorem ipsum",
    response: "dolor sit amet"
  },
]

const archState = {
  "database": "PostgreSQL",
  "backend": "Node.js",
}

const decisions = [
  {
    decision: "Use PostgreSQL for persistence",
    reason: "Relational data and version tracking fit well",
    confidence: 0.94
  },
  {
    decision: "Maintain architecture state separately from conversations",
    reason: "Enables version history and rollback",
    confidence: 0.91
  }
]

const project = {
  desc: "abc",
  version: 1
}

const architectureVersion = {
  summary: "string"
}

const currVersion = {
  version: 2,
  decisions: decisions,
  summary: "lorem epsum dolor sit amet",
  architectureState: archState
}

export default function Page() {
  return (
    <>
      <ProjectHeader
        description={"project description"}
        currentVersion={2}
        constraintCount={3}
        decisionCount={24}
        exchangeCount={4}
      />

      <div className="grid grid-cols-12">
        <div className="col-span-5">
          <ConstraintsPanel
            constraints={constraints}
          />
        </div>

        <div className="col-span-5">
          <ArchitectureStatePanel
            currVersion={currVersion}
          />
          <div>
            {decisions.map((d, idx) => (
              <div key={idx}>
                <p>Decision: {d.decision}</p>
                <p>Reason: {d.reason}</p>
                <p>Confidence: {d.confidence}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div>
        <h1>Discussion</h1>
        <div>
          {exchanges.map((e, idx) => (
            <div key={idx}>
              <p>Query: {e.query}</p>
              <p>Response: {e.response}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}