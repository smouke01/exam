// src/context/GalleryContext.js
import React, { createContext, useContext, useState } from "react";

const GalleryContext = createContext();

export const useGallery = () => useContext(GalleryContext);

export const GalleryProvider = ({ children }) => {
  const [customImages, setCustomImages] = useState([]);

  const addImage = (img) => {
    setCustomImages((prev) => [...prev, img]);
  };

  return (
    <GalleryContext.Provider value={{ customImages, addImage }}>
      {children}
    </GalleryContext.Provider>
  );
};
