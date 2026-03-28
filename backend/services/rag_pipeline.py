def query_vector_db(query: str):
    # Placeholder for vector search using ChromaDB
    return "Relevant context about crops."

def format_prompt(query, context):
    return f"Context: {context}\\nQuestion: {query}\\nAnswer:"
