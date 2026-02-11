# Brewing Calculator CLI

A command-line tool for homebrewers to calculate essential brewing metrics including ABV, IBU, SRM, dilution ratios, boil-off rates, and hydrometer temperature corrections.

## Installation
```bash
git clone [<repository-url>](https://github.com/abrown5421/brewculator
cd brewculator
npm install
tsc
node dist/index.js
```

## Calculators

### ABV Calculator
Calculates alcohol by volume percentage based on original gravity (OG) and final gravity (FG) readings. Uses the standard formula: `ABV = 131.25 × (OG - FG)`. Essential for determining the final alcohol content of your beer.

### IBU Calculator
Calculates International Bitterness Units using the Tinseth formula with hop utilization tables. Accounts for pre-boil and post-boil volumes, boil gravity, hop alpha acids, and boil times. Supports multiple hop additions at different times during the boil.

### SRM Calculator
Determines beer color in Standard Reference Method units using the Morey equation. Takes grain bill inputs (weight and Lovibond ratings) and batch size to calculate final beer color. Includes a visual color preview with hex code representation.

### Dilution Calculator
Helps adjust wort gravity by calculating how much water to add (dilution) or boil off (concentration). Uses the gravity-volume relationship formula to determine exact volumes needed to hit target gravity readings.

### Boil-Off Calculator
Calculates your system's evaporation rate in gallons per hour based on pre-boil volume, post-boil volume, and boil duration. Useful for dialing in your brewing system and predicting volumes for recipe planning.

### Hydrometer Temperature Correction
Corrects gravity readings taken at temperatures other than the hydrometer's calibration temperature (typically 60°F or 68°F). Uses a precise polynomial correction formula to account for liquid density changes at different temperatures. Reports correction in gravity points for easy reference.

## Usage

Run the application and select a calculator from the main menu. Each calculator will prompt you for the required inputs and display results. After each calculation, you can choose to return to the main menu or exit the application.
