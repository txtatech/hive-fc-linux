import os
import json

def create_folder_for_file(file_name, templates_dir):
    folder_name = f'hive_{file_name}'
    full_path = os.path.join(templates_dir, folder_name)  # Get full path within templates directory
    try:
        os.makedirs(full_path, exist_ok=True)
        print(f"Created folder: {full_path}")  # Debugging
    except Exception as e:
        print(f"Error creating folder {full_path}: {e}")  # Debugging
    return full_path

def create_html_post_template(file_name, chunk, index):
    # Embed the JSON content as-is with Markdown code breaks
    html_content = f"<html><body><h1>{file_name} - Chunk {index}</h1><pre><code>{json.dumps(chunk, indent=4)}</code></pre></body></html>"
    return html_content

def generate_post_templates_from_chunks(chunks_dir, templates_dir):
    # Ensure the templates directory exists
    if not os.path.exists(templates_dir):
        os.makedirs(templates_dir, exist_ok=True)

    print(f"Reading chunks from directory: {chunks_dir}")  # Debugging

    if not os.path.exists(chunks_dir):
        print(f"Directory not found: {chunks_dir}")
        return

    for file in os.listdir(chunks_dir):
        print(f"Processing file: {file}")  # Debugging

        parts = file.split('_')
        file_name = '_'.join(parts[:-2])  # Assuming the file format is 'name_chunks_chunk[number].json'
        index = parts[-1].split('.')[0]  # Extract the chunk number

        file_path = os.path.join(chunks_dir, file)
        try:
            with open(file_path, 'r') as f:
                chunk_data = json.load(f)
        except Exception as e:
            print(f"Error reading file {file_path}: {e}")  # Debugging
            continue

        folder_path = create_folder_for_file(file_name, templates_dir)
        html_content = create_html_post_template(file_name, chunk_data, index)

        output_file = os.path.join(folder_path, f'chunk_{index}.html')
        try:
            with open(output_file, 'w') as f:
                f.write(html_content)
            print(f"Created file: {output_file}")  # Debugging
        except Exception as e:
            print(f"Error creating file {output_file}: {e}")  # Debugging

if __name__ == "__main__":
    chunks_dir = 'outputs/chunks'
    templates_dir = 'templates'  # The directory where all folders will be created
    generate_post_templates_from_chunks(chunks_dir, templates_dir)
