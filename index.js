class item {
        constructor(name, price, perPrice, brand, brandName, checked = false){
                this.name = name;
                this.price = price;
                this.perPrice = perPrice;
                this.brand = brand;
                this.brandName = brandName;
                this.checked = checked;
        }

        toggleCheck(){
                if(this.checked == true){
                        this.checked = false;
                }else if(this.checked == false){
                        this.checked = true;
                }
        }
}

class recipe{
        constructor(name, ingredients, instructions){
                this.name = name;
                this.ingredients = ingredients;
                this.instructions = instructions;
        }
}

class list{
        constructor(title, date, items, runningTotal=false){
                this.title = title;
                this.date = date;
                this.items = items;
                this.runningTotal = runningTotal;
        }
        bareSubtotal(){
                let sum = 0;
                for(let i = 0; i < this.items.length; i++){
                        sum += this.items[i].price;
                }
                return sum;
        }
        subtotal(){
                if(this.runningTotal == true){
                        let sum = 0;
                        //alert(this.items.length);
                        for(let i = 0; i < this.items.length; i++){
                                if(this.items[i].checked == true){
                                        sum += this.items[i].price;
                                }  
                        }
                        return sum;
                }else if(this.runningTotal == false){
                        let sum = 0;
                        //alert(this.items.length);
                        for(let i = 0; i < this.items.length; i++){
                                sum += this.items[i].price;
                        }
                        return sum;
                }
        }
        tax(){
                let subT = this.subtotal();
                let tax = subT * 0.0625;
                return tax;
        }
        total(){
                let subT = this.subtotal();
                let t = this.tax();
                return subT + t;
        }
        inBudget(){
                let total = this.total();
                if(localStorage.getItem('budget') !== null){
                        if(total <= localStorage.getItem('budget')){
                                return true;
                        }else{
                                return false;
                        }
                }else{
                        if(total <= budget){
                                return true;
                        }else{
                                return false;
                        } 
                }
                
        }
        listIndexOf(item){
                //alert("HELLO");
                for(let i = 0; i < this.items.length; i++){
                        //alert(this.items[i].brandName);
                        if(this.items[i].brandName == item.brandName){
                                return i;
                        }
                }
                return -1;
        }
        switchItem(item, switchWith){
                //alert(this.items.length);

                //this.items = this.items.splice(this.listIndexOf(item), 1);
                let delInd = this.listIndexOf(item);
                delete this.items[delInd];
                this.items[delInd] = switchWith;
                //console.log(this.items);
        }
        getSuggestions(){
                let diff = localStorage.getItem('budget') - this.bareSubtotal();
                let suggestions = [];
                for(let i = 0; i < this.items.length; i++){
                        let alts = getAltItems(this.items[i]);
                        if(alts.length > 0 && !suggestions.includes(this.items[i].name)){
                                suggestions.push(this.items[i].name);
                        }
                }
                return suggestions;
        }
}


