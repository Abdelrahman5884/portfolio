const cssUrls = [
  'https://ownitt.fr/_next/static/chunks/3whgzpdfinuyn.css',
  'https://ownitt.fr/_next/static/chunks/047so6xe48w5u.css',
  'https://ownitt.fr/_next/static/chunks/3ty-emgz6ta5f.css'
];

for (const url of cssUrls) {
  try {
    const res = await fetch(url);
    const css = await res.text();
    console.log(url, 'length:', css.length);
    // Find transition, scroll-snap, or section rules
    const matches = css.match(/([^{}]+{[^{}]*(?:snap|scroll-snap|sticky|section|manifesto|hero)[^{}]*})/gi) || [];
    console.log('Matches for', url, ':', matches.slice(0, 5));
  } catch(e) {
    console.error('Err', e.message);
  }
}
