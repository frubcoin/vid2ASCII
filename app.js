const QUALITY_COLUMNS = {
  low: 80,
  medium: 160,
  high: 240,
};

const ASCII_DENSITY =
  "@$B%8&WM#*oahkbdpqwmZO0QLCJUYXzcvunxrjft/\\|()1{}[]?-_+~<>i!lI;:,\"^`'. ";

const CHAR_SETS = {
  classic: "@$B%8&WM#*oahkbdpqwmZO0QLCJUYXzcvunxrjft/\\|()1{}[]?-_+~<>i!lI;:,\"^`'. ",
  blocks: "\u2588\u2593\u2592\u2591 ",
  minimal: "@#%+=-:. ",
};
const FRAME_DELIMITER = String.fromCharCode(30);
const DEFAULT_COLOR_SMOOTHING = 0.34;
// 4x4 Bayer Matrix for Ordered Dithering (normalized 0-1)
const BAYER_MATRIX = [
  [0 / 16, 8 / 16, 2 / 16, 10 / 16],
  [12 / 16, 4 / 16, 14 / 16, 6 / 16],
  [3 / 16, 11 / 16, 1 / 16, 9 / 16],
  [15 / 16, 7 / 16, 13 / 16, 5 / 16]
];
const FFMPEG_UMD_URL = "https://cdn.jsdelivr.net/npm/@ffmpeg/ffmpeg@0.12.15/dist/umd/ffmpeg.js";
const FFMPEG_UTIL_UMD_URL = "https://cdn.jsdelivr.net/npm/@ffmpeg/util@0.12.1/dist/umd/index.js";
const FFMPEG_CORE_BASE_URL = "https://cdn.jsdelivr.net/npm/@ffmpeg/core@0.12.10/dist/umd";
const THEME_STORAGE_KEY = "ascii-gen-theme";
const AVAILABLE_THEMES = [
  "night",
  "dracula",
  "synthwave",
  "nord",
  "forest",
  "luxury",
  "corporate",
  "cupcake",
  "sunset",
  "lofi",
];
const THEME_FALLBACK_VARS = {
  night: {
    "--color-base-100": "#0b0f1a",
    "--color-base-200": "#111827",
    "--color-base-300": "#1f2937",
    "--color-base-content": "#e5e7eb",
    "--color-primary": "#60a5fa",
    "--color-primary-content": "#031525",
    "--color-secondary": "#22d3ee",
    "--color-secondary-content": "#042f2e",
    "--color-accent": "#a78bfa",
    "--color-accent-content": "#1f1147",
    "--color-neutral": "#111827",
    "--color-neutral-content": "#e5e7eb",
  },
  dracula: {
    "--color-base-100": "#282a36",
    "--color-base-200": "#242633",
    "--color-base-300": "#20222f",
    "--color-base-content": "#f8f8f2",
    "--color-primary": "#ff79c6",
    "--color-primary-content": "#2b0a1f",
    "--color-secondary": "#bd93f9",
    "--color-secondary-content": "#22163b",
    "--color-accent": "#f1fa8c",
    "--color-accent-content": "#272a0a",
    "--color-neutral": "#343746",
    "--color-neutral-content": "#f8f8f2",
  },
  synthwave: {
    "--color-base-100": "#1d1140",
    "--color-base-200": "#23164b",
    "--color-base-300": "#2a1a58",
    "--color-base-content": "#fdf4ff",
    "--color-primary": "#ff5ea8",
    "--color-primary-content": "#2c0619",
    "--color-secondary": "#7afcff",
    "--color-secondary-content": "#032629",
    "--color-accent": "#f9f871",
    "--color-accent-content": "#332f00",
    "--color-neutral": "#2b1f55",
    "--color-neutral-content": "#fdf4ff",
  },
  nord: {
    "--color-base-100": "#2e3440",
    "--color-base-200": "#3b4252",
    "--color-base-300": "#434c5e",
    "--color-base-content": "#eceff4",
    "--color-primary": "#88c0d0",
    "--color-primary-content": "#0c1a20",
    "--color-secondary": "#81a1c1",
    "--color-secondary-content": "#0e1827",
    "--color-accent": "#a3be8c",
    "--color-accent-content": "#15200f",
    "--color-neutral": "#3b4252",
    "--color-neutral-content": "#eceff4",
  },
  forest: {
    "--color-base-100": "#171f1d",
    "--color-base-200": "#1d2724",
    "--color-base-300": "#22302c",
    "--color-base-content": "#e7f2ec",
    "--color-primary": "#22c55e",
    "--color-primary-content": "#05210f",
    "--color-secondary": "#14b8a6",
    "--color-secondary-content": "#04211e",
    "--color-accent": "#84cc16",
    "--color-accent-content": "#142504",
    "--color-neutral": "#1e2a24",
    "--color-neutral-content": "#e7f2ec",
  },
  luxury: {
    "--color-base-100": "#101010",
    "--color-base-200": "#171717",
    "--color-base-300": "#222222",
    "--color-base-content": "#f5f1e8",
    "--color-primary": "#d4af37",
    "--color-primary-content": "#2a1f06",
    "--color-secondary": "#b78b2f",
    "--color-secondary-content": "#291d08",
    "--color-accent": "#e9cf7a",
    "--color-accent-content": "#2d2208",
    "--color-neutral": "#1d1d1d",
    "--color-neutral-content": "#f5f1e8",
  },
  corporate: {
    "--color-base-100": "#ffffff",
    "--color-base-200": "#f3f7fb",
    "--color-base-300": "#dbe4ef",
    "--color-base-content": "#1f2937",
    "--color-primary": "#2563eb",
    "--color-primary-content": "#ecf3ff",
    "--color-secondary": "#0ea5e9",
    "--color-secondary-content": "#062638",
    "--color-accent": "#14b8a6",
    "--color-accent-content": "#04211e",
    "--color-neutral": "#e7edf5",
    "--color-neutral-content": "#1f2937",
  },
  cupcake: {
    "--color-base-100": "#fff7fb",
    "--color-base-200": "#ffeef7",
    "--color-base-300": "#ffddea",
    "--color-base-content": "#3d1f38",
    "--color-primary": "#ec4899",
    "--color-primary-content": "#fff2fa",
    "--color-secondary": "#fb7185",
    "--color-secondary-content": "#3b0c18",
    "--color-accent": "#f59e0b",
    "--color-accent-content": "#352102",
    "--color-neutral": "#ffe9f5",
    "--color-neutral-content": "#3d1f38",
  },
  sunset: {
    "--color-base-100": "#2a1b3d",
    "--color-base-200": "#34224a",
    "--color-base-300": "#402a59",
    "--color-base-content": "#fef3ff",
    "--color-primary": "#fb7185",
    "--color-primary-content": "#3d0d1b",
    "--color-secondary": "#f59e0b",
    "--color-secondary-content": "#3a2300",
    "--color-accent": "#f97316",
    "--color-accent-content": "#3c1700",
    "--color-neutral": "#3a2752",
    "--color-neutral-content": "#fef3ff",
  },
  lofi: {
    "--color-base-100": "#f9fafb",
    "--color-base-200": "#f1f5f9",
    "--color-base-300": "#e2e8f0",
    "--color-base-content": "#111827",
    "--color-primary": "#475569",
    "--color-primary-content": "#f8fafc",
    "--color-secondary": "#64748b",
    "--color-secondary-content": "#f8fafc",
    "--color-accent": "#0f172a",
    "--color-accent-content": "#f8fafc",
    "--color-neutral": "#e2e8f0",
    "--color-neutral-content": "#111827",
  },
};

const elements = {
  videoInput: document.getElementById("videoInput"),
  sourceHint: document.getElementById("sourceHint"),
  animationName: document.getElementById("animationName"),
  savePath: document.getElementById("savePath"),
  fps: document.getElementById("fps"),
  fpsValue: document.getElementById("fpsValue"),
  threshold: document.getElementById("threshold"),
  thresholdValue: document.getElementById("thresholdValue"),
  gamma: document.getElementById("gamma"),
  gammaValue: document.getElementById("gammaValue"),
  fontAspectRatio: document.getElementById("fontAspectRatio"),
  fontAspectValue: document.getElementById("fontAspectValue"),
  enableColor: document.getElementById("enableColor"),
  colorDithering: document.getElementById("colorDithering"),
  colorMode: document.getElementById("colorMode"),
  colorBrightness: document.getElementById("colorBrightness"),
  colorBrightnessValue: document.getElementById("colorBrightnessValue"),
  colorSaturation: document.getElementById("colorSaturation"),
  colorSaturationValue: document.getElementById("colorSaturationValue"),
  colorContrast: document.getElementById("colorContrast"),
  colorContrastValue: document.getElementById("colorContrastValue"),
  paletteSize: document.getElementById("paletteSize"),
  paletteSizeValue: document.getElementById("paletteSizeValue"),
  colorSmoothing: document.getElementById("colorSmoothing"),
  colorSmoothingValue: document.getElementById("colorSmoothingValue"),
  // Background
  enableTransparentBg: document.getElementById("enableTransparentBg"),
  bgLumCutoff: document.getElementById("bgLumCutoff"),
  bgLumCutoffValue: document.getElementById("bgLumCutoffValue"),
  enableBgRemove: document.getElementById("enableBgRemove"),
  bgKeyColor: document.getElementById("bgKeyColor"),
  bgTolerance: document.getElementById("bgTolerance"),
  bgToleranceValue: document.getElementById("bgToleranceValue"),
  // Rendering
  charSet: document.getElementById("charSet"),
  charSetCustomWrap: document.getElementById("charSetCustomWrap"),
  charSetCustom: document.getElementById("charSetCustom"),
  invertMode: document.getElementById("invertMode"),
  ditherAmount: document.getElementById("ditherAmount"),
  ditherAmountValue: document.getElementById("ditherAmountValue"),
  edgeWeight: document.getElementById("edgeWeight"),
  edgeWeightValue: document.getElementById("edgeWeightValue"),
  previewBgColor: document.getElementById("previewBgColor"),
  // Misc
  autoPreview: document.getElementById("autoPreview"),
  themeSelect: document.getElementById("themeSelect"),
  qualityButtons: [...document.querySelectorAll(".quality")],
  togglePreview: document.getElementById("togglePreview"),
  generateFrames: document.getElementById("generateFrames"),
  downloadEmbed: document.getElementById("downloadEmbed"),
  downloadJson: document.getElementById("downloadJson"),
  copySnippet: document.getElementById("copySnippet"),
  statusText: document.getElementById("statusText"),
  progressBar: document.getElementById("progressBar"),
  asciiPreview: document.getElementById("asciiPreview"),
  emptyState: document.getElementById("emptyState"),
  dimensions: document.getElementById("dimensions"),
  embedCode: document.getElementById("embedCode"),
  sourceVideo: document.getElementById("sourceVideo"),
  frameCanvas: document.getElementById("frameCanvas"),
};

