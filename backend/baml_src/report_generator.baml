// Types for playground diagram mock object
class PlaygroundNode {
  id string
  type string
  position PlaygroundPosition
  data PlaygroundNodeData
}

class PlaygroundPosition {
  x int
  y int
}

class PlaygroundNodeData {
  label string
  color string
}

class PlaygroundEdge {
  id string
  source string
  target string
  animated true
  style PlaygroundEdgeStyle
}

class PlaygroundEdgeStyle {
  stroke string
  strokeWidth int
}

class PlaygroundDiagramMock {
  nodes PlaygroundNode[]
  edges PlaygroundEdge[]
  guardrails string[]
  mcpTools string[]
  scan_description string
}

class PlaygroundToolsInput {
  tools string[]
  // Add more fields as needed for the tools input object
}

class PlaygroundDiagramMockList {
  diagrams PlaygroundDiagramMock[]
}

// Function to generate a mock playground diagram object from raw tools output
function GeneratePlaygroundDiagramMock(rawToolsInput: PlaygroundToolsInput) -> PlaygroundDiagramMock {
  client "openai/gpt-4.1"
  prompt #"
    Read each of the tools in the input below. Analyze the control flow and data flow exploits that could occur with a subset of these tools. Specifically, search for tool chain calls that can lead to loop problems. Loops are a common source of bugs and errors in agentic systems. For example, an agent can:

    - Get stuck in an infinite loop, consuming resources and causing the system to crash.
    - Get stuck in a loop that causes it to perform an irreversible action, such as sending a message many times.
    - Get stuck in a loop, requiring many expensive LLM calls, causing the system to run out of tokens or money.

    Configure the PlaygroundPositions for the nodes such that their placement visually interprets the exploit being portrayed (e.g., loops should be visually apparent, safe paths should be clearly separated from exploit paths).

    The nodes should always be connected in a way depicting a cycle, making loop problems visually apparent in the diagram.

    Guardrail suggestions should always be centered around monitoring the chain of execution of tool calls.

    Then, generate a set of React Flow nodes and edges representing the flow. The nodes and edges of the React Flow diagram must be correctly color coded as green to show safe paths and red to show exploit paths. List the affected tools, and propose guardrails to mitigate the exploits, especially those related to loop problems. Populate the scan_description string with a concise 5 word summary of the exploit being displayed in the diagram.  Return the result in the following format:

    {{ ctx.output_format }}

    TOOLS INPUT: {{ rawToolsInput }}

    OUTPUT: {{ ctx.output_format }}
  "#
}

// Function to generate three mock playground diagram objects
function GenerateThreePlaygroundDiagramMocks(rawToolsInput: PlaygroundToolsInput) -> PlaygroundDiagramMockList {
  client "openai/gpt-4.1"
  prompt #"
    Read the tools in the input below. Generate three distinct PlaygroundDiagramMock objects, each representing a different scenario of control flow and data flow exploits using subsets of these tools. For each, specifically search for tool chain calls that can lead to loop problems. Loops are a common source of bugs and errors in agentic systems. For example, an agent can:

    - Get stuck in an infinite loop, consuming resources and causing the system to crash.
    - Get stuck in a loop that causes it to perform an irreversible action, such as sending a message many times.
    - Get stuck in a loop, requiring many expensive LLM calls, causing the system to run out of tokens or money.

    Configure the PlaygroundPositions for the nodes such that their placement visually interprets the exploit being portrayed (e.g., loops should be visually apparent, safe paths should be clearly separated from exploit paths).

    The nodes should always be connected in a way depicting a cycle, making loop problems visually apparent in the diagram.

    Guardrail suggestions should always be centered around monitoring the chain of execution of tool calls.

    For each scenario, generate React Flow nodes and edges. The nodes and edges of the React Flow diagram must be correctly color coded as green to show safe paths and red to show exploit paths. List affected tools, and propose guardrails to mitigate the exploits, especially those related to loop problems. The list of affected tools should exactly match the nodes depicted in the react flow diagram. Populate the scan_description string with a concise 5 word summary of the exploit being displayed in the diagram. Return the result as a PlaygroundDiagramMockList containing three PlaygroundDiagramMock objects.
    
   {{ ctx.output_format }}
    
    {{ _.role('user') }}
    {{ rawToolsInput }}
  "#
}