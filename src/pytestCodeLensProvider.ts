import * as vscode from 'vscode';
import { findPytestTests, getTestIdentifier, PytestTest } from './pytestFinder';

export class PytestCodeLensProvider implements vscode.CodeLensProvider {
	private codeLenses: vscode.CodeLens[] = [];
	private _onDidChangeCodeLenses: vscode.EventEmitter<void> = new vscode.EventEmitter<void>();
	public readonly onDidChangeCodeLenses: vscode.Event<void> = this._onDidChangeCodeLenses.event;

	constructor() {
		// Refresh code lenses when configuration changes
		vscode.workspace.onDidChangeConfiguration(() => {
			this._onDidChangeCodeLenses.fire();
		});

		// Refresh code lenses when Python files are saved
		vscode.workspace.onDidSaveTextDocument((document) => {
			if (document.languageId === 'python') {
				this._onDidChangeCodeLenses.fire();
			}
		});
	}

	public provideCodeLenses(document: vscode.TextDocument, token: vscode.CancellationToken): vscode.CodeLens[] | Thenable<vscode.CodeLens[]> {
		if (document.languageId !== 'python') {
			return [];
		}

		this.codeLenses = [];
		const tests = findPytestTests(document);

		for (const test of tests) {
			const testIdentifier = getTestIdentifier(test);
			const line = document.lineAt(test.line);
			const range = new vscode.Range(test.line, 0, test.line, line.text.length);

			// Create CodeLens for running the test
			const codeLens = new vscode.CodeLens(range, {
				title: '▶ Run Test',
				command: 'platform-test-runner.runTest',
				arguments: [test, testIdentifier]
			});

			this.codeLenses.push(codeLens);
		}

		return this.codeLenses;
	}

	public resolveCodeLens(codeLens: vscode.CodeLens, token: vscode.CancellationToken): vscode.CodeLens {
		return codeLens;
	}
}
