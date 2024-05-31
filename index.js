const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const originalPath = 'C:\\Program Files (x86)\\Steam\\steamapps\\common\\Geometry Dash\\Resources\\streak_01_001.png';
const tempPath = 'C:\\Program Files (x86)\\Steam\\steamapps\\common\\Geometry Dash\\Resources\\streak_01_001_temp.png';

sharp(originalPath)
  .metadata()
  .then(({ width, height }) => {
    return sharp({
      create: {
        width: width,
        height: height,
        channels: 4,
        background: { r: 0, g: 0, b: 0, alpha: 0 }
      }
    })
    .png()
    .toFile(tempPath);
  })
  .then(() => {
    fs.unlink(originalPath, err => {
      if (err) {
        console.error(err);
        return;
      }
      fs.rename(tempPath, originalPath, err => {
        if (err) {
          console.error(err);
        } else {
          console.log('Trail Texture Removed! You can now play Geometry Dash with no trail texture!');
        }
      });
    });
  })
  .catch(err => {
    console.error(err);
  });