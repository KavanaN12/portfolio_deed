/* ══════════════════════════════════════
   KAVANA N — Script
   ══════════════════════════════════════ */

const projectData = {
  darkstate: {
    tags: ['Cloud Security', 'Graph Algorithms', 'Python · Neo4j · FastAPI'],
    title: 'DarkState — Attack-Path Reasoning for Cloud IAM',
    desc: 'Automated IAM attack-path reasoning engine that detects privilege escalation chains, lateral movement paths, and blast-radius risks in AWS-like environments.',
    points: [
      'Graph-based IAM analysis using Neo4j, NetworkX, FastAPI, React.js, and Cytoscape.js',
      'BFS, DFS, Dijkstra, SCC detection, minimum-cut reasoning, and attack-surface delta analysis',
      'Automated remediation workflow generation for detected risk paths',
    ],
    link: 'https://github.com/The-DarkState-Mini-Project/DarkState_Main',
  },
  'digital-twin': {
    tags: ['Blockchain', 'Digital Twin', 'Python · MongoDB · Web3'],
    title: 'Blockchain-Enabled Digital Twin for Wind Power',
    desc: 'Hybrid blockchain/off-chain architecture for turbine data integrity — 99% reduction in on-chain writes using Ethereum smart contracts and SHA-256 integrity anchoring.',
    points: [
      'Processed and validated 12,741 SCADA turbine records with digital twin simulation',
      'ML forecasting pipelines with R² > 0.85 prediction fidelity',
      'Monitoring and verification modules using Python, MongoDB, Web3, Streamlit',
    ],
    link: 'https://github.com/KavanaN12/HybridBlockchainTechForWPP',
  },
  healsync: {
    tags: ['Healthcare AI', '🏆 2nd Place — HackMCE 2025', 'React · Node.js · OCR'],
    title: 'HealSync — AI Medical Document Intelligence',
    desc: 'AI-powered healthcare platform with OCR-based medical document extraction, LLM summarization, and secure patient record workflows.',
    points: [
      'Upload, extraction, AI classification, and patient-query pipelines',
      'Stack: React.js, Node.js, MongoDB, OCR pipelines, LLM integration',
      'Won 2nd place at HackMCE 2025 — 24-hour national-level hackathon, Malnad COE',
    ],
    link: 'https://github.com/CoreAstra-HealSync/backend',
  },
  scanner: {
    tags: ['Security Tooling', 'Java · Multithreading', 'Aho-Corasick'],
    title: 'Enhanced Static Code Vulnerability Scanner',
    desc: 'High-performance static vulnerability scanner for Java and JADX-generated Android source code using Aho-Corasick multi-pattern matching.',
    points: [
      'Multithreaded scanning via Java ExecutorService — reduced scan time from 18s to 4s',
      'Detects insecure SSL usage, hardcoded credentials, TrustManager misuse',
      'Designed for large Android codebases with extensible pattern support',
    ],
    link: 'https://github.com/KavanaN12',
  },
};

/* ── Scroll reveal ── */
const ro = new IntersectionObserver(
  (entries) => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('vis'); ro.unobserve(e.target); } }),
  { threshold: 0.1, rootMargin: '0px 0px -36px 0px' }
);
document.querySelectorAll('.reveal').forEach(el => ro.observe(el));

/* ── Hero intern panel auto-rotate ── */
const internSlides = document.querySelectorAll('#internSlides .rslide');
const internDots   = document.querySelectorAll('#internDots .sdot');
let internIdx = 0;

function showInternSlide(idx) {
  internSlides.forEach((s, i) => s.classList.toggle('active', i === idx));
  internDots.forEach((d, i) => d.classList.toggle('active', i === idx));
  internIdx = idx;
}

internDots.forEach(d => d.addEventListener('click', () => showInternSlide(+d.dataset.idx)));
setInterval(() => showInternSlide((internIdx + 1) % internSlides.length), 4500);

/* ── Mini project chips → scroll to project + open ── */
document.querySelectorAll('.mini-proj-chip').forEach(chip => {
  chip.addEventListener('click', () => {
    const proj = chip.dataset.proj;
    document.getElementById('projects').scrollIntoView({ behavior: 'smooth' });
    setTimeout(() => openDrawer(proj), 500);
  });
});

