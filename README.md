cd templates
npx create-next-app@latest TEMPLATE_NAME --yes

--yes skips prompts using saved preferences or defaults. The default setup enables TypeScript, Tailwind CSS, ESLint, App Router, and Turbopack, with import alias @/\*, and includes AGENTS.md (with a CLAUDE.md that references it) to guide coding agents to write up-to-date Next.js code.

# create-feast-site

This project is a CLI tool for creating FEAST sites.

## Installation

To install the project, clone the repository and run:

```
npm install
```

## Usage

After installation, you can use the CLI tool by running:

```
npx create-feast-site
```

## Development

### Build

To compile the TypeScript code into JavaScript, run:

```
npm run build
```

This will generate the JavaScript files in the `dist` directory.

### Scripts

- **build**: Compiles the TypeScript files using the TypeScript compiler.

## Contributing

Feel free to submit issues or pull requests for improvements.