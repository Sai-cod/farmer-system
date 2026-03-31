import asyncio

async def process_query(message: str, language: str = "mr-IN") -> str:
    """
    Service layer to interface with LangChain / LLM pipeline.
    """
    # Simulated ML/LLM delay
    await asyncio.sleep(1.0)
    
    return f"This is a mocked backend response for: '{message}' in {language}."
