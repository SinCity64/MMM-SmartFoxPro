# MMM-SmartFoxPro

Dies ist ein MagicMirror Modul, das die Daten von SmartFoxPro Energiemanager (ihre IP-Adresse/values.xml) ausliest.

Das Modul zeigt die folgenden Daten an und kann, entsprechende Programmierkenntnisse vorausgesetzt, beliebig erweitert werden.

Ikone 
> Photovoltaik / Aktuelle produktion in kW und Tagesproduktion in kWh
> Grid / Aktuelle Lieferung kW (Minus-Anzeige) und aktueller Bezug in kW
> Home
> Boiler
> Car
> battery / aktuell nicht implementiert

Einspeisen / Beziehen
Verbrauch
Tagesertrag
Gesamt Etrag
Autonomie Grad in %
Wenn Strom Eingespeist wird ist die Schrift für Einspeisen grün und wenn Strom bezogen wird, ist die Schrift für Beziehen rot.


# MMM-Template

![Example of MMM-Template](./example_1.png)

[Module description]

## Installation

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
