export function analyzeData(entries) {
  const grouped = {
    business: [],
    finance: [],
    project: [],
    social: [],
  };

  entries.forEach((item) => {
    if (grouped[item.type]) {
      grouped[item.type].push(item);
    }
  });

  const stats = {};
  const insights = [];

  const getGrowth = (arr, field = "field1") => {
    if (arr.length < 2) return 0;

    const latest = parseFloat(arr[arr.length - 1].data[field] || 0);
    const prev = parseFloat(arr[arr.length - 2].data[field] || 0);

    if (prev === 0) return 0;

    return Math.round(((latest - prev) / prev) * 100);
  };

  /* BUSINESS */
  const bGrowth = getGrowth(grouped.business);
  stats.business = Math.max(0, Math.min(100, bGrowth));
  if (bGrowth < 0) insights.push("⚠️ Business declining");

  /* FINANCE */
  const fGrowth = getGrowth(grouped.finance);
  stats.finance = Math.max(0, Math.min(100, fGrowth));
  if (fGrowth < -10) insights.push("🚨 Finance instability");

  /* PROJECT */
  const pGrowth = getGrowth(grouped.project);
  stats.project = Math.max(0, Math.min(100, pGrowth));
  if (pGrowth < 0) insights.push("⚠️ Project delay risk");

  /* SOCIAL */
  const sGrowth = getGrowth(grouped.social, "field1");
  stats.social = Math.max(0, Math.min(100, sGrowth));
  if (sGrowth > 20) {
    insights.push("📈 Social growth strong");
  } else if (sGrowth < 0) {
    insights.push("⚠️ Social slowing");
  }

  return { stats, insights };
}