// =====================================================
// NOTE / LICENSE
// =====================================================
//
// Script & Function by: https://github.com/solongeran54
// Built in 2025
//
// License & Usage:
//   • Personal, non-commercial use only
//   • Commercial use is strictly prohibited
//   • Please respect the author’s work and time
//
// All Rights Reserved © 2025
//
// You are welcome to share and contribute to the Open Source community,
// but any commercial exploitation or redistribution without permission
// is not allowed.
//
// =====================================================

import { app } from "../../../scripts/app.js";

app.registerExtension({
    name: "BGImageNodeExtensionLock",

    nodeCreated(node) {
			const nodeImages = {
				"SampleClass1": "/extensions/Your_CustomNode/start/decrypt/bg_1.png",
				"SampleClass2": "/extensions/Your_CustomNode/start/decrypt/bg_2.png",
				"SampleClass3": "/extensions/Your_CustomNode/start/decrypt/bg_1.png"
			}; 
		
        // global Cache (per Extension)
        if (!this._imageCache) this._imageCache = {};

        const src = nodeImages[node.comfyClass];
        if (!src) return;

        // Grab and produce Image from Cache
        let img = this._imageCache[src];
        if (!img) {
            img = new Image();
            img.src = src;
            img.crossOrigin = "anonymous";
            this._imageCache[src] = img;
            img._loaded = false;
            img.onload = () => {
                img._loaded = true;
                // mark all Nodes as dirty (in Case of same Source/Images)
                app.root?.graph?.nodes?.forEach(n => {
                    if (n.comfyClass && nodeImages[n.comfyClass] === src) {
                        n.setDirtyCanvas(true, true);
                    }
                });
            };
            img.onerror = () => {
                console.warn("Bild konnte nicht geladen werden:", src);
            };
        }

        // DPI/Pixelratio, opt. (sharper Rendering on HiDPI)
        const DPR = window.devicePixelRatio || 1;

        node.onDrawBackground = function(ctx) {
            const w = Math.max(1, Math.floor(node.size[0]));
            const h = Math.max(1, Math.floor(node.size[1]));

            // clear background area (optional)
            ctx.clearRect(0, 0, w, h);

            if (img._loaded) {
                // COVER-Logic: scale so the image *covers* the node (no blank bars)
                const scaleX = w / img.width;
                const scaleY = h / img.height;
                const scale = Math.max(scaleX, scaleY); // cover -> max

                const drawW = img.width * scale;
                const drawH = img.height * scale;

                const offsetX = (w - drawW) / 2;
                const offsetY = (h - drawH) / 2;

                // Clip to Node-Bounds, to slice the Img perfectly
                ctx.save();
                ctx.beginPath();
                ctx.rect(0, 0, w, h);
                ctx.clip();

                // opt.: better Pix. Alignment on HiDPI
                // (Canvas intern scaled typically; a small Quality Benefit)
                // ctx.setTransform(DPR, 0, 0, DPR, 0, 0);

                ctx.drawImage(img, offsetX, offsetY, drawW, drawH);

                ctx.restore();
            } else {
                // Fallback-Fill while Load or Flaw accoured
                ctx.fillStyle = "rgba(200,200,200,0.12)";
                ctx.fillRect(0, 0, w, h);
            }

            // Frame/Border (inner Node)
            ctx.strokeStyle = "#444";
            ctx.lineWidth = 0;
            ctx.strokeRect(0, 0, w, h);
        };

        // Take care to Refill and Draw again
        node.onResize = function() {
            this.setDirtyCanvas(true, true);
            return true;
        };

        // If Node should in Case of Adding directly visible:
        node.setDirtyCanvas(true, true);
    }
});

// =======================================================
// This Function is prepared for a encrypt/decrypt Version
// Release will publish soon (2026)
// =======================================================