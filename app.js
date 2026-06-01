const today = new Date("2026-06-01T00:00:00");

const contracts = [
  {
    id: "ctc0142015",
    ctc: "CTC0142015",
    supplier: "Axium Plastics LLC",
    ultimateParty: "AXIUM PLASTICS LLC",
    network: "Packaging",
    portfolio: "Bottles",
    category: "Pkg : Bottles",
    scope: "Global",
    country: "US",
    value: 146804280.36,
    spend: 68116786.0292,
    effectiveDate: "2024-07-01",
    expirationDate: "2029-06-30",
    status: "Review",
    approvalStatus: "Rejected",
    otif: [0.79865694722475, 0.865007403708987, 0.858378009761388, 0.851057054388799],
    otifMinimum: null,
    otifStrikes: 4,
    eIncidents: 1,
    eIncidentStrikes: 0,
    totalStrikes: 4,
    recovery: 1468042.8036000002,
    directorTeam: "Caps, Closures, Plastic Assemblies and R",
    documentUrl: ""
  },
  {
    id: "ctc0155644",
    ctc: "CTC0155644",
    supplier: "Givaudan International SA",
    ultimateParty: "GIVAUDAN SA",
    network: "Chemicals",
    portfolio: "Fragrances & Flavours 2",
    category: "Chemicals : Fragrances & Flavours 2",
    scope: "Global",
    country: "EU",
    value: 22592067.4,
    spend: 85290152.5029,
    effectiveDate: "2025-04-01",
    expirationDate: "2026-03-31",
    status: "Review",
    approvalStatus: "Rejected",
    otif: [0.731741573033708, 0.722420700179533, 0.677542619047619, 0.788663625254582],
    otifMinimum: null,
    otifStrikes: 4,
    eIncidents: 0,
    eIncidentStrikes: 0,
    totalStrikes: 4,
    recovery: 1132706.6759615385,
    directorTeam: "Fragrances & Flavours",
    documentUrl: ""
  },
  {
    id: "ctc0149215",
    ctc: "CTC 0149215",
    supplier: "Winland Foods, Inc.",
    ultimateParty: "Winland Foods Inc",
    network: "Ingredients",
    portfolio: "Farmed Ing",
    category: "Food Ing : Farmed Ing",
    scope: "Global",
    country: "NA",
    value: 50075892.76,
    spend: 21952519.4151,
    effectiveDate: "2024-12-01",
    expirationDate: "2026-11-30",
    status: "Negotiation",
    approvalStatus: "In review",
    otif: [0.719747569721116, 0.589243831325301, 0.538560030120482, 0.775830602409639],
    otifMinimum: 0.96,
    otifStrikes: 4,
    eIncidents: 2,
    eIncidentStrikes: 2,
    totalStrikes: 6,
    recovery: 1097625.9707550001,
    directorTeam: "Farmed Ingredients",
    documentUrl: "https://storage.cloud.google.com/grace-contract/pdfs/New%20Agreements%2023-02-2026/CTC0149215%20Winland%20Foods%20Inc_2024Dec.pdf"
  },
  {
    id: "ctc0154938",
    ctc: "CTC 0154938",
    supplier: "Tubex GmbH",
    ultimateParty: "TUBEX HOLDING GMBH",
    network: "Packaging",
    portfolio: "Aerosol Cans",
    category: "Pkg : Aerosol Cans",
    scope: "Global",
    country: "EU",
    value: 162852141.88,
    spend: 18869373.8334,
    effectiveDate: "2026-01-01",
    expirationDate: "2030-12-31",
    status: "Executed",
    approvalStatus: "Approved",
    otif: [0.953764032258064, 0.918770756501182, 0.942781712846348, 0.972345890410959],
    otifMinimum: null,
    otifStrikes: 1,
    eIncidents: 3,
    eIncidentStrikes: 3,
    totalStrikes: 4,
    recovery: 939278.7103610913,
    directorTeam: "Aerosol Packaging Components",
    documentUrl: "https://storage.cloud.google.com/grace-contract/pdfs/New%20Agreements%2023-02-2026/CTC0154938%20TUBEX%20GMBH_2026Jan.pdf"
  },
  {
    id: "ctc0156831",
    ctc: "CTC0156831",
    supplier: "ALPLA Plastik San Ve Tic Ltd Sti",
    ultimateParty: "ALPLA PRIVATSTIFTUNG",
    network: "Markets - NAMETRUB Africa",
    portfolio: "Bottles",
    category: "Mkt NAMETRUB Africa : Bottles",
    scope: "Global",
    country: "Turkey",
    value: 18471544.33,
    spend: 21553663.5015,
    effectiveDate: "2025-05-16",
    expirationDate: "2026-05-15",
    status: "Executed",
    approvalStatus: "Approved",
    otif: [0.885813175257732, 0.890784106280193, 0.873378275, 0.868667417218543],
    otifMinimum: null,
    otifStrikes: 4,
    eIncidents: 0,
    eIncidentStrikes: 0,
    totalStrikes: 4,
    recovery: 926114.5165453297,
    directorTeam: "Markets - TUII",
    documentUrl: ""
  }
];

