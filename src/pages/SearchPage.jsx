import React, { useCallback, useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { useNavigate } from "react-router-dom";
import { logo } from "../assets/logo.png";
import "../styles/SearchPage.css";

const SearchPage = () => {
  const navigate = useNavigate();
  const [previewUrl, setPreviewUrl] = useState("");

  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      const preview = URL.createObjectURL(file);
      setPreviewUrl(preview);

      // Cleanup URL on component unmount
      return () => URL.revokeObjectURL(preview);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const handleSearch = () => {
    navigate("/result", { state: { uploadedImage: previewUrl } });
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
