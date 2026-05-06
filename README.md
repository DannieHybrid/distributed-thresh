Distributed Threshold Signature System

A TypeScript-based distributed signing system using a coordinator and multiple nodes (A, B, C).

## Architecture

- Coordinator: orchestrates signing
- Nodes: generate partial signatures
- Crypto module: handles signing logic

## Run

Install:

npm install


Start nodes:

npx tsx node-a/index.ts
npx tsx node-b/index.ts
npx tsx node-c/index.ts


Start coordinator:

npx tsx coordinator/index.ts


## API

Sign message:

curl -X POST http://localhost:4000/sign

-H "Content-Type: application/json"
-d '{"message":"hello world"}'


## Flow

Client → Coordinator → Nodes → Partial Signatures → Aggregation → Final Signature

## Key Idea

No single node can sign alone. Signature is distributed across nodes.
