const fs = require('fs');
const path = require('path');

const jsonPath = path.join(__dirname, 'assets', 'businesses.json');
const businesses = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));

const baseUrl = "https://graftr-app.vercel.app"; // Default Vercel live URL domain

let md = `# 🇬🇧 UK Business Directory — 100 Verified Business URLs\n\n`;
md += `Here is the complete list of all **100 verified UK businesses** currently live in your directory, complete with their category, location, phone number, and direct app deep links.\n\n`;
md += `| # | Business Name | Category | Area / Region | Phone Number | App Deep Link URL |\n`;
md += `|---|---|---|---|---|---|\n`;

businesses.forEach((b, i) => {
  const deepLink = `${baseUrl}/#business/${b.id}`;
  md += `| ${i + 1} | **${b.name}** | \`${b.category}\` | ${b.area} | \`${b.phone || 'N/A'}\` | [View ${b.name}](${deepLink}) |\n`;
});

const artifactPath = "C:\\Users\\Jordan Duberry\\.gemini\\antigravity\\brain\\cc719131-8cf0-4724-bd72-fadfaf4d6c63\\uk_businesses_directory.md";
fs.writeFileSync(artifactPath, md, 'utf8');

console.log(`Successfully generated markdown artifact for ${businesses.length} businesses at ${artifactPath}`);
