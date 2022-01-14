<h1 align="center">Gulp configuration</h1> <br>

### Preview

**Working** <br><br>
![Something went wrong. Image not loaded](https://github.com/xlebpushek/gulp-configuration/blob/main/assets/preview/working.png) <br><br>

### Description

#### General

Gulp assembly for full-fledged one-page and multi-page layout

This assembly may appeal to the overwhelming majority of users. Due to its modularity, its source code is easy to understand and change.

The assembly supports the choice of operation mode and the choice of the project path. In addition, the settings can be stored as a json file, this solution is made for long-term work with projects, where it will be very inconvenient to enter the same arguments every time you start.

#### Tasks

The assembly supports the creation of source maps, minification, validation, imports, preprocessing and streaming to the browser with change tracking. <br>

#### Project path

The project path is the path to the directory where the directory structure with the source files should be located.

If the project path is not set to manual, then the build will look for source files in the current directory.

#### Working mode

The mode of operation is the mode that will affect the performance of tasks and their options.

This assembly supports two modes of operation - production and development. <br>
If the mode of operation is not set to manual, then the build will run in development mode.









<!-- ```
.source
├── media
│   ├── audio
│   │   └── *.{ MP3, ogg, wav, mp4 }
│   ├── images
│   │   ├── rasters
│   │   │   └── *.{ gif, png, jpg, jpeg, WebP }
│   │   └── vectors
│   │       └── *.{ svg, ico }
│   └── video
│   │   └── *.{ MP4, ogv, WebM }
├── pages
│   ├── components
│   ├── page
│   │   └── index.html
│   └── index.html
├── fonts
├── styles
│   ├── components
│   │   └── *.scss
│   ├── libraries
│   │   └── *.scss
│   └── index.scss
├── json
│   └── *.json
└── scripts
    ├── components
		│   └── *.js
    ├── libraries
		│   └── *.js
    └── index.js
```

```
.source
├── media
│   ├── audio
│   │   └── *.{ MP3, ogg, wav, mp4 }
│   ├── images
│   │   ├── rasters
│   │   │   └── *.{ gif, png, jpg, jpeg, WebP }
│   │   └── vectors
│   │       └── *.{ svg, ico }
│   └── video
│   │   └── *.{ MP4, ogv, WebM }
├── pages
│   ├── page
│   │   └── index.html
│   └── index.html
├── fonts
├── styles
│   ├── components
│   │   └── *.scss
│   ├── libraries
│   │   └── *.scss
│   └── index.scss
├── json
│   └── *.json
└── scripts
    ├── components
		│   └── *.js
    ├── libraries
		│   └── *.js
    └── index.js
``` -->