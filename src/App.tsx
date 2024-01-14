// @ts-nocheck
import { AppProvider, Button } from "@shopify/polaris";
import "@shopify/polaris/build/esm/styles.css";
import enTranslations from "@shopify/polaris/locales/en.json";
import { Component, useReducer, useRef } from "react";
import ReactDOM from "react-dom";

function callMe() {
  console.log("called");
}
class ReactComment extends Component {
  static defaultProps = {
    trim: true,
  };

  componentDidMount() {
    let el = ReactDOM.findDOMNode(this);
    if (el) {
      ReactDOM.unmountComponentAtNode(el);
      el.outerHTML = this.createComment();
    }
  }

  createComment() {
    let text = this.props.text;

    if (this.props.trim) {
      text = text.trim();
    }

    return `<!-- ${text} -->`;
  }

  render() {
    return <div />;
  }
}

export default function App() {
  // Rerender this component using reducer
  const [, rerender] = useReducer((state) => state + 1, 0);

  // Bad stuff
  useRef(callMe());

  return (
    <AppProvider i18n={enTranslations}>
      <Button onClick={rerender}>Click me to re-render 🚀</Button>

      <ReactComment text="<fragment>" />
    </AppProvider>
  );
}
