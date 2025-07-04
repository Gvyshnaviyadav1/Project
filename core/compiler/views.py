import sys
from django.shortcuts import render
PYTHON_CMD = "python3" if sys.platform != "win32" else "python"
import re
# Create your views here.

import os
import uuid
import subprocess
from pathlib import Path

from django.conf import settings
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions
def clean_error_output(output):
    lines = output.strip().split("\n")
    cleaned_lines = [line for line in lines if not line.strip().startswith('File ')]
    return "\n".join(cleaned_lines).strip()


class CompileCodeView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        language = request.data.get('language')
        code = request.data.get('code')
        stdin_input = request.data.get('input', '')

        if not language or not code:
            return Response({'error': 'language and code are required'}, status=400)

        try:
            output = run_code(language, code, stdin_input)
            return Response({'output': output, 'status': 'Success'})
        except Exception as e:
            return Response({'error': str(e), 'status': 'Error'}, status=500)
def run_code(language, code, input_data):
    base_path = settings.EXECUTOR_ROOT
    directories = ["codes", "inputs", "outputs"]

    for directory in directories:
        dir_path = base_path / directory
        dir_path.mkdir(parents=True, exist_ok=True)

    unique = str(uuid.uuid4())
    code_file_name = f"{unique}.{language}"
    input_file_name = f"{unique}.txt"
    output_file_name = f"{unique}.txt"

    codes_dir = base_path / "codes"
    inputs_dir = base_path / "inputs"
    outputs_dir = base_path / "outputs"

    code_file_path = codes_dir / code_file_name
    input_file_path = inputs_dir / input_file_name
    output_file_path = outputs_dir / output_file_name

    # Write code
    with open(code_file_path, "w") as code_file:
        code_file.write(code)

    # Write input
    with open(input_file_path, "w") as input_file:
        input_file.write(input_data)

    # Create empty output file
    with open(output_file_path, "w") as output_file:
        pass

    if language == "cpp":
        executable_path = codes_dir / unique
        compile_result = subprocess.run(
            ["g++", str(code_file_path), "-o", str(executable_path)],
            capture_output=True
        )
        if compile_result.returncode != 0:
            return compile_result.stderr.decode()

        with open(input_file_path, "r") as infile, open(output_file_path, "w") as outfile:
            subprocess.run([str(executable_path)], stdin=infile, stdout=outfile)

    elif language == "py":
        with open(input_file_path, "r") as infile, open(output_file_path, "w") as outfile:
            subprocess.run(
                [PYTHON_CMD, str(code_file_path)],
                stdin=infile,
                stdout=outfile,
                stderr=subprocess.STDOUT
            )
    elif language == "java":
    # ALWAYS enforce class name Main
        class_name = "Main"
        java_code_file_path = codes_dir / f"{class_name}.java"
        with open(java_code_file_path, "w") as f:
            f.write(code)

    # Compile
        compile_result = subprocess.run(
            ["javac", str(java_code_file_path)],
            capture_output=True,
            cwd=codes_dir
            )
        if compile_result.returncode != 0:
            return compile_result.stderr.decode()

    # Run
        with open(input_file_path, "r") as infile, open(output_file_path, "w") as outfile:
            subprocess.run(
                ["java", "-cp", str(codes_dir), class_name],
                stdin=infile,
                stdout=outfile,
                stderr=subprocess.STDOUT
            )

    else:
        return f"Language '{language}' not supported."

    with open(output_file_path, "r") as outfile:
        output_data = outfile.read()
    output_data = clean_error_output(output_data)
    return output_data
