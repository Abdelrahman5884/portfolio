const fs = require('fs');
const path = require('path');
const base = 'C:\\Users\\NV\\.gemini\\antigravity-ide\\brain';
for (const dir of fs.readdirSync(base)) {
  const p = path.join(base, dir, '.system_generated', 'logs', 'transcript.jsonl');
  if (fs.existsSync(p)) {
    const lines = fs.readFileSync(p, 'utf8').split('\n');
    for (const l of lines) {
      if (l.includes('"USER_INPUT"')) {
        try {
          const j = JSON.parse(l);
          if (j.content && j.content.includes('<USER_REQUEST>')) {
            console.log('=== ' + dir + ' ===');
            console.log(j.content.split('<USER_REQUEST>')[1]?.split('</USER_REQUEST>')[0]?.trim());
          }
        } catch(e) {}
      }
    }
  }
}
