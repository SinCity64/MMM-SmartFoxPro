# MMM-SmartFoxPro

**Deutsch ---------------------------------------------------------------------------------------------------------------------------**

Dies ist ein MagicMirror Modul, welches bestimmte Daten von SmartFoxPro Energiemanager (ihre IP-Adresse/values.xml) ausliest.
Siehe im Beispiel [Values.xml](https://github.com/SinCity64/MMM-SmartFoxPro/blob/71ab4732550ced66449d2ed4d214a6dfa38a84ae/Values.xml)

Das Modul zeigt die folgenden Daten an und kann, entsprechende Programmierkenntnisse vorausgesetzt, beliebig erweitert werden.

Ikonen:
- Photovoltaik / Aktuelle Produktion in kW und Tagesproduktion in kWh
- Grid / Aktuelle Lieferung kW (Minus-Anzeige) und aktueller Bezug in kW
- Home / Aktueller Verbrauch in kW und Tagesverbrauch in kWh
- Boiler / Aktueller Verbrauch in kW und Tagesverbrauch in kWh
- Car / Aktueller Verbrauch in kW sowie Tagesverbrauch und letzte Aufladung in kWh
- Battery / aktuell nicht implementiert

Weiteres:
- Die Ikonen sind alle auf Grün, sobald die Photovoltaik-Anlage Strom produziert, andernfalls werden diese auf Rot gestellt
- Die Verbindungslinien und Zähler werden nur dann angezeigt, wenn diese effektiv genutzt werden (Verbrauch / Lieferung)
- Die Zählerstände werden von SmartFoxPro bei Mitternacht jeweils genullt (Ausnahme letzte Aufladung > Car)

Hinweise:
- Dies ist eine Quick & Dirty Erweiterung, die an meine System-Umgebung angepasst ist
- Ich werde daran nichts Wesentliches ändern solange diese für mich funktioniert
- Erweiterungen und Verbesserungen werden nach und nach für meinen Nutzen angepasst
- Anfragen betreffend komplexer Anpassungen an ihre Umgebung/Wünsche kann ich nicht beantworten
- Für die Umsetzung kleinerer Wünsche können sie mich gerne kontaktieren

Anzeige:
![SmartFoxpro.PNG](https://github.com/SinCity64/MMM-SmartFoxPro/blob/8762721d3c745bb54826b3b8da301fecc1203c37/SmartFoxPro.png)


**English ---------------------------------------------------------------------------------------------------------------------------**

This is a MagicMirror module that reads the data from SmartFoxPro Energy Manager (your IP address/values.xml). See in the example Values.xml [Values.xml](https://github.com/SinCity64/MMM-SmartFoxPro/blob/71ab4732550ced66449d2ed4d214a6dfa38a84ae/Values.xml)

The module displays the following data and can be extended as desired, assuming appropriate programming knowledge.

Icons:
- Photovoltaics / Current production in kW and daily production in kWh
- Grid / Current delivery kW (minus display) and current purchase in kW
- Home / Current consumption in kW and daily consumption in kWh
- Boiler / Current consumption in kW and daily consumption in kWh
- Car / Current consumption in kW as well as daily consumption and last charge in kWh
- Battery / currently not implemented

Further:
- The icons are all green as soon as the photovoltaic system produces electricity, otherwise they are set to red
- The connection lines and counters are only displayed if they are used effectively (consumption / delivery)
- The meter readings are zeroed by SmartFoxPro at midnight (exception last charge > Car)

Notes:
- This is a Quick & Dirty extension adapted to my system environment
- I won't change anything significant about it as long as it works for me
- Extensions and improvements are gradually being adapted for my benefit
- I cannot answer inquiries regarding complex adaptations to your environment/wishes
- For the implementation of smaller wishes you are welcome to contact me


## Dependencies
- An installation of [MagicMirror<sup>2</sup>](https://github.com/MichMich/MagicMirror)

## Install
Navigate into your MagicMirror's `modules` folder:
```
cd ~/MagicMirror/modules
```

Clone this repository:
```
git clone https://github.com/SinCity64/MMM-SmartFoxPro.git
```

## Using the module

To use this module, add it to the modules array in the `config/config.js`

```js
    {
        module: "MMM-SmartFoxPro",
        position: "bottom_center",
        config: {
            url: "http://yourIP/values.xml", // http://xxx.xxx.x.xxx/values.xml eg http://smartfox.home/values.xml
            updateInterval: 1000 * 15 // 15 Sekunden
        }
```

## Configuration options

Option|Possible values|Default|Description
------|------|------|-----------
`url`|`IP-Adress or alias`|not available|Url to your Smartfox Values.xml
`updateInterval`|`milliseconds`|15000 (15 sec)|Readout interval of the data

[mm]: https://github.com/MagicMirrorOrg/MagicMirror
