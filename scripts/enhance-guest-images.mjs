/**
 * Upscale guest headshots for the site.
 *
 * Always uses Sharp (Lanczos + sharpen) to produce /public/guests/hi/*.jpg.
 * Optionally enhances with Gemini when GEMINI_API_KEY is set.
 *
 * Usage: node scripts/enhance-guest-images.mjs
 */

import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";
import { GoogleGenAI } from "@google/genai";

const ROOT = path.resolve(import.meta.dirname, "..");
const GUESTS_DIR = path.join(ROOT, "public/guests");
const HI_DIR = path.join(GUESTS_DIR, "hi");
const TARGET_WIDTH = 1600;

const GUEST_SOURCES = {
  "bob-knakal": ["bob-knakal.jpg"],
  "jeff-gural": ["jeff-gural.jpg", "jeff-gural.png"],
  "stephen-siegel": ["stephen-siegel.jpg"],
  "bess-freedman": ["bess-freedman.jpg", "bess-freedman.png"],
  "eric-benaim": ["eric-benaim.jpg", "eric-benaim.png"],
  "michael-shah": ["michael-shah.jpg", "michael-shah.png"],
  "jay-neveloff": ["jay-neveloff.png", "jay-neveloff.jpg"],
  "eric-brody": ["eric-brody.jpg", "eric-brody.png"],
};

async function pickBestSource(slug, files) {
  let best = null;
  let bestPixels = 0;

  for (const file of files) {
    const fullPath = path.join(GUESTS_DIR, file);
    try {
      const meta = await sharp(fullPath).metadata();
      const pixels = (meta.width ?? 0) * (meta.height ?? 0);
      if (pixels > bestPixels) {
        bestPixels = pixels;
        best = fullPath;
      }
    } catch {
      // skip missing files
    }
  }

  if (!best) {
    throw new Error(`No source image found for ${slug}`);
  }

  return best;
}

async function upscaleWithSharp(sourcePath, outputPath) {
  await sharp(sourcePath)
    .rotate()
    .resize({
      width: TARGET_WIDTH,
      fit: "inside",
      withoutEnlargement: false,
      kernel: sharp.kernel.lanczos3,
    })
    .sharpen({ sigma: 0.8, m1: 0.5, m2: 0.3 })
    .jpeg({ quality: 92, mozjpeg: true })
    .toFile(outputPath);
}

async function enhanceWithGemini(sourcePath, outputPath) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return false;

  const ai = new GoogleGenAI({ apiKey });
  const buffer = await fs.readFile(sourcePath);
  const base64 = buffer.toString("base64");
  const mimeType = sourcePath.endsWith(".png") ? "image/png" : "image/jpeg";

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash-preview-image-generation",
      contents: [
        {
          role: "user",
          parts: [
            {
              inlineData: { mimeType, data: base64 },
            },
            {
              text: "Enhance this professional portrait headshot to high resolution studio quality. Preserve the person's exact likeness, expression, clothing, and framing. Output a crisp, photorealistic result suitable for a premium editorial website hero image. No text or watermarks.",
            },
          ],
        },
      ],
      config: {
        responseModalities: ["IMAGE", "TEXT"],
      },
    });

    const parts = response.candidates?.[0]?.content?.parts ?? [];
    for (const part of parts) {
      if (part.inlineData?.data) {
        const enhanced = Buffer.from(part.inlineData.data, "base64");
        await sharp(enhanced)
          .rotate()
          .resize({
            width: TARGET_WIDTH,
            fit: "inside",
            withoutEnlargement: false,
          })
          .jpeg({ quality: 92, mozjpeg: true })
          .toFile(outputPath);
        return true;
      }
    }
  } catch (error) {
    console.warn(`Gemini enhancement skipped for ${path.basename(sourcePath)}:`, error.message);
  }

  return false;
}

async function main() {
  await fs.mkdir(HI_DIR, { recursive: true });

  const useGemini = Boolean(process.env.GEMINI_API_KEY);
  console.log(
    useGemini
      ? "Enhancing guest images with Gemini + Sharp fallback..."
      : "Upscaling guest images with Sharp (set GEMINI_API_KEY for AI enhancement)..."
  );

  for (const [slug, files] of Object.entries(GUEST_SOURCES)) {
    const source = await pickBestSource(slug, files);
    const outputPath = path.join(HI_DIR, `${slug}.jpg`);
    const tempPath = path.join(HI_DIR, `${slug}.sharp.jpg`);

    await upscaleWithSharp(source, tempPath);

    const geminiApplied = useGemini
      ? await enhanceWithGemini(tempPath, outputPath)
      : false;

    if (!geminiApplied) {
      await fs.rename(tempPath, outputPath);
    } else {
      await fs.unlink(tempPath).catch(() => {});
    }

    const meta = await sharp(outputPath).metadata();
    console.log(`✓ ${slug}: ${meta.width}x${meta.height}${geminiApplied ? " (Gemini)" : ""}`);
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
