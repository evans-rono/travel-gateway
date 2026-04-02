const fs = require('fs');
const path = require('path');

const imagesDir = path.join(__dirname, 'public', 'images');
if (!fs.existsSync(imagesDir)) {
  fs.mkdirSync(imagesDir, { recursive: true });
  console.log('✓ Images directory created');
}

// SVG images saved as .svg files instead of .jpg
const images = {
  'cancun.svg': `<svg width="800" height="600" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="sky" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" style="stop-color:#87CEEB;stop-opacity:1" />
        <stop offset="100%" style="stop-color:#E0F6FF;stop-opacity:1" />
      </linearGradient>
      <linearGradient id="water" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" style="stop-color:#00BFFF;stop-opacity:1" />
        <stop offset="100%" style="stop-color:#1E90FF;stop-opacity:1" />
      </linearGradient>
    </defs>
    <rect width="800" height="300" fill="url(#sky)"/>
    <circle cx="700" cy="80" r="60" fill="#FFD700" opacity="0.8"/>
    <rect y="300" width="800" height="300" fill="url(#water)"/>
    <rect y="350" width="800" height="250" fill="#F4A460"/>
    <text x="400" y="250" font-size="60" text-anchor="middle" fill="white" font-weight="bold" font-family="Arial">CANCUN</text>
    <text x="400" y="320" font-size="32" text-anchor="middle" fill="white" opacity="0.9" font-family="Arial">Paradise Beach</text>
  </svg>`,

  'barbados.svg': `<svg width="800" height="600" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="sky2" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" style="stop-color:#87CEEB;stop-opacity:1" />
        <stop offset="100%" style="stop-color:#FFB6C1;stop-opacity:1" />
      </linearGradient>
    </defs>
    <rect width="800" height="600" fill="url(#sky2)"/>
    <line x1="150" y1="400" x2="150" y2="250" stroke="#8B4513" stroke-width="8"/>
    <circle cx="150" cy="220" r="50" fill="#228B22"/>
    <line x1="650" y1="420" x2="650" y2="280" stroke="#8B4513" stroke-width="8"/>
    <circle cx="650" cy="250" r="50" fill="#228B22"/>
    <rect y="450" width="800" height="150" fill="#D2B48C"/>
    <rect y="500" width="800" height="100" fill="#20B2AA"/>
    <text x="400" y="250" font-size="60" text-anchor="middle" fill="white" font-weight="bold" font-family="Arial">BARBADOS</text>
    <text x="400" y="370" font-size="32" text-anchor="middle" fill="white" font-family="Arial">Tropical Paradise</text>
  </svg>`,

  'tahiti.svg': `<svg width="800" height="600" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="sky3" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" style="stop-color:#FFB6D9;stop-opacity:1" />
        <stop offset="100%" style="stop-color:#87CEEB;stop-opacity:1" />
      </linearGradient>
    </defs>
    <rect width="800" height="600" fill="url(#sky3)"/>
    <polygon points="400,150 200,450 600,450" fill="#4169E1" opacity="0.7"/>
    <rect y="450" width="800" height="150" fill="#00CED1"/>
    <circle cx="350" cy="200" r="20" fill="#FF69B4"/>
    <circle cx="450" cy="220" r="20" fill="#FF1493"/>
    <text x="400" y="280" font-size="60" text-anchor="middle" fill="white" font-weight="bold" font-family="Arial">TAHITI</text>
    <text x="400" y="350" font-size="32" text-anchor="middle" fill="white" font-family="Arial">Island Paradise</text>
  </svg>`,

  'riviera.svg': `<svg width="800" height="600" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="sky4" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" style="stop-color:#87CEEB;stop-opacity:1" />
        <stop offset="100%" style="stop-color:#FFDAB9;stop-opacity:1" />
      </linearGradient>
    </defs>
    <rect width="800" height="600" fill="url(#sky4)"/>
    <circle cx="100" cy="100" r="50" fill="#FFD700" opacity="0.8"/>
    <ellipse cx="400" cy="350" rx="200" ry="150" fill="#20B2AA"/>
    <ellipse cx="200" cy="400" rx="80" ry="60" fill="#A0826D"/>
    <ellipse cx="600" cy="420" rx="100" ry="70" fill="#A0826D"/>
    <text x="400" y="280" font-size="60" text-anchor="middle" fill="white" font-weight="bold" font-family="Arial">RIVIERA MAYA</text>
    <text x="400" y="350" font-size="32" text-anchor="middle" fill="white" font-family="Arial">Cenote Paradise</text>
  </svg>`,

  'panama.svg': `<svg width="800" height="600" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="sky5" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" style="stop-color:#87CEEB;stop-opacity:1" />
        <stop offset="100%" style="stop-color:#90EE90;stop-opacity:1" />
      </linearGradient>
    </defs>
    <rect width="800" height="600" fill="url(#sky5)"/>
    <rect x="250" y="250" width="300" height="200" fill="#4682B4" opacity="0.7"/>
    <rect x="350" y="320" width="100" height="40" fill="#DC143C"/>
    <polygon points="400,320 420,280 380,280" fill="#FFD700"/>
    <line x1="100" y1="400" x2="100" y2="300" stroke="#228B22" stroke-width="8"/>
    <circle cx="100" cy="270" r="40" fill="#228B22"/>
    <line x1="700" y1="420" x2="700" y2="300" stroke="#228B22" stroke-width="8"/>
    <circle cx="700" cy="270" r="40" fill="#228B22"/>
    <text x="400" y="150" font-size="60" text-anchor="middle" fill="white" font-weight="bold" font-family="Arial">PANAMA</text>
    <text x="400" y="220" font-size="32" text-anchor="middle" fill="white" font-family="Arial">Canal Paradise</text>
  </svg>`
};

Object.entries(images).forEach(([filename, content]) => {
  fs.writeFileSync(path.join(imagesDir, filename), content);
  console.log(`✓ Created ${filename}`);
});

console.log('\n✅ All images created successfully!');