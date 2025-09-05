/* XML datareader for SmartFox Pro */

/* Magic Mirror
 * Module: MMM-SmartFox Pro
 *
 * By SinCity64
 * MIT Licensed.
 */

Module.register("MMM-SmartFoxPro", {
    defaults: {
        url: "", // Die URL, von der die XML-Daten abgerufen werden sollen
        updateInterval: 15000 // Intervall für den Abruf der Daten (in Millisekunden)
    },

    start: function () {
		// Log.info("Starting module: " + this.name);
		// alert("loading ...");
		this.SmartFoxData = null;
        this.sendSocketNotification("SET_CONFIG", this.config); // Send configuration to node_helper
        this.scheduleUpdate(); // Schedule periodic updates		
	},

    scheduleUpdate: function () {
        const self = this;
        setInterval(function () {
            self.sendSocketNotification("GET_SmartFox_Data");
        }, this.config.updateInterval);
    },
	
	
    socketNotificationReceived: function (notification, payload) {
        if (notification === "SmartFox_DATA") {
            this.SmartFoxData = {
                Not_PV_Power: payload.Not_PV_Power,
                Not_Production_Day: payload.Not_Production_Day,
				Not_To_Net_Current: payload.Not_To_Net_Current,
				Not_To_Net_Day: payload.Not_To_Net_Day,
				Not_From_Net_Day: payload.Not_From_Net_Day,
				Not_Actual_To_Net: payload.Not_Actual_To_Net,
				Not_Actual_Consumption: payload.Not_Actual_Consumption,
				Not_Day_Consumption: payload.Not_Day_Consumption,
				Not_HotWater_Day: payload.Not_HotWater_Day,
				Not_HotWater_RealayStatus: payload.Not_HotWater_RealayStatus,
				Not_Actual_Charge_CC1: payload.Not_Actual_Charge_CC1,
				Not_Energy_Day_CC1: payload.Not_Energy_Day_CC1,
				Not_Last_Charge_CC1: payload.Not_Last_Charge_CC1						
            };
            this.updateDom();
        }
    },	
	
	getDom: function () {
	const wrapper = document.createElement("div");
	wrapper.className = "solar-wrapper";
	
	if (!this.SmartFoxData) {
		wrapper.innerHTML = "Loading...";
		return wrapper;
        }

	const PV_Power = this.SmartFoxData.Not_PV_Power;
	var PV_Power_Float = Number.parseFloat(PV_Power);
	
	const Production_Day = this.SmartFoxData.Not_Production_Day;
	
	const To_Net_Current = this.SmartFoxData.Not_To_Net_Current;
	var To_Net_Current_Float = Number.parseFloat(To_Net_Current);
	
	const To_Net_Day = this.SmartFoxData.Not_To_Net_Day;
	const From_Net_Day = this.SmartFoxData.Not_From_Net_Day;
	const Actual_To_Net = this.SmartFoxData.Not_Actual_To_Net;
	
	const Actual_Consumption = this.SmartFoxData.Not_Actual_Consumption;
	const Day_Consumption = this.SmartFoxData.Not_Day_Consumption;
	
	const HotWater_Day = this.SmartFoxData.Not_HotWater_Day;
	var HotWater_RelayStatus = Number.parseFloat(this.SmartFoxData.Not_HotWater_RealayStatus);
	
	const Actual_Charge_CC1 = this.SmartFoxData.Not_Actual_Charge_CC1;
	var Actual_Charge_CC1_Float = Number.parseFloat(Actual_Charge_CC1);
	var Last_Charge_CC1 = this.SmartFoxData.Not_Last_Charge_CC1;
	var Last_Charge_CC1_Float = Number.parseFloat(Last_Charge_CC1);
	var Energy_Day_CC1 = this.SmartFoxData.Not_Energy_Day_CC1;
	var Energy_Day_CC1_Float = Number.parseFloat(Energy_Day_CC1);
	
	// lines and rectangle colors
	var colorPV = "#32cd32"; // limegreen	
	var PVtoHome_Line = 0;
	var PVtoHome_Line_V = "hidden";
	var fromGrid = "hidden";
	var toGrid = "hidden";
	
	// schematic display -----------------------------------------------------------------
	
	// Color Fields and visibility Homeline
	const INT_PV_Power = PV_Power.substr(0, PV_Power.length - 3);
	if (Math.abs(INT_PV_Power) > 0) {
		colorPV = "#32cd32"; // limegreen PV working
		PVtoHome_Line = -200;
		PVtoHome_Line_V = "visible";
	} else {
		colorPV = "#FF0000"; // red	
		PVtoHome_Line = 0;
		PVtoHome_Line_V = "hidden";
	}

	// Visibility Lines from or to Net
	if (Actual_To_Net > 0) {
		// alert(Actual_To_Net);
		fromGrid = "visible";
		toGrid ="hidden";
	} else {
		fromGrid = "hidden";
		toGrid ="visible";
	} 
	
	// Visibility lines to Car from PV and/or Grid
	var line_PV_to_Car ="hidden";	
	var line_Grid_to_Car = "hidden";
	var line_PV_to_Grid_Car = "hidden";

	if (Actual_Charge_CC1_Float > 0) { 
		if (PV_Power_Float > 0 && To_Net_Current_Float <= 0) {
			line_PV_to_Car ="visible";
		} else if (To_Net_Current_Float > 0 && PV_Power_Float > 0) {
			line_Grid_to_Car ="visible";
			line_PV_to_Grid_Car = "visible"
		} else if (To_Net_Current_Float > 0 && PV_Power_Float <= 0) {
			line_Grid_to_Car ="visible";
		}
	} else {
		line_PV_to_Car ="hidden";
		line_Grid_to_Car ="hidden";
		line_PV_to_Grid_Car = "hidden";
	}
	
	// Visibility lines to Boiler from PV and/or Grid
	var line_Home_to_Boiler = "hidden";
	if (HotWater_RelayStatus == 1) {
		line_Home_to_Boiler ="visible"
	} else {
		line_Home_to_Boiler ="hidden"
	}
	
	// Display daily consumption or last (CC1)
	if (Energy_Day_CC1_Float > Last_Charge_CC1_Float) {
		Last_Charge_CC1 = Energy_Day_CC1;
		// alert(Last_Charge_CC1);
	}

	const svgGrafik = document.createElement("div");
	svgGrafik.innerHTML = `
		<svg width="1100" height="380" viewBox="200 1000 20500 5000" xmlns="http://www.w3.org/2000/svg">
		<!--PV rectangle-->
			<rect width="2600" height="1600" x="400" y="5000" rx="100" ry="100" fill="${colorPV}"/>
			<!--symbol photovoltaik-->
				<path d="M1000 5700.26l1352.61 0m42.7 278.47l-1432.74 0m467.76 281.27l31.28 -841.01m472.91 841.01l-31.28 -841.01m406.17 -0.4l129.02 841.41 -1513.67 0 113.09 -841.41 1271.56 0z" stroke="#000000" stroke-width="40" fill="none"/>
				<polygon points="1834,5521 1895,5523 1708,5718 1800,5685 1672,5880 1741,5870 1619,5974 1604,5842 1643,5877 1737,5738 1644,5755" fill="#000000"/>
			<!--photovoltaik Production_Current-->
				<text x="1700" y="5300" font-size="300px" text-anchor="middle">${PV_Power}</text>
			<!--photovoltaik Production_Tag-->
				<text x="1700" y="6550" font-size="300px" text-anchor="middle">${Production_Day}</text>
			<!--Line to Home-->
				<path class="drawHome" fill="none" stroke-linejoin="round" stroke="orange" stroke-width="40" d="M1700 5000 L1700 4600 L8700 4600 L8700 5000" visibility="${PVtoHome_Line_V}" />
				<style>
					.drawHome {stroke-dasharray: 100; animation: dashdraw 1s linear infinite;}
					@keyframes dashdraw {to {stroke-dashoffset: ${PVtoHome_Line};}}
				</style>
			<!--Line to Grid-->
				<line class="drawGrid" fill="none" stroke-linejoin="round" stroke="orange" stroke-width="40" x1="3000" y1="5800" x2="3900" y2= "5800" visibility="${toGrid}" />
				<style>
					.drawGrid {stroke-dasharray: 100; animation: dashdraw 1s linear infinite;}
					@keyframes dashdraw {to {stroke-dashoffset: -200;}}
				</style>
			<!--Line Grid to Home-->
				<line class="drawGrid" fill="none" stroke-linejoin="round" stroke="orange" stroke-width="40" x1="6500" y1="5800" x2="7400" y2= "5800" visibility="${fromGrid}" />
				<style>
					.drawGrid {stroke-dasharray: 100; animation: dashdraw 1s linear infinite;}
					@keyframes dashdraw {to {stroke-dashoffset: -200;}}
				</style>
		<!--Grid rectangle-->
			<rect width="2600" height="1600" x="3900" y="5000" rx="100" ry="100" fill="${colorPV}"/>
			<!--symbol grid-->
				<polyline points="4954,6350 5250,5156 5312,5408 5121,5674 5377,5672 5312,5408 5187,5409 5377,5672 5058,5931 5441,5932 5121,5674 5121,5674" stroke="#000000" stroke-width="40" fill="none"/>
				<line x1="5068.12" y1="5411.79" x2="5428.17" y2="5411.79" stroke="#000000" stroke-width="40" fill="none"/>
				<line x1="4985.31" y1="5671.75" x2="5497.31" y2="5671.75" stroke="#000000" stroke-width="40" fill="none"/>
				<line x1="5377.71" y1="5672.49" x2="5545.42" y2="6350.62" stroke="#000000" stroke-width="40" fill="none"/>
			<!--Actual to Grid-->
				<text x="3950" y="5900" font-size="300px" text-anchor="start" visibility="${toGrid}">${To_Net_Current}</text>
			<!--Actual from Grid-->
				<text x="6450" y="5900" font-size="300px" text-anchor="end" visibility="${fromGrid}">${To_Net_Current}</text>
			<!--Day to Grid-->
				<text x="3950" y="6550" font-size="300px" text-anchor="start">${To_Net_Day}</text>
			<!--Day from Grid-->
				<text x="6450" y="6550" font-size="300px" text-anchor="end">${From_Net_Day}</text>
		<!--Home rectangle-->
			<rect width="2600" height="1600" x="7400" y="5000" rx="100" ry="100" fill="${colorPV}"/>
			<!--symbol home-->
				<path d="M9100 5700.25l0 565.75 -846.83 0 0 -558.78m-109.31 -13.18l540.85 -428.04 524.6 421.07m-106.41 -179.5l0 -120.3 -103.26 0 0.17 33.44" stroke="#000000" stroke-width="50" fill="none"/>
			<!--Actual Consumption-->
				<text x="8700" y="5800" font-size="300px" text-anchor="middle">kW</text>
				<text x="8700" y="6100" font-size="300px" text-anchor="middle">${Actual_Consumption}</text>
			<!--Day Consumption-->
				<text x="8700" y="6550" font-size="300px" text-anchor="middle">${Day_Consumption}</text>
		<!--Boiler rectangle-->
			<rect width="2600" height="1600" x="10900" y="5000" rx="100" ry="100" fill="${colorPV}"/>
			<!--symbol bolier-->
				<circle cx="12200" cy="5425" r="100" stroke="#000000" stroke-width="40" fill="none"/>
				<path d="M11900 6142.86l0 -885.6c0,-32.37 133.56,-58.08 298.33,-58.08 164.77,0 298.34,25.71 298.34,58.08l0 885.6c0,30.61 -133.57,56.32 -298.34,56.32 -164.77,0 -298.33,-25.71 -298.33,-56.32z" stroke="#000000" stroke-width="50" fill="none"/>
				<text x="12200" y="6550" font-size="300px" text-anchor="middle">${HotWater_Day}</text>
			<!--Line Home to Boiler-->
				<line class="drawGrid" fill="none" stroke-linejoin="round" stroke="orange" stroke-width="40" x1="10000" y1="5800" x2="10900" y2= "5800" visibility="${line_Home_to_Boiler}" />
				<style>
					.drawGrid {stroke-dasharray: 100; animation: dashdraw 1s linear infinite;}
					@keyframes dashdraw {to {stroke-dashoffset: -200;}}
				</style>
		<!--Car rectangle-->
			<rect width="2600" height="1600" x="14400" y="5000" rx="100" ry="100" fill="${colorPV}"/>
			<!--symbol car-->
				<line x1="15305" y1="5272" x2="15374" y2= "5272" stroke="#000000" stroke-width="40" fill="none"/>
				<line x1="15305" y1="5212" x2="15374" y2= "5212" stroke="#000000" stroke-width="40" fill="none"/>
				<path d="M15373 5299.91c85.37,1.04 135.76,-8.68 133.58,-61.24 -2.53,-61.24 -132.85,-53.41 -132.85,-53.41 -0.48,76.43 -0.73,114.65 -0.73,114.65z"stroke="#000000" stroke-width="40" fill="none"/>
				<path d="M15749 5477.23c0,-29.99 -8.59,-86.58 52.19,-85.95l127.2 1.33c69.77,-1.46 81.46,-153.52 0.89,-148.22l-414.55 0"stroke="#000000" stroke-width="40" fill="none"/>
				<path d="M15385 6122.86c-175.27,-27.77 -76.33,-342.73 18.92,-392.7 33.08,-92.63 44.98,-164.25 101.28,-169.61 196.44,-18.66 292.36,-18.66 488.8,0 56.3,5.36 68.2,76.98 101.28,169.61 95.25,49.97 194.19,364.93 18.92,392.7 -241.13,8.8 -488.07,8.8 -729.2,0z"stroke="#000000" stroke-width="40" fill="none"/>
				<path d="M15404 5730.74l256.83 -10.73c59.94,-2.49 118.1,-2.49 178.04,0l256.83 10.73"stroke="#000000" stroke-width="40" fill="none"/>
				<path d="M15401 5915.85c47.16,0 134.17,11.95 134.17,43.79 0,31.84 -54.1,36.96 -101.26,36.96 -47.16,0 -69.52,-5.12 -69.52,-36.96 0,-31.84 -10.55,-43.79 36.61,-43.79z"stroke="#000000" stroke-width="40" fill="none"/>
				<path d="M15621 6057.04c-28.91,-11.22 -29.83,-57.9 -2.08,-68.09 37.47,-13.76 224.39,-13.76 261.86,0 27.75,10.19 26.83,56.87 -2.08,68.09 -29.04,11.25 -228.66,11.25 -257.7,0z"stroke="#000000" stroke-width="40" fill="none"/>
				<path d="M15506 6136.88l0 47.04c0,27.53 -25.91,50.05 -57.59,50.05l-85.98 0c-31.68,0 -57.59,-22.52 -57.59,-50.05l0 -112.61"stroke="#000000" stroke-width="40" fill="none"/>
				<line x1="15373" y1="6050" x2="15420" y2= "6050" stroke="#000000" stroke-width="40" fill="none"/>
				<path d="M16098 5915.85c-47.16,0 -134.17,11.95 -134.17,43.79 0,31.84 54.1,36.96 101.26,36.96 47.16,0 69.52,-5.12 69.52,-36.96 0,-31.84 10.55,-43.79 -36.61,-43.79z"stroke="#000000" stroke-width="40" fill="none"/>
				<path d="M15993 6136.88l0 47.04c0,27.53 25.91,50.05 57.59,50.05l85.98 0c31.68,0 57.59,-22.52 57.59,-50.05l0 -112.61"stroke="#000000" stroke-width="40" fill="none"/>
				<line x1="16126" y1="6050" x2="16080" y2= "6050" stroke="#000000" stroke-width="40" fill="none"/>
			<!--Actual Charging-->
				<text x="14450" y="6550" font-size="300px" text-anchor="start">${Actual_Charge_CC1}</text>
			<!--Last Charge-->
				<text x="16950" y="6550" font-size="300px" text-anchor="end">${Last_Charge_CC1}</text>
			<!--Line PV to Car-->
				<path class="drawHome" fill="none" stroke-linejoin="round" stroke="orange" stroke-width="40" d="M1700 6600 L1700 7000 L15700 7000 L15700 6600" visibility="${line_PV_to_Car}" />
				<style>
					.drawGrid {stroke-dasharray: 100; animation: dashdraw 1s linear infinite;}
					@keyframes dashdraw {to {stroke-dashoffset: -200;}}
				</style>


			<!--Line PV to Car and Grid to Car-->
				<path class="drawHome" fill="none" stroke-linejoin="round" stroke="orange" stroke-width="40" d="M1700 6600 L1700 7000 L5200 7000" visibility="${line_PV_to_Grid_Car}" />
				<path class="drawHome" fill="none" stroke-linejoin="round" stroke="orange" stroke-width="40" d="M5200 6600 L5200 7000 L15700 7000 L15700 6600" visibility="${line_Grid_to_Car}" />				
				<style>
					.drawGrid {stroke-dasharray: 100; animation: dashdraw 1s linear infinite;}
					@keyframes dashdraw {to {stroke-dashoffset: -200;}}
				</style>				

			
				
			<!--Line Grid to Car-->
				<path class="drawHome" fill="none" stroke-linejoin="round" stroke="orange" stroke-width="40" d="M5200 6600 L5200 7000 L15700 7000 L15700 6600" visibility="${line_Grid_to_Car}" />
				<style>
					.drawGrid {stroke-dasharray: 100; animation: dashdraw 1s linear infinite;}
					@keyframes dashdraw {to {stroke-dashoffset: -200;}}
				</style>				
				
				
				
				
				
				
				
				
				
		<!--Battery rectangle-->
			<rect width="2600" height="1600" x="17900" y="5000" rx="100" ry="100" fill="${colorPV}"/>
			<!--symbol battery-->
				<rect width="1600" height="600" x="18500" y="5500" rx="100" ry="100" stroke="#000000" stroke-width="50" fill="${colorPV}"/>
				<rect width="200" height="400" x="18600" y="5600" rx="50" ry="50" stroke="#000000" fill="#000000"/>
				<rect width="200" height="400" x="18850" y="5600" rx="50" ry="50" stroke="#000000" fill="#000000"/>
				<rect width="100" height="250" x="20100" y="5650" rx="50" ry="50" stroke="#000000" fill="#000000"/>
		</svg>
        `;
        wrapper.appendChild(svgGrafik);
        return wrapper;
    },
});

