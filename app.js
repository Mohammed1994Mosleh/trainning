'use strict';
let hours = ['6am', '7am', '8am', '9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm'];
let container = document.getElementById('container');
let tableEl = document.createElement('table');
container.appendChild(tableEl);

let shops = [];
function Shop(shopName, min, max, avg) {
    this.shopName = shopName;
    this.minCust = min;
    this.maxCust = max;
    this.avgCookies = avg;
    this.randCusts = [];
    this.avgCookiesPerH = [];
    this.total = 0;
    shops.push(this);
}
Shop.prototype.calcRandCustPerH = function () {
    for (let i = 0; i < hours.length; i++) {
        let min = Math.ceil(this.minCust);
        let max = Math.floor(this.maxCust);
        let randCust = Math.floor(Math.random() * (max - min + 1) + min);
        this.randCusts.push(randCust);
    }
}
Shop.prototype.calAvgCookiesPerH = function () {
    for (let i = 0; i < hours.length; i++) {
        this.avgCookiesPerH[i] = Math.ceil(this.randCusts[i] * this.avgCookies);
        this.total = this.total + this.avgCookiesPerH[i];
    }
}
Shop.prototype.render = function () {
    let trEl = document.createElement('tr');
    let tdEl = document.createElement('td');
    tdEl.textContent = this.shopName;
    trEl.appendChild(tdEl);
    for (let i = 0; i < hours.length; i++) {
        let tdEl = document.createElement('td');
        tdEl.textContent = this.avgCookiesPerH[i];
        trEl.appendChild(tdEl);
    }
    let tdTotalEl = document.createElement('td');
    tdTotalEl.textContent = this.total;
    trEl.appendChild(tdTotalEl);
    tableEl.appendChild(trEl);

}

function createTableHeader() {
    let trEl = document.createElement('tr')
    let thShopNameEl = document.createElement('th')
    trEl.appendChild(thShopNameEl);
    thShopNameEl.textContent = 'shop name';
    for (let i = 0; i < hours.length; i++) {
        let thEl = document.createElement('th');
        thEl.textContent = hours[i];
        trEl.appendChild(thEl);
    }
    let thDailyTotalEl = document.createElement('th')
    trEl.appendChild(thDailyTotalEl);
    thDailyTotalEl.textContent = 'Daily Location Total';
    tableEl.appendChild(trEl);
}
function createFooter() {
    let tfootEl = document.createElement('tfoot');
    let tdEl = document.createElement('td');
    tdEl.textContent = 'Totals';
    tfootEl.appendChild(tdEl);
    tableEl.appendChild(tfootEl);
    let megaTotal = 0;
    //h = 0 hour = 6 am
    for (let h = 0; h < hours.length; h++) {
        let tdEl = document.createElement('td');
        let sum = 0;
        //s = 0 shop = seattle
        //s = 1 shop = tokyo
        //s = 2 shop = dubai
        for (let s = 0; s < shops.length; s++) {
            // sum = 0 + 265; 
            // sum = 265 + 15;
            // sum = 265 + 15 + 130
            // seattle.avgCookiesPerH
            sum = sum + shops[s].avgCookiesPerH[h];
        }
        megaTotal += sum;
        tdEl.textContent = sum;
        tfootEl.appendChild(tdEl);
    }
    let totalTdEl = document.createElement('td');
    totalTdEl.textContent = megaTotal;
    tfootEl.appendChild(totalTdEl);
}
let seattle = new Shop('Seattle', 23, 65, 6.3);
let tokyo = new Shop('Tokyo', 3, 24, 1.2);
let dubai = new Shop('Dubai', 11, 38, 3.7);
let paris = new Shop('Paris', 20, 38, 2.3);
let lima = new Shop('Lima', 2, 16, 4.6);

createTableHeader();
for (let i = 0; i < shops.length; i++) {
    shops[i].calcRandCustPerH();
    shops[i].calAvgCookiesPerH();
    shops[i].render();
}
createFooter();