/* ── Project horizontal scroll ── */
const projTrack = document.getElementById('projTrack');
document.getElementById('scrollLeft').addEventListener('click', () => {
  projTrack.scrollBy({ left: -340, behavior: 'smooth' });
});
document.getElementById('scrollRight').addEventListener('click', () => {
  projTrack.scrollBy({ left: 340, behavior: 'smooth' });
});

/* ── Project drawer ── */
const drawer      = document.getElementById('projDrawer');
const drawerMeta  = document.getElementById('drawerMeta');
const drawerTitle = document.getElementById('drawerTitle');
const drawerDesc  = document.getElementById('drawerDesc');
const drawerPoints= document.getElementById('drawerPoints');
const drawerLink  = document.getElementById('drawerLink');
let   openProj    = null;

function openDrawer(projId) {
  const data = projectData[projId];
  if (!data) return;

  // If same card clicked — toggle close
  if (openProj === projId && drawer.classList.contains('open')) {
    closeDrawer();
    return;
  }
  openProj = projId;

  drawerMeta.innerHTML  = data.tags.map(t => `<span class="proj-tag${t.includes('🏆') ? ' tag-award' : ''}">${t}</span>`).join('');
  drawerTitle.textContent = data.title;
  drawerDesc.textContent  = data.desc;
  drawerPoints.innerHTML  = data.points.map(p => `<li>${p}</li>`).join('');
  drawerLink.href         = data.link;

  document.querySelectorAll('.proj-card').forEach(c =>
    c.classList.toggle('is-open', c.dataset.proj === projId)
  );
  drawer.classList.add('open');
  setTimeout(() => drawer.scrollIntoView({ behavior: 'smooth', block: 'nearest' }), 80);
}

function closeDrawer() {
  drawer.classList.remove('open');
  openProj = null;
  document.querySelectorAll('.proj-card').forEach(c => c.classList.remove('is-open'));
}

document.querySelectorAll('.proj-card').forEach(card => {
  card.addEventListener('click', () => openDrawer(card.dataset.proj));
});
document.getElementById('drawerClose').addEventListener('click', closeDrawer);

/* ── Achievement sliding ── */
const achSlides = document.querySelectorAll('.ach-slide');
const achDots   = document.querySelectorAll('.adot');
let   achIdx    = 0;
let   achTimer;

function showAch(idx, dir = 1) {
  achSlides[achIdx].classList.remove('active');
  achSlides[achIdx].classList.add('exit');
  setTimeout(() => achSlides[achIdx].classList.remove('exit'), 500);

  achIdx = idx;
  achSlides[achIdx].classList.add('active');
  achDots.forEach((d, i) => d.classList.toggle('active', i === achIdx));

  // Link to project if applicable
  const proj = achSlides[achIdx].dataset.proj;
  const hint = achSlides[achIdx].querySelector('.ach-link-hint');
  if (hint && proj && proj !== 'none') {
    hint.style.cursor = 'pointer';
    hint.onclick = () => {
      document.getElementById('projects').scrollIntoView({ behavior: 'smooth' });
      setTimeout(() => openDrawer(proj), 500);
    };
  }
}

function nextAch() { showAch((achIdx + 1) % achSlides.length); resetAchTimer(); }
function prevAch() { showAch((achIdx - 1 + achSlides.length) % achSlides.length); resetAchTimer(); }
function resetAchTimer() { clearInterval(achTimer); achTimer = setInterval(nextAch, 5000); }

document.getElementById('achNext').addEventListener('click', nextAch);
document.getElementById('achPrev').addEventListener('click', prevAch);
achDots.forEach(d => d.addEventListener('click', () => { showAch(+d.dataset.idx); resetAchTimer(); }));
resetAchTimer();

// Init first ach link
showAch(0);

/* ── Nav active highlight ── */
const navAs = document.querySelectorAll('.nav-links a');
const secEls = document.querySelectorAll('section[id], footer[id]');
const secObs = new IntersectionObserver(
  (entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        navAs.forEach(a => {
          const active = a.getAttribute('href') === `#${e.target.id}`;
          a.style.color = active ? 'var(--lav-deep)' : '';
          a.style.background = active ? 'var(--lav-light)' : '';
        });
      }
    });
  },
  { threshold: 0.45 }
);
secEls.forEach(s => secObs.observe(s));
