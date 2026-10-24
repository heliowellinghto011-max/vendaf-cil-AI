* {
  box-sizing: border-box;
}

:root {
  --primary-900: #071b36;
  --primary-800: #0d2a4d;
  --primary-700: #123a67;
  --primary-500: #1d5ca8;
  --green-500: #2cc784;
  --green-100: #defae8;
  --amber-500: #f7b84b;
  --amber-100: #fff3d8;
  --red-500: #e45d6f;
  --red-100: #ffe0e4;
  --purple-500: #7a63e5;
  --purple-100: #efe9ff;
  --bg: #edf4fb;
  --card: #ffffff;
  --card-soft: #f8fbff;
  --text: #172a3a;
  --muted: #5f7287;
  --border: #dfeaf3;
  --shadow: 0 12px 32px rgba(9, 30, 54, 0.12);
}

html {
  scroll-behavior: smooth;
}

body {
  margin: 0;
  font-family: Inter, 'Segoe UI', sans-serif;
  background: linear-gradient(180deg, #edf4fb 0%, #e6eefb 100%);
  color: var(--text);
}

a {
  color: inherit;
  text-decoration: none;
}

button,
input,
select,
textarea {
  font: inherit;
}

button {
  cursor: pointer;
}

#root {
  min-height: 100vh;
}

.landing-page {
  padding: 24px clamp(20px, 4vw, 56px) 56px;
  background: radial-gradient(circle at top left, rgba(29, 92, 168, 0.18), transparent 30%), #071b36;
  color: #ffffff;
}

.landing-header,
.hero,
.section,
.interest-card,
.logo-wrap {
  max-width: 1200px;
  margin: 0 auto;
}

.landing-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 18px 0 28px;
}

.logo-wrap {
  display: flex;
  align-items: center;
  gap: 12px;
  font-weight: 700;
}

.brand-icon {
  width: 38px;
  height: 38px;
  display: grid;
  place-items: center;
  border-radius: 12px;
  background: linear-gradient(135deg, var(--green-500), #6ddfa8);
  color: #063635;
  font-weight: 900;
}

.brand-icon.large {
  width: 52px;
  height: 52px;
  font-size: 1.6rem;
}

.hero {
  display: grid;
  grid-template-columns: 1.2fr 0.8fr;
  gap: 30px;
  align-items: center;
  padding: 48px 0 24px;
}

.hero-copy h2 {
  margin: 14px 0 18px;
  font-size: clamp(2.2rem, 5vw, 4.4rem);
  line-height: 1.05;
}

.hero-copy p {
  max-width: 640px;
  font-size: 1.04rem;
  color: rgba(255, 255, 255, 0.8);
}

.eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.12);
  font-size: 0.78rem;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  font-weight: 700;
}

.eyebrow.inverse {
  background: rgba(44, 199, 132, 0.18);
  border-color: rgba(44, 199, 132, 0.4);
  color: #d4ffe7;
}

.hero-actions,
.hero-benefits {
  display: flex;
  flex-wrap: wrap;
  gap: 14px;
}

.hero-benefits {
  list-style: none;
  padding: 0;
  margin: 24px 0 0;
  color: rgba(255, 255, 255, 0.8);
}

.hero-benefits li {
  position: relative;
  padding-left: 18px;
}

.hero-benefits li::before {
  content: '•';
  position: absolute;
  left: 0;
  top: 0;
  color: var(--green-500);
}

.hero-card {
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 26px;
  padding: 26px;
  box-shadow: var(--shadow);
}

.mini-card {
  padding: 22px 18px;
  border-radius: 18px;
  background: rgba(14, 52, 90, 0.8);
  border: 1px solid rgba(255, 255, 255, 0.08);
}

.mini-card span,
.mini-card small {
  display: block;
}

.mini-card span {
  color: rgba(255, 255, 255, 0.7);
}

.mini-card strong {
  display: block;
  margin: 12px 0 6px;
  font-size: 2rem;
}

.mini-chart {
  display: flex;
  align-items: end;
  gap: 13px;
  height: 160px;
  padding-top: 26px;
}

.bar {
  flex: 1;
  min-height: 24px;
  border-radius: 12px 12px 0 0;
  background: linear-gradient(180deg, rgba(44, 199, 132, 0.9), rgba(44, 199, 132, 0.3));
}

.section {
  margin-top: 56px;
}

.section-heading {
  margin-bottom: 20px;
}

