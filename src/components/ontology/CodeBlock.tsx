interface CodeBlockProps {
  children: React.ReactNode;
}

export const CodeBlock = ({ children }: CodeBlockProps) => {
  return (
    <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto">
      <code className="font-mono text-sm text-gray-800 whitespace-pre-wrap">
        {children}
      </code>
    </pre>
  );
};