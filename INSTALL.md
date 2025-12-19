# Installing the Extension Locally

There are two ways to use this extension in Cursor:

## Option 1: Development Mode (Recommended for Testing)

This is the easiest way to test the extension:

1. Open this project in Cursor
2. Press `F5` or go to **Run > Start Debugging**
3. A new Cursor window will open with the extension loaded (Extension Development Host)
4. The extension will automatically reload when you make changes

**Note:** The extension only works in the Extension Development Host window, not in your main Cursor instance.

## Option 2: Install as a Packaged Extension

To install the extension permanently in your main Cursor instance:

### Step 1: Install vsce (if not already installed)

```bash
pnpm add -D @vscode/vsce
```

Or globally:
```bash
npm install -g @vscode/vsce
```

### Step 2: Package the extension

```bash
pnpm run package-extension
```

This will create a `.vsix` file in the project root (e.g., `platform-test-runner-0.0.1.vsix`).

### Step 3: Install the extension

**Using Command Line:**
```bash
cursor --install-extension platform-test-runner-0.0.1.vsix
```

**Or using Cursor UI:**
1. Open Cursor
2. Press `Cmd+Shift+P` (Mac) or `Ctrl+Shift+P` (Windows/Linux)
3. Type "Extensions: Install from VSIX..."
4. Select the `.vsix` file you just created

### Step 4: Reload Cursor

After installation, reload Cursor for the extension to activate.

## Updating the Extension

If you make changes and want to update the installed extension:

1. Update the version in `package.json`
2. Run `pnpm run package-extension` again
3. Install the new `.vsix` file (it will replace the old version)

## Troubleshooting

- If the extension doesn't appear, check the Extensions view in Cursor
- Make sure you've compiled the extension: `pnpm run compile`
- Check the Output panel for any error messages