const state = {
  sourceUrl: null,
  sourceFile: null,
  videoReady: false,
  previewTimer: null,
  previewRunning: false,
  processing: false,
  frames: [],
  colorFrames: [],
  quality: "low",
  fps: Number(elements.fps.value),
  threshold: Number(elements.threshold.value),
  gamma: Number(elements.gamma.value),
  fontAspectRatio: Number(elements.fontAspectRatio.value),
  enableColor: elements.enableColor.checked,
  colorDithering: elements.colorDithering?.checked ?? true,
  colorMode: elements.colorMode.value,
  colorBrightness: Number(elements.colorBrightness?.value || 1),
  colorSaturation: Number(elements.colorSaturation?.value || 1),
  colorContrast: Number(elements.colorContrast?.value || 1),
  paletteSize: Number(elements.paletteSize?.value || 12),
  colorSmoothingValue: Number(elements.colorSmoothing?.value || DEFAULT_COLOR_SMOOTHING),
  // Background
  enableTransparentBg: false,
  bgLumCutoff: 220,
  enableBgRemove: false,
  bgKeyColor: "#00ff00",
  bgTolerance: 40,
  // Rendering
  charSet: "classic",
  charSetCustom: "@#%+=:-. ",
  invertMode: false,
  ditherAmount: 0.15,
  edgeWeight: 0.36,
  previewBgColor: "#000000",
  // Misc
  autoPreview: elements.autoPreview.checked,
  lastDimensions: { cols: 0, rows: 0 },
  ffmpegReady: false,
  ffmpegLoading: false,
  ffmpeg: null,
  ffmpegApi: null,
  ffmpegAssetUrls: null,
  colorSmoothingCache: { live: null, export: null },
  livePalette: null,
  captureTick: 0,
  buffers: {
    pixelCount: 0,
    luminance: null,
    edges: null,
    colorSample: null,
  },
  theme: "night",
};

const frameCtx = elements.frameCanvas.getContext("2d", { willReadFrequently: true });

init();

function init() {
  initTheme();
  updateSavePath();
  bindRange(elements.fps, elements.fpsValue, (v) => Number(v).toString());
  bindRange(elements.threshold, elements.thresholdValue, (v) => Number(v).toString());
  bindRange(elements.gamma, elements.gammaValue, (v) => Number(v).toFixed(1));
  bindRange(elements.fontAspectRatio, elements.fontAspectValue, (v) =>
    Number(v).toFixed(1)
  );
  bindRange(elements.colorBrightness, elements.colorBrightnessValue, (v) =>
    Number(v).toFixed(2)
  );
  bindRange(elements.colorSaturation, elements.colorSaturationValue, (v) =>
    Number(v).toFixed(2)
  );
  bindRange(elements.colorContrast, elements.colorContrastValue, (v) =>
    Number(v).toFixed(2)
  );
  bindRange(elements.paletteSize, elements.paletteSizeValue, (v) => Number(v).toString());
  bindRange(elements.colorSmoothing, elements.colorSmoothingValue, (v) =>
    Number(v).toFixed(2)
  );
  bindRange(elements.bgLumCutoff, elements.bgLumCutoffValue, (v) => Number(v).toString());
  bindRange(elements.bgTolerance, elements.bgToleranceValue, (v) => Number(v).toString());
  bindRange(elements.ditherAmount, elements.ditherAmountValue, (v) => Number(v).toFixed(2));
  bindRange(elements.edgeWeight, elements.edgeWeightValue, (v) => Number(v).toFixed(2));

  elements.videoInput.addEventListener("change", onSourceSelected);
  elements.animationName.addEventListener("input", updateSavePath);
  elements.togglePreview.addEventListener("click", onTogglePreview);
  elements.generateFrames.addEventListener("click", onGenerateFrames);
  elements.downloadEmbed.addEventListener("click", onDownloadEmbed);
  elements.downloadJson.addEventListener("click", onDownloadJson);
  elements.copySnippet.addEventListener("click", onCopySnippet);
  elements.enableColor.addEventListener("change", syncVisualOptions);
  elements.colorDithering?.addEventListener("change", syncVisualOptions);
  elements.colorMode.addEventListener("change", syncVisualOptions);
  elements.autoPreview.addEventListener("change", syncAutoPreview);
  elements.sourceVideo.addEventListener("ended", handlePreviewEnded);
  window.addEventListener("resize", updatePreviewScale, { passive: true });
  elements.themeSelect?.addEventListener("change", onThemeChanged);
  elements.themeSelect?.addEventListener("input", onThemeChanged);

  // Background controls
  elements.enableTransparentBg?.addEventListener("change", syncBgOptions);
  elements.bgLumCutoff?.addEventListener("input", syncBgOptions);
  elements.enableBgRemove?.addEventListener("change", syncBgOptions);
  elements.bgKeyColor?.addEventListener("input", syncBgOptions);
  elements.bgTolerance?.addEventListener("input", syncBgOptions);

  // Rendering controls
  elements.charSet?.addEventListener("change", syncRenderingOptions);
  elements.charSetCustom?.addEventListener("input", syncRenderingOptions);
  elements.invertMode?.addEventListener("change", syncRenderingOptions);
  elements.previewBgColor?.addEventListener("input", applyPreviewBgColor);

  elements.qualityButtons.forEach((button) => {
    button.addEventListener("click", () => setQuality(button.dataset.quality));
  });

  syncVisualOptions();
  syncBgOptions();
  syncRenderingOptions();
  syncAutoPreview();
  applyPreviewBgColor();
}

function initTheme() {
  let savedTheme = null;
  try {
    savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
  } catch {
    // Storage may be unavailable in restrictive environments.
  }
  const preferredTheme = AVAILABLE_THEMES.includes(savedTheme || "")
    ? savedTheme
    : document.body.getAttribute("data-theme") || "night";
  applyTheme(preferredTheme);
}

function onThemeChanged(event) {
  const nextTheme = event?.target?.value || "";
  applyTheme(nextTheme);
}

