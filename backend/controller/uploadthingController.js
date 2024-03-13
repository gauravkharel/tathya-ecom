const { FileUploader } = require('uploadthing');

// Configure Uploadthing
const uploadthing = new FileUploader({ /* Uploadthing configuration */ });

exports.uploadFile = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file provided' });
  }

  try {
    // Upload the file to Uploadthing
    const uploadedFile = await uploadthing.upload({
      source: req.file.buffer,
      filename: req.file.originalname,
    });

    // task: save the url in the db
    res.status(200).json({ fileUrl: uploadedFile.fileUrl });
  } catch (error) {
    console.error('Error uploading file:', error);
    res.status(500).json({ error: 'Failed to upload file' });
  }
};