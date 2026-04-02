// create-images.js - Generate placeholder images
const fs = require('fs');
const path = require('path');

// Create images directory if it doesn't exist
const imagesDir = path.join(__dirname, 'public', 'images');
if (!fs.existsSync(imagesDir)) {
  fs.mkdirSync(imagesDir, { recursive: true });
  console.log('✓ Images directory created');
}

// SVG placeholders for each destination
const placeholders = {
  'cancun.jpg': {
    title: 'Cancun, Mexico',
    emoji: '🏖️',
    gradient: ['#00d4ff', '#0099ff']
  },
  'barbados.jpg': {
    title: 'Barbados',
    emoji: '🌴',
    gradient: ['#ff6b6b', '#ee5a6f']
  },
  'tahiti.jpg': {
    title: 'Tahiti, French Polynesia',
    emoji: '🌺',
    gradient: ['#a8edea', '#fed6e3']
  },
  'riviera.jpg': {
    title: 'Riviera Maya',
    emoji: '⛱️',
    gradient: ['#ffecd2', '#fcb69f']
  },
  'panama.jpg': {
    title: 'Panama',
    emoji: '🌊',
    gradient: ['#667eea', '#764ba2']
  }
};

Object.entries(placeholders).forEach(([filename, data]) => {
  const svg = `<svg width="800" height="600" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:${data.gradient[0]};stop-opacity:1" />
        <stop offset="100%" style="stop-color:${data.gradient[1]};stop-opacity:1" />
      </linearGradient>
    </defs>
    <rect width="800" height="600" fill="url(#grad)"/>
    <text x="400" y="250" font-size="120" text-anchor="middle" fill="white" opacity="0.8">${data.emoji}</text>
    <text x="400" y="350" font-size="48" text-anchor="middle" fill="white" font-weight="bold">${data.title}</text>
    <text x="400" y="420" font-size="24" text-anchor="middle" fill="white" opacity="0.8">Beautiful Destination</text>
  </svg>`;

  fs.writeFileSync(path.join(imagesDir, filename), svg);
  console.log(`✓ Created ${filename}`);
});

console.log('\n✅ All placeholder images created successfully!');