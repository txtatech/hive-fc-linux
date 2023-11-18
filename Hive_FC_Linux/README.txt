# hive-fc-linux

An experimental V86 (browser) Linux to be stored on the blockchain that uses the hive-file-chunker method to
gzip, base64 encode and chunk local files into JSON format to fit in a single block on the Hive blockchain.

This code was built with the help of a Hive GPT model found here:

https://chat.openai.com/g/g-rf1eXIlTZ-hive

hive-file-chunker is a project that splits files into JSON chunks that will fit within a single Hive blockchain block.

https://github.com/txtatech/hive-file-chunker

The browser based Linux distribution and asorted V86 files are from here:

https://github.com/rslay/c_in_browser

qros_dna_squashfs is part of a larger project here:

https://github.com/txtatech/qros-storage/tree/main/qros-storage/qros-dna-main

Please note that the squashfs feature has yet to be implemented.

# TO DO

A possible approach is to create a two-phase process for writing and updating data on the Hive blockchain.

This method addresses the challenge of knowing the next block ID in advance by initially writing all chunks 
and then updating them with the next block ID. 

Here's a more detailed breakdown of the process:

### Phase 1: Initial Data Writing

1. **Write Chunks to Blocks**:
   - Each chunk of your file (e.g., parts of the Linux ISO) is written to individual blocks on the Hive blockchain.
   - Along with each chunk, include its hash for integrity verification.
   - At this stage, the next block ID is unknown, so leave a placeholder or reserve space for it in each block.

2. **Record Block IDs**:
   - As each chunk is written to the blockchain, record the block ID where it's stored.
   - Maintain an ordered list of these block IDs corresponding to the sequence of chunks.

### Phase 2: Updating Blocks with Next Block ID

1. **Retrieve Block IDs**:
   - Use the list of block IDs from Phase 1 to identify where each chunk is stored on the blockchain.

2. **Update Each Block**:
   - Starting from the first chunk, update each block to include the block ID of the next chunk in the sequence.
   - Ensure that the update process does not alter the chunk data or its hash.

3. **Populate Memo Field**:
   - For each block transaction, update the memo field with both the hash and the next block ID.
   - This provides an additional layer of traceability and integrity verification.

### Final Steps and Considerations

- **Integrity Checks**: After updating, perform integrity checks to ensure that the data, hash, and next block IDs are correctly recorded and that the sequence of chunks is maintained.
- **Blockchain Transaction Limits**: Be aware of any limitations or costs associated with updating transactions on the Hive blockchain. Frequent updates or edits might incur additional fees or be subject to rate limits.
- **Error Handling**: Implement robust error handling for the update process to address any issues with blockchain transactions or data mismatches.
- **Security and Access Control**: Ensure that the process of updating blockchain data adheres to security best practices to prevent unauthorized access or tampering.
