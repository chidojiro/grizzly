/* eslint-disable @typescript-eslint/no-var-requires */
const { SyntaxKind, Project } = require('ts-morph');

const project = new Project({ tsConfigFilePath: './tsconfig.json' });

const sourceFile = project.getSourceFile('Toolbar.tsx');

project.getSourceFiles().forEach(sourceFile => {
  if (sourceFile.getBaseName() === 'Search.tsx') return;
  let hasImported = false;

  sourceFile.getDescendantsOfKind(SyntaxKind.JsxAttribute).forEach(attr => {
    if (attr.getName() === 'css') {
      if (!hasImported) {
        hasImported = true;

        sourceFile.addImportDeclaration({ moduleSpecifier: 'twin.macro', defaultImport: 'tw' });
      }

      const initializer = attr.getInitializer();
      const elements = initializer.getExpression().getElements();

      const transformedElements = elements.map(element => {
        if (element.getKind() === SyntaxKind.StringLiteral) {
          return `tw\`${element.getLiteralText()}\``;
        }

        if (element.getKind() === SyntaxKind.BinaryExpression) {
          return `${element.getLeft().getText()} && tw\`${element.getRight().getLiteralText()}\``;
        }

        if (element.getKind() === SyntaxKind.Identifier) {
          const variable = sourceFile.getDescendantsOfKind(SyntaxKind.VariableDeclaration).find(v => {
            return v.getName() === element.getText();
          });

          const variableInitializer = variable.getInitializer();

          if (variableInitializer.getText().startsWith('tw')) return element.getText();

          const newInitializer = `tw\`${variable.getInitializer().getText()}\``;

          variable.setInitializer(newInitializer);

          return element.getText();
        }
      });

      initializer.replaceWithText(`{[${transformedElements.join(',')}]}`);
    }
  });

  sourceFile.save();
});