const state = {
  tab: "renewals",
  activeContractId: contracts[0].id,
  calendarMonth: new Date("2026-05-01T00:00:00"),
  selectedExecutionDate: null,
  recentlyExecutedId: null
};

const byId = (id) => document.getElementById(id);
const money = (value) => `EUR ${compactMoney(value)}`;
const compactMoney = (value) => {
  if (value >= 1000000) return `${trimNumber(value / 1000000)}M`;
  if (value >= 1000) return `${trimNumber(value / 1000)}K`;
  return Math.round(value).toLocaleString("en-US");
};
const trimNumber = (value) => {
  const fixed = value >= 10 ? value.toFixed(1) : value.toFixed(2);
  return fixed.replace(/\.0$/, "");
};
const dateLabel = (dateString) => new Date(`${dateString}T00:00:00`).toISOString().slice(0, 10);
const average = (items) => items.reduce((sum, item) => sum + item, 0) / items.length;
const pct = (value) => `${(value * 100).toFixed(1)}%`;
const score = (contract) => Math.max(45, Math.round(average(contract.otif) * 100 - contract.totalStrikes * 1.2));
const riskLabel = (contract) => contract.totalStrikes >= 5 ? "Critical" : contract.totalStrikes >= 4 ? "High" : "Monitor";
const daysToRenewal = (contract) => {
  const expiration = new Date(`${contract.expirationDate}T00:00:00`);
  return Math.ceil((expiration - today) / 86400000);
};
const renewalText = (contract) => {
  const days = daysToRenewal(contract);
  return days < 0 ? "Expired" : `${days} days`;
};
const contractType = (contract) => `${contract.network} Agreement`;
const statusClass = (status) => status.toLowerCase().replace(/\s+/g, "-");
const reasonFor = (contract) => {
  if (contract.approvalStatus === "Rejected") return { label: "Approval Rejected", tone: "red" };
  if (contract.totalStrikes >= 5) return { label: "OTIF Below Target", tone: "orange" };
  if (contract.eIncidents > 0) return { label: "E-Incidents", tone: "yellow" };
  return { label: "Monitor", tone: "yellow" };
};
const recommendationFor = (contract) => {
  if (contract.status === "Review") return "Review recovery gap";
  if (daysToRenewal(contract) < 0) return "Review renewal status";
  if (daysToRenewal(contract) < 210) return "Initiate renewal";
  return "Monitor performance";
};
const openClauseComparison = (contractId = state.activeContractId) => {
  const contract = contracts.find((item) => item.id === contractId) || contracts[0];
  state.activeContractId = contract.id;
  renderClauses(contract);
  byId("clauseOverlay").classList.remove("hidden");
};

