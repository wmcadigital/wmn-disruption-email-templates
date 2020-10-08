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
8. The build folder will then generate the html/txt templates so they are ready to import into campaign monitor. It will also generate a zip folder for the assets which can also be imported in to campaign monitor.

## Dummy data

When testing it is important to ue accurate dummy data to ensure the codebase won't break on a live service.
To use dummy data, name a file the same as your mjml template name with `.dummyData.json` appeneded. So for instance, if you had a template file called `example.mjml` then your dummy data file would be called `example.dummyData.json`.

When your template has a dummy data file associate with it, it is then possible to reference this data using variables and logic via the [liquid templating syntax](https://github.com/Shopify/liquid/wiki/Liquid-for-Designers).

## Including partial files

When including partial files it is important to use the liquid template syntax i.e. `{% include 'src/partials/header.mjml' %}` and not the MJML syntax. This is because the variables from the dummy data won't be rendered in time when using the MJML imports which will then show an inaccurate preview of the email templates.

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License

[MIT](<https://choosealicense.com/licenses/mit/>
