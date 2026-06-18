const fs = require('fs');
const path = require('path');

const IMAGES = [
  '/images/pakistani_wedding_couple.png',
  '/images/pakistani_bride_makeup.png',
  '/images/pakistani_mehndi_hands.png',
  '/images/pakistani_wedding_venue.png'
];

function getRandomImage() {
  return IMAGES[Math.floor(Math.random() * IMAGES.length)];
}

function processDirectory(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      processDirectory(fullPath);
    } else if (fullPath.endsWith('.ts') || fullPath.endsWith('.tsx')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      const regex = /https:\/\/images\.unsplash\.com\/photo-[a-zA-Z0-9\-]+\?[a-zA-Z0-9\-\&=\_\%]+/g;
      
      let modified = false;
      content = content.replace(regex, (match) => {
        modified = true;
        // special cases for specific concepts
        if (fullPath.includes('FeaturedVenues') || fullPath.includes('venue')) return '/images/pakistani_wedding_venue.png';
        if (fullPath.includes('FeaturedSalons') || fullPath.includes('bride')) return '/images/pakistani_bride_makeup.png';
        if (fullPath.includes('FeaturedVendors')) return '/images/pakistani_mehndi_hands.png';
        
        return getRandomImage();
      });

      // Handle cases without query params just in case
      const regex2 = /https:\/\/images\.unsplash\.com\/photo-[a-zA-Z0-9\-]+(?=["'])/g;
      content = content.replace(regex2, (match) => {
        modified = true;
        return getRandomImage();
      });

      if (modified) {
        fs.writeFileSync(fullPath, content, 'utf8');
        console.log('Fixed:', fullPath);
      }
    }
  }
}

processDirectory(path.join(__dirname, 'src'));
console.log('Done fixing images!');