function renderPortfolio() {
  const head = byId("portfolioHead");
  const body = byId("portfolioBody");
  const rows = [...contracts].sort((a, b) => {
    if (state.tab === "live") return b.recovery - a.recovery;
    return daysToRenewal(a) - daysToRenewal(b);
  });

  if (state.tab === "renewals") {
    head.innerHTML = `
      <tr>
        <th>Rank</th><th>Supplier Name</th><th>Contract Type</th><th>Renewal Date</th>
        <th>Days to Renewal</th><th>Grace Score</th><th>Alerts</th><th>Status</th><th>AI Recommendation</th>
      </tr>
    `;
    body.innerHTML = rows.map((contract, index) => `
      <tr data-row-contract="${contract.id}">
        <td class="rank">#${index + 1}</td>
        <td><button class="supplier-link" data-contract="${contract.id}">${contract.supplier}</button></td>
        <td><button class="supplier-link subdued" data-contract="${contract.id}">${contractType(contract)}</button></td>
        <td>${dateLabel(contract.expirationDate)}</td>
        <td><strong>${renewalText(contract)}</strong></td>
        <td><strong>${score(contract)}%</strong></td>
        <td>${alertCell(contract)}</td>
        <td><span class="status-pill ${statusClass(contract.status)}">${contract.status}</span></td>
        <td><button class="recommendation-link" data-recommendation="${contract.id}">${recommendationFor(contract)}</button></td>
      </tr>
    `).join("");
  } else {
    head.innerHTML = `
      <tr>
        <th>Rank</th><th>Supplier Name</th><th>Contract Value</th><th>OTIF %</th>
        <th>Incidents</th><th>Recovery Value</th><th>Grace Score</th><th>Alerts</th><th>AI Recommendation</th><th>Recovery Reason</th>
      </tr>
    `;
    body.innerHTML = rows.map((contract, index) => {
      const reason = reasonFor(contract);
      return `
        <tr data-row-contract="${contract.id}">
          <td class="rank">#${index + 1}</td>
          <td><button class="supplier-link" data-contract="${contract.id}">${contract.supplier}</button></td>
          <td><strong>${money(contract.value)}</strong></td>
          <td><strong>${pct(average(contract.otif))}</strong></td>
          <td><strong>${contract.eIncidents}</strong></td>
          <td class="money">${money(contract.recovery)}</td>
          <td><strong>${score(contract)}%</strong></td>
          <td>${alertCell(contract)}</td>
          <td><button class="recommendation-ghost" data-recommendation="${contract.id}">${recommendationFor(contract)}</button></td>
          <td><span class="reason-pill ${reason.tone}">${reason.label}</span></td>
        </tr>
      `;
    }).join("");
  }

  document.querySelectorAll("[data-contract]").forEach((button) => {
    button.addEventListener("click", () => openDetail(button.dataset.contract));
  });
  document.querySelectorAll("[data-recommendation]").forEach((button) => {
    button.addEventListener("click", () => openClauseComparison(button.dataset.recommendation));
  });
  document.querySelectorAll("[data-row-contract]").forEach((row) => {
    row.addEventListener("click", (event) => {
      if (event.target.closest("button")) return;
      openDetail(row.dataset.rowContract);
    });
  });
}

function alertCell(contract) {
  return contract.totalStrikes > 0 ? `<span class="alert-count">${contract.totalStrikes}</span>` : "0";
}

function openDetail(id) {
  state.activeContractId = id;
  window.location.hash = `contract=${id}`;
  renderRoute();
}

function renderRoute() {
  const match = window.location.hash.match(/contract=([^&]+)/);
  const contract = match ? contracts.find((item) => item.id === match[1]) : null;
  const portfolioView = byId("portfolioView");
  const detailView = byId("detailView");
  const backButton = byId("backButton");
  const exportButton = byId("exportButton");
  const assistantButton = byId("assistantButton");
  const hero = byId("portfolioHero");

  if (contract) {
    state.activeContractId = contract.id;
    portfolioView.classList.add("hidden");
    detailView.classList.remove("hidden");
    backButton.classList.remove("hidden");
    exportButton.classList.remove("hidden");
    assistantButton.classList.remove("hidden");
    hero.classList.add("detail");
    byId("pageTitle").textContent = contract.supplier;
    byId("pageSubtitle").textContent = contractType(contract);
    renderDetail(contract);
  } else {
    portfolioView.classList.remove("hidden");
    detailView.classList.add("hidden");
    backButton.classList.add("hidden");
    exportButton.classList.add("hidden");
    assistantButton.classList.add("hidden");
    hero.classList.remove("detail");
    byId("pageTitle").textContent = "Supplier Portfolio";
    byId("pageSubtitle").textContent = "View and manage all supplier contracts";
    renderPortfolio();
  }
}

