import subprocess
import os
import re
import base64
import gzip
import json

def read_html_file(file_path):
    with open(file_path, 'r', encoding='utf-8') as file:
        return file.read()

def correct_base64_padding(base64_string):
    # Adjust padding
    missing_padding = len(base64_string) % 4
    if missing_padding:
        base64_string += '=' * (4 - missing_padding)
    return base64_string


def extract_base64_data(html_content):
    base64_data = {}
    pattern = r'data \+= `([\s\S]*?)`;'
    matches = re.findall(pattern, html_content)

    for match in matches:
        try:
            json_data = json.loads(match)
            file_name = json_data.get('file')
            chunk_data = json_data.get('content', {}).get('chunk')
            if file_name and chunk_data:
                if file_name not in base64_data:
                    base64_data[file_name] = ''
                base64_data[file_name] += chunk_data
        except json.JSONDecodeError as e:
            print(f"Error parsing JSON data: {e}")

    return base64_data

def decode_and_decompress_data(base64_data):
    decoded_data = {}
    for file_name, data in base64_data.items():
        try:
            corrected_data = correct_base64_padding(data)
            decoded_compressed_data = base64.urlsafe_b64decode(corrected_data.encode('utf-8'))
            decompressed_data = gzip.decompress(decoded_compressed_data)
            decoded_data[file_name] = decompressed_data
        except Exception as e:
            print(f"Error processing file {file_name}: {e}")

    return decoded_data

# Directory for decoded files
output_dir = 'chunky_decoded'
os.makedirs(output_dir, exist_ok=True)

# Path to your chunky.html file
html_file_path = 'chunky.html'

html_content = read_html_file(html_file_path)
base64_data = extract_base64_data(html_content)
decoded_data = decode_and_decompress_data(base64_data)

# Write the decoded data to files in the specified directory
for file_name, data in decoded_data.items():
    output_path = os.path.join(output_dir, file_name)
    with open(output_path, 'wb') as file:
        file.write(data)
        print(f"Decoded data written to {output_path}")

def launch_qemu(image_directory, memory='512', boot_device='a'):
    # Find image files in the specified directory
    for file_name in os.listdir(image_directory):
        if file_name.endswith('.img'):  # Adjust the condition based on your file types
            img_file_path = os.path.join(image_directory, file_name)
            
            # Construct QEMU command
            qemu_command = [
                "qemu-system-i386", 
                "-m", memory, 
                "-boot", boot_device, 
                "-fda", img_file_path
            ]

            # Launch QEMU
            print(f"Launching QEMU with command: {' '.join(qemu_command)}")
            subprocess.run(qemu_command)

            # Assuming one image file per run; break after the first
            break

# Directory where the decoded images are stored
chunky_decoded_dir = 'chunky_decoded'

# Launch QEMU
launch_qemu(chunky_decoded_dir)
