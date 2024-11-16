from cdp import Wallet, hash_message
from cdp_langchain.tools import CdpTool
from pydantic import BaseModel, Field

# Define a custom action exmaple.

CREATE_AGENT_API_PROMPT = """
The tool will take the url for an agent endpoint with variable modality and return the transformed API call.
with the correct query parameters appended.
"""

class SignMessageInput(BaseModel):
    """Input argument schema for sign message action."""

    message: str = Field(
        ...,
        description="The message to sign. e.g. `hello world`"
    )

def add_new_agent_endpoint(url: str) -> str:
    """Sign message using EIP-191 message hash from the wallet.

    Args:
        url: The URL of the new agent endpoint.


    Returns:
        str: The message and corresponding signature.

    """


    return f"The  url has been added"



def initialize_agent():
    """Initialize the agent with CDP Agentkit."""
    # TODO: Load the LLM model and CDP Agentkit values from the environment.

    agentkit = CdpAgentkitWrapper(**values)

    # Initialize CDP Agentkit Toolkit and get tools.
    cdp_toolkit = CdpToolkit.from_cdp_agentkit_wrapper(agentkit)
    tools = cdp_toolkit.get_tools()

    # Define a new tool for signing messages.
    signMessageTool = CdpTool(
    name="sign_message",
    description=SIGN_MESSAGE_PROMPT,
    cdp_agentkit_wrapper=agentkit,
    args_schema=SignMessageInput,
    func=sign_message,
    )

    all_tools = tools.append(signMessageTool)

    # Store buffered conversation history in memory.
    memory = MemorySaver()
    config = {"configurable": {"thread_id": "CDP Agentkit Chatbot Example!"}}

    # Create ReAct Agent using the LLM and CDP Agentkit tools.
    return create_react_agent(
        llm,
        tools=all_tools,
        checkpointer=memory,
        state_modifier="You are a helpful agent that can interact onchain on the Base Layer 2 using the Coinbase Developer Platform Agentkit. You are empowered to interact onchain using your tools. If you ever need funds, you can request them from the faucet. You can also deploy your own ERC-20 tokens, NFTs, and interact with them. You also have the ability to sign messages using your wallet.",
    ), config