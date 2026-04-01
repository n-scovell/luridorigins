import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const inputDir = path.join(process.cwd(), 'original');
const outputDir = path.join(process.cwd(), 'public/images/processed');

const sizes = {
  thumb: 90,
  large: 600,
  xlarge: 1200,
};

// create folders
for (const key of Object.keys(sizes)) {
  fs.mkdirSync(path.join(outputDir, key), { recursive: true });
}

// get jpg files
const files = fs.readdirSync(inputDir).filter(file =>
  file.toLowerCase().endsWith('.jpg')
);

async function LuridOriginsImageOptimization() {
  for (const file of files) {
    const inputPath = path.join(inputDir, file);
    const fileName = path.parse(file).name;
    // for (const [label, width] of Object.entries(sizes)) {
    //   const outputPath = path.join(outputDir, label, `${fileName}.jpg`);
    //   await sharp(inputPath)
    //     .resize({ width })
    //     .jpeg({ quality: 70, progressive: true })
    //     .toFile(outputPath);
    //     console.log(`✔ ${label}: ${file}`);
    // }
    const findThumb = path.join(outputDir, 'thumb', `${fileName}.jpg`)
    const findLarge = path.join(outputDir, 'large', `${fileName}.webp`)
    const findXLarge = path.join(outputDir, 'xlarge', `${fileName}.webp`)
    if (!fs.existsSync(findThumb)) {
      await sharp(inputPath)
        .resize({ width: sizes.thumb })
        .jpeg({ quality: 70, progressive: true })
        .toFile(path.join(outputDir, 'thumb', `${fileName}.jpg`));
        console.log(`✔ Thumb jpg file made: ${file}`);
    }
    if (!fs.existsSync(findLarge)) {
      await sharp(inputPath)
        .resize({ width: sizes.large })
        .webp({ quality: 85 })
        .toFile(path.join(outputDir, 'large', `${fileName}.webp`));
        console.log(`✔ Large poster webp made: ${file}`);
    }
    if (!fs.existsSync(findXLarge)) {
      const watermark = "original/watermark.png"
      await sharp(inputPath)
        .resize({ width: sizes.xlarge })
        // .composite([{input: watermark, gravity: "northwest"},])
        .webp({ quality: 85 })
        .toFile(path.join(outputDir, 'xlarge', `${fileName}.webp`));
        console.log(`✔ XLarge poster webp made: ${file}`);
    }
  }
}
LuridOriginsImageOptimization();