function renderDetail(contract) {
  byId("contractSelect").innerHTML = contracts.map((item) => `
    <option value="${item.id}" ${item.id === contract.id ? "selected" : ""}>
      ${item.supplier} - ${contractType(item)} - Uploaded ${dateLabel(item.effectiveDate)}
    </option>
  `).join("");

  const executed = contract.status === "Executed";
  byId("negotiationStage").classList.toggle("selected", !executed);
  byId("executedStage").classList.toggle("executed", executed);
  byId("executedStage").classList.toggle("stage-pulse", state.recentlyExecutedId === contract.id);
  byId("moveStageButton").classList.toggle("hidden", executed);
  byId("policyDate").textContent = `Policy implemented on ${longDate(contract.effectiveDate)}`;
  byId("detailScore").textContent = `${score(contract)}%`;
  byId("detailTier").textContent = score(contract) >= 90 ? "Gold" : score(contract) >= 75 ? "Silver" : "Bronze";
  byId("detailRecovery").textContent = money(contract.recovery);
  byId("detailRecoveryRisk").textContent = riskLabel(contract);
  byId("detailAlerts").textContent = contract.totalStrikes;
  byId("detailAlertChips").innerHTML = `
    <span class="chip blue">Renewal ${dateLabel(contract.expirationDate)}</span>
    <span class="chip red">OTIF strikes ${contract.otifStrikes}</span>
    <span class="chip yellow">E incidents ${contract.eIncidents}</span>
  `;
  byId("recentAvg").textContent = pct(average(contract.otif));
  byId("minTarget").textContent = contract.otifMinimum ? pct(contract.otifMinimum) : "95.0%";
  byId("trendValue").textContent = `${trend(contract) >= 0 ? "+" : ""}${(trend(contract) * 100).toFixed(1)}%`;

  renderLineChart(contract);
  renderBarChart(contract);
  renderMetrics(contract);
  renderIncidents(contract);
  renderClaims(contract);
}

function longDate(dateString) {
  return new Intl.DateTimeFormat("en-US", { month: "long", day: "numeric", year: "numeric" }).format(new Date(`${dateString}T00:00:00`));
}

function trend(contract) {
  return contract.otif[3] - contract.otif[0];
}

function renderMetrics(contract) {
  const target = contract.otifMinimum || 0.95;
  const rows = [
    ["Contract Value", money(contract.value), "-", "Active", "Total contract worth"],
    ["Total Spend", money(contract.spend), "-", "Active", "Reported spend"],
    ["Supplier Avg OTIF", pct(average(contract.otif)), pct(target), average(contract.otif) >= target ? "OK" : "Below Target", "Overall performance"],
    ["Risk Score", riskLabel(contract), "Low pref.", contract.totalStrikes >= 5 ? "Action" : "Monitor", "Risk assessment"],
    ["OTIF Strikes", contract.otifStrikes, "< 3", contract.otifStrikes < 3 ? "OK" : "Monitor", "Delivery performance misses"],
    ["E-Incidents", contract.eIncidents, "0", contract.eIncidents === 0 ? "OK" : "Action", "Compliance incidents"],
    ["Recovery Opportunity", money(contract.recovery), "-", "Identified", "Potential savings"],
    ["Approval Status", contract.approvalStatus, "Approved", contract.approvalStatus === "Approved" ? "OK" : "Review", "Workbook status"]
  ];

  byId("metricsBody").innerHTML = rows.map(([metric, current, targetValue, status, note]) => `
    <tr>
      <td><strong>${metric}</strong></td>
      <td><strong>${current}</strong></td>
      <td>${targetValue}</td>
      <td>${statusBadge(status)}</td>
      <td>${note}</td>
    </tr>
  `).join("");
}

