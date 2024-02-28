const Child = ({ content = "Hello from child" }: { content?: string }) => {
  return <h1>{content}</h1>;
};

const Parent = ({ content }: { content?: string }) => {
  return <Child content={content} />;
};

function App() {
  const props = {
    content: "Hello from props",
  };

  return <Parent {...props} content="wakanda" />;
}

export default App;
