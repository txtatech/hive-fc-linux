#!/bin/bash

# Define variables
IMG_FILE="freedos.boot.disk.160K.img"
MOUNT_POINT="./freedos_mount"
ZIP_FILE="freedos_contents.zip"

# Check if the IMG file exists
if [ ! -f "$IMG_FILE" ]; then
    echo "Error: File $IMG_FILE not found!"
    exit 1
fi

# Create a directory to mount the IMG file
mkdir -p "$MOUNT_POINT"

# Mount the IMG file
sudo mount -o loop "$IMG_FILE" "$MOUNT_POINT"

# Check if the mount was successful
if [ $? -ne 0 ]; then
    echo "Error: Failed to mount $IMG_FILE!"
    exit 1
fi

# Create a zip file of the mounted contents
zip -r "$ZIP_FILE" "$MOUNT_POINT"

# Unmount the IMG file
sudo umount "$MOUNT_POINT"

# Clean up: Remove the mount point directory
rmdir "$MOUNT_POINT"

# Check if the ZIP file was created successfully
if [ -f "$ZIP_FILE" ]; then
    echo "Successfully created $ZIP_FILE"
else
    echo "Error: Failed to create zip file!"
fi
