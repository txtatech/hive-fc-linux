
#!/bin/bash

# Variables
disk_image="freedos.boot.disk.1.4MB.img"
assembly_file="cygwinlite.exe"
mount_point="./mount_dir"

# Check if the disk image and assembly file exist
if [[ ! -e "$disk_image" ]]; then
    echo "Disk image not found: $disk_image"
    exit 1
fi

if [[ ! -e "$assembly_file" ]]; then
    echo "Assembly file not found: $assembly_file"
    exit 1
fi

# Create a mount point
if [[ ! -d "$mount_point" ]]; then
    mkdir "$mount_point"
fi

# Mount the disk image
sudo mount -o loop "$disk_image" "$mount_point"

# Check if mount was successful
if [[ $? -ne 0 ]]; then
    echo "Failed to mount the disk image"
    rmdir "$mount_point"
    exit 1
fi

# Copy the assembly file to the mounted image
cp "$assembly_file" "$mount_point"

# Check if copy was successful
if [[ $? -ne 0 ]]; then
    echo "Failed to copy the file to the disk image"
    sudo umount "$mount_point"
    rmdir "$mount_point"
    exit 1
fi

# Unmount the disk image
sudo umount "$mount_point"

# Check if unmount was successful
if [[ $? -ne 0 ]]; then
    echo "Failed to unmount the disk image"
    rmdir "$mount_point"
    exit 1
fi

# Cleanup
rmdir "$mount_point"

echo "The assembly file has been successfully added to the disk image."

# End of the script