function applyTheme(themeName) {
  const theme = AVAILABLE_THEMES.includes(themeName) ? themeName : "night";
  state.theme = theme;
  document.documentElement.setAttribute("data-theme", theme);
  document.body.setAttribute("data-theme", theme);
  applyFallbackThemeVars(theme);
  const lightLikeThemes = new Set(["corporate", "cupcake", "lofi"]);
  document.documentElement.style.colorScheme = lightLikeThemes.has(theme) ? "light" : "dark";
  try {
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch {
    // Ignore persistence failures.
  }

  if (elements.themeSelect) {
    elements.themeSelect.value = theme;
  }

  if (state.videoReady) {
    applyPreviewStyle(null, !!elements.asciiPreview.innerHTML);
  }
}

function applyFallbackThemeVars(theme) {
  const palette = THEME_FALLBACK_VARS[theme] || THEME_FALLBACK_VARS.night;
  Object.entries(palette).forEach(([token, value]) => {
    document.documentElement.style.setProperty(token, value);
  });
}

function bindRange(input, output, formatter) {
  if (!input || !output) return;
  const sync = () => {
    output.value = formatter(input.value);
    const stateKeyMap = {
      fontAspectRatio: "fontAspectRatio",
      colorSmoothing: "colorSmoothingValue",
    };
    const stateKey = stateKeyMap[input.id] || input.id;
    state[stateKey] = Number(input.value);
    if (
      input.id === "colorBrightness" ||
      input.id === "colorSaturation" ||
      input.id === "colorContrast" ||
      input.id === "paletteSize" ||
      input.id === "colorSmoothing"
    ) {
      resetColorSmoothing("live");
      resetLivePreviewCaches();
    }
    if (input.id === "fps" && state.previewRunning) {
      restartPreviewLoop();
    }
    if (state.videoReady && !state.processing) {
      renderCurrentFrame();
    }
  };

  input.addEventListener("input", sync);
  sync();
}

function syncVisualOptions() {
  state.enableColor = elements.enableColor.checked;
  state.colorDithering = elements.colorDithering?.checked ?? true;
  state.colorMode = elements.colorMode.value;
  state.colorBrightness = Number(elements.colorBrightness?.value || 1);
  state.colorSaturation = Number(elements.colorSaturation?.value || 1);
  state.colorContrast = Number(elements.colorContrast?.value || 1);
  state.paletteSize = Number(elements.paletteSize?.value || 12);
  state.colorSmoothingValue = Number(elements.colorSmoothing?.value || DEFAULT_COLOR_SMOOTHING);
  resetColorSmoothing();
  resetLivePreviewCaches();
  elements.colorMode.disabled = !state.enableColor;
  elements.colorMode.classList.toggle("select-disabled", !state.enableColor);
  if (elements.colorBrightness) elements.colorBrightness.disabled = !state.enableColor;
  if (elements.colorSaturation) elements.colorSaturation.disabled = !state.enableColor;
  if (elements.colorContrast) elements.colorContrast.disabled = !state.enableColor;
  if (elements.paletteSize) elements.paletteSize.disabled = !state.enableColor;
  if (elements.colorSmoothing) elements.colorSmoothing.disabled = !state.enableColor;

  applyPreviewStyle(null);
  if (state.videoReady && !state.processing) {
    renderCurrentFrame();
  }
}

function syncBgOptions() {
  state.enableTransparentBg = elements.enableTransparentBg?.checked ?? false;
  state.bgLumCutoff = Number(elements.bgLumCutoff?.value ?? 220);
  state.enableBgRemove = elements.enableBgRemove?.checked ?? false;
  state.bgKeyColor = elements.bgKeyColor?.value ?? "#00ff00";
  state.bgTolerance = Number(elements.bgTolerance?.value ?? 40);

  if (elements.bgLumCutoff) elements.bgLumCutoff.disabled = !state.enableTransparentBg;
  if (elements.bgKeyColor) elements.bgKeyColor.disabled = !state.enableBgRemove;
  if (elements.bgTolerance) elements.bgTolerance.disabled = !state.enableBgRemove;

  if (state.videoReady && !state.processing) renderCurrentFrame();
}

function syncRenderingOptions() {
  state.charSet = elements.charSet?.value ?? "classic";
  state.charSetCustom = elements.charSetCustom?.value || "@#%+=:-. ";
  state.invertMode = elements.invertMode?.checked ?? false;
  state.ditherAmount = Number(elements.ditherAmount?.value ?? 0.15);
  state.edgeWeight = Number(elements.edgeWeight?.value ?? 0.36);

  const isCustom = state.charSet === "custom";
  if (elements.charSetCustomWrap) {
    elements.charSetCustomWrap.classList.toggle("hidden", !isCustom);
  }

  if (state.videoReady && !state.processing) renderCurrentFrame();
}

function applyPreviewBgColor() {
  const color = elements.previewBgColor?.value ?? "#000000";
  state.previewBgColor = color;
  const wrap = elements.asciiPreview?.parentElement;
  if (wrap) wrap.style.backgroundColor = color;
}

function syncAutoPreview() {
  state.autoPreview = elements.autoPreview.checked;
  if (state.autoPreview && state.videoReady && !state.previewRunning && !state.processing) {
    startPreview();
  }
}

function handlePreviewEnded() {
  if (!state.previewRunning) return;
  const video = elements.sourceVideo;
  video.currentTime = 0;
  video.play().catch(() => {
    setStatus("Preview loop was interrupted. Click Start Preview.", "error");
    stopPreview();
  });
}

function applyPreviewStyle(color, hasInlineColors = false) {
  const baseColor = getThemeColor("--color-base-content", "#f5f5f5");
  elements.asciiPreview.style.color = hasInlineColors ? baseColor : color || baseColor;
  elements.asciiPreview.style.textShadow = "none";
}

function getThemeColor(token, fallback) {
  const value = getComputedStyle(document.documentElement).getPropertyValue(token).trim();
  return value || fallback;
}

function setQuality(quality) {
  if (!quality || state.quality === quality) return;
  state.quality = quality;
  resetLivePreviewCaches();
  elements.qualityButtons.forEach((button) => {
    const active = button.dataset.quality === quality;
    button.classList.toggle("active", active);
    button.setAttribute("aria-checked", active ? "true" : "false");
  });
  if (state.videoReady && !state.processing) {
    renderCurrentFrame();
  }
}

function getColumns() {
  return QUALITY_COLUMNS[state.quality];
}

function getRows() {
  const video = elements.sourceVideo;
  if (!video.videoWidth || !video.videoHeight) return 0;
  const videoAspect = video.videoWidth / video.videoHeight;
  return Math.max(1, Math.round(getColumns() / videoAspect / state.fontAspectRatio));
}

function slugify(value) {
  const clean = value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9-_ ]+/g, "")
    .replace(/\s+/g, "-");
  return clean || "ascii-animation";
}

function getAnimationName() {
  return slugify(elements.animationName.value || "ascii-animation");
}

function updateSavePath() {
  elements.savePath.textContent = `./animations/${getAnimationName()}`;
}

function setStatus(message, tone = "") {
  elements.statusText.className = ["text-sm", "opacity-80", tone].filter(Boolean).join(" ");
  elements.statusText.textContent = message;
}

function setProgress(percent) {
  elements.progressBar.value = Math.max(0, Math.min(100, percent));
}

async function onSourceSelected() {
  const file = elements.videoInput.files?.[0];
  if (!file) return;

  stopPreview();
  resetColorSmoothing();
  resetLivePreviewCaches();
  setProgress(0);
  state.frames = [];
  state.colorFrames = [];
  state.sourceFile = file;
  toggleExportButtons(false);
  elements.embedCode.value = "";

  if (state.sourceUrl) {
    URL.revokeObjectURL(state.sourceUrl);
  }
  state.sourceUrl = URL.createObjectURL(file);

  try {
    await loadVideoSource(state.sourceUrl);
    finalizeLoadedSource(file);
  } catch (error) {
    try {
      const converted = await convertUnsupportedVideo(file);
      if (!converted) {
        throw error;
      }
      if (state.sourceUrl) {
        URL.revokeObjectURL(state.sourceUrl);
      }
      state.sourceFile = converted;
      state.sourceUrl = URL.createObjectURL(converted);
      await loadVideoSource(state.sourceUrl);
      finalizeLoadedSource(converted, { transcodedFrom: file.name });
    } catch (fallbackError) {
      setStatus(
        `Unable to decode this video in-browser. Try converting to MP4 (H.264): ${fallbackError.message}`,
        "error"
      );
    }
  }
}

function finalizeLoadedSource(file, options = {}) {
  const sourceLabel = options.transcodedFrom
    ? `${file.name} (from ${options.transcodedFrom})`
    : file.name;
  elements.sourceHint.textContent = `${sourceLabel} - ${formatBytes(file.size)}`;
  renderCurrentFrame();
  if (state.autoPreview) {
    startPreview();
    setStatus(`Loaded "${sourceLabel}". Auto preview is running.`, "success");
  } else {
    setStatus(`Loaded "${sourceLabel}". Press Start Preview or Generate Frames.`, "success");
  }
}

async function convertUnsupportedVideo(file) {
  const extension = getFileExtension(file.name);
  const maybeBrowserNative = ["mp4", "webm", "ogg", "ogv", "mov", "m4v"].includes(extension);
  const preface = maybeBrowserNative
    ? "Browser decode failed. Trying compatibility transcode..."
    : `Unsupported format "${extension || "unknown"}". Transcoding...`;
  setStatus(preface);

  const ffmpeg = await ensureFFmpegLoaded();
  const safeBase = getAnimationName() || "input";
  const inputName = `${safeBase}.${extension || "bin"}`;
  const outputName = `${safeBase}.compat.mp4`;

  await ffmpegWriteFile(ffmpeg, inputName, new Uint8Array(await file.arrayBuffer()));
  try {
    await ffmpegRun(ffmpeg, [
      "-i",
      inputName,
      "-vf",
      "scale=trunc(iw/2)*2:trunc(ih/2)*2",
      "-c:v",
      "libx264",
      "-pix_fmt",
      "yuv420p",
      "-movflags",
      "faststart",
      "-an",
      outputName,
    ]);
  } catch {
    await ffmpegRun(ffmpeg, [
      "-i",
      inputName,
      "-vf",
      "scale=trunc(iw/2)*2:trunc(ih/2)*2",
      "-pix_fmt",
      "yuv420p",
      "-an",
      outputName,
    ]);
  }

  const output = await ffmpegReadFile(ffmpeg, outputName);
  await Promise.allSettled([ffmpegDeleteFile(ffmpeg, inputName), ffmpegDeleteFile(ffmpeg, outputName)]);

  if (!output || !output.length) {
    throw new Error("Transcoder produced an empty output.");
  }

  const convertedName = `${file.name.replace(/\.[^.]+$/, "") || "video"}-compat.mp4`;
  return new File([output.slice(0)], convertedName, { type: "video/mp4" });
}

