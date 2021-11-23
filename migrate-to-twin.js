/* eslint-disable @typescript-eslint/no-var-requires */
const { SyntaxKind, Project } = require('ts-morph');

const project = new Project({ tsConfigFilePath: './tsconfig.json' });

const sourceFile = project.getSourceFile('Search.tsx');

// project.getSourceFiles().forEach(sourceFile => {
sourceFile.getDescendantsOfKind(SyntaxKind.JsxAttribute).forEach(attr => {
  if (attr.getName() === 'className') {
    const initializer = attr.getInitializer();

    const tailwindClassNames = [];
    let hasClassNameInClassName = false;
    const conditionalClassNames = [];

    if (initializer.getKind() === SyntaxKind.JsxExpression) {
      const args = initializer.getFirstDescendantByKind(SyntaxKind.CallExpression).getArguments();

      args.forEach(arg => {
        switch (arg.getKind()) {
          case SyntaxKind.StringLiteral:
            tailwindClassNames.push(arg.getText());
            break;
          case SyntaxKind.ObjectLiteralExpression: {
            const properties = arg.getDescendantsOfKind(SyntaxKind.PropertyAssignment);

            properties.forEach(p => {
              conditionalClassNames.push([p.getInitializer().getText(), p.getName()]);
            });
            break;
          }
          case SyntaxKind.Identifier:
            hasClassNameInClassName = true;
            break;
          default:
            break;
        }
      });
    } else {
      tailwindClassNames.push(initializer.getText());
    }

    const element =
      attr.getFirstAncestorByKind(SyntaxKind.JsxOpeningElement) ||
      attr.getFirstAncestorByKind(SyntaxKind.JsxSelfClosingElement);

    attr.remove();

    if (hasClassNameInClassName) {
      element.addAttribute({ initializer: '{className}', name: 'className' });
    }

    if (tailwindClassNames.length) {
      if (conditionalClassNames.length) {
        const parsedConditions = conditionalClassNames.map(statement => {
          return `${statement[0]} && ${statement[1]}`;
        });

        element.addAttribute({
          name: 'css',
          initializer: `{[${tailwindClassNames.join(',')},${parsedConditions.join(',')}]}`,
        });
      } else {
        element.addAttribute({
          name: 'css',
          initializer: `{[${tailwindClassNames.join(',')}]}`,
        });
      }
    }
  }
});

sourceFile.save();
// });
