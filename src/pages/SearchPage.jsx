import React, { useCallback, useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { useNavigate } from "react-router-dom";
import "../styles/SearchPage.css";
import Header from "./Header";
import Footer from "./Footer";
import AnimationComponent from "./AnimationComponent";

const SearchPage = () => {
  const navigate = useNavigate();
  const [previewUrl, setPreviewUrl] = useState("");
  const [matchedImages, setMatchedImages] = useState([]);
  const [isFileProcessing, setIsFileProcessing] = useState(false);
  const [uploadCompleted, setUploadCompleted] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 767);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 767);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const onDrop = useCallback(async (acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      setIsFileProcessing(true);
      const file = acceptedFiles[0];
      const formData = new FormData();
      formData.append("file", file);
      const ipAdd="localhost";
      try {
        const response = await fetch(`http://${ipAdd}:5000/upload`, {
          method: "POST",
          body: formData,
        });

        if (response.ok) {
          const data = await response.json();
          const matchedImagesData = data.matched_images || [];
          const matchedImagesUrls = matchedImagesData.map((imageData) => ({
            url: `http://${ipAdd}:5000/matched-images/${imageData.file_name}`,
            matchRate: imageData.match_rate,
          }));
          setMatchedImages(matchedImagesUrls);
          setUploadCompleted(true);
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
    accept: "image/jpeg, image/png, image/jpg",
  });

  const handleSearch = () => {
    navigate("/result", {
      state: { uploadedImage: previewUrl, matchedImages },
    });
  };

  useEffect(() => {
    if (previewUrl) {
      setIsFileProcessing(false);
    }

    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  return (
    <div className="search-page">
      <Header />
      <main className="search-main">
        {isFileProcessing ? (
          <div className="loading">
            <AnimationComponent />
          </div>
        ) : uploadCompleted ? (
          <div className="preview-container">
            <img src={previewUrl} alt="Uploaded file preview" />
            <button className="search-button" onClick={handleSearch}>
              GET RESULTS
            </button>
          </div>
        ) : (
          <div {...getRootProps({ className: "dropzone" })}>
            <input {...getInputProps()} />
            {isDragActive ? (
              <p>{isMobile ? "Upload or Capture" : "Drop the files here ..."}</p>
            ) : (
              <p>{isMobile ? "Upload or Capture" : "DRAG & DROP"}</p>
            )}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default SearchPage;
