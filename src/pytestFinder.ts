import * as vscode from 'vscode';

export interface PytestTest {
	name: string;
	line: number;
	filePath: string;
	className?: string;
}

/**
 * Finds all pytest test functions in a Python file
 * Supports:
 * - Functions starting with 'test_'
 * - Methods in classes starting with 'Test'
 */
export function findPytestTests(document: vscode.TextDocument): PytestTest[] {
	const tests: PytestTest[] = [];
	const text = document.getText();
	const lines = text.split('\n');
	
	let currentClass: string | undefined;
	let indentLevel = 0;
	
	for (let i = 0; i < lines.length; i++) {
		const line = lines[i];
		const trimmed = line.trim();
		
		// Skip empty lines and comments
		if (!trimmed || trimmed.startsWith('#')) {
			continue;
		}
		
		// Check for class definition (pytest test classes start with 'Test')
		const classMatch = trimmed.match(/^class\s+(Test\w+)/);
		if (classMatch) {
			currentClass = classMatch[1];
			indentLevel = line.length - line.trimStart().length;
			continue;
		}
		
		// Check if we're still in the same class (by indentation)
		if (currentClass) {
			const currentIndent = line.length - line.trimStart().length;
			if (currentIndent <= indentLevel && trimmed) {
				currentClass = undefined;
			}
		}
		
		// Check for test function definition
		// Matches: def test_* or async def test_*
		const testFunctionMatch = trimmed.match(/^(async\s+)?def\s+(test_\w+)/);
		if (testFunctionMatch) {
			const testName = testFunctionMatch[2];
			tests.push({
				name: testName,
				line: i,
				filePath: document.uri.fsPath,
				className: currentClass
			});
		}
	}
	
	return tests;
}

/**
 * Gets the test identifier for running pytest
 * Format: file::class::test or file::test
 */
export function getTestIdentifier(test: PytestTest): string {
	const fileName = test.filePath;
	const relativePath = vscode.workspace.asRelativePath(fileName);
	const pathWithoutExt = relativePath.replace(/\.py$/, '');
	const pathWithSlashes = pathWithoutExt.replace(/\\/g, '/');
	
	if (test.className) {
		return `${pathWithSlashes}::${test.className}::${test.name}`;
	}
	return `${pathWithSlashes}::${test.name}`;
}
