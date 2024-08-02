import React, { useCallback, useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { useNavigate } from "react-router-dom";
import "../styles/SearchPage.css";

const SearchPage = () => {
  const navigate = useNavigate();
  const [previewUrl, setPreviewUrl] = useState("");
  const [matchedImages, setMatchedImages] = useState([]); // Store matched images as an array

  const onDrop = useCallback(async (acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      const formData = new FormData();
      formData.append("file", file);

      try {
        const response = await fetch("http://localhost:5000/upload", {
          method: "POST",
          body: formData,
        });

        if (response.ok) {
          const data = await response.json();
          const matchedImagesData = data.matched_images || []; // Get matched images

          // Create URLs for each matched image
          const matchedImagesUrls = matchedImagesData.map((imageData) => ({
            url: `http://localhost:5000/matched-images/${imageData.file_name}`,
            matchRate: imageData.match_rate,
          }));
          setMatchedImages(matchedImagesUrls);
        } else {
          console.error("Failed to upload image");
        }
      } catch (error) {
        console.error("Error uploading image:", error);
      }

      const preview = URL.createObjectURL(file);
      setPreviewUrl(preview);

      // Cleanup URL on component unmount
      return () => {
        URL.revokeObjectURL(preview);
      };
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: "image/jpeg, image/png, image/jpg", // Accepting multiple image formats
  });

  const handleSearch = () => {
    navigate("/result", { state: { uploadedImage: previewUrl, matchedImages } });
  };

  useEffect(() => {
    // Cleanup on component unmount
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  return (
    <div className="search-page">
      <header className="search-header">
        <h1>Upload and Search</h1>
      </header>
      <main className="search-main">
        {previewUrl ? (
          <div className="preview-container">
            <img src={previewUrl} alt="Uploaded file preview" />
            <button className="search-button" onClick={handleSearch}>
              SEARCH
            </button>
          </div>
        ) : (
          <div
            {...getRootProps({
              className: "dropzone",
            })}
          >
            <input {...getInputProps()} />
            {isDragActive ? (
              <p>Drop the files here ...</p>
            ) : (
              <p>Drag 'n' drop some files here, or click to select files</p>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default SearchPage;
