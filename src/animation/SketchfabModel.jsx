import React from 'react';

export default function SketchfabModel() {
  return (
    <div className="sketchfab-embed-wrapper">
      <iframe
        title="Need some space?"
        frameBorder="0"
        allowFullScreen
        mozallowfullscreen="true"
        webkitallowfullscreen="true"
        allow="autoplay; fullscreen; xr-spatial-tracking"
        xr-spatial-tracking="true"
        execution-while-out-of-viewport="true"
        execution-while-not-rendered="true"
        web-share="true"
        width="100%"
        height="480"
        src="https://sketchfab.com/models/d6521362b37b48e3a82bce4911409303/embed"
      ></iframe>

      <p style={{ fontSize: '13px', color: '#4A4A4A', margin: '5px' }}>
        <a
          href="https://sketchfab.com/3d-models/need-some-space-d6521362b37b48e3a82bce4911409303"
          target="_blank"
          rel="noopener noreferrer"
          style={{ fontWeight: 'bold', color: '#1CAAD9' }}
        >
          Need some space?
        </a>{' '}
        by{' '}
        <a
          href="https://sketchfab.com/norgeotloic"
          target="_blank"
          rel="noopener noreferrer"
          style={{ fontWeight: 'bold', color: '#1CAAD9' }}
        >
          Loïc Norgeot
        </a>{' '}
        on{' '}
        <a
          href="https://sketchfab.com"
          target="_blank"
          rel="noopener noreferrer"
          style={{ fontWeight: 'bold', color: '#1CAAD9' }}
        >
          Sketchfab
        </a>
      </p>
    </div>
  );
}