async function ensureFFmpegLoaded() {
  if (state.ffmpegReady && state.ffmpeg) return state.ffmpeg;
  if (location.protocol === "file:") {
    throw new Error("Open this app over http://localhost for compatibility transcoding.");
  }
  if (state.ffmpegLoading) {
    await waitFor(() => state.ffmpegReady || !state.ffmpegLoading, 25000);
    if (state.ffmpegReady && state.ffmpeg) return state.ffmpeg;
    throw new Error("Transcoder initialization timed out.");
  }

  state.ffmpegLoading = true;
  setStatus("Loading compatibility transcoder...");
  try {
    await loadScriptOnce(FFMPEG_UMD_URL);
    await loadScriptOnce(FFMPEG_UTIL_UMD_URL);

    const FFmpegClass = window.FFmpegWASM?.FFmpeg;
    if (FFmpegClass) {
      const assetUrls = await resolveFFmpegAssetUrls();
      const ffmpeg = new FFmpegClass();
      await ffmpeg.load(assetUrls);
      state.ffmpeg = ffmpeg;
      state.ffmpegApi = "modern";
      state.ffmpegReady = true;
      return ffmpeg;
    }

    const createFFmpeg = window.FFmpeg?.createFFmpeg;
    if (createFFmpeg) {
      const assetUrls = await resolveFFmpegAssetUrls();
      const ffmpeg = createFFmpeg({
        log: false,
        corePath: assetUrls.coreURL,
      });
      await ffmpeg.load();
      state.ffmpeg = ffmpeg;
      state.ffmpegApi = "legacy";
      state.ffmpegReady = true;
      return ffmpeg;
    }

    throw new Error("FFmpeg loader unavailable.");
  } finally {
    state.ffmpegLoading = false;
  }
}

async function resolveFFmpegAssetUrls() {
  if (state.ffmpegAssetUrls) {
    return state.ffmpegAssetUrls;
  }

  const coreJsUrl = `${FFMPEG_CORE_BASE_URL}/ffmpeg-core.js`;
  const coreWasmUrl = `${FFMPEG_CORE_BASE_URL}/ffmpeg-core.wasm`;

  const [coreURL, wasmURL] = await Promise.all([
    toBlobUrlSafe(coreJsUrl, "text/javascript"),
    toBlobUrlSafe(coreWasmUrl, "application/wasm"),
  ]);

  state.ffmpegAssetUrls = { coreURL, wasmURL };
  return state.ffmpegAssetUrls;
}

async function toBlobUrlSafe(url, mimeType) {
  const toBlobURL = window.FFmpegUtil?.toBlobURL;
  if (typeof toBlobURL === "function") {
    return toBlobURL(url, mimeType);
  }

  const response = await fetch(url, { mode: "cors", cache: "force-cache" });
  if (!response.ok) {
    throw new Error(`Failed to fetch FFmpeg asset: ${url}`);
  }
  const sourceBlob = await response.blob();
  const blob =
    mimeType && sourceBlob.type !== mimeType ? new Blob([sourceBlob], { type: mimeType }) : sourceBlob;
  return URL.createObjectURL(blob);
}

async function ffmpegWriteFile(ffmpeg, path, data) {
  if (state.ffmpegApi === "modern") {
    await ffmpeg.writeFile(path, data);
    return;
  }
  ffmpeg.FS("writeFile", path, data);
}

async function ffmpegRun(ffmpeg, args) {
  if (state.ffmpegApi === "modern") {
    const code = await ffmpeg.exec(args);
    if (code !== 0) {
      throw new Error(`ffmpeg exited with code ${code}`);
    }
    return;
  }
  await ffmpeg.run(...args);
}

async function ffmpegReadFile(ffmpeg, path) {
  if (state.ffmpegApi === "modern") {
    const data = await ffmpeg.readFile(path);
    if (data instanceof Uint8Array) return data;
    return new Uint8Array(data);
  }
  return ffmpeg.FS("readFile", path);
}

async function ffmpegDeleteFile(ffmpeg, path) {
  try {
    if (state.ffmpegApi === "modern") {
      await ffmpeg.deleteFile(path);
      return;
    }
    ffmpeg.FS("unlink", path);
  } catch {
    // Best effort cleanup.
  }
}

function loadScriptOnce(src) {
  return new Promise((resolve, reject) => {
    const existing = document.querySelector(`script[data-src="${src}"]`);
    if (existing && existing.dataset.loaded === "1") {
      resolve();
      return;
    }
    if (existing) {
      existing.addEventListener("load", () => resolve(), { once: true });
      existing.addEventListener("error", () => reject(new Error("Script load failed.")), {
        once: true,
      });
      return;
    }

    const script = document.createElement("script");
    script.src = src;
    script.async = true;
    script.dataset.src = src;
    script.onload = () => {
      script.dataset.loaded = "1";
      resolve();
    };
    script.onerror = () => reject(new Error(`Unable to load ${src}`));
    document.head.appendChild(script);
  });
}

function waitFor(predicate, timeoutMs) {
  return new Promise((resolve, reject) => {
    const start = Date.now();
    const interval = setInterval(() => {
      if (predicate()) {
        clearInterval(interval);
        resolve();
        return;
      }
      if (Date.now() - start > timeoutMs) {
        clearInterval(interval);
        reject(new Error("Timed out while waiting for transcoder."));
      }
    }, 80);
  });
}

function getFileExtension(filename) {
  const match = /\.([a-z0-9]+)$/i.exec(filename || "");
  return match ? match[1].toLowerCase() : "";
}

function loadVideoSource(url) {
  const video = elements.sourceVideo;
  return new Promise((resolve, reject) => {
    let done = false;
    const timeout = setTimeout(() => {
      cleanup();
      reject(new Error("Timed out while loading this video."));
    }, 7000);

    const onLoaded = () => {
      if (done) return;
      done = true;
      cleanup();
      state.videoReady = true;
      resolve();
    };
    const onError = () => {
      if (done) return;
      done = true;
      cleanup();
      state.videoReady = false;
      reject(new Error("The selected file could not be decoded."));
    };
    const cleanup = () => {
      clearTimeout(timeout);
      video.removeEventListener("loadedmetadata", onLoaded);
      video.removeEventListener("canplay", onLoaded);
      video.removeEventListener("loadeddata", onLoaded);
      video.removeEventListener("error", onError);
    };
    video.pause();
    video.currentTime = 0;
    video.removeAttribute("src");
    video.load();
    video.preload = "auto";
    video.playsInline = true;
    video.crossOrigin = "anonymous";
    video.addEventListener("loadedmetadata", onLoaded, { once: true });
    video.addEventListener("canplay", onLoaded, { once: true });
    video.addEventListener("loadeddata", onLoaded, { once: true });
    video.addEventListener("error", onError, { once: true });
    video.src = url;
    video.load();
  });
}

function onTogglePreview() {
  if (!state.videoReady) {
    setStatus("Load a video before starting preview.", "error");
    return;
  }
  if (state.previewRunning) {
    stopPreview();
  } else {
    startPreview();
  }
}

function startPreview() {
  if (state.previewRunning || !state.videoReady) return;
  state.previewRunning = true;
  elements.togglePreview.textContent = "Pause Preview";

  const video = elements.sourceVideo;
  video.loop = true;
  video.muted = true;
  video.play().catch(() => {
    setStatus("Browser blocked autoplay. Click Start Preview again.", "error");
    stopPreview();
  });

  const intervalMs = Math.max(16, Math.floor(1000 / Math.max(1, state.fps)));
  state.previewTimer = setInterval(() => {
    if (!state.processing) {
      renderCurrentFrame();
    }
  }, intervalMs);
}

function stopPreview() {
  if (state.previewTimer) {
    clearInterval(state.previewTimer);
    state.previewTimer = null;
  }
  state.previewRunning = false;
  elements.togglePreview.textContent = "Start Preview";
  elements.sourceVideo.pause();
}

function restartPreviewLoop() {
  if (!state.previewRunning) return;
  stopPreview();
  startPreview();
}

function renderCurrentFrame() {
  const previousCols = state.lastDimensions.cols;
  const previousRows = state.lastDimensions.rows;
  const frame = captureFrameAsAscii();
  if (!frame) return;
  if (frame.colorHtml) {
    elements.asciiPreview.innerHTML = frame.colorHtml;
    applyPreviewStyle(null, true);
  } else {
    elements.asciiPreview.textContent = frame.ascii;
    applyPreviewStyle(frame.color, false);
  }
  if (frame.cols !== previousCols || frame.rows !== previousRows) {
    updatePreviewScale();
  }
  elements.emptyState.style.display = "none";
}

function updatePreviewScale() {
  const cols = state.lastDimensions.cols;
  const rows = state.lastDimensions.rows;
  if (!cols || !rows) return;

  const pre = elements.asciiPreview;
  const container = pre.parentElement;
  if (!container) return;

  const containerStyle = window.getComputedStyle(container);
  const padX =
    parseFloat(containerStyle.paddingLeft || "0") +
    parseFloat(containerStyle.paddingRight || "0");
  const padY =
    parseFloat(containerStyle.paddingTop || "0") +
    parseFloat(containerStyle.paddingBottom || "0");

  const width = Math.max(1, container.clientWidth - padX - 2);
  const height = Math.max(1, container.clientHeight - padY - 2);

  const charWidthRatio = 0.61;
  const sizeFromWidth = width / (cols * charWidthRatio);
  const sizeFromHeight = height / rows;
  const fontSize = Math.max(2, Math.min(18, Math.min(sizeFromWidth, sizeFromHeight)));

  pre.style.fontSize = `${fontSize.toFixed(2)}px`;
  pre.style.lineHeight = "1";
  pre.style.width = `${cols}ch`;
  pre.style.height = `${rows}em`;
  pre.style.margin = "0";
  pre.style.display = "block";
  pre.style.overflow = "hidden";
}

