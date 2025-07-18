import * as ts from 'typescript';

function transformPathsPlugin(context: ts.TransformationContext) {
  const host = context.getHost();
  const oldResolveModuleNames = host.resolveModuleNames;
  
  host.resolveModuleNames = (moduleNames: string[], containingFile: string) => {
    return moduleNames.map(moduleName => {
      const resolved = oldResolveModuleNames(moduleName, containingFile);
      if (resolved.resolved) {
        // 如果模块名是一个路径别名，转换为相对路径
        const baseUrl = ts.getDirectoryPath(ts.getBaseFilePath(containingFile));
        const relativePath = ts.getRelativePath(baseUrl, resolved.resolvedFileName, getCanonicalFileName);
        return {
          resolved: relativePath,
          failedLookupLocation: resolved.failedLookupLocation
        };
      }
      return resolved;
    });
  };

  const getCanonicalFileName = (fileName: string) =>
    ts.sys.useCaseSensitiveFileNames ? fileName : fileName.toLowerCase();

  return {
    before: [],
    after: [
      transformPaths
    ]
  };

  function transformPaths(sourceFile: ts.SourceFile) {
    const visitor: ts.Visitor = (node: ts.Node) => {
      if (ts.isImportDeclaration(node) || ts.isExportDeclaration(node)) {
        const moduleSpecifier = node.moduleSpecifier as ts.StringLiteral;
        // 替换路径别名
        const transformedText = ts.transformPathsInString(
          moduleSpecifier.text,
          (path, baseFile) => {
            const resolved = ts.resolveModuleName(path, baseFile, context.compilerOptions, host);
            if (resolved.resolved) {
              const baseUrl = ts.getDirectoryPath(ts.getBaseFilePath(baseFile));
              return ts.getRelativePath(baseUrl, resolved.resolvedFileName, getCanonicalFileName);
            }
            return path;
          },
          getCanonicalFileName
        );
        moduleSpecifier.text = transformedText;
      }
      return ts.visitEachChild(node, visitor, context);
    };

    return ts.visitNode(sourceFile, visitor);
  }
}

export default function (program: ts.Program) {
  return {
    afterEmit: (program: ts.Program) => {
      const emitResult = program.getEmitOutput(undefined);
      if (emitResult.outputFiles && emitResult.outputFiles.length > 0) {
        emitResult.outputFiles.forEach(outputFile => {
          if (outputFile.name.endsWith('.d.ts')) {
            const transformer = transformPathsPlugin(program.getCompilerOptions().transformers || {});
            const transformedSource = transformer.afterDeclarationEmit
              ? transformer.afterDeclarationEmit(outputFile.text, outputFile.name, outputFile.writeByteOrderMark, outputFile.sourceMapText, outputFile.sourceMapFilePath)
              : outputFile.text;
            outputFile.text = transformedSource;
          }
        });
      }
    }
  };
}