import React from 'react';

import './Avatar.css';

export default function Avatar({ image, alt }) {
  return (
    <div className={`avatar ${image.className}`} style={image.style}>
      <img
        src={image}
        alt={alt}
        style={{ width: image.width, height: image.width }}
      />
    </div>
  );
};