---
"@buttercream/styles": patch
---

Position the Checkbox, Radio, and Switch roots so their visually-hidden native inputs are
contained by the control instead of the document, which stopped a 1px absolute box from
stretching the page inside app-shell scroll regions.