function captureFrameAsAscii(options = {}) {
  if (!state.videoReady) return null;

  const cols = getColumns();
  const rows = getRows();
  if (!cols || !rows) return null;
  const captureTick = state.captureTick++;

  if (elements.frameCanvas.width !== cols) {
    elements.frameCanvas.width = cols;
  }
  if (elements.frameCanvas.height !== rows) {
    elements.frameCanvas.height = rows;
  }
  frameCtx.drawImage(elements.sourceVideo, 0, 0, cols, rows);
  const { data } = frameCtx.getImageData(0, 0, cols, rows);

  const threshold = state.threshold / 255;
  const gamma = Math.max(0.2, state.gamma);
  const edgeW = Math.max(0, Math.min(1, state.edgeWeight ?? 0.36));

  // Resolve active character set
  let density;
  if (state.charSet === "custom") {
    density = (state.charSetCustom || "").length >= 2 ? state.charSetCustom : ASCII_DENSITY;
  } else {
    density = CHAR_SETS[state.charSet] || ASCII_DENSITY;
  }
  const maxIndex = density.length - 1;

  // Color-key BG removal: parse key color once
  let keyR = 0, keyG = 255, keyB = 0;
  let keyToleranceSqNorm = -1;
  if (state.enableBgRemove && state.bgKeyColor) {
    const hex = parseInt(state.bgKeyColor.slice(1), 16);
    keyR = (hex >> 16) & 0xff;
    keyG = (hex >> 8) & 0xff;
    keyB = hex & 0xff;
    const t = state.bgTolerance / 255;
    keyToleranceSqNorm = t * t;
  }

  const bgLumThreshold = state.enableTransparentBg ? state.bgLumCutoff / 255 : 2;

  const pixelCount = cols * rows;
  const buffers = ensureFrameBuffers(pixelCount);
  const luminance = buffers.luminance;

  // Luminance pass + optional color-key removal
  for (let p = 0, i = 0; p < pixelCount; p += 1, i += 4) {
    const red = data[i];
    const green = data[i + 1];
    const blue = data[i + 2];
    let lum = (0.2126 * red + 0.7152 * green + 0.0722 * blue) / 255;

    if (keyToleranceSqNorm >= 0) {
      const dr = (red - keyR) / 255;
      const dg = (green - keyG) / 255;
      const db = (blue - keyB) / 255;
      const distSq = dr * dr * 0.30 + dg * dg * 0.59 + db * db * 0.11;
      if (distSq <= keyToleranceSqNorm) lum = 1;
    }

    luminance[p] = lum;
  }

  // Edge detection using Sobel operator
  const edges = buffers.edges;
  for (let y = 1; y < rows - 1; y += 1) {
    const rowOffset = y * cols;
    for (let x = 1; x < cols - 1; x += 1) {
      const p = rowOffset + x;

      // Sobel Kernels
      // Gx: [-1, 0, 1]  Gy: [-1, -2, -1]
      //     [-2, 0, 2]      [ 0,  0,  0]
      //     [-1, 0, 1]      [ 1,  2,  1]

      const tl = luminance[p - cols - 1];
      const tc = luminance[p - cols];
      const tr = luminance[p - cols + 1];

      const l = luminance[p - 1];
      const r = luminance[p + 1];

      const bl = luminance[p + cols - 1];
      const bc = luminance[p + cols];
      const br = luminance[p + cols + 1];

      const gx = -tl + tr - 2 * l + 2 * r - bl + br;
      const gy = -tl - 2 * tc - tr + bl + 2 * bc + br;

      const gradient = Math.sqrt(gx * gx + gy * gy);
      edges[p] = Math.min(1, gradient);
    }
  }

  // Character mapping
  let ascii = "";
  let asciiFlat = "";
  for (let y = 0; y < rows; y += 1) {
    let line = "";
    const rowOffset = y * cols;
    for (let x = 0; x < cols; x += 1) {
      const p = rowOffset + x;
      const lum = luminance[p];

      // Transparent BG: bright pixels become spaces
      if (lum >= bgLumThreshold) {
        line += " ";
        asciiFlat += " ";
        continue;
      }

      let light = lum * 0.82 + edges[p] * edgeW;

      // Ordered Dithering
      if (state.ditherAmount > 0) {
        const ditherValue = BAYER_MATRIX[y % 4][x % 4];
        // Center the dither around 0 (-0.5 to 0.5) and scale by the user amount
        const ditherAdjust = (ditherValue - 0.5) * state.ditherAmount;
        light += ditherAdjust;
      }

      light = Math.pow(clamp01(light), 1 / gamma);
      light = (light - threshold) * 1.55 + 0.5;
      light = clamp01(light);

      let charIndex = Math.max(0, Math.min(maxIndex, Math.floor((1 - light) * maxIndex)));
      if (state.invertMode) charIndex = maxIndex - charIndex;
      line += density[charIndex];
      asciiFlat += density[charIndex];
    }
    ascii += y === rows - 1 ? line : `${line}\n`;
  }

  state.lastDimensions = { cols, rows };
  const dimensionLabel = `${cols} x ${rows} chars`;
  if (elements.dimensions.textContent !== dimensionLabel) {
    elements.dimensions.textContent = dimensionLabel;
  }

  let color = null;
  let colorFrame = null;
  let colorHtml = null;
  if (state.enableColor) {
    if (state.colorMode === "avg") {
      const adjustedColorData = buildColorSampleData(data);
      const paletteSize = Math.max(2, Math.round(state.paletteSize || 12));
      let palette = null;
      if (options.forExport) {
        palette = stabilizePalette(buildAdaptivePalette(adjustedColorData, paletteSize), true);
      } else {
        const refreshEvery = getLivePaletteRefreshInterval();
        if (!state.livePalette || captureTick % refreshEvery === 0) {
          state.livePalette = stabilizePalette(
            buildAdaptivePalette(adjustedColorData, paletteSize),
            false
          );
        }
        palette = state.livePalette;
      }
      const colorIndexes = mapPixelsToPalette(adjustedColorData, palette, cols, rows);
      colorFrame = buildColorFrameData(palette, colorIndexes);
      colorHtml = buildColorHtml(asciiFlat, cols, colorFrame);
    } else if (state.colorMode === "gradient") {
      const totalFrames = Math.max(1, options.totalFrames || 0);
      const frameIndex = options.frameIndex || 0;
      const hue = options.forExport
        ? Math.round((frameIndex / totalFrames) * 360) % 360
        : Math.round((elements.sourceVideo.currentTime * 85) % 360);
      color = `hsl(${hue} 100% 72%)`;
    }
  }

  return { ascii, color, colorHtml, colorFrame, cols, rows };
}

function clamp01(value) {
  if (value < 0) return 0;
  if (value > 1) return 1;
  return value;
}

function buildAdaptivePalette(pixelData, maxColors) {
  const buckets = new Map();
  for (let i = 0; i < pixelData.length; i += 4) {
    const red = pixelData[i];
    const green = pixelData[i + 1];
    const blue = pixelData[i + 2];
    const qRed = Math.min(255, Math.round(red / 32) * 32);
    const qGreen = Math.min(255, Math.round(green / 32) * 32);
    const qBlue = Math.min(255, Math.round(blue / 32) * 32);
    const key = (qRed << 16) | (qGreen << 8) | qBlue;
    const existing = buckets.get(key);
    if (existing) {
      existing.count += 1;
      existing.red += red;
      existing.green += green;
      existing.blue += blue;
    } else {
      buckets.set(key, { count: 1, red, green, blue });
    }
  }

  const sorted = [...buckets.values()].sort((a, b) => b.count - a.count);
  const palette = [];
  for (let i = 0; i < sorted.length && palette.length < maxColors; i += 1) {
    const item = sorted[i];
    palette.push([
      Math.round(item.red / item.count),
      Math.round(item.green / item.count),
      Math.round(item.blue / item.count),
    ]);
  }

  if (!palette.length) {
    palette.push([245, 245, 245]);
  }
  return palette;
}

function resetColorSmoothing(scope) {
  if (!scope || scope === "live") {
    state.colorSmoothingCache.live = null;
  }
  if (!scope || scope === "export") {
    state.colorSmoothingCache.export = null;
  }
}

function resetLivePreviewCaches() {
  state.livePalette = null;
  state.captureTick = 0;
}

function ensureFrameBuffers(pixelCount) {
  if (state.buffers.pixelCount !== pixelCount) {
    state.buffers.pixelCount = pixelCount;
    state.buffers.luminance = new Float32Array(pixelCount);
    state.buffers.edges = new Float32Array(pixelCount);
    state.buffers.colorSample = new Uint8ClampedArray(pixelCount * 4);
    resetLivePreviewCaches();
  }
  return state.buffers;
}

function getLivePaletteRefreshInterval() {
  if (state.quality === "high") return 3;
  if (state.quality === "medium") return 2;
  return 1;
}

