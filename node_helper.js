const NodeHelper = require("node_helper");
const Log = require("logger");
const {parseString} = require('xml2js');

module.exports = NodeHelper.create({
	// Override start method.
	
	start () {
		Log.log(`Starting node helper for: ${this.name}`);
	},

	// Override socketNotificationReceived method.
	socketNotificationReceived (notification, payload) {
        if (notification === "SET_CONFIG") {
            this.config = payload;
            this.startFetchingData();
        } else if (notification === "GET_SmartFox_Data") {
            if (!this.config) return;
            this.getSmartFoxData();
        }		
    },

    startFetchingData () {
        if (this.config && this.config.url) {
            this.fetchInterval = setInterval(() => {
                this.getSmartFoxData();
            }, 30000); // Fetch data every 30 seconds
        }
    },

	getSmartFoxData() {
		if (!this.config || !this.config.url) return;
		
		fetch(this.config.url)		
        .then(response => response.text())
		.then(data => parseString(data, (err, result) => {
			if (err) {
			console.error('Error parsing XML:', err);
			return;
			}
			
			// photovoltaik
			const Not_PV_Power = getValueById(result, 'hidProduction');
			const Not_Production_Day = (Number.parseInt(getValueById(result, 'hidWr1EnergyDay')) /1000).toFixed(2) + " kWh";
			const Not_Production_Day_Int = Number.parseInt(getValueById(result, 'hidWr1EnergyDay'));
			
			// Grid
			const Not_To_Net_Current = getValueById(result, 'toGridValue');
			const Not_To_Net_Day = (Number.parseInt(getValueById(result, 'hidToGridEnergyDay')) /1000).toFixed(2) + " kWh";
			const Not_To_Net_Day_Int = Number.parseInt(getValueById(result, 'hidToGridEnergyDay'));
			const Not_From_Net_Day = (Number.parseInt(getValueById(result, 'hidFromGridEnergyDay')) /1000).toFixed(2) + " kWh";
			const Not_From_Net_Day_Int = Number.parseInt(getValueById(result, 'hidFromGridEnergyDay'));
			
			// Home
			const Not_Actual_PVpower = Number.parseFloat(Not_PV_Power).toFixed(2);
			const Not_Actual_To_Net = Number.parseFloat(Not_To_Net_Current).toFixed(2);
			const Not_Actual_Consumption = (Not_Actual_PVpower*1+Not_Actual_To_Net*1).toFixed(2);
			const Not_Day_Consumption = (Number.parseInt((Not_Production_Day_Int*1) - (Not_To_Net_Day_Int*1) + (Not_From_Net_Day_Int*1)) /1000).toFixed(2) + " kWh";

			// Boiler
			const Not_HotWater_Day = (Number.parseFloat(getValueById(result, 'hidAoutEnergyDay')) /1000).toFixed(2) + " kWh";
			const Not_HotWater_RealayStatus = getValueById(result, 'relayStatusValue1');
			
			// Charching
			const Not_Actual_Charge_CC1 = getValueById(result, 'cc1Power').replaceAll("<span>", "").replaceAll("</span>", "");				
			const Not_Energy_Day_CC1 = (Number.parseFloat(getValueById(result, 'hidCc1EnergyDay')) /1000).toFixed(2) + " kWh";
			const Not_Last_Charge_CC1 = getValueById(result, 'cc1LastChargeValue');	

			// Logging off, to loggin on uncomment lines
/* 				console.log('PV Power:', Not_PV_Power);
			console.log('Production Day:', Not_Production_Day);
			console.log('Production Day Int:', Not_Production_Day_Int);
			console.log('To Net:', Not_To_Net_Current);							
			console.log('To Net Day:', Not_To_Net_Day);
			console.log('To Net Day int:', Not_To_Net_Day_Int);				
			console.log('from Net day:', Not_From_Net_Day);
			console.log('from Net day int:', Not_From_Net_Day_Int);	
			console.log('Actual consumption:', Not_Actual_Consumption);
			console.log('Boiler:', Not_HotWater_Day);
			console.log('Actual Charching:', Not_Actual_Charge_CC1);				
			console.log('Last Charching:', Not_Last_Charge_CC1);
			console.log('CC1 TAG: ' , Not_Energy_Day_CC1);			
*/
			const sendResult ={Not_PV_Power: Not_PV_Power,
								Not_Production_Day: Not_Production_Day,
								Not_To_Net_Current: Not_To_Net_Current,
								Not_To_Net_Day: Not_To_Net_Day,
								Not_From_Net_Day: Not_From_Net_Day,
								Not_Actual_To_Net: Not_Actual_To_Net,
								Not_Actual_Consumption: Not_Actual_Consumption,
								Not_Day_Consumption: Not_Day_Consumption,
								Not_HotWater_Day: Not_HotWater_Day,
								Not_HotWater_RealayStatus: Not_HotWater_RealayStatus,
								Not_Actual_Charge_CC1: Not_Actual_Charge_CC1,
								Not_Energy_Day_CC1: Not_Energy_Day_CC1,
								Not_Last_Charge_CC1: Not_Last_Charge_CC1									
								};
			
			this.sendSocketNotification("SmartFox_DATA", sendResult);
		}));			
	},
});

function getValueById(result, id) {
	// Gehe durch alle 'value'-Elemente und finde das passende 'id'
	const value = result.values.value.find(item => item.$.id === id);
	if (value) {
		return value._; // Gibt den Wert zurück
	} else {
		console.warn(`Kein Wert gefunden für ID: ${id}`);
		return null; // Gibt null zurück, wenn die ID nicht gefunden wurde
	}
}
