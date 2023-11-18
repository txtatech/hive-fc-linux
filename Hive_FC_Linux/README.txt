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

# MORE TO DO

Incorporating an integrity checking mechanism in the last assembled block. 
This ensures that the entire set of data, once reconstructed from the blockchain, is complete and unaltered. 

Here's a potential method for it:

### 1. **Checksum or Hash Generation**:
   - When initially chunking the data, generate a checksum or a hash of the entire file (e.g., the full Linux ISO).
   - This checksum/hash should be a part of the final block or a separate dedicated block for verification purposes.

### 2. **Storage of Checksum/Hash**:
   - Store this checksum/hash in the blockchain, either in the last block of the chunk series or in a separate, clearly referenced block.
   - Ensure this block is easily identifiable and retrievable.

### 3. **Reconstruction and Verification**:
   - After reconstructing the file from its chunks, calculate its checksum/hash again.
   - Compare this with the stored checksum/hash from the blockchain.
   - If they match, the integrity of the file is confirmed. If not, it indicates potential corruption or tampering.

### 4. **Smart Contract Integration** (Optional):
   - If using smart contracts, you can automate this process. The contract can refuse to execute further actions if the integrity check fails, adding an additional layer of security and automation.

### 5. **User Feedback**:
   - Provide clear feedback to the user about the result of the integrity check. If the check fails, offer options to retry the download or report the issue.

### 6. **Security Considerations**:
   - Since the checksum/hash is publicly stored on the blockchain, ensure that it does not expose sensitive data or create vulnerabilities.

### 7. **Choice of Algorithm**:
   - Choose a robust and widely-accepted algorithm for checksum/hash generation, like SHA-256, to ensure reliability and security.

### 8. **Handling Data Changes**:
   - If the data is updated, the checksum/hash will need to be recalculated and updated on the blockchain to maintain integrity.

# CONSIDERATIONS

The 57 JSON files represent 57 chunks that would correspond to 57 blocks of data on the Hive blockchain which is a manageable number
for a blockchain-based project, especially one as innovative as hosting a Linux distribution in a decentralized manner.

### Implications:

1. **Blockchain Efficiency**: Storing 57 blocks of data is relatively efficient in the context of a blockchain. It suggests that your chunking strategy is effectively minimizing the blockchain storage footprint.

2. **Data Reconstruction**: Each of these 57 chunks would need to be sequentially retrieved and reconstructed to form the original files (like the Linux ISO, BIOS files, etc.). This process should be carefully designed to ensure data integrity and order.

3. **Cost and Resource Considerations**: While 57 blocks is manageable, it's important to consider the cost and resources required for writing and reading these blocks on the Hive blockchain. This includes network fees, if applicable, and the computational effort needed to reconstruct the data.

4. **Smart Contract Integration**: If these chunks are to be integrated into smart contracts, the contracts would need to be designed to handle the retrieval and assembly of these chunks efficiently. This could include mechanisms for verifying the integrity of the data and ensuring that it remains tamper-proof.

5. **Scalability and Updates**: If you plan to update these files or add more distributions in the future, consider how this will affect the number of blocks used and the scalability of your project on the blockchain.

6. **User Experience**: From a user perspective, the process of spinning up a Linux distribution using this data should be as seamless as possible. This might require additional layers of software to interface between the blockchain data and the end-user.