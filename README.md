# MMM-SmartFoxPro

Dies ist ein MagicMirror Modul, welches die Daten von SmartFoxPro Energiemanager (ihre IP-Adresse/values.xml) ausliest.
Siehe im Beispiel [Values.xml](https://github.com/SinCity64/MMM-SmartFoxPro/blob/71ab4732550ced66449d2ed4d214a6dfa38a84ae/Values.xml)

Das Modul zeigt die folgenden Daten an und kann, entsprechende Programmierkenntnisse vorausgesetzt, beliebig erweitert werden.

Ikonen:
- Photovoltaik / Aktuelle Produktion in kW und Tagesproduktion in kWh
- Grid / Aktuelle Lieferung kW (Minus-Anzeige) und aktueller Bezug in kW
- Home / Aktueller Verbrauch in kW und Tagesverbrauch in kWh
- Boiler / Aktueller Verbrauch in kW und Tagesverbrauch in kWh
- Car / Aktueller Verbrauch in kW und Tagesverbrauch und letzte Aufladung in kWh
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

![SmartFoxpro.PNG](https://github.com/SinCity64/MMM-SmartFoxPro/blob/8762721d3c745bb54826b3b8da301fecc1203c37/SmartFoxPro.png)

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
`updateInterval`|`milliseconds`|15 seconds|Ausleseintervall der Daten

[mm]: https://github.com/MagicMirrorOrg/MagicMirror
