const rules = Array.from(document.styleSheets[0].cssRules);
const text = rules.map(r => r.cssText).join('\n');
document.querySelector("pre").textContent = text;