function statusBadge(status) {
  const good = ["OK", "Active", "Identified"].includes(status);
  const bad = ["Below Target", "Action", "Review"].includes(status);
  return `<span class="small-pill ${good ? "good" : bad ? "bad" : ""}">${status}</span>`;
}

function renderIncidents(contract) {
  const count = Math.max(contract.eIncidents, contract.eIncidentStrikes);
  byId("incidentTotal").textContent = `${count} total`;
  const rows = Array.from({ length: count }, (_, index) => {
    const severity = index === 0 && contract.totalStrikes >= 5 ? "A - Critical" : index % 2 ? "B - High" : "C - Medium";
    const impact = contract.recovery / Math.max(count, 1) * (index === 0 ? 0.08 : 0.045);
    return [
      rollingDate(index),
      index % 2 ? "Late Delivery" : "Non-Conformance Report",
      severity,
      index % 2 ? "Shipment arrived beyond agreed delivery window." : "Performance issue recorded against contract KPI history.",
      money(impact)
    ];
  });
  byId("incidentsBody").innerHTML = rows.length ? rows.map((row) => `
    <tr>
      <td>${row[0]}</td><td>${row[1]}</td><td><span class="severity-pill ${row[2].startsWith("A") ? "bad" : ""}">${row[2]}</span></td><td>${row[3]}</td><td class="money">${row[4]}</td>
    </tr>
  `).join("") : `<tr><td colspan="5">No E-incident records in workbook.</td></tr>`;
}

function renderClaims(contract) {
  byId("claimTotal").textContent = `${contract.totalStrikes} total`;
  byId("strikeApplied").textContent = contract.totalStrikes;
  byId("unclaimedValue").textContent = `${money(contract.recovery)} identified but not claimed`;
  const rows = Array.from({ length: Math.min(contract.totalStrikes, 6) }, (_, index) => [
    rollingDate(index + 1),
    index % 2 ? "Late Delivery" : "OTIF Miss",
    index === 0 && contract.totalStrikes >= 5 ? "A - Critical" : index % 2 ? "B - High" : "C - Medium",
    index % 2 ? "Delivery performance below expected contract window." : "Quarterly OTIF result missed minimum performance threshold.",
    "",
    "Acknowledged"
  ]);
  byId("claimsBody").innerHTML = rows.map((row) => `
    <tr>
      <td>${row[0]}</td><td>${row[1]}</td><td><span class="severity-pill">${row[2]}</span></td><td>${row[3]}</td>
      <td><input type="checkbox" aria-label="Claim ${row[1]}" /></td><td><span class="small-pill">${row[5]}</span></td>
    </tr>
  `).join("");
}

function rollingDate(index) {
  const date = new Date("2026-04-14T00:00:00");
  date.setDate(date.getDate() - index * 37);
  return new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", year: "numeric" }).format(date);
}

function renderLineChart(contract) {
  const labels = ["2025-02", "2025-03", "2025-04", "2025-05", "2025-06", "2025-08", "2025-09", "2025-10", "2025-11", "2025-12", "2026-01", "2026-02"];
  const values = monthlyOtif(contract);
  const { min, max, ticks } = chartScale(values);
  const w = 900;
  const h = 230;
  const pad = { left: 54, right: 36, top: 24, bottom: 42 };
  const x = (index) => pad.left + index * ((w - pad.left - pad.right) / (values.length - 1));
  const y = (value) => pad.top + (max - value) / (max - min) * (h - pad.top - pad.bottom);
  const points = values.map((value, index) => `${x(index)},${y(value)}`).join(" ");
  const target = (contract.otifMinimum || 0.95) * 100;

  byId("lineChart").innerHTML = `
    <div class="chart-plot">
      <svg viewBox="0 0 ${w} ${h}" role="img">
        <line x1="${pad.left}" y1="${y(target)}" x2="${w - pad.right}" y2="${y(target)}" stroke="#20c4d6" stroke-width="2" stroke-dasharray="5 5" />
        <line x1="${pad.left}" y1="${y(95)}" x2="${w - pad.right}" y2="${y(95)}" stroke="#ff8a3d" stroke-width="2" stroke-dasharray="5 5" />
        <polyline points="${points}" fill="none" stroke="#4388f5" stroke-width="3" />
        ${values.map((value, index) => `<circle cx="${x(index)}" cy="${y(value)}" r="4" fill="#4388f5" />`).join("")}
        ${labels.map((label, index) => `<text x="${x(index)}" y="213" text-anchor="middle" fill="#8a94a6" font-size="10">${label}</text>`).join("")}
        ${ticks.map((tick) => `<text x="${pad.left - 8}" y="${y(tick) + 4}" text-anchor="end" fill="#8a94a6" font-size="10">${tick}</text>`).join("")}
      </svg>
    </div>
    ${chartLegend("Actual OTIF")}
  `;
}