.section-heading h3 {
  margin: 12px 0 0;
  font-size: clamp(1.7rem, 3vw, 2.4rem);
}

.info-grid,
.feature-grid {
  display: grid;
  gap: 20px;
}

.two-columns {
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

.info-panel,
.feature-card,
.feature-card {
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 20px;
  padding: 22px;
}

.benefit-panel {
  background: rgba(44, 199, 132, 0.12);
}

.info-panel h4,
.feature-card h4 {
  margin: 0 0 12px;
}

.info-panel p,
.info-panel li,
.feature-card p {
  color: rgba(255, 255, 255, 0.78);
}

.info-panel ul {
  padding-left: 18px;
  margin: 0;
}

.feature-grid {
  grid-template-columns: repeat(4, minmax(0, 1fr));
}

.feature-card {
  background: rgba(255, 255, 255, 0.06);
}

.feature-bullet {
  width: 14px;
  height: 14px;
  margin-bottom: 14px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--green-500), #7ef2ba);
}

.interest-section {
  padding-bottom: 24px;
}

.interest-card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 18px;
  padding: 28px 30px;
  border-radius: 24px;
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.interest-card p {
  margin: 0 0 8px;
  color: rgba(255, 255, 255, 0.7);
}

.interest-card strong {
  font-size: 1.3rem;
}

.app-shell {
  display: grid;
  grid-template-columns: 280px 1fr;
  min-height: 100vh;
}

.sidebar {
  background: var(--primary-900);
  color: #f5faff;
  padding: 22px 18px;
  border-right: 1px solid rgba(255, 255, 255, 0.06);
}

.brand-box {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px 12px 18px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  margin-bottom: 18px;
}

.brand-box strong {
  display: block;
  font-size: 1.05rem;
}

.brand-box span {
  color: rgba(255, 255, 255, 0.7);
  display: block;
  font-size: 0.75rem;
  margin-top: 2px;
}

.nav-list {
  display: grid;
  gap: 10px;
}

.nav-item {
  color: rgba(255, 255, 255, 0.83);
  padding: 11px 12px;
  border-radius: 12px;
  transition: 0.2s ease;
}

.nav-item:hover,
.nav-item.active {
  background: rgba(255, 255, 255, 0.08);
  color: #ffffff;
}

.sidebar-card {
  margin-top: 30px;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 16px;
  padding: 16px 14px;
  color: rgba(255, 255, 255, 0.8);
}

.sidebar-card small {
  display: block;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: rgba(44, 199, 132, 0.9);
  margin-bottom: 8px;
}

.page-panel {
  background: var(--bg);
}

.topbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 24px 28px 10px;
}

.topbar h1 {
  margin: 8px 0 0;
  font-size: clamp(1.7rem, 2vw, 2.4rem);
}

.eyebrow {
  color: var(--muted);
  background: rgba(29, 92, 168, 0.08);
  border-color: rgba(29, 92, 168, 0.08);
}

.topbar-actions {
  display: flex;
  align-items: center;
  gap: 12px;
}

.demo-pill,
.mini-badge {
  display: inline-flex;
  align-items: center;
  padding: 7px 12px;
  border-radius: 999px;
  background: var(--green-100);
  color: #1e7b57;
  font-size: 0.76rem;
  font-weight: 700;
}

.content-area {
  padding: 10px 28px 30px;
}

.button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 44px;
  border-radius: 12px;
  border: 1px solid transparent;
  padding: 10px 18px;
  font-weight: 700;
  transition: 0.2s ease;
}

.button-primary {
  background: linear-gradient(135deg, var(--primary-500), var(--primary-700));
  color: #ffffff;
  box-shadow: 0 12px 24px rgba(29, 92, 168, 0.28);
}

.button-ghost {
  background: transparent;
  border-color: rgba(23, 42, 58, 0.12);
  color: var(--text);
}

.button-ghost.light {
  border-color: rgba(255, 255, 255, 0.2);
  color: #ffffff;
}

.big {
  min-height: 52px;
  padding-inline: 22px;
}

.cards-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 18px;
}

.stat-card {
  background: var(--card);
  border-radius: 18px;
  padding: 18px 18px 16px;
  border: 1px solid var(--border);
  box-shadow: var(--shadow);
}

.stat-card span,
.stat-card small {
  display: block;
}

.stat-card span {
  color: var(--muted);
  margin-bottom: 10px;
  font-size: 0.9rem;
}

