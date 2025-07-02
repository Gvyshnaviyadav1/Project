def generate_from_gemini(prompt):
    import google.generativeai as genai
    genai.configure(api_key="AIzaSyBKpH_7UD7ye1AjfPUcH7r8Ne9Tskho-f8")
    model = genai.GenerativeModel("gemini-2.0-flash")
    response = model.generate_content(prompt)
    return response.text
