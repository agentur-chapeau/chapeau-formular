## Install

Load via [jsDelivr](https://www.jsdelivr.com/)
```html
<script type="module" src="https://cdn.jsdelivr.net/gh/agentur-chapeau/chapeau-formular@<version>/dist/chapeau-formular.js"></script>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/agentur-chapeau/chapeau-formular@<version>/dist/style.css"/>
```

Replace `<version>` with the desired version tag (e.g. `1.0.0`)

## Development

1. Clone Repository
```console
git clone https://github.com/agentur-chapeau/chapeau-formular.git
```

2. Install Dependencies
```console
npm install
```

3. Run dev server
```console
npm run dev
```

4. Add script tags to Webflow Custom Code
```html
<script type="module" src="http://localhost:5173/@vite/client"></script>
<script type="module" src="http://localhost:5173/src/main.js"></script>
```

## Release

**1. Create a new version**
```console
npm version [<newversion> | major | minor | patch ] 
```

This will:
1. Build the project into `./dist`
2. Update `version` in `package.json`
3. Create a new commit with a version tag
4. Push to Github

**2. Create a new release**
- Create a new Github Release
- Document the changes

## Versioning
Follow [SemVer](https://semver.org/)
- MAJOR: Breaking changes
- MINOR: New functionality (backwards compatible)
- PATCH: Bug Fix/Internal change (backwards compatible)
