# BGImageNodeExtensionLock for ComfyUI


**Author:** [solongeran54](https://github.com/solongeran54)  
**Built:** 2025  
**License:** Personal, non-commercial use only – All Rights Reserved © 2025

---

## Overview

`BGImageNodeExtensionLock` is a **ComfyUI extension** that allows you to assign **custom background images to specific nodes** in your workflow graph. It ensures that images **cover the entire node area dynamically**, respect node resizing, and maintain crisp rendering even on **HiDPI displays**.

This extension demonstrates **true Open Source principles** for personal use, while maintaining full respect for the author's work.

---

## Features

- **Dynamic Node Backgrounds**: Assign any image to a specific node class.
- **Cover Mode Rendering**: Images always cover the entire node area, no blank bars.
- **Clip Handling**: Excess parts of the image are automatically clipped to node boundaries.
- **HiDPI Support**: Sharp rendering on high-DPI displays.
- **Global Image Cache**: Prevents redundant image loads, improving performance.
- **Automatic Refresh**: Node canvas updates automatically on image load or node resize.
- **Expandable Mapping**: Add unlimited node classes with corresponding images.

---

<img width="3550" height="1824" alt="Modified_CustomNodes" src="https://github.com/user-attachments/assets/42078d00-6034-4a83-83b3-327055e3642f" />

---

## Installation

1. Copy the `BGImageNodeExtensionLock` folder to a temporary folder.

2. Select the Custom Node folder from your ComfyUI main directory that you want to apply BG images to.

3. Copy the `web` folder (with all its contents) into the main folder of the Custom Node.

4. Open the Custom Node's `__init__.py` in a text editor.

5. Add the following line at the end of `__init__.py`:

```python
WEB_DIRECTORY = "./web"
```
   
6. Open web/bgimage_node.js and configure your node classes in the mapping section:

```javascript
   nodeCreated(node) {
    const nodeImages = {
        "SampleClass1": "/extensions/Your_CustomNode/start/decrypt/bg_1.png",
        "SampleClass2": "/extensions/Your_CustomNode/start/decrypt/bg_3.png",
        "SampleClass3": "/extensions/Your_CustomNode/start/decrypt/bg_2.png"
    }; 
}
```

8. Copy your images into: web/start/decrypt/

9. Start ComfyUI, search your modified Custom Nodes, and load them into the Graph. Your BG images should now appear.


## Technical Details

Image Loading: Cached per extension to reduce redundant network or disk operations.

Canvas Drawing:

onDrawBackground is used to render the image.

Cover logic scales images proportionally to fill the node.

ctx.clip() ensures no overflow beyond node boundaries.

HiDPI Support: Uses window.devicePixelRatio to optionally adjust rendering for crispness.

Node Resize Handling: onResize triggers a redraw to maintain dynamic coverage.	


## Notes & License


Script & Function by: https://github.com/solongeran54
Built in 2025

License & Usage:
  • Personal, non-commercial use only
  • Commercial use is strictly prohibited
  • Please respect the author’s work and time

All Rights Reserved © 2025

This project demonstrates the value of true Open Source principles.
While respecting copyright, it encourages sharing and contribution
within the personal, non-commercial scope.


## Contribution & Feedback


  • Fork the repository, improve features, or add new image-handling options.

  • Submit PRs with bug fixes or enhancements.

  • Respect the license if redistributing.


## Changelog  


# v1.0 (2025)

  • Initial release of BGImageNodeExtensionLock.

  • Dynamic background support for multiple node classes.

  • Full cover rendering with clipping and HiDPI optimization.
	
	
## Future Enhancements

  • Live node updates without reload.

  • Optional fade-in or zoom effects for backgrounds.

  • Integration with Python Node for automated image assignment.

  • Rounded corners support.

  • GUI for selecting images per node class directly in ComfyUI.


## Acknowledgements

  • ComfyUI Team for providing a flexible node-based UI framework.

  • Qwen Image (Apache 2.0) for open-source inspiration.

  • Open Source Community for fostering collaboration and innovation.  
	