function stabilizePalette(palette, forExport) {
  const key = forExport ? "export" : "live";
  const sorted = sortPaletteStable(palette);
  const previous = state.colorSmoothingCache[key];
  if (!previous || !previous.length) {
    state.colorSmoothingCache[key] = sorted.map((color) => color.slice());
    return sorted;
  }

  const aligned = alignPaletteToPrevious(sorted, previous);
  const blended = aligned.map((color, index) => {
    const prev = previous[index] || color;
    return blendColor(
      prev,
      color,
      clamp01(Number(state.colorSmoothingValue) || DEFAULT_COLOR_SMOOTHING)
    );
  });
  state.colorSmoothingCache[key] = blended.map((color) => color.slice());
  return blended;
}

function sortPaletteStable(palette) {
  return [...palette].sort((a, b) => {
    const lumA = 0.2126 * a[0] + 0.7152 * a[1] + 0.0722 * a[2];
    const lumB = 0.2126 * b[0] + 0.7152 * b[1] + 0.0722 * b[2];
    if (Math.abs(lumA - lumB) > 3) return lumA - lumB;
    return computeHue(a) - computeHue(b);
  });
}

function alignPaletteToPrevious(current, previous) {
  const used = new Set();
  const aligned = [];

  for (let i = 0; i < previous.length && aligned.length < current.length; i += 1) {
    const prev = previous[i];
    let bestIndex = -1;
    let bestDistance = Number.POSITIVE_INFINITY;
    for (let j = 0; j < current.length; j += 1) {
      if (used.has(j)) continue;
      const distance = colorDistanceSq(prev, current[j]);
      if (distance < bestDistance) {
        bestDistance = distance;
        bestIndex = j;
      }
    }
    if (bestIndex >= 0) {
      used.add(bestIndex);
      aligned.push(current[bestIndex]);
    }
  }

  for (let i = 0; i < current.length; i += 1) {
    if (!used.has(i)) {
      aligned.push(current[i]);
    }
  }
  return aligned;
}

function blendColor(previous, current, alpha) {
  const inv = 1 - alpha;
  return [
    Math.round(previous[0] * inv + current[0] * alpha),
    Math.round(previous[1] * inv + current[1] * alpha),
    Math.round(previous[2] * inv + current[2] * alpha),
  ];
}

function colorDistanceSq(a, b) {
  const dr = a[0] - b[0];
  const dg = a[1] - b[1];
  const db = a[2] - b[2];
  return dr * dr + dg * dg + db * db;
}

function computeHue(color) {
  const red = color[0] / 255;
  const green = color[1] / 255;
  const blue = color[2] / 255;
  const max = Math.max(red, green, blue);
  const min = Math.min(red, green, blue);
  const delta = max - min;
  if (delta === 0) return 0;
  let hue = 0;
  if (max === red) {
    hue = ((green - blue) / delta) % 6;
  } else if (max === green) {
    hue = (blue - red) / delta + 2;
  } else {
    hue = (red - green) / delta + 4;
  }
  return ((hue * 60) + 360) % 360;
}

function buildColorSampleData(pixelData) {
  const brightness = Math.max(0.25, Math.min(2.2, Number(state.colorBrightness) || 1));
  const saturation = Math.max(0, Math.min(2.5, Number(state.colorSaturation) || 1));
  const contrast = Math.max(0.4, Math.min(2.2, Number(state.colorContrast) || 1));
  if (
    Math.abs(brightness - 1) < 0.001 &&
    Math.abs(saturation - 1) < 0.001 &&
    Math.abs(contrast - 1) < 0.001
  ) {
    return pixelData;
  }
  const tuned = ensureFrameBuffers(Math.max(1, Math.floor(pixelData.length / 4))).colorSample;

  for (let i = 0; i < pixelData.length; i += 4) {
    const alpha = pixelData[i + 3];
    let red = pixelData[i];
    let green = pixelData[i + 1];
    let blue = pixelData[i + 2];

    red = (red - 128) * contrast + 128;
    green = (green - 128) * contrast + 128;
    blue = (blue - 128) * contrast + 128;

    const gray = 0.2126 * red + 0.7152 * green + 0.0722 * blue;
    red = gray + (red - gray) * saturation;
    green = gray + (green - gray) * saturation;
    blue = gray + (blue - gray) * saturation;

    red *= brightness;
    green *= brightness;
    blue *= brightness;

    tuned[i] = clamp8(red);
    tuned[i + 1] = clamp8(green);
    tuned[i + 2] = clamp8(blue);
    tuned[i + 3] = alpha;
  }

  return tuned;
}

function clamp8(value) {
  if (value < 0) return 0;
  if (value > 255) return 255;
  return Math.round(value);
}

function mapPixelsToPalette(pixelData, palette, cols, rows) {
  const pixelCount = cols * rows;
  const indexes = new Uint8Array(pixelCount);
  const data = new Float32Array(pixelData.length);
  for (let i = 0; i < pixelData.length; i += 1) {
    data[i] = pixelData[i];
  }

  for (let y = 0; y < rows; y += 1) {
    for (let x = 0; x < cols; x += 1) {
      const p = y * cols + x;
      const i = p * 4;

      const oldR = data[i];
      const oldG = data[i + 1];
      const oldB = data[i + 2];

      let bestIndex = 0;
      let bestDistance = Number.POSITIVE_INFINITY;

      for (let paletteIndex = 0; paletteIndex < palette.length; paletteIndex += 1) {
        const color = palette[paletteIndex];
        const dr = oldR - color[0];
        const dg = oldG - color[1];
        const db = oldB - color[2];
        const distance = dr * dr * 0.3 + dg * dg * 0.59 + db * db * 0.11;
        if (distance < bestDistance) {
          bestDistance = distance;
          bestIndex = paletteIndex;
        }
      }

      indexes[p] = bestIndex;

      if (state.colorDithering) {
        const newColor = palette[bestIndex];
        const errR = oldR - newColor[0];
        const errG = oldG - newColor[1];
        const errB = oldB - newColor[2];

        // Floyd-Steinberg Distribution
        const distribute = (dx, dy, weight) => {
          const nx = x + dx;
          const ny = y + dy;
          if (nx >= 0 && nx < cols && ny >= 0 && ny < rows) {
            const ni = (ny * cols + nx) * 4;
            data[ni] += errR * weight;
            data[ni + 1] += errG * weight;
            data[ni + 2] += errB * weight;
          }
        };

        distribute(1, 0, 7 / 16);
        distribute(-1, 1, 3 / 16);
        distribute(0, 1, 5 / 16);
        distribute(1, 1, 1 / 16);
      }
    }
  }
  return indexes;
}

function buildColorFrameData(palette, colorIndexes) {
  const paletteFlat = [];
  for (let i = 0; i < palette.length; i += 1) {
    paletteFlat.push(palette[i][0], palette[i][1], palette[i][2]);
  }

  const runs = [];
  let previous = colorIndexes[0] || 0;
  let count = 1;
  for (let i = 1; i < colorIndexes.length; i += 1) {
    const value = colorIndexes[i];
    if (value === previous) {
      count += 1;
    } else {
      runs.push(count, previous);
      previous = value;
      count = 1;
    }
  }
  runs.push(count, previous);

  return { p: paletteFlat, r: runs };
}

function escapeHtmlCharacters(value) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function buildColorHtml(asciiFlat, cols, colorFrame) {
  if (!colorFrame || !Array.isArray(colorFrame.p) || !Array.isArray(colorFrame.r)) {
    return "";
  }

  const palette = colorFrame.p;
  const runs = colorFrame.r;
  let runPointer = 0;
  let runRemaining = runs[0] || 0;
  let runColor = runs[1] || 0;
  let activeColor = -1;
  let activeText = "";
  let html = "";

  const flush = () => {
    if (!activeText.length) return;
    const offset = activeColor * 3;
    const red = palette[offset] ?? 245;
    const green = palette[offset + 1] ?? 245;
    const blue = palette[offset + 2] ?? 245;
    html += `<span style="color:rgb(${red},${green},${blue})">${escapeHtmlCharacters(
      activeText
    )}</span>`;
    activeText = "";
  };

  for (let index = 0; index < asciiFlat.length; index += 1) {
    if (runRemaining <= 0) {
      runPointer += 2;
      runRemaining = runs[runPointer] || 1;
      runColor = runs[runPointer + 1] || 0;
    }

    if (activeColor !== runColor) {
      flush();
      activeColor = runColor;
    }

    activeText += asciiFlat[index];
    runRemaining -= 1;

    if ((index + 1) % cols === 0) {
      activeText += "\n";
      flush();
      activeColor = -1;
    }
  }

  flush();
  return html;
}