const charminTP = new item("Toilet Paper", 27.54, "$0.05/sq ft & 584 sq ft", "Charmin", "Charmin Ultra Soft Toilet Paper - 24 Rolls");
const cottTP = new item("Toilet Paper", 21.82, "$0.04/sq ft & 621 sq ft","Cottonelle", "Cottonelle Ultra Comfort Soft Toilet Paper - 24 Rolls");
const quilTP = new item("Toilet Paper", 21.82, "$0.03/sq ft & 646 sq ft", "Quilted Northern", "Quilted Northern Ultra Plush Toilet Paper - 24 Rolls");
const sTP = new item("Toilet Paper", 8.20, "$0.02/sq ft & 506 sq ft", "Soft & Strong" , "Soft & Strong Toilet Paper - 24 Rolls")
const raoPS = new item("Pasta Sauce", 7.16, "$0.30/oz & 24 oz", "Rao's", "Rao's Homemade Marinara Sauce");
const bottPS = new item("Pasta Sauce", 5.49, "$0.23/oz & 24 oz", "Botticelli", "Botticelli Marinara Premium Pasta Sauce");
const cmPS = new item("Pasta Sauce", 3.72, "$0.16/oz & 24 oz", "Central Market" , "Central Market Organic Marinara Pasta Sauce");
const ragPS = new item("Pasta Sauce", 2.33, "$0.10/oz & 24 oz", "Ragu" , "Ragu Old World Style Traditional Pasta Sauce");
const evPP = new item("Paper Plates", 8.82,"$0.10/ct & 85 ct", "Everyday" ,"Everyday Paper Plates - 10 in.");
const ultPP = new item("Paper Plates", 6.74, "$0.08/ct & 85 ct", "Ultra" , "Ultra Paper Plates - 10 in.");
const hebMozz = new item("Mozzarella Cheese", 4.29, "$0.27/oz & 16 oz", "H-E-B", "H-E-B Low Moisture Part-Skim Mozzarella Cheese-16oz");
const miceliMozz = new item("Mozzarella Cheese", 7.79, "$0.49/oz & 16 oz", "Miceli's", "Miceli's Sliced Fresh Mozzarella Cheese-16oz");
const lioniMozz = new item("Mozzarella Cheese", 11.32, "$0.71/oz & 16 oz", "Lioni", "Lioni Fresh Hand-Wrapped Mozzarella Cheese Ball-16oz");
const hebBread = new item("Bread", 2.27, "$0.11/oz & 20 oz", "H-E-B", "H-E-B Round Top Large White Enriched Bread-20oz");
const saraBread = new item("Bread", 3.10, "$0.16/oz & 20 oz", "Sara Lee Artesano", "Sara Lee Artesano Original Bread-20oz");
const wonderBread = new item("Bread", 3.04, "$0.15/oz & 20 oz", "Wonder", "Wonder Classic White Bread-20oz");
const kerryButter = new item("Butter", 4.14, "$0.52/oz & 8 oz", "Kerrygold", "Kerrygold Grass-Fed Pure Irish Salted Butter-8oz");
const landButter = new item("Butter", 4.35, "$0.54/oz & 8 oz", "Land O Lakes", "Land O Lakes Salted Butter-8oz");
const hebButter = new item("Butter", 2.62, "$0.33/oz & 8 oz", "H-E-B", "H-E-B Salted Butter-8oz");
const barillaPasta = new item("Pasta", 1.91, "$0.12/oz & 16 oz", "Barilla", "Barilla Penne Pasta-16oz");
const hebPasta = new item("Pasta", 1.16, "$0.07/oz & 16 oz", "H-E-B", "H-E-B Penne Pasta-16oz");
const hillPasta = new item("Pasta", 1.02, "$0.06/oz & 16 oz", "Hill Country Fare", "Hill Country Fare Penne Pasta-16oz");
const hebOnions = new item("Onions", 3.62, "$0.11/oz & 32 oz", "H-E-B", "H-E-B Organics White Onions-2lbs");
const hebRedOnions = new item("Onions", 3.62, "$0.11/oz & 32 oz", "H-E-B", "H-E-B Organics Red Onions-2lbs");
const hebGarlic = new item("Garlic", 5.18, "$0.86/oz & 6 oz", "H-E-B", "H-E-B Fresh Peeled Garlic Cloves-6oz");
const hebOrgGarlic = new item("Garlic", 6.22, "$1.04/oz & 6 oz", "H-E-B", "H-E-B Organics Fresh Peeled Garlic Cloves-6oz");

const list1 = new list("weekly", "11/10/24", [charminTP, raoPS, evPP, barillaPasta]);
const list2 = new list("weekly", "11/3/24", [cottTP, ultPP, cmPS]);
const list3 = new list("untitled", "10/20/24", [sTP]);
const allItems = [charminTP, cottTP, sTP, quilTP, raoPS, bottPS, cmPS, ragPS, evPP, ultPP, hebMozz, miceliMozz, lioniMozz, hebBread, saraBread, wonderBread, kerryButter, landButter, hebButter, barillaPasta, hebPasta, hillPasta, hebOnions, hebRedOnions, hebGarlic, hebOrgGarlic];

