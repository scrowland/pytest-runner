# Platform Test Runner

A VS Code extension that automatically finds pytest tests in your Python project and adds run buttons above each test function.

## Features

- **Automatic Test Discovery**: Automatically finds all pytest test functions in Python files
  - Functions starting with `test_`
  - Methods in classes starting with `Test`
- **Inline Run Buttons**: Adds "▶ Run Test" buttons above each test function using CodeLens
- **Customizable Commands**: Configure the exact command to run when clicking the button
- **Terminal Integration**: Runs tests in a dedicated VS Code terminal

## Usage

1. Open any Python file containing pytest tests
2. You'll see "▶ Run Test" buttons above each test function
3. Click the button to run that specific test
4. The test will execute in the "Platform Test Runner" terminal

## Requirements

If you have any requirements or dependencies, add a section describing those and how to install and configure them.

## Extension Settings

This extension contributes the following settings:

* `platform-test-runner.commandTemplate`: Command template to run pytest tests (default: `pytest {testIdentifier}`)

### Command Template Placeholders

You can customize the command using the following placeholders:

- `{testIdentifier}`: Full test identifier (e.g., `tests/test_example.py::TestClass::test_function`)
- `{testName}`: Test function name (e.g., `test_function`)
- `{filePath}`: Full file path to the test file
- `{className}`: Test class name (empty if test is not in a class)

### Example Configurations

**Default (simple pytest):**
```json
{
  "platform-test-runner.commandTemplate": "pytest {testIdentifier}"
}
```

**With verbose output:**
```json
{
  "platform-test-runner.commandTemplate": "pytest -v {testIdentifier}"
}
```

**With custom pytest configuration:**
```json
{
  "platform-test-runner.commandTemplate": "pytest {testIdentifier} --tb=short -x"
}
```

**Using a virtual environment:**
```json
{
  "platform-test-runner.commandTemplate": "source venv/bin/activate && pytest {testIdentifier}"
}
```

## Known Issues

Calling out known issues can help limit users opening duplicate issues against your extension.

## Release Notes

Users appreciate release notes as you update your extension.

### 1.0.0

Initial release of ...

### 1.0.1

Fixed issue #.

### 1.1.0

Added features X, Y, and Z.

---

## Following extension guidelines

Ensure that you've read through the extensions guidelines and follow the best practices for creating your extension.

* [Extension Guidelines](https://code.visualstudio.com/api/references/extension-guidelines)

## Working with Markdown

You can author your README using Visual Studio Code. Here are some useful editor keyboard shortcuts:

* Split the editor (`Cmd+\` on macOS or `Ctrl+\` on Windows and Linux).
* Toggle preview (`Shift+Cmd+V` on macOS or `Shift+Ctrl+V` on Windows and Linux).
* Press `Ctrl+Space` (Windows, Linux, macOS) to see a list of Markdown snippets.

## For more information

* [Visual Studio Code's Markdown Support](http://code.visualstudio.com/docs/languages/markdown)
* [Markdown Syntax Reference](https://help.github.com/articles/markdown-basics/)

**Enjoy!**