async function onGenerateFrames() {
  if (!state.videoReady) {
    setStatus("Load a video before generating frames.", "error");
    return;
  }
  if (state.processing) return;

  const wasPreviewing = state.previewRunning;
  stopPreview();
  state.processing = true;
  setProgress(0);
  setStatus("Converting video to ASCII frames...");
  toggleEditorDisabled(true);

  try {
    resetColorSmoothing("export");
    const video = elements.sourceVideo;
    const fps = Math.max(1, state.fps);
    const duration = video.duration;
    if (!Number.isFinite(duration) || duration <= 0) {
      throw new Error("Video metadata is incomplete. Reload and try again.");
    }

    const frameCount = Math.max(1, Math.floor(duration * fps));
    const frames = [];
    const colorFrames = [];

    for (let index = 0; index < frameCount; index += 1) {
      const time = Math.min(duration - 0.001, index / fps);
      await seekVideo(time);
      const frame = captureFrameAsAscii({
        forExport: true,
        frameIndex: index,
        totalFrames: frameCount,
      });
      if (!frame) {
        throw new Error("Unable to sample frame data.");
      }
      frames.push(frame.ascii);
      if (state.enableColor && state.colorMode === "avg") {
        colorFrames.push(frame.colorFrame || null);
      }

      if (index % 4 === 0 || index === frameCount - 1) {
        const progress = ((index + 1) / frameCount) * 100;
        setProgress(progress);
        setStatus(
          `Generating frames ${index + 1}/${frameCount} (${Math.round(progress)}%)`
        );
      }

      if (index % 8 === 0) {
        await nextFrame();
      }
    }

    state.frames = frames;
    state.colorFrames = colorFrames;

    setStatus("Generating embed snippet... (this may take a moment)");
    setProgress(100);
    await new Promise((resolve) => setTimeout(resolve, 50));

    const payload = buildPayload();
    const snippet = buildInlineEmbedSnippet(payload);
    const rawSnippet = buildInlineEmbedSnippet(payload, { mode: "raw" });
    const savedBytes = Math.max(0, rawSnippet.length - snippet.length);
    const savedPercent = rawSnippet.length
      ? Math.round((savedBytes / rawSnippet.length) * 100)
      : 0;

    elements.embedCode.value = snippet;
    toggleExportButtons(true);
    setProgress(100);
    setStatus(
      `Generated ${frames.length} frame(s). Embed minified ${savedPercent}% (${formatBytes(
        savedBytes
      )} saved).`,
      "success"
    );
  } catch (error) {
    setStatus(`Frame generation failed: ${error.message}`, "error");
  } finally {
    toggleEditorDisabled(false);
    state.processing = false;
    if (wasPreviewing || state.autoPreview) {
      startPreview();
    }
  }
}

function nextFrame() {
  return new Promise((resolve) => requestAnimationFrame(() => resolve()));
}

function seekVideo(time) {
  const video = elements.sourceVideo;
  if (Math.abs(video.currentTime - time) < 0.003) {
    return Promise.resolve();
  }

  return new Promise((resolve, reject) => {
    let resolved = false;
    const timeout = setTimeout(() => {
      cleanup();
      resolve();
    }, 1400);

    const onSeeked = () => {
      cleanup();
      resolve();
    };

    const onError = () => {
      cleanup();
      reject(new Error("Seek failed during frame extraction."));
    };

    const cleanup = () => {
      if (resolved) return;
      resolved = true;
      clearTimeout(timeout);
      video.removeEventListener("seeked", onSeeked);
      video.removeEventListener("error", onError);
    };

    video.addEventListener("seeked", onSeeked, { once: true });
    video.addEventListener("error", onError, { once: true });
    video.currentTime = time;
  });
}

function buildPayload() {
  const colorMode = state.enableColor ? state.colorMode : "none";
  const includeFrameColors = colorMode === "avg";
  return {
    version: 1,
    name: getAnimationName(),
    createdAt: new Date().toISOString(),
    source: state.sourceFile?.name ?? null,
    fps: Math.max(1, state.fps),
    quality: state.quality,
    columns: state.lastDimensions.cols || getColumns(),
    rows: state.lastDimensions.rows || getRows(),
    threshold: state.threshold,
    gamma: state.gamma,
    fontAspectRatio: state.fontAspectRatio,
    rendering: {
      charSet: state.charSet,
      charSetCustom: state.charSet === "custom" ? state.charSetCustom : undefined,
      invert: state.invertMode,
      edgeWeight: state.edgeWeight,
    },
    bg: {
      transparent: state.enableTransparentBg,
      lumCutoff: state.bgLumCutoff,
      removeColor: state.enableBgRemove,
      keyColor: state.enableBgRemove ? state.bgKeyColor : undefined,
      tolerance: state.enableBgRemove ? state.bgTolerance : undefined,
    },
    color: {
      enabled: state.enableColor,
      mode: colorMode,
      glow: false,
      tuning: {
        brightness: state.colorBrightness,
        saturation: state.colorSaturation,
        contrast: state.colorContrast,
        paletteSize: state.paletteSize,
        smoothing: state.colorSmoothingValue,
      },
      frames: includeFrameColors ? state.colorFrames : [],
    },
    frames: state.frames,
  };
}

function packEmbedData(payload, mode = "auto") {
  const fps = Math.max(1, Number(payload.fps) || 12);
  const frames = Array.isArray(payload.frames) ? payload.frames : [];
  const colorConfig = payload.color || {};
  const colorMode = colorConfig.enabled ? colorConfig.mode || "none" : "none";
  const colorFrames =
    colorMode === "avg" && Array.isArray(colorConfig.frames) ? colorConfig.frames : null;

  const hasDetailedColorFrames =
    !!colorFrames &&
    colorFrames.length === frames.length &&
    colorFrames.length > 0 &&
    colorFrames.some(
      (item) => item && Array.isArray(item.p) && Array.isArray(item.r) && item.r.length > 0
    );

  const hasSolidFrameColors =
    !!colorFrames &&
    colorFrames.length === frames.length &&
    colorFrames.length > 0 &&
    colorFrames.every((item) => typeof item === "string");

  const resolvedColorMode = hasDetailedColorFrames ? "palette" : colorMode;
  const extras = {
    cm: resolvedColorMode,
    g: false,
    cw: Math.max(1, Number(payload.columns) || 0),
    ch: Math.max(1, Number(payload.rows) || 0),
  };

  if (hasSolidFrameColors) {
    extras.c = colorFrames;
  }
  if (hasDetailedColorFrames) {
    extras.cf = colorFrames;
    extras.w = Math.max(1, Number(payload.columns) || 0);
  }

  const raw = { f: fps, a: frames, ...extras };
  const dictionary = [];
  const indexes = [];
  const map = new Map();

  for (const frame of frames) {
    let position = map.get(frame);
    if (position === undefined) {
      position = dictionary.length;
      dictionary.push(frame);
      map.set(frame, position);
    }
    indexes.push(position);
  }

  const dedupe = { f: fps, u: dictionary.join(FRAME_DELIMITER), i: indexes, ...extras };
  const runs = [];
  if (indexes.length) {
    let current = indexes[0];
    let count = 1;
    for (let i = 1; i < indexes.length; i += 1) {
      if (indexes[i] === current) {
        count += 1;
      } else {
        runs.push([count, current]);
        current = indexes[i];
        count = 1;
      }
    }
    runs.push([count, current]);
  }
  const rle = { f: fps, u: dictionary.join(FRAME_DELIMITER), r: runs, ...extras };

  const candidates = {
    raw: { mode: "raw", data: raw },
    dedupe: { mode: "dedupe", data: dedupe },
    rle: { mode: "rle", data: rle },
  };

  if (mode !== "auto" && candidates[mode]) {
    return candidates[mode];
  }

  let best = candidates.raw;
  let bestSize = safeScriptJson(best.data).length;
  for (const candidate of [candidates.dedupe, candidates.rle]) {
    const size = safeScriptJson(candidate.data).length;
    if (size < bestSize) {
      best = candidate;
      bestSize = size;
    }
  }
  return best;
}

