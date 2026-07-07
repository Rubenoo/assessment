# Sqills assessment

## How to run & build the project

For development make sure you have the required dependencies installed on your machine:
- node
- npm

**Steps**

1. run `npm install` to install the required dependencies
2. run `npm run dev` to start the development server
3. to build the production application run `npm run build`
4. to localy deploy the production build run `serve -s dist` 

## Architectures notes

### Process 

#### Steps

1. Analyse the requirements, ask questions, make sure the whole context is clear.
2. build this document before coding
3. review docs by claude to ensure i have the right technical direction
- Prompt: `Hey claude, here is my assesment and my thought process and technical direction. Review this, give me feedback and make sure i follow best practices..After this, return the whole md file in correct english and good structure.`

9. Review code by claude code

### Technical approach

#### Scope 1.
Look at the documentation of MUI, i expect it to be suffiencent.

#### Scope 2.
> Search input with debounced filtering (configurable; default 200 ms)

- I think it's good to have it configurable, because depending on the use case the debounce can be configed. The purpose of a debounced search input can be for example to improve the UX, you don't want any unnessesery screen changes. Also you dont want to unnesseary spam your backend service with request. To improve the search function in the frontend you can maybe, depending on the use case, give suggestions and use the lebenstheins algoritme to improve the input.
- For the test data for after a quick search i found [Intl.DisplayNames](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DisplayNames) an javascript and widely support object. This seems like a nice solution to fill the search input because i don't need to add a random dependency that needs to be maintained or adds an possible security risk in the future. But using this will clash with the empty state, loading and no-result requirement because this object always has results
- For the other features of the autocomplete i expect MUI to have build-in support. I always prefer to use MUI and stick to its implementation instead of adding custom behavior. Because it takes more time, has to be maintained and adds complexity. 
- To improve UX and accessibilty you want to always show the label (mui default behavior). But have guiding labels and placeholders that steer the users in the right direction.

*(optional)*
- Because it can support a async data hook. I would seperate the logic of the input and the data fetch. For example to put the data logic inside a context so that it the data can be accesssed anywhere within the context. Then this data logic can also be tested in isolation. Also i would lazy load the options (if the options don't exceed a large number of options) so that it's not blocking and the user can directly select the options when aviable 

#### Scope 3.
- Because its multiple inputs with a relation. i would recommend to put it inside a form and let for example React Hook Form, e handle the form state, so that you can add some basic validation. like for example that the origin and destination can't be the same.
- For the input use MUI default inputs


#### Technical setup

- Typescript
- React
- Vite
- Mui


**Testing**

For unit testing i would to with Vitest or React Testing Framework. Keep it simple and write clear unit tests. For the MUI components i would normaly only write a happy test scenario and don't extra test the MUI inputs because mui is a wellknown library that has thurowly tested it's components. If you have some custom logic its always good to test that. I think that writing test scenario's that could also function as documentation (concept TDD) is really strong because when you read the test you know what the purpose of the functionality is, somethimes that describily is worth more then for example "if i type "a" the input contains a. Better would be "Its possible to mirror the destination and origin so that the user can plan it's way back more easier" for example. It's always good to try to test as much as these relevant tests at unit to that the end-to-end or integration tests can be as briefly as possible because those tests are more expenisive (time-wise for example)



*Out of scope*
- For developing this new feature i would build and test it in storybook (speccialy if its a big feature), disscuss it with design, stakeholders before implementing it in the final application. To make sure the right thing is build and we could iterate on it before implementing it in the final application. For smaller changes i would only add it to storybook if the new component is relevant ( e.g. gonna be shared or part of the design system)
- For intergration and/or end-to-end testing i would use Cypress or Playwright in combination with Cucumber to ensure the new feature seamlessly blends in.
- To mock the services for intergration testing we could use mock service worker or WireMock in combination with Fakerjs to ensure we have realistic mock data. I think for this stage it's overkill.
- Normaly for the async data hook i would recommand using Orval or another OpenApi client/types generator to ensure type-safelty of the data that would be returned and you can call the generated client. At this stage this is overkill.
- Normaly to have a secure async call to the backend services i expected to have authentication setup in the project. You could use axios or orval and implement the interceptor that handles the authorization with jwt-decode, CASL could be use for frontend permission checking (its alway importent to also have these checks in the backend of course, otherwise you can get the fifa accident from a couple days ago) 
- Localisation with for example i18n is out of scope
- building a CI/CD pipeline is out of scope.

### Questions
1. What is the context of the problem that we're trying to fix?
2. Who are the users?
- in the context of trains for scope 2, a user that is searching for the next station to buy its ticket might want to have some suggested stations and a simple and clear design. 
- A train operator might want to have more options and control.
3. Is there a design system precent? Consistency with design is important for the user experience, therefore if there is a design system precent, follow its conventies to asure this.

**Question scope 3.**
1. What do you mean by emit a normalised filter payload? 
2. Why would you have multiple origins and multiple destinations?

### Assumptions

### Thoughts

**UI/UX**
It's always good to remember the 10 heuritics of Nielsen Norman when building features. For example:

*Heuristic 2: Match between System and the Real World*
It's important to speak the language of the user, for example a user thats buys a ticket a "station" is where he boards the station. But maybe the train operator doesn't call that the "station" but he calles it the "terminal". So this ambiguous language is important to speak the language of the user.

**Build manager**
Because this will be a simple project i would go with NPM, alternative would be Bun because its very fast. If your working in a monorepo PNPM or Nx or TurboRepo would be an option.