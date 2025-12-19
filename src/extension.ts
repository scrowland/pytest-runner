// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { PytestCodeLensProvider } from './pytestCodeLensProvider';
import { PytestTest, getTestIdentifier } from './pytestFinder';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Platform Test Runner extension is now active!');

	// Register CodeLens provider for Python files
	const codeLensProvider = new PytestCodeLensProvider();
	const codeLensDisposable = vscode.languages.registerCodeLensProvider(
		{ language: 'python', scheme: 'file' },
		codeLensProvider
	);
	context.subscriptions.push(codeLensDisposable);

	// Register command to run a test
	const runTestDisposable = vscode.commands.registerCommand(
		'platform-test-runner.runTest',
		(test: PytestTest, testIdentifier: string) => {
			runTest(test, testIdentifier);
		}
	);
	context.subscriptions.push(runTestDisposable);

	console.log('Platform Test Runner commands registered successfully');
}

/**
 * Runs a pytest test in the terminal using the configured command template
 */
function runTest(test: PytestTest, testIdentifier: string) {
	const config = vscode.workspace.getConfiguration('platform-test-runner');
	const commandTemplate = config.get<string>('commandTemplate', 'pytest {testIdentifier}');
	
	// Replace placeholders in the command template
	let command = commandTemplate
		.replace(/\{testIdentifier\}/g, testIdentifier)
		.replace(/\{testName\}/g, test.name)
		.replace(/\{filePath\}/g, test.filePath)
		.replace(/\{className\}/g, test.className || '');

	// Get the workspace folder
	const workspaceFolder = vscode.workspace.getWorkspaceFolder(vscode.Uri.file(test.filePath));
	if (!workspaceFolder) {
		vscode.window.showErrorMessage('No workspace folder found for test file');
		return;
	}

	// Create or get terminal
	const terminalName = 'Platform Test Runner';
	let terminal = vscode.window.terminals.find(t => t.name === terminalName);
	
	if (!terminal) {
		terminal = vscode.window.createTerminal({
			name: terminalName,
			cwd: workspaceFolder.uri.fsPath
		});
	}

	// Show terminal and execute command
	terminal.show();
	terminal.sendText(command);
}

// This method is called when your extension is deactivated
export function deactivate() {}