.stat-card strong {
  display: block;
  font-size: clamp(1.9rem, 2vw, 2.4rem);
  margin-bottom: 8px;
}

.stat-card small {
  color: var(--muted);
}

.stat-card.blue {
  background: linear-gradient(180deg, #ffffff, #eef5ff);
}

.stat-card.amber {
  background: linear-gradient(180deg, #fffdf8, #fff3d6);
}

.stat-card.green {
  background: linear-gradient(180deg, #f9fffb, #dffcee);
}

.stat-card.purple {
  background: linear-gradient(180deg, #f9f7ff, #eeebff);
}

.stat-card.red {
  background: linear-gradient(180deg, #fffaf9, #ffe7eb);
}

.panel-grid {
  display: grid;
  grid-template-columns: 1.1fr 0.9fr;
  gap: 18px;
  margin-top: 22px;
}

.panel {
  background: var(--card);
  border: 1px solid var(--border);
  border-radius: 20px;
  padding: 20px;
  box-shadow: var(--shadow);
}

.panel-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 16px;
}

.panel-header h3 {
  margin: 0;
}

.text-link {
  font-weight: 700;
  color: var(--primary-500);
}

.priority-list {
  display: grid;
  gap: 12px;
}

.priority-item {
  display: grid;
  gap: 6px;
  border-radius: 14px;
  padding: 12px 14px;
  background: var(--card-soft);
  border: 1px solid var(--border);
}

.priority-item strong,
.priority-item span,
.priority-item small {
  display: block;
}

.priority-item span {
  color: var(--muted);
  margin-top: 2px;
}

.priority-item small {
  color: var(--text);
  line-height: 1.5;
}

.chart-box {
  display: flex;
  align-items: end;
  gap: 14px;
  min-height: 180px;
  padding-top: 12px;
}

.chart-column {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  margin-top: auto;
}

.chart-bar {
  width: 100%;
  max-width: 30px;
  min-height: 12px;
  background: linear-gradient(180deg, var(--primary-500), #87b7ff);
  border-radius: 999px 999px 0 0;
}

.chart-column small {
  color: var(--muted);
}

.cta-row {
  display: flex;
  justify-content: flex-start;
  padding-top: 22px;
}

.toolbar {
  display: flex;
  flex-wrap: wrap;
  align-items: end;
  gap: 12px;
  margin-bottom: 18px;
}

.search-box {
  flex: 1 1 260px;
}

.search-box input,
.toolbar select,
.opportunity-form input,
.opportunity-form select,
.opportunity-form textarea,
.assist-form select,
.assist-form textarea {
  width: 100%;
  border-radius: 12px;
  border: 1px solid var(--border);
  background: white;
  min-height: 46px;
  padding: 12px 14px;
  color: var(--text);
}

.toolbar label,
.opportunity-form label,
.assist-form label {
  display: grid;
  gap: 8px;
  color: var(--muted);
  font-size: 0.92rem;
}

.field-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 16px;
}

.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(6, 19, 35, 0.5);
  display: grid;
  place-items: center;
  padding: 22px;
  z-index: 20;
}

.modal-card {
  width: min(760px, 100%);
  background: var(--card);
  border-radius: 22px;
  padding: 22px 24px;
  box-shadow: var(--shadow);
}

.modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 18px;
}

.close-button {
  width: 36px;
  height: 36px;
  border: none;
  border-radius: 50%;
  background: var(--card-soft);
  font-size: 1.4rem;
  color: var(--text);
}

.opportunity-form {
  display: grid;
  gap: 18px;
}

.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}

.table-panel {
  overflow: hidden;
}

.table-wrapper {
  overflow-x: auto;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th,
td {
  border-bottom: 1px solid var(--border);
  padding: 12px 10px;
  text-align: left;
}

th {
  color: var(--muted);
  font-size: 0.82rem;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

.status-tag {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 28px;
  padding: 6px 10px;
  border-radius: 999px;
  font-size: 0.72rem;
  font-weight: 700;
  background: var(--card-soft);
}

.status-tag.novo-contato {
  background: rgba(29, 92, 168, 0.1);
  color: var(--primary-700);
}

.status-tag.em-negociacao {
  background: rgba(122, 99, 229, 0.12);
  color: #5a48c5;
}

.status-tag.aguardando-resposta {
  background: rgba(247, 184, 75, 0.15);
  color: #a76822;
}

.status-tag.venda-concluida {
  background: rgba(44, 199, 132, 0.12);
  color: #177a56;
}

.status-tag.perdida {
  background: rgba(228, 93, 111, 0.12);
  color: #b23e50;
}

.action-buttons {
  display: flex;
  gap: 8px;
}

.link-button {
  background: transparent;
  border: none;
  padding: 0;
  font-weight: 700;
  color: var(--primary-500);
}

.link-button.danger {
  color: var(--red-500);
}

.priority-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 18px;
}

.priority-card {
  background: var(--card-soft);
  border: 1px solid var(--border);
  border-radius: 18px;
  padding: 18px;
}

.priority-card.alta {
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.95), rgba(253, 245, 224, 0.9));
}

