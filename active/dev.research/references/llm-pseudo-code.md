# LLM Pseudo Code (LPC)
The following are operators for a high level language meant to be used by LLM agents to describe code. 
LPC has high level operators that should be used regardless of the underlying language of code being described.

## Basic Concepts

- ATOM = Variable | Expression

## Operators
- <ATOM1> ?? <ATOM2> : if ATOM1 evalutes to true, return, otherwise, evaluate ATOM2
- <ATOM1> := <ATOM2> : ATOM1 is derived from logic that is determined by ATOM2

## Additional Notes
- remove unecessary `()` functions that take no arguments
- remove `;` from end of lines

## Example

### 1. Simplified Typescript Code

- input
```ts
// new_conversation_config.py (simplified)
trainingDisabled = userTrainingDisabled
  ? true
  : (gizmoConfig?.training_disabled ?? null);
if (contextScopes.isSensitive()) trainingDisabled = true;
ConversationTree.training_disabled = trainingDisabled;
ConversationTree.has_notrain_connector_data = false;
```

- output
```ts
// new_conversation_config.py (simplified)
trainingDisabled = userTrainingDisabled ?? gizmoConfig?.training_disabled ?? null
if (contextScopes.isSensitive) trainingDisabled = true
ConversationTree.training_disabled = trainingDisabled;
ConversationTree.has_notrain_connector_data = false;
```