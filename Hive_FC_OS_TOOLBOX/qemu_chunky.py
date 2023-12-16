import subprocess
import os

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
