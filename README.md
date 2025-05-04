# MMM-SmartFoxPro

Dies ist ein MagicMirror Modul, welches die Daten von SmartFoxPro Energiemanager (ihre IP-Adresse/values.xml) ausliest.

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

![002 Github PNG](https://github.com/user-attachments/assets/563d1d28-9f72-4703-a63e-c7e8b8a2fba1)

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

Configure the module in your `config.js` file.

## Update the module

Navigate into the `MMM-SmartFoxPro` folder with `cd ~/MagicMirror/modules/MMM-SmartFoxPro` and get the latest code from Github with `git pull`.

If you haven't changed the modules, this should work without any problems. Type `git status` to see your changes, if there are any, you can reset them with `git reset --hard`. After that, git pull should be possible.

## Using the module

To use this module, add it to the modules array in the `config/config.js`

```js
    {
        module: 'MMM-SmartFoxPro',
        position: 'lower_third'
    },
```

Or you could use all the options:

```js
    {
        module: 'MMM-Template',
        position: 'lower_third',
        config: {
            exampleContent: 'Welcome world'
        }
    },
```

## Configuration options

Option|Possible values|Default|Description
------|------|------|-----------
`exampleContent`|`string`|not available|The content to show on the page

## Sending notifications to the module

Notification|Description
------|-----------
`TEMPLATE_RANDOM_TEXT`|Payload must contain the text that needs to be shown on this 

[mm]: https://github.com/MagicMirrorOrg/MagicMirror
