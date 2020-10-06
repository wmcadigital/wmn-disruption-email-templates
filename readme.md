# Disruption email templates

Email templates for the Disruptions to be imported into Campaign Monitor

Templates are built using [mjml](https://mjml.io/documentation/)

## Installation

1. Clone this repo - <https://github.com/wmcadigital/wmn-disruption-email-templates.git>
2. Run `npm install` in the terminal
3. Run `npm start` in terminal
4. Start working on files within `src` directory
5. Any changes will be rendered out as a html and txt template with the same name of your mjml template field
6. When ready to go live, push changes up and raise a pull request
7. When approved, run `npm run build` in the terminal to generate the `build` folder for live services

## Dummy data

When testing it is important to ue accurate dummy date to ensure the codebase won't break on a live service.
To use dummy data, name a file the same as your mjml template name with `.dummyData.json` appeneded. So for instance, if you had a template file called `example.mjml` then your dummy data file would be called `example.dummyData.json`.

When your template has a dummy data file associate with it, it is then possible to reference this data using variables and logic via the [liquid templating syntax](https://github.com/Shopify/liquid/wiki/Liquid-for-Designers).

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License

[MIT](<https://choosealicense.com/licenses/mit/>
