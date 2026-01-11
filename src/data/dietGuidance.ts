export function dietGuidance(goal: 'fatloss'|'musclegain', diet: 'veg'|'nonveg') {
  const base = `Guidance only — no calorie counting. Focus on whole Indian foods, adequate protein, and consistency.\n\n`;
  const veg = `Veg options:\n- Dal + Rice (add salad)\n- Roti + Sabzi\n- Paneer bhurji or grilled paneer\n- Curd/Greek yogurt\n- Chana/rajma bowls\n`;
  const nonveg = `Non-veg adds:\n- Eggs (2–4 whole or whites mix)\n- Chicken/fish curry with roti/rice\n`;
  const fat = `Fat loss tips:\n- Plate: 1/2 veggies, 1/4 protein, 1/4 carbs\n- Limit oil and sweets; smart portions\n- 10-min post-meal walk when possible\n`;
  const muscle = `Muscle gain tips:\n- Add an extra protein serving daily\n- Milk/curd in evening if tolerated\n- Don’t skip carbs around workout\n`;
  return base + veg + (diet==='nonveg'? nonveg: '') + (goal==='fatloss'? fat: muscle);
}