.priority-card.media {
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.95), rgba(233, 245, 255, 0.9));
}

.priority-card.baixa {
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.95), rgba(243, 247, 250, 0.9));
}

.priority-topline {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  margin-bottom: 10px;
}

.priority-card p {
  margin: 0;
  color: var(--muted);
}

.priority-card small {
  display: block;
  margin: 10px 0;
  color: var(--muted);
}

.priority-reason {
  background: rgba(255, 255, 255, 0.6);
  border: 1px solid rgba(23, 42, 58, 0.08);
  border-radius: 12px;
  padding: 12px;
  line-height: 1.5;
}

.assist-layout {
  display: grid;
  grid-template-columns: 0.9fr 1.1fr;
  gap: 18px;
}

.assist-form,
.message-box {
  background: var(--card-soft);
  border: 1px solid var(--border);
  border-radius: 18px;
  padding: 18px;
}

.assist-form {
  display: grid;
  gap: 16px;
}

.message-label {
  margin: 0 0 12px;
  font-size: 0.84rem;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: var(--muted);
}

.message-output {
  background: white;
  border: 1px solid var(--border);
  border-radius: 16px;
  padding: 18px;
  min-height: 220px;
  line-height: 1.7;
}

.message-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 18px;
}

.report-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 18px;
  margin-top: 18px;
}

.reason-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  gap: 10px;
}

.reason-list li {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 10px 12px;
  border: 1px solid var(--border);
  border-radius: 10px;
  background: var(--card-soft);
}

.comparison-table {
  display: grid;
  gap: 12px;
  margin-bottom: 16px;
}

.comparison-table div {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 12px;
  background: var(--card-soft);
  border: 1px solid var(--border);
  border-radius: 10px;
}

.conversion-box {
  background: linear-gradient(135deg, rgba(44, 199, 132, 0.12), rgba(29, 92, 168, 0.07));
  border-radius: 16px;
  border: 1px solid rgba(44, 199, 132, 0.18);
  padding: 18px;
}

.conversion-box span,
.conversion-box strong {
  display: block;
}

.conversion-box strong {
  font-size: 2rem;
  margin-top: 10px;
}

.empty-state {
  color: var(--muted);
  padding: 18px 8px;
  text-align: center;
}

.mobile-nav {
  display: none;
  gap: 10px;
  padding: 0 28px 18px;
  overflow-x: auto;
}

.mobile-nav a {
  white-space: nowrap;
  padding: 10px 12px;
  border-radius: 10px;
  background: rgba(13, 42, 77, 0.06);
  color: var(--text);
}

@media (max-width: 980px) {
  .app-shell {
    grid-template-columns: 1fr;
  }

  .sidebar {
    display: none;
  }

  .mobile-nav {
    display: flex;
  }

  .cards-grid,
  .feature-grid,
  .panel-grid,
  .assist-layout,
  .report-grid,
  .priority-grid,
  .two-columns {
    grid-template-columns: 1fr 1fr;
  }
}

@media (max-width: 720px) {
  .landing-header,
  .hero,
  .interest-card,
  .topbar,
  .toolbar {
    grid-template-columns: 1fr;
    display: grid;
  }

  .hero,
  .cards-grid,
  .feature-grid,
  .panel-grid,
  .assist-layout,
  .report-grid,
  .priority-grid,
  .two-columns,
  .field-grid {
    grid-template-columns: 1fr;
  }

  .landing-header,
  .topbar,
  .topbar-actions,
  .interest-card {
    justify-content: flex-start;
  }

  .content-area,
  .topbar {
    padding-left: 18px;
    padding-right: 18px;
  }

  .hero {
    padding-top: 22px;
  }

  .hero-copy h2 {
    font-size: 2.2rem;
  }

  .landing-header {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
  }
}
