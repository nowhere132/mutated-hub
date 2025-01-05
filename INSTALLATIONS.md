Reproducible steps for setting up your development environment. The guide assumes you're using a machine running Ubuntu 20+. Why 20+? Because, due to the author's limited experience, he has only worked with Ubuntu 20, 22 and 24.

## NVM and NodeJS
`nvm` stands for NodeJS Version Manager. It's the recommended tool for installing and managing NodeJS versions on your machine.

### Installation
```sh
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash

export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion

nvm install 22
```

To ensure you've installed the correct versions, run the following commands
```sh
npm --version       # Mine is 0.39.5
node -v             # Mine is v22.12.0
npm -v              # Mine is 11.0.0
```

## Typescript and Yarn
`TypeScript` is a superset of `JavaScript` that adds static typing. It’s transpiled into regular JavaScript at runtime, so it runs anywhere JavaScript does, but provides development-time benefits like type checking, auto completion, and error reporting.

Historically, `npm` installed dependencies in a non-deterministically way, meaning developers could end up with different node_modules directories, leading to inconsistent behavior. To address this, Facebook introduced `Yarn` in 2016 as a faster, more secure, and reliable package manager. I'm not sure if these advantages still hold today.

### Installation
```sh
npm install -g typescript
npm install -g yarn
```

To list the globally installed NodeJS modules in your current npm version, use the following command
```sh
npm list -g --depth=0
```
The output should look something like this:
```
/home/manhthd/.nvm/versions/node/v22.12.0/lib
├── @angular/cli@19.0.3
├── corepack@0.29.4
├── npm@11.0.0
├── typescript@5.7.2
└── yarn@1.22.22
```

## Dependencies
You'll notice several configuration files here: `package.json`, `yarn.lock`, `tsconfig.json`. Let's break down what each of these are and why they matter.
- `tsconfig.json`: This file is essential for configuring how TypeScript behaves in your project. It defines the compiler options, such as which files to include or exclude, module resolution strategies, and how Typescript should transform the code.
- `package.json`: This is the core configuration file for any NodeJS project. It manages dependencies, scripts, and metadata about your project.
- `yarn.lock`: This file locks the version of the dependencies to ensure consistent installs across different environment, preventing issues caused by version mismatches. Yarn still uses `package.json` for dependency management, which is why it only introduces `yarn.lock` rather than a separate configuration file like `yarn-package.json`

### Installation
```sh
yarn init
tsc --init
yarn add -D typescript @types/node ts-node tsc
```
These four packages will appear under `devDependencies` in the `package.json` file. As the name implies, they are meant to improve your development experience but are not required for production environments.

## K6
`k6` is an extremely developer-friendly load testing tool, especially when compared to the widely known JMeter. With just a simple JS script, you can dive right in.

### Installation
The installation guide is available at: https://grafana.com/docs/k6/latest/set-up/install-k6/

### Usage
Once k6 is successfully installed on your machine, start the server using `yarn dev` and test the health check endpoint by running `k6 run test/script.js`. You can experiment with varying numbers of virtual users (VUs), such as 100, 1000, or 10000, to observe the application's limits.  

## FAQ