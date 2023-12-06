import os
import hashlib

# Specify the directory where your JSON files are located
json_directory = "outputs/chunks"

# Specify the central ledger file where you want to log the hashes and filenames
ledger_file = "hashledger.txt"

# Ensure the ledger file exists or create it if it doesn't
with open(ledger_file, 'a') as f:
    pass

# Get a list of all JSON files in the input directory and sort them
json_files = [f for f in os.listdir(json_directory) if f.endswith('.json')]
json_files.sort()

# Iterate through the sorted JSON files
for json_file in json_files:
    json_file_path = os.path.join(json_directory, json_file)

    # Calculate the MD5 hash for each JSON file
    md5_hash = hashlib.md5()
    with open(json_file_path, 'rb') as f:
        while chunk := f.read(4096):
            md5_hash.update(chunk)
    file_hash = md5_hash.hexdigest()

    # Get the filename without the path
    filename = os.path.basename(json_file_path)

    # Log the hash and filename to the central ledger file
    with open(ledger_file, 'a') as f:
        f.write(f"File: {filename}, Hash: {file_hash}\n")

print(f"Hashes and filenames have been logged to {ledger_file}")
