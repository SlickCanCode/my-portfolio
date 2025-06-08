from langchain.tools import Tool
from datetime import datetime
# getting the FAQ data from a separate module
# This is a simulated import, replace with your actual FAQ data retrieval logic
from faq_data import get_faq

def search_faq_tool(query:str):
    
    #A tool to search the FAQ for a given query.
    
    # Simulated FAQ search logic
    faq = get_faq()
    
    response = faq.get(query.lower())
    return response

faq_tool = Tool(
    name="FAQ_Search",
    func=search_faq_tool,
    description="Use this tool to answer questions based on the buisness FAQ"
)