function renderBarChart(contract) {
  const labels = ["2025-02", "2025-03", "2025-04", "2025-05", "2025-06", "2025-08", "2025-09", "2025-10", "2025-11", "2025-12", "2026-01", "2026-02"];
  const values = monthlyOtif(contract);
  const { min, max, ticks } = chartScale(values);
  const w = 900;
  const h = 230;
  const pad = { left: 54, right: 36, top: 24, bottom: 44 };
  const barW = 40;
  const gap = (w - pad.left - pad.right) / values.length;
  const y = (value) => pad.top + (max - value) / (max - min) * (h - pad.top - pad.bottom);
  const baseline = y(min);

  byId("barChart").innerHTML = `
    <div class="chart-plot">
      <svg viewBox="0 0 ${w} ${h}" role="img">
        <line x1="${pad.left}" y1="${y(95)}" x2="${w - pad.right}" y2="${y(95)}" stroke="#ff8a3d" stroke-width="2" stroke-dasharray="5 5" />
        <line x1="${pad.left}" y1="${y((contract.otifMinimum || 0.95) * 100)}" x2="${w - pad.right}" y2="${y((contract.otifMinimum || 0.95) * 100)}" stroke="#20c4d6" stroke-width="2" stroke-dasharray="5 5" />
        ${values.map((value, index) => {
          const x = pad.left + index * gap + (gap - barW) / 2;
          const barY = y(value);
          return `<rect x="${x}" y="${barY}" width="${barW}" height="${baseline - barY}" rx="4" fill="#4388f5" />
            <circle cx="${x + barW / 2}" cy="${barY - 8}" r="3.5" fill="#ff4a7a" />
            <text x="${x + barW / 2}" y="213" text-anchor="middle" fill="#8a94a6" font-size="10">${labels[index]}</text>`;
        }).join("")}
        ${ticks.map((tick) => `<text x="${pad.left - 8}" y="${y(tick) + 4}" text-anchor="end" fill="#8a94a6" font-size="10">${tick}</text>`).join("")}
      </svg>
    </div>
    ${chartLegend("OTIF")}
  `;
}

function chartLegend(primaryLabel) {
  return `
    <div class="chart-legend" aria-hidden="true">
      <span class="legend-item actual">${primaryLabel}</span>
      <span class="legend-item target">Target</span>
      <span class="legend-item minimum">Minimum</span>
    </div>
  `;
}

function monthlyOtif(contract) {
  const quarterly = contract.otif.map((item) => item * 100);
  return [
    quarterly[0] + 1.4,
    quarterly[0] + 0.4,
    (quarterly[0] + quarterly[1]) / 2,
    quarterly[1] - 1.1,
    quarterly[1] + 0.8,
    quarterly[2],
    quarterly[2] + 0.9,
    quarterly[2] - 0.5,
    (quarterly[2] + quarterly[3]) / 2,
    quarterly[3] + 0.6,
    quarterly[3] - 0.3,
    quarterly[3]
  ].map((value) => Math.max(50, Math.min(99.2, value)));
}

function chartScale(values) {
  const rawMin = Math.min(...values, 95);
  const rawMax = Math.max(...values, 100);
  const min = Math.max(50, Math.floor((rawMin - 5) / 5) * 5);
  const max = Math.min(100, Math.ceil((rawMax + 1) / 5) * 5);
  const step = Math.max(5, Math.round((max - min) / 4 / 5) * 5);
  const ticks = [];
  for (let tick = max; tick >= min; tick -= step) ticks.push(tick);
  if (!ticks.includes(min)) ticks.push(min);
  return { min, max, ticks };
}

