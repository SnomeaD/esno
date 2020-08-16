import 'zone.js/dist/zone-node';

import { ngExpressEngine } from '@nguniversal/express-engine';
import * as express from 'express';
import * as passport from 'passport';

import * as session from 'express-session';
import { environment } from './src/environments/environment';
const BnetStrategy = require('passport-bnet').Strategy;
import { config } from './config/config.js';

import { join } from 'path';

import { AppServerModule } from './src/main.server';
import { APP_BASE_HREF } from '@angular/common';
import { existsSync } from 'fs';
import { getToonsController } from './controllers/getToons';
import { getToonDetailsController } from './controllers/getToonDetails';

// The Express app is exported so that it can be used by serverless Functions.
export function app(): express.Express {
  const server = express();
  const distFolder = join(process.cwd(), 'dist/browser');
  const indexHtml = existsSync(join(distFolder, 'index.original.html'))
    ? 'index.original.html'
    : 'index';

  // Our Universal express-engine (found @ https://github.com/angular/universal/tree/master/modules/express-engine)
  server.engine(
    'html',
    ngExpressEngine({
      bootstrap: AppServerModule,
    })
  );
  server.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept'
    );
    next();
  });
  server.use(
    session({ secret: 'blizzard', saveUninitialized: true, resave: true })
  );
  server.use(passport.initialize());
  server.use(passport.session());
  passport.serializeUser((user, done) => {
    done(null, user);
  });

  passport.deserializeUser((user, done) => {
    done(null, user);
  });
  const restrict = (req: any, res: any, next: any) => {
    if (req.isAuthenticated()) {
      next();
    } else {
      req.session.error = 'Access denied!';
      res.redirect('/auth/bnet');
    }
  };
  // Passport strategy to authenticate to Battle.net
  const constRegion = 'eu';
  passport.use(
    new BnetStrategy(
      {
        clientID: config.bnet.id,
        clientSecret: config.bnet.secret,
        callbackURL: environment.callbackUrl,
        region: constRegion,
        scope: 'wow.profile',
        response_type: 'code',
      },
      (_accessToken, _refreshToken, profile, done) => {
        return done(null, profile);
      }
    )
  );

  server.set('view engine', 'html');
  server.set('views', distFolder);
  server.get('/api/toons', restrict, getToonsController);
  server.get('/api/toons/:realmSlug/:toonName', restrict, getToonDetailsController);
  server.get('/auth/bnet', passport.authenticate('bnet'));

  server.get(
    '/auth/bnet/callback',
    passport.authenticate('bnet', { failureRedirect: '/' }),
    (req, res) => {
      res.redirect('/');
    }
  );
  // Serve static files from /browser
  server.get(
    '*.*',
    restrict,
    express.static(distFolder, {
      maxAge: '1y',
    })
  );

  // All regular routes use the Universal engine
  server.get('*', restrict, (req, res) => {
    res.render(indexHtml, {
      req,
      providers: [{ provide: APP_BASE_HREF, useValue: req.baseUrl }],
    });
  });

  return server;
}

function run() {
  const port = process.env.PORT || 4000;

  // Start up the Node server
  const server = app();
  server.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

// Webpack will replace 'require' with '__webpack_require__'
// '__non_webpack_require__' is a proxy to Node 'require'
// The below code is to ensure that the server is run only when not requiring the bundle.
declare const __non_webpack_require__: NodeRequire;
const mainModule = __non_webpack_require__.main;
const moduleFilename = (mainModule && mainModule.filename) || '';
if (moduleFilename === __filename || moduleFilename.includes('iisnode')) {
  run();
}

export * from './src/main.server';