let grilledRecipe = new recipe("Grilled Cheese", [hebMozz, hebBread, hebButter], "Butter both sides of each bread. Place the bread over medium heat. Let the bread toast lightly for 1 minute. Add cheese. Place the bread on top, press lightly, and cook for 3 minutes until the underside is brown. Turn and cook the other side.");
let pastaRecipe = new recipe("One-Pot Pasta", [raoPS, barillaPasta, hebOnions, hebGarlic], "Add pasta to a large pot. Add onions and garlic and mix well. Bring the pot to boil over high heat. Once boiling, reduce heat to medium low and cook the pasta for 10-14 minutes, until al-dente. Stir the mixture every 2 minutes.");

let lists = [list1, list2, list3];
let recipes = JSON.parse(localStorage.getItem("recipes")) || [grilledRecipe, pastaRecipe];
const budget = 50.00;



/*function load(){
        //alert("HELLO");
        alert(getAltItems(charminTP));
}*/

function getUniqueBrands(){
        let unique = [];
        for(let i = 0; i < allItems.length; i++){
                if(!unique.includes(allItems[i].brand)){
                        unique.push(allItems[i].brand);
                }
        }
        return unique;
}

function formatDateForInput(dateString) {
        let date = new Date(dateString);
        return date.toISOString().split('T')[0];
}

function getBrands(uniqueType){
        let brands = [];
        for(let i = 0; i < allItems.length; i++){
                if(allItems[i].name == uniqueType){
                        brands.push(allItems[i]);
                }
        }
        return brands;
}

function getUniqueItemTypes(){
        let unique = [];
        for(let i = 0; i < allItems.length; i++){
                if(!unique.includes(allItems[i].name)){
                        unique.push(allItems[i].name);
                }
        }
        return unique;
}

function setInListInfo(num){
        //const currList = lists[num];
        //localStorage.clear();
        
        localStorage.setItem('currentList', num);
        if (!localStorage.getItem('budget')) {
                localStorage.setItem('budget', budget);
                console.log("Saving 'budget' to localStorage:", budget);
        }
        if (!localStorage.getItem('allLists')) {
                localStorage.setItem('allLists', JSON.stringify(lists));
                console.log("Saving 'allLists' to localStorage:", JSON.stringify(lists));
        }
}


function getAltItems(item){
        //alert(item);
        let altItems = [];
        for(let i = 0; i < allItems.length; i++){
                if(allItems[i].name === item.name && allItems[i].brandName !== item.brandName && allItems[i].price <= item.price ){
                        altItems.push(allItems[i]);
                }
        }
        if(localStorage.getItem('sort') !== null){
                if(localStorage.getItem('sort') == "lowest to highest price"){
                        altItems.sort((a, b) => a.price - b.price);
                }else if(localStorage.getItem('sort') == "highest to lowest price"){
                        altItems.sort((a, b) => b.price - a.price);
                }
        }
        return altItems;
}

function getPriceStr(price){
        return (Math.round(price * 100) / 100).toFixed(2);
}

function openWindow(){
        let ratio = 440/956;
        let url = './content.html';
        myWindow = window.open(url, "GroceryGuide", "width=" + (ratio*window.screen.availHeight) + ", height=" + window.screen.availHeight);
}

function displayBtnTxt(element){
        if(element.id == "home"){
                element.innerHTML = "Home";
        }else if(element.id == "list"){
                element.innerHTML = "Lists";
        }else if(element.id== "filters"){
                element.innerHTML = "Filters";
        }
}

function redisplayIcon(element){
        if(element.id == "home"){
                element.innerHTML = "<i class='fa-solid fa-house'></i>";
        }
        else if(element.id == "list"){
                element.innerHTML = "<i class='fa-solid fa-list'></i>";
        }
        else if(element.id== "filters"){
                element.innerHTML = "<i class='fa-solid fa-filter'></i>";
        }
}

function resetLocalStorage(){
        localStorage.clear();
        openResetModal();
}