function renderNotifications() {
  const critical = [...contracts].sort((a, b) => b.totalStrikes - a.totalStrikes)[0];
  const renewal = [...contracts]
    .filter((contract) => contract.id !== critical.id)
    .sort((a, b) => Math.abs(daysToRenewal(a)) - Math.abs(daysToRenewal(b)))[0];
  const recommendation = [...contracts]
    .filter((contract) => contract.id !== critical.id && contract.id !== renewal.id)
    .sort((a, b) => b.recovery - a.recovery)[0];
  const ordered = [critical, renewal, recommendation];
  byId("notificationItems").innerHTML = ordered.map((contract, index) => {
    const type = index === 0 ? "critical" : index === 1 ? "warning" : "info";
    const title = index === 0 ? "Volume Breach Alert" : index === 1 ? "Contract Renewal Due" : "New Recommendation Available";
    const renewalDays = daysToRenewal(contract);
    const renewalMessage = renewalDays < 0
      ? `${contractType(contract)} expired ${Math.abs(renewalDays)} days ago`
      : `${contractType(contract)} renews in ${renewalDays} days`;
    const text = index === 0
      ? `${contract.supplier} exceeded contracted volume by ${Math.max(12, contract.totalStrikes * 3)}%`
      : index === 1
        ? renewalMessage
        : `AI identified ${money(contract.recovery)} recovery opportunity`;
    const time = index === 0 ? "2 hours ago" : index === 1 ? "1 day ago" : "2 days ago";
    return `
      <div class="notification-item">
        <span class="symbol ${type}">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 8v4"></path><path d="M12 16h.01"></path><circle cx="12" cy="12" r="10"></circle></svg>
        </span>
        <div><h3>${title}</h3><p>${text}</p><time>${time}</time></div>
        <span class="reason-pill ${type === "critical" ? "red" : type === "warning" ? "orange" : "yellow"}">${type}</span>
      </div>
    `;
  }).join("");
}

function renderClauses(contract) {
  const total = contract.recovery;
  const clauses = [
    {
      title: "OTIF Commitment",
      impact: contract.totalStrikes >= 5 ? "High Impact" : "Medium Impact",
      saving: total * 0.46,
      current: `Average OTIF performance is ${pct(average(contract.otif))} across the reported 2025 quarters.`,
      recommended: `Apply recovery review for ${contract.otifStrikes} OTIF strikes against ${contract.otifMinimum ? pct(contract.otifMinimum) : "95.0%"} benchmark.`
    },
    {
      title: "E-Incident Terms",
      impact: contract.eIncidents > 0 ? "High Impact" : "Medium Impact",
      saving: total * 0.22,
      current: `${contract.eIncidents} E-incidents are recorded in the source workbook.`,
      recommended: `Escalate ${contract.eIncidentStrikes} E-incident strikes for commercial recovery review.`
    },
    {
      title: "Recovery Adjustment",
      impact: "High Impact",
      saving: total * 0.32,
      current: `Current identified recovery value is ${money(contract.recovery)}.`,
      recommended: `Validate claim path for ${contract.supplier} under ${contract.category}.`
    }
  ];

  byId("clauseList").innerHTML = clauses.map((clause) => `
    <article class="clause-card">
      <h3>${clause.title}</h3>
      <span class="impact-pill ${clause.impact.startsWith("High") ? "high" : "medium"}">${clause.impact}</span>
      <div class="clause-saving"><span>Potential Savings</span><strong>${money(clause.saving)}</strong></div>
      <div class="clause-row-label">Current</div>
      <div class="clause-text">${clause.current}</div>
      <div class="clause-row-label">AI Recommended</div>
      <div class="clause-text recommended">${clause.recommended}</div>
      <div class="clause-actions"><button>Adopt Recommendation</button><button>Dismiss</button></div>
    </article>
  `).join("");
  byId("clauseTotal").textContent = money(total);
}

