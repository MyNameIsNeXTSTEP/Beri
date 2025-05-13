# Pure and Object-Oriented JavaScript Web Framework
This project is aimed to give the world a comprehensive OOP solution for creating a full-stack WEB applicaiton, following a pure layered architecture design, the power of [NodeJS](https://nodejs.org/en) and [EO](https://www.elegantobjects.org/) principals.

**IMPORTANT**: Note, that this project is yet under active development.

> **Beri** - from the Russian word “Бери́”, which means “take (it)” in English.\
> It's pronounced with the emphasis on the last syllable like: `“be-REE”`, .

## Core principles
- **Object-Oriented**\
Everything is an object with clear responsibilities and encapsulation first approach
- **Immutability First**\
Objects are immutable by default, reducing side effects and improving predictability
- **Null Values**\
Here's a tricky one point, since the `null` is a valid [primitive value that represents the intentional absence of any object value](https://tc39.es/ecma262/multipage/overview.html#sec-null-value) we denote that the `null` primitive value can be used properly in situations where we need to demonstrate `nullable` object of any/or specified form.
- **Declarative Over Imperative**\
Express what <u>should happen, not how it should happen</u>
- **Composition Over Inheritance**\
Build composable objects instead of extending others
> Creating prototype chains is considered allowed
- **JSON schemas support**\
Use JSONSchema protocol to create and use your schemas for routing, data exchanges, buiolt-in validation.
- **Clean layered architecture**\
Domain layer, API (routes) layer, DB-access layer, Presentors layer (UI)

## Key Features
- **Hot refresh**\
Modify your code and see changes immediately
- **Component-Based structure**\
Build UIs with reusable, composable components
- **Built-in Routing**\
Declarative API routing based on metaprogramming and schemas 
- **Server-Side Rendering**\
First-class support for SSR 
- **RESTful & RPC API Support**\
Easy creation of RESTful and RPC endpoints (HTTP, WS)
- **Template Engine Integration**\
Support for most popular templating engines
- **Static Resource Handling**\
Efficient serving of static assets

## Quick Start

Create a simple Beri application server.

```JavaScript
import { App } from '@beri/core';
import { Routes, HTTPRoute } from '@beri/routes';

const app = new App(
  new Routes(
    new HTTPRoute('/', () => 'Hello, World!')
  ),
  { httpPort: 3000 }
);

app.start();
```

### Using JSON schemas
```JavaScript
// You can define a JSON routing schema for HTTP routes
const usersSchema = {
  method: 'GET',
  url: '/users/:id',
  schema: {
    request: {
      params: {
        type: 'object',
        properties: {
          id: {
            type: 'number',
          },
        },
      },
    },
    response: {
      200: {
        type: 'object',
        properties: {
          resp: {
            type: 'string',
          }
        },
        required: ['resp']
      },
    },
 },
};

// Also you can define a JSON schema for WS routes
const loginSchema = {
  type: 'call',
  method: 'auth/login',
  schema: {
    message: {
      type: 'object',
      properties: {
        token: {
          type: 'string',
        }
      },
    }
    reply: {
      type: 'object',
      properties: {
        code: 200,
        ok: {
          type: 'boolean',
        }
      },
      required: ['ok']
    },
 },
};
```

And then use your web-server in more somprehensive way
```JavaScript
import { App } from '@beri/core';
import { Routes, HTTPRoute, WSRoute } from '@beri/routes';
import { SecuredRoute } from '@beri/secure';

const app = new App(
  new Routes(
    new HTTPRoute(
      new SecuredRoute(
        usersSchema,
        (req) => ({ resp: `User ID: ${req.params.id}` })
      )
    ),
    new WSRoute(
      new SecuredRoute({
        route: {
          loginSchema,
          (socket) => socket.send({
            ok: true,
          }),
        },
        type: 'access_token',
      })
    )
  ),
  { httpPort: 3000, wsPort: 3001 },
);

app.start();
```

### Static
For a static file serving use the object representing the content
```JavaScript
import { Route } from '@beri/routes';
import { StaticContent } from '@beri/static';

const app = new App(
  // ...
  new Route(
    '/docs/*',
    new StaticContent('./docs')
  )
);
```

## Client
Define your UI block
```JavaScript
// src/ui
export class UserProfile {
  constructor(user) {
    this.user = user;
  };
  
  render() {
    return {
      div: {
        className: 'user-profile',
        styles: // ...
        p: `Name: ${this.user.name}`,
        p: `Email: ${this.user.email}`,
      },
    };
  };
};
```

Usage
```JavaScript
// src/server.js
import { UIComponent } from '@beri/ui';

const app = new App(
  // ...
  new Route(
    '/profile',
    (req) => {
      const user = // get a user data from db;
      return new UIComponent(
        new UserProfile(user)
      ).render();
    }
  );
);
```

Considering a complex UI we use the same approach of composable objects here too:
```JavaScript
import { Page } from '@beri/ui';

const app = new App(
  // ...
  new Route(
    '/profile',
    (req) => {
      // ...
      return new Page(
        new UserProfile(user),
        new SettingsMenu(
          new SettingsTabs(),
          settingsSections, // maybe a plain JS object as well
        ),
        new SupportChat(url, options),
      ).render();
    }
  );
);
```

### Backend API
You can use a `Beri` application only as a web-server, if you wish, meaning be able to use its HTTP or WS API as an external API endpoints. Or when you need to create a backend only with no UI for some 3rd-party clients.

...