function buildPlayerRuntimeScript(data, nodeExpression) {
  return `(function(){const d=${safeScriptJson(
    data
  )};const n=${nodeExpression};if(!n)return;const rm=d.rm===true&&window.matchMedia&&window.matchMedia("(prefers-reduced-motion: reduce)").matches;const t=Math.max(16,Math.floor(1000/Math.max(1,Number(d.f)||12)));const m=d.cm||"none";const c=Array.isArray(d.c)?d.c:null;const cf=Array.isArray(d.cf)?d.cf:null;const w=Math.max(1,Number(d.w)||0);const cw=Math.max(1,Number(d.cw)||0);const ch=Math.max(1,Number(d.ch)||0);n.style.textShadow="none";const fit=()=>{if(!cw||!ch)return;const s=getComputedStyle(n);const px=parseFloat(s.paddingLeft||"0")+parseFloat(s.paddingRight||"0");const py=parseFloat(s.paddingTop||"0")+parseFloat(s.paddingBottom||"0");const pw=(n.parentElement&&n.parentElement.clientWidth)||window.innerWidth;const ph=(n.parentElement&&n.parentElement.clientHeight)||window.innerHeight;const aw=Math.max(1,pw-px-2);const ah=Math.max(1,Math.min(window.innerHeight*.95,ph)-py-2);const fs=Math.max(2,Math.min(18,Math.min(aw/(cw*.61),ah/ch)));n.style.fontSize=fs.toFixed(2)+"px";n.style.lineHeight="1";n.style.width=cw+"ch";n.style.height=ch+"em";n.style.margin="0 auto";n.style.display="block";n.style.overflow="hidden";};fit();window.addEventListener("resize",fit,{passive:true});const esc=s=>s.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;");const colorHtml=(ascii,meta)=>{if(!meta||!Array.isArray(meta.p)||!Array.isArray(meta.r))return null;const p=meta.p,r=meta.r;const flat=ascii.indexOf("\\n")===-1?ascii:ascii.replace(/\\n/g,"");let rp=0,rem=r[0]||0,rc=r[1]||0,active=-1,txt="",html="";const flush=()=>{if(!txt.length)return;const o=active*3;const red=p[o]??245,green=p[o+1]??245,blue=p[o+2]??245;html+='<span style="color:rgb('+red+','+green+','+blue+')">'+esc(txt)+"</span>";txt="";};for(let i=0;i<flat.length;i++){if(rem<=0){rp+=2;rem=r[rp]||1;rc=r[rp+1]||0;}if(active!==rc){flush();active=rc;}txt+=flat[i];rem-=1;if(w>0&&(i+1)%w===0){txt+="\\n";flush();active=-1;}}flush();return html;};const paint=(fi,total,ascii)=>{if(m==="palette"&&cf&&cf.length){const meta=cf[fi%cf.length];const html=colorHtml(ascii,meta);if(html!==null){n.innerHTML=html;fit();return;}}n.textContent=ascii;fit();if(m==="avg"&&c&&c.length){n.style.color=c[fi%c.length]||"currentColor";return;}if(m==="gradient"){const h=Math.round((fi/Math.max(1,total))*360)%360;n.style.color="hsl("+h+" 100% 72%)";return;}n.style.color="currentColor";};if(Array.isArray(d.a)){const a=d.a;if(!a.length){n.textContent="No frames found.";return;}const total=a.length;let i=0;paint(0,total,a[0]);if(rm)return;setInterval(function(){i=(i+1)%total;paint(i,total,a[i]);},t);return;}const u=typeof d.u==="string"&&d.u.length?d.u.split(String.fromCharCode(30)):[];if(Array.isArray(d.i)){const idx=d.i;if(!idx.length||!u.length){n.textContent="No frames found.";return;}const total=idx.length;let i=0;paint(0,total,u[idx[0]]||"");if(rm)return;setInterval(function(){i=(i+1)%total;paint(i,total,u[idx[i]]||"");},t);return;}if(Array.isArray(d.r)){const r=d.r;if(!r.length||!u.length){n.textContent="No frames found.";return;}const total=Math.max(1,r.reduce(function(s,v){return s+Math.max(1,((v&&v[0])|0));},0));let fi=0,ri=0,rc=Math.max(1,((r[0]&&r[0][0])|0)),rv=(r[0]&&r[0][1])|0;paint(0,total,u[rv]||"");if(rm)return;setInterval(function(){rc-=1;fi=(fi+1)%total;if(rc<=0){ri=(ri+1)%r.length;rc=Math.max(1,((r[ri]&&r[ri][0])|0));rv=(r[ri]&&r[ri][1])|0;}paint(fi,total,u[rv]||"");},t);return;}n.textContent="No frames found."})();`;
}

function onDownloadEmbed() {
  if (!state.frames.length) {
    setStatus("Generate frames before downloading embed HTML.", "error");
    return;
  }
  const payload = buildPayload();
  const html = buildStandaloneEmbed(payload);
  downloadFile(`${payload.name}.embed.html`, html, "text/html;charset=utf-8");
  setStatus("Embed HTML downloaded.", "success");
}

function onDownloadJson() {
  if (!state.frames.length) {
    setStatus("Generate frames before downloading JSON.", "error");
    return;
  }
  const payload = buildPayload();
  const json = JSON.stringify(payload);
  downloadFile(`${payload.name}.ascii.json`, json, "application/json");
  setStatus("ASCII frame JSON downloaded.", "success");
}

async function onCopySnippet() {
  if (!state.frames.length) {
    setStatus("Generate frames before copying snippet.", "error");
    return;
  }

  const payload = buildPayload();
  const snippet = buildInlineEmbedSnippet(payload);
  elements.embedCode.value = snippet;

  try {
    await navigator.clipboard.writeText(snippet);
    setStatus("Embeddable snippet copied to clipboard.", "success");
  } catch {
    setStatus("Clipboard write failed. Snippet is available in the text box.", "error");
  }
}

function buildEmbedDocument(animationName, packedData) {
  const script = buildPlayerRuntimeScript(
    packedData,
    'document.getElementById("ascii-player")'
  );
  return `<!doctype html><html lang="en"><head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width,initial-scale=1"/><title>${animationName} ASCII Animation</title><style>html,body{margin:0;padding:0;background:transparent;color:inherit}body{display:grid;place-items:center;min-height:100vh;overflow:hidden}#ascii-player{margin:0;padding:0;border:0;background:transparent;color:inherit;font:12px/1 ui-monospace,monospace;white-space:pre;overflow:hidden;max-width:100vw;max-height:100vh;box-sizing:border-box}</style></head><body><pre id="ascii-player" aria-label="ASCII animation"></pre><script>${script}</script></body></html>`;
}

function escapeHtmlAttribute(value) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function buildStandaloneEmbed(payload) {
  const packed = packEmbedData(payload);
  return buildEmbedDocument(payload.name, packed.data);
}

function buildInlineEmbedSnippet(payload, options = {}) {
  const packed = packEmbedData(payload, options.mode ?? "auto");
  const embedDoc = buildEmbedDocument(payload.name, packed.data);
  const srcdoc = escapeHtmlAttribute(embedDoc);
  const frameRows = Math.max(1, Number(payload.rows) || 40);
  const estimatedHeight = Math.max(180, Math.min(960, Math.round(frameRows * 9 + 36)));
  return `<iframe title="${payload.name} ASCII Animation" loading="lazy" referrerpolicy="no-referrer" sandbox="allow-scripts" scrolling="no" style="width:100%;max-width:100%;height:${estimatedHeight}px;border:0;display:block;background:transparent;color:inherit;overflow:hidden" srcdoc="${srcdoc}"></iframe>
<!-- Fallback: if your CMS strips iframe srcdoc, use the downloaded .embed.html file instead. -->`;
}

function safeScriptJson(value) {
  return JSON.stringify(value).replace(/<\//g, "<\\/");
}

function downloadFile(name, content, contentType) {
  const blob = new Blob([content], { type: contentType });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = name;
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  setTimeout(() => URL.revokeObjectURL(url), 2000);
}

function toggleExportButtons(enabled) {
  elements.downloadEmbed.disabled = !enabled;
  elements.downloadJson.disabled = !enabled;
  elements.copySnippet.disabled = !enabled;
}

function toggleEditorDisabled(disabled) {
  elements.videoInput.disabled = disabled;
  elements.animationName.disabled = disabled;
  elements.fps.disabled = disabled;
  elements.threshold.disabled = disabled;
  elements.gamma.disabled = disabled;
  elements.fontAspectRatio.disabled = disabled;
  elements.enableColor.disabled = disabled;
  elements.colorMode.disabled = disabled || !elements.enableColor.checked;
  if (elements.colorBrightness) elements.colorBrightness.disabled = disabled || !elements.enableColor.checked;
  if (elements.colorSaturation) elements.colorSaturation.disabled = disabled || !elements.enableColor.checked;
  if (elements.colorContrast) elements.colorContrast.disabled = disabled || !elements.enableColor.checked;
  if (elements.paletteSize) elements.paletteSize.disabled = disabled || !elements.enableColor.checked;
  if (elements.colorSmoothing) elements.colorSmoothing.disabled = disabled || !elements.enableColor.checked;
  // Background controls
  if (elements.enableTransparentBg) elements.enableTransparentBg.disabled = disabled;
  if (elements.bgLumCutoff) elements.bgLumCutoff.disabled = disabled || !state.enableTransparentBg;
  if (elements.enableBgRemove) elements.enableBgRemove.disabled = disabled;
  if (elements.bgKeyColor) elements.bgKeyColor.disabled = disabled || !state.enableBgRemove;
  if (elements.bgTolerance) elements.bgTolerance.disabled = disabled || !state.enableBgRemove;
  // Rendering controls
  if (elements.charSet) elements.charSet.disabled = disabled;
  if (elements.charSetCustom) elements.charSetCustom.disabled = disabled;
  if (elements.invertMode) elements.invertMode.disabled = disabled;
  if (elements.edgeWeight) elements.edgeWeight.disabled = disabled;
  if (elements.previewBgColor) elements.previewBgColor.disabled = disabled;
  elements.autoPreview.disabled = disabled;
  elements.generateFrames.disabled = disabled;
  elements.togglePreview.disabled = disabled;
  elements.qualityButtons.forEach((button) => {
    button.disabled = disabled;
  });
}

function formatBytes(bytes) {
  if (!Number.isFinite(bytes) || bytes <= 0) return "0 B";
  const units = ["B", "KB", "MB", "GB"];
  let value = bytes;
  let unit = units[0];
  for (let i = 1; i < units.length && value >= 1024; i += 1) {
    value /= 1024;
    unit = units[i];
  }
  return `${value.toFixed(value > 10 ? 1 : 2)} ${unit}`;
}

window.addEventListener("beforeunload", () => {
  if (state.sourceUrl) {
    URL.revokeObjectURL(state.sourceUrl);
  }
  if (state.ffmpegAssetUrls) {
    Object.values(state.ffmpegAssetUrls).forEach((url) => {
      if (typeof url === "string" && url.startsWith("blob:")) {
        URL.revokeObjectURL(url);
      }
    });
  }
});