function renderCalendar() {
  const month = state.calendarMonth;
  const year = month.getFullYear();
  const monthIndex = month.getMonth();
  byId("monthLabel").textContent = new Intl.DateTimeFormat("en-US", { month: "long", year: "numeric" }).format(month);
  const first = new Date(year, monthIndex, 1);
  const days = new Date(year, monthIndex + 1, 0).getDate();
  const blanks = first.getDay();
  const buttons = [];
  for (let i = 0; i < blanks; i += 1) buttons.push(`<span class="calendar-day muted">0</span>`);
  for (let day = 1; day <= days; day += 1) {
    const value = new Date(year, monthIndex, day);
    const valueText = value.toISOString().slice(0, 10);
    buttons.push(`<button class="calendar-day ${state.selectedExecutionDate === valueText ? "selected" : ""}" data-date="${valueText}">${day}</button>`);
  }
  byId("calendarDays").innerHTML = buttons.join("");
  document.querySelectorAll("[data-date]").forEach((button) => {
    button.addEventListener("click", () => {
      state.selectedExecutionDate = button.dataset.date;
      byId("selectedDateText").textContent = state.selectedExecutionDate;
      byId("confirmStatus").classList.remove("disabled");
      renderCalendar();
    });
  });
}

function bindEvents() {
  document.querySelectorAll(".tab").forEach((tab) => {
    tab.addEventListener("click", () => {
      state.tab = tab.dataset.tab;
      document.querySelectorAll(".tab").forEach((item) => item.classList.toggle("active", item.dataset.tab === state.tab));
      renderPortfolio();
    });
  });

  byId("backButton").addEventListener("click", () => {
    window.location.hash = "";
    renderRoute();
  });

  byId("contractSelect").addEventListener("change", (event) => openDetail(event.target.value));
  byId("moveStageButton").addEventListener("click", () => {
    state.selectedExecutionDate = null;
    byId("selectedDateText").textContent = "Select date";
    byId("confirmStatus").classList.add("disabled");
    byId("calendar").classList.add("hidden");
    byId("statusOverlay").classList.remove("hidden");
    renderCalendar();
  });
  byId("cancelStatus").addEventListener("click", () => byId("statusOverlay").classList.add("hidden"));
  byId("dateInput").addEventListener("click", () => byId("calendar").classList.toggle("hidden"));
  byId("prevMonth").addEventListener("click", () => {
    state.calendarMonth = new Date(state.calendarMonth.getFullYear(), state.calendarMonth.getMonth() - 1, 1);
    renderCalendar();
  });
  byId("nextMonth").addEventListener("click", () => {
    state.calendarMonth = new Date(state.calendarMonth.getFullYear(), state.calendarMonth.getMonth() + 1, 1);
    renderCalendar();
  });
  byId("todayButton").addEventListener("click", () => {
    state.selectedExecutionDate = today.toISOString().slice(0, 10);
    state.calendarMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    byId("selectedDateText").textContent = state.selectedExecutionDate;
    byId("confirmStatus").classList.remove("disabled");
    renderCalendar();
  });
  byId("confirmStatus").addEventListener("click", () => {
    if (!state.selectedExecutionDate) return;
    const contract = contracts.find((item) => item.id === state.activeContractId);
    if (!contract) return;
    contract.status = "Executed";
    contract.executionDate = state.selectedExecutionDate;
    state.recentlyExecutedId = contract.id;
    byId("statusOverlay").classList.add("hidden");
    renderRoute();
    window.setTimeout(() => {
      state.recentlyExecutedId = null;
      byId("executedStage").classList.remove("stage-pulse");
    }, 1400);
  });

  [byId("clauseButton"), byId("clauseButtonTwo"), byId("assistantButton")].forEach((button) => {
    button.addEventListener("click", () => openClauseComparison());
  });
  byId("closeClauses").addEventListener("click", () => byId("clauseOverlay").classList.add("hidden"));
  byId("notificationButton").addEventListener("click", () => byId("notificationsPanel").classList.toggle("hidden"));
  window.addEventListener("hashchange", renderRoute);
}

bindEvents();
renderNotifications();
renderCalendar();
renderRoute();
