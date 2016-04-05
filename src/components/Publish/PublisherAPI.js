// Publisher Address Registration method
// Purpose: Register a publisher address with Alexandria.
// Parameters: a requested name and a callback.
// Returns: Nothing other than what is returned in the callback.
void registerPublisherAddress(requestedName, callback){ }

// Florincoin Address generation method
// Purpose: Create a new florincoin address for use in the publisher.
// Parameters: a callback function that can take the generated address as a string.
// Returns: Nothing other than what is returned in the callback.
void generateFlorinAddress(callback){ }

// IPFS file add method
// Purpose: Add a file with the given path to IPFS 
// Parameters: A file path, example: `/Users/sky/Desktop/music.mp3` this should accept and work with both Windows paths and Mac/Linux paths.
// Returns: callback with a boolean of if the add was successful along with the IPFS hash.
void addFileToIPFS(filePath, callback){ }

// Artifact Publish method
// Purpose: Publish the artifact using the schema below to Alexandria
// Parameters: json schema as outlined below along with a callback on success/failure.
// Returns: Nothing other than what is returned in the callback.
void publishArtifact(jsonSchema, callback){ }