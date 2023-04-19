const vscode = require('vscode');

function getShitty() {
  const editor = vscode.window.activeTextEditor;
  if (editor) {
    const document = editor.document;
    const text = document.getText();
    let result = text;

    // SHITTY: Add random one-liner comments throughout the code
    let commentLocations = [];
    for (let i = 0; i < text.length; i++) {
      if (text.charAt(i) === '\n') {
        commentLocations.push(i);
      }
    }
    for (let i = 0; i < 3; i++) {
      let randomIndex = Math.floor(Math.random() * commentLocations.length);
      let randomLocation = commentLocations[randomIndex];
      let lineStart = result.lastIndexOf('\n', randomLocation) + 1;
      result = result.substr(0, lineStart) + '# SHITTY - YOU ARE WELCOME\n' + result.substr(lineStart);
    }

    // SHITTY: Add unnecessary parentheses around mathematical operations
    result = result.replace(/(\d+)\s*([\+\-\*\/])\s*(\d+)/g, '($1) $2 ($3)');

    // SHITTY: Add random whitespace between digits and arithmetic operators
    result = result.replace(/(\d+)\s*([\+\-\*\/])\s*(\d+)/g, '$1 $2$3');

    // SHITTY: Add semicolons to the end of statements
    result = result.replace(/(\n\s*)(let|const|var)\s+([a-zA-Z0-9]+)\s*=\s*([^;\n]+)(\n)/g, '$1$2 $3 = $4;$5');

    editor.edit(editBuilder => {
      const start = new vscode.Position(0, 0);
      const end = new vscode.Position(document.lineCount + 1, 0);
      editBuilder.replace(new vscode.Range(start, end), result);
    });
  }
}

function activate(context) {
  let disposable = vscode.commands.registerCommand('extension.getShitty', getShitty);
  context.subscriptions.push(disposable);
}
exports.activate = activate;
