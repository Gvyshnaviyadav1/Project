# Use official Python image
FROM python:3.11-slim

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1
#ENV PYTHONPATH "${PYTHONPATH}:/app"
# Set working directory
WORKDIR /app
RUN apt-get update && apt-get install -y gcc libpq-dev
# Install dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy entire project
COPY . .

# Expose port 8000
EXPOSE 8000

# Default command to run the server using gunicorn
CMD ["gunicorn", "core.wsgi:application", "--bind", "0.0.0.0:8000"]
