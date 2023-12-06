#!/bin/bash

# Define the directory and output file
DIRECTORY="freedos_mount"
OUTPUT_FILE="directory_tree.txt"

# Function to generate the tree view
generate_tree() {
    local directory=$1
    local indent=$2
    local prefix=$3

    for file in "$directory"/*; do
        if [ -d "$file" ]; then
            echo "${prefix}$(basename "$file")/" >> "$OUTPUT_FILE"
            generate_tree "$file" "$((indent + 1))" "$prefix    "
        else
            echo "${prefix}$(basename "$file")" >> "$OUTPUT_FILE"
        fi
    done
}

# Check if the directory exists
if [ ! -d "$DIRECTORY" ]; then
    echo "Directory $DIRECTORY does not exist."
    exit 1
fi

# Create or clear the output file
: > "$OUTPUT_FILE"

# Start generating the tree view
echo "$DIRECTORY/" > "$OUTPUT_FILE"
generate_tree "$DIRECTORY" 0 ""

# Output completion message
echo "Directory tree has been saved to $OUTPUT_FILE"
