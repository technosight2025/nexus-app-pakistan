const fs = require('fs');
let code = fs.readFileSync('D:/Nexus-App-Pakistan/src/components/home/NexusHomepage.tsx', 'utf8');

// The component starts at "import React" and ends at the last "}" before "</USER_REQUEST>"
const startIdx = code.indexOf('import React');
const userReqIdx = code.indexOf('</USER_REQUEST>');

if (startIdx !== -1 && userReqIdx !== -1) {
  // Extract text
  let extracted = code.substring(startIdx, userReqIdx);
  
  // To handle any user notes at the end like "Symmetrical Elite Cards: ...",
  // we can find the last "}" and cut there.
  const lastBraceIdx = extracted.lastIndexOf('}');
  if (lastBraceIdx !== -1) {
    extracted = extracted.substring(0, lastBraceIdx + 1);
  }
  
  // Prepend "use client"
  code = '"use client";\n\n' + extracted;
  fs.writeFileSync('D:/Nexus-App-Pakistan/src/components/home/NexusHomepage.tsx', code);
  console.log('Successfully cleaned NexusHomepage.tsx');
} else {
  console.log('Markers not found');
}
