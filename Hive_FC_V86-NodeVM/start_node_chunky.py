import subprocess
import os

def execute_nodevm(js_directory, nodevm_filename='NodeVM.js'):
    # Change the working directory to js_directory
    os.chdir(js_directory)

    # Check if NodeVM.js exists
    if not os.path.exists(nodevm_filename):
        print(f"NodeVM.js not found in {js_directory}")
        return

    # Construct the Node.js command
    node_command = ["node", nodevm_filename]

    # Execute NodeVM.js with Node.js
    print(f"Executing: {' '.join(node_command)}")
    try:
        subprocess.run(node_command, check=True)
    except subprocess.CalledProcessError as e:
        print(f"An error occurred while executing {nodevm_filename}: {e}")

# Directory where NodeVM.js and its dependencies are stored
js_directory = 'chunky_decoded'

# Execute NodeVM.js with Node.js
execute_nodevm(js_directory)
