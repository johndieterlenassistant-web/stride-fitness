import {jsPDF} from 'jspdf';
import {days,mealsForWeek,groceryTotals,ingredients,portionNote,shoppingPrompt} from './plan.js';
import {mealPrepForWeek,batchItems} from './meal-prep.js';
export const ascii=s=>String(s).replace(/(\d)([½¼¾⅔])/g,'$1 $2').replaceAll('½','1/2').replaceAll('¼','1/4').replaceAll('¾','3/4').replaceAll('⅔','2/3').replaceAll('–','-').replaceAll('—','-').replaceAll('×','x').replaceAll('·',' | ').replaceAll('’',"'").replace(/ +/g,' ');
export function mealPDF(week){
 const menus=mealsForWeek(week),prep=mealPrepForWeek(week),doc=new jsPDF();let y=24;
 const line=(s,size=10,color=[38,53,46])=>{doc.setFontSize(size);doc.setTextColor(...color);const lines=doc.splitTextToSize(ascii(s),174);for(const l of lines){if(y>277){doc.addPage();y=22;}doc.text(l,18,y);y+=size*.48;}y+=3;};
 line('STRIDE / YOUR WEEKLY MEAL PLAN',18);line(`Week ${week} | One adult | Higher-protein meal prep`,11);
 line('Two batch meals: one lunch and one dinner, repeated daily. Prepare 7 servings of each. Each serving includes about 3 palms of meat (8 oz cooked). Starch: 1/2 cup cooked rice/pasta or 1/2 large potato, plus 2 cups vegetables and 1 tsp oil per meal. Use lean meats. Breakfasts, snacks and extras are unchanged.',10);line(portionNote,9);
 for(const [slot,recipe]of Object.entries(prep)){doc.addPage();y=24;line(`WEEK ${week} / ${slot.toUpperCase()} BATCH`,16);line(recipe.title,14);line('Makes 7 servings. Per serving:',10);line(recipe.text);line('Batch ingredients / serving amounts (not raw purchase weights)',12);for(const [key,n]of Object.entries(batchItems(recipe)))line(`${ingredients[key][0]}: ${Number(n.toFixed(2))} ${ingredients[key][1]}`);line('Preparation',12);recipe.steps.forEach((step,i)=>line(`${i+1}. ${step}`));}
 doc.addPage();y=24;line('SEVEN-DAY MENU',16);
 for(let i=0;i<7;i++){if(y>232){doc.addPage();y=22;}line(days[i],14);for(const meal of menus[i])line(`${meal.name}: ${meal.text}`);}
 doc.addPage();y=24;line('WEEKLY INGREDIENT TOTALS',16);line('Includes all 7 lunches, 7 dinners, breakfasts, snacks and extras, counted once. These are serving amounts, NOT raw shopping weights. The batch recipe pages and daily menus describe the same food; do not add their quantities again.',9);
 for(const [key,n]of Object.entries(groceryTotals(week)))line(`${ingredients[key][0]}: ${Number(n.toFixed(2))} ${ingredients[key][1]}`);
 line('Meal prep & food safety',13);line('Sunday: prepare both seven-serving recipes. Refrigerate only the first 3-4 days and freeze later-week containers promptly. Thaw overnight in the refrigerator; refresh fruit and snacks midweek. Refrigerate within 2 hours (1 hour in very hot conditions), at 40 F / 4 C or below. Reheat leftovers to 165 F / 74 C. Keep raw meat separate.');
 line('Eating out',13);line('A restaurant lunch or dinner REPLACES one planned serving; remove that serving from prep/shopping quantities. Grilled protein with rice/potato and vegetables or a burrito bowl works well. Sauce on the side. Do not skip meals to earn dinner.');
 doc.addPage();y=24;line('CHATGPT / KROGER SHOPPING PROMPT',16);line('Upload this PDF to ChatGPT, then copy the prompt below (also available with Copy Kroger prompt in the app).',10);line(shoppingPrompt(week),11);
 for(let p=1;p<=doc.getNumberOfPages();p++){doc.setPage(p);doc.setFontSize(8);doc.setTextColor(110,120,114);doc.text(`Stride | Week ${week} | ${p} / ${doc.getNumberOfPages()}`,18,290);}return doc;
}
export function downloadBlob(name,blob){const url=URL.createObjectURL(blob);const a=document.createElement('a');a.href=url;a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(url),2000);}
