# Interview assignment: evenTz

This project was created as an interview assignment.

It is deployed on [Netlify](https://www.netlify.com/) and it is available: [HERE](https://events-assignment.budzel.sk/new-event).

## Assignment

Paraphrazed text of the assignment:

> Create a single page application for event management. It should be in vanilla Javascript, but you can use any framework if you see it fit. Explain your decision. There should be a list of upcoming and past events, a form for new event and an event detail screen

### My adjustments

I've had more time on this task then I originally expected so I've added some "complications", because this was a nice opportunity to try some things that I've always wanted to, but did not have the change yet.

I decided that proper SPA which could grow in the future should have some topics addressed in the beginning, because they are hard to add later in the project:

- routing
- load data from external source (API of some sort REST/Graphql/...)
- localization - messages should be separated from the markup
- source code linting and formatting

## Solution

With these extra requirements I've chosen React as the main framework, because it would be waste of time to recreate a wheel in vanilla JS when there are many battle-tested solutions already available. And I've have always wanted to try to bootstrap a React application from scratch.

I've tried to keep the code as DRY as possible (and reasonable).

### Run locally

After cloning:

```sh
npm install
```

Start local dev mode:

```sh
npm start
```

Run tests:

```sh
npm test
```

### Initial bootstrap

I have bootstrapped the project with [Create React App](https://github.com/facebook/create-react-app) so I did not have to tackle the bundling issues and I could focus on the content.

Then I've added [Typescript](https://www.typescriptlang.org/). When projects grow it is harder to refactor the application if the test coverage is not close to 100% and Typescript helps with prevention of many regression errors which can occur whithout type checking.

### Source code linting and formatting

Linting and formatting really helps to maintain the code readable and consistent. Choice of settings and tools is always somewhat subjective. I like [Prettier](https://prettier.io/) and [XO](https://github.com/xojs/xo) which is based on [ESLint](https://eslint.org/) and can be tweaked when necessary.

### Localization

I have chosen [React i18next](https://react.i18next.com/) because it has great ecosystem, support and I've had previously good experience with it.

### API and Data

_All data is in browser local storage._

I've wanted to try [React Query](https://react-query.tanstack.com/) for some time so this was a great opportunity to use it. It is meant mainly for REST Apis, but not necessarily. I have not deployed ani REST backend, but I've implemented a fake API endpoint which stores data in local storage of the browser. Methods of this endpoint are used in React Query hooks. When done this way this fake endpoint can be easily replaced by real API calls. This fake endpoint simulates server time response.

### Unit tests

I've implemented only a few unit tests. There should be much more for a proper test coverage, but I think as a teaser of how I would do the rest this is sufficient (for purposes of this assignment).

### Styling and Components

I've made the graphical design all by myself, but I did not pay much attention to it.

Instead of some icon library I've used unicode Emoji's just to keep things simple.

I could opt for ready-to-use component libraries like Bootstrap, but I needed only a few components for now. This final presentation layer is the most ephemeral part of any SPA, because it is most likely to reflect current trends. So I've made all the components and styling from the scratch. I've used SASS instead of plain CSS.

I could have used some CSS-in-JS library like [styled components](https://styled-components.com/), but I did not find it necessary. If this application should support some theming, then I'd go this way instead of basic CSS/SASS.

### Markup structure

Mostly basic and common layout:

```txt
Header
----------
Content
----------
Footer
```

#### Page

_Content_ can be anything but there is available a standard _Page_:

```txt
Page Timeline - optional
----------
Page Header - optional
Page Content
----------
Page Footer - optional
```

There is only a single instance of the _Page_ and it can be modified throgh `React.Context`. With this approach the pages can focus on their content and they just set their content into otherwise standardized header and footer.

#### Error Boundary and Suspense

There is global _Error Boundary_ and _Suspense_ implemented.

#### Forms

Form fields are validated.

## Known issues

This is not a complete list, just a few thing I wanted to highlight:

- date-time input is really basic and can fallback to text inputs on some devices - a complex component like [React Datepicker](https://reactdatepicker.com/) could be used instead.
- event can not be edited (but I've prepared the fake API for it)
- form field validation is really basic
- I've mostly ignored older browsers of any kind
- not tested on Apple handheld devices
- Markup preview lacks any styling
- UX is not great, I have some ideas how to improve it, I can discuss directly in-person, here are some points:
  - delete action should be confirmed by the user
  - event date should be displayed in relative way, too
  - there should be relation to other events shown on event detail page

## Time tracking

Time spent on this assignment: **36 hours**

| **day**   | **time** | **activity**                                                                                     |
| --------- | -------- | ------------------------------------------------------------------------------------------------ |
| 24.7.2020 | 1h       | setup of environment CRA, Typescript, XO                                                         |
| 24.7.2020 | 2h       | fake api based on local storage + react-query hooks                                              |
| 25.7.2020 | 2h       | first crude version of React components with i18n and react-router                               |
| 25.7.2020 | 1h       | Netlify deployment and domain setup                                                              |
| 25.7.2020 | 2h       | Added event slugs, added date picker and markdown editor                                         |
| 27.7.2020 | 4.5h     | Added normalize.css and a lot of new React components + 3 events are generated on initial launch |
| 27.7.2020 | 2.5h     | Refactoring of events list + new components and style fixes                                      |
| 28.7.2020 | 4h       | Improved events lists and event details screen                                                   |
| 28.7.2020 | 4.5h     | Improved form and form fields + other small tweaks                                               |
| 29.7.2020 | 3h       | Added form field validation                                                                      |
| 29.7.2020 | 4.5h     | Complete refactoring of page structure - page parts are set through context + added timeline     |
| 30.7.2020 | 3        | Small improvements & finalization touches                                                        |
| 30.7.2020 | 2        | Finalization and README                                                                          |
