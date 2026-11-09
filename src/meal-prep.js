// One seven-serving lunch and one seven-serving dinner per week.
// Serving amounts are cooked meat/grains; the shopping prompt converts to raw purchases.
const proteins={chicken:'chicken',turkey:'lean ground turkey',beef:'lean ground beef',pork:'pork tenderloin'};
const starches={rice:'½ cup cooked rice',pasta:'½ cup cooked pasta',potato:'½ large potato (about 4½ oz)'};
const vegetables={broccoli:'2 cups broccoli',sprouts:'2 cups Brussels sprouts'};
const flavors={
 salsa:{text:'2 tbsp salsa',items:{salsa:2},method:'Stir salsa through the cooked protein, or pack it separately.'},
 tomato:{text:'½ cup tomato sauce · ¼ tsp dried Italian herbs',items:{sauce:.5,seasoning:.25},method:'Simmer the cooked protein with tomato sauce and dried Italian herbs.'},
 lemon:{text:'1 tbsp lemon juice · 1 garlic clove',items:{lemon:1,garlic:1},method:'Season the protein with garlic and lemon juice.'},
 garlic:{text:'1 garlic clove · ¼ tsp dried herbs',items:{garlic:1,seasoning:.25},method:'Season the protein and vegetables with garlic and dried herbs.'},
 soy:{text:'1 tsp low-sodium soy sauce · 1 garlic clove',items:{soy:1,garlic:1},method:'Toss the cooked protein with low-sodium soy sauce and garlic.'},
 paprika:{text:'¼ tsp smoked paprika · 1 garlic clove',items:{paprika:.25,garlic:1},method:'Season the protein and vegetables with smoked paprika and garlic.'}
};
function recipe(title,protein,starch,vegetable,flavor){const f=flavors[flavor];return {title,text:`${title}: about 3 palm-sized portions of ${proteins[protein]} (8 oz cooked) · ${starches[starch]} · ${vegetables[vegetable]} · ${f.text} · 1 tsp cooking oil`,items:{[protein]:8,[starch]:.5,[vegetable]:2,...f.items,oil:1},steps:[`Cook enough ${proteins[protein]} to yield seven 8 oz cooked servings. ${protein==='chicken'||protein==='turkey'?'Cook poultry to 165°F / 74°C.':protein==='beef'?'Cook ground beef to 160°F / 71°C.':'Cook pork to 145°F / 63°C and rest 3 minutes.'}`,`Prepare ${starch==='rice'?'3½ cups of cooked rice':starch==='pasta'?'3½ cups of cooked pasta':'3½ large potatoes (cook 4 and save the extra half)'} and 14 cups of ${vegetable==='broccoli'?'broccoli':'Brussels sprouts'}. Use the batch ingredient amounts below; grains are listed cooked.`,f.method,'Divide into 7 lunch or dinner containers, with 1 tsp oil per serving included in cooking. Refrigerate the first 3–4 days and freeze later-week servings promptly. Thaw overnight in the refrigerator.']};}
export const mealPrepWeeks=[
 {lunch:recipe('Salsa chicken rice bowls','chicken','rice','broccoli','salsa'),dinner:recipe('Garlic turkey potato boxes','turkey','potato','sprouts','garlic')},
 {lunch:recipe('Italian turkey pasta bowls','turkey','pasta','broccoli','tomato'),dinner:recipe('Lemon chicken potato boxes','chicken','potato','sprouts','lemon')},
 {lunch:recipe('Salsa beef rice bowls','beef','rice','broccoli','salsa'),dinner:recipe('Paprika pork potato boxes','pork','potato','sprouts','paprika')},
 {lunch:recipe('Lemon chicken pasta bowls','chicken','pasta','broccoli','lemon'),dinner:recipe('Garlic turkey rice bowls','turkey','rice','sprouts','garlic')},
 {lunch:recipe('Salsa turkey rice bowls','turkey','rice','broccoli','salsa'),dinner:recipe('Italian beef potato boxes','beef','potato','sprouts','tomato')},
 {lunch:recipe('Garlic-soy pork rice bowls','pork','rice','broccoli','soy'),dinner:recipe('Italian chicken pasta bowls','chicken','pasta','sprouts','tomato')},
 {lunch:recipe('Salsa chicken potato boxes','chicken','potato','broccoli','salsa'),dinner:recipe('Garlic turkey pasta bowls','turkey','pasta','sprouts','garlic')},
 {lunch:recipe('Italian beef pasta bowls','beef','pasta','broccoli','tomato'),dinner:recipe('Lemon pork rice bowls','pork','rice','sprouts','lemon')},
 {lunch:recipe('Paprika turkey rice bowls','turkey','rice','broccoli','paprika'),dinner:recipe('Garlic chicken potato boxes','chicken','potato','sprouts','garlic')},
 {lunch:recipe('Garlic-soy chicken rice bowls','chicken','rice','broccoli','soy'),dinner:recipe('Salsa beef potato boxes','beef','potato','sprouts','salsa')},
 {lunch:recipe('Lemon pork pasta bowls','pork','pasta','broccoli','lemon'),dinner:recipe('Salsa turkey potato boxes','turkey','potato','sprouts','salsa')},
 {lunch:recipe('Paprika chicken pasta bowls','chicken','pasta','broccoli','paprika'),dinner:recipe('Garlic beef rice bowls','beef','rice','sprouts','garlic')}
];
export function mealPrepForWeek(week){if(!Number.isInteger(week)||week<1||week>12)throw new RangeError('Choose a meal-plan week from 1 to 12.');return mealPrepWeeks[week-1];}
export const batchItems=recipe=>Object.fromEntries(Object.entries(recipe.items).map(([key,n])=>[key,Number((n*7).toFixed(4))]));
