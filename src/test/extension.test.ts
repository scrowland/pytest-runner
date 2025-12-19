import * as assert from 'assert';
import * as vscode from 'vscode';

suite('Extension Test Suite', () => {
	vscode.window.showInformationMessage('Start all tests.');

	test('Hello World command should be registered', async () => {
		const commands = await vscode.commands.getCommands(true);
		const helloWorldCommand = commands.find(cmd => cmd === 'platform-test-runner.helloWorld');
		assert.ok(helloWorldCommand, 'Hello World command should be registered');
	});

	test('Sample test', () => {
		assert.strictEqual(-1, [1, 2, 3].indexOf(5));
		assert.strictEqual(-1, [1, 2, 3].indexOf(0));
	});
});
