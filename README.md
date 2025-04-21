# MMM-SmartFoxPro

Dies ist ein MagicMirror Modul, das die Daten von SmartFoxPro Energiemanager (ihre IP-Adresse/values.xml) ausliest.

Das Modul zeigt die folgenden Daten an und kann, entsprechende Programmierkenntnisse vorausgesetzt, beliebig erweitert werden.

Ikonen:
- Photovoltaik / Aktuelle produktion in kW und Tagesproduktion in kWh
- Grid / Aktuelle Lieferung kW (Minus-Anzeige) und aktueller Bezug in kW
- Home / Aktueller Verbrauch in kW und Tagesverbrauch in kWh
- Boiler / Aktueller Verbrauch in kW und Tagesverbrauch in kWh
- Car / Aktueller Verbrauch in kW und Tagesverbrauch in kWh (letzte Aufladung)
- Battery / aktuell nicht implementiert

Weiteres:
- Die Ikonen sind alle auf Grün, sobald die Photofoltaik-Anlage Strom produziert, anderfalls werde diese auf Rot gestellt
- Die Verbindungslinien und Zähler werden nur dann angezeigt, wenn diese effektiv genutzt werden (Verbrauch / Lieferung)
- Die Zählerstände werden von SmartFoxpro bei Mitternacht jeweils genullt (Ausnahme letzte Aufladung > Car)

Hinweise:
- Dies ist eine Quick & Dirty Erweiterung die an meine System-Umgebung angepasst ist
- Ich werde daran nichts Wesentliches ändern solange diese für mich funktioniert
- Erweiterungen und Verbesserungen werden nach und nach für meinen Nutzen angepasst
- Anfragen betreffend komplexer Anpassungen an ihre Umgebung/Wünsche kann ich nicht beantworten
- Für die Umsetzung kleinerer Wünsche können sie mich gerne kontaktieren

![002 Github PNG](https://github.com/user-attachments/assets/563d1d28-9f72-4703-a63e-c7e8b8a2fba1)

## Dependencies
- An installation of [MagicMirror<sup>2</sup>](https://github.com/MichMich/MagicMirror)

## Installation
Navigate into your MagicMirror's `modules` folder:
```
cd ~/MagicMirror/modules
```

Clone this repository:
```
git clone https://github.com/
```

Configure the module in your `config.js` file.

## Update the module

Navigate into the `MMM-ioBroker` folder with `cd ~/MagicMirror/modules/MMM-ioBroker` and get the latest code from Github with `git pull`.

If you haven't changed the modules, this should work without any problems. Type `git status` to see your changes, if there are any, you can reset them with `git reset --hard`. After that, git pull should be possible.

## Using the module

To use this module, add it to the modules array in the `config/config.js` file:

### Install

In your terminal, go to your [MagicMirror²][mm] Module folder and clone MMM-Template:

```bash
cd ~/MagicMirror/modules
git clone [GitHub url]
```

### Update

```bash
cd ~/MagicMirror/modules/MMM-Template
git pull
```

## Using the module

To use this module, add it to the modules array in the `config/config.js` file:

```js
    {
        module: 'MMM-Template',
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
`TEMPLATE_RANDOM_TEXT`|Payload must contain the text that needs to be shown on this module

## Developer commands

- `npm install` - Install devDependencies like ESLint.
- `npm run lint` - Run linting and formatter checks.
- `npm run lint:fix` - Fix linting and formatter issues.

[mm]: https://github.com/MagicMirrorOrg/MagicMirror
