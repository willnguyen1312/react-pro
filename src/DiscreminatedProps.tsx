type PrimaryProps = {
  type: "nice";
  primaryText?: string;
};

type SecondaryProps = {
  type: "cool";
  secondaryText?: string;
};

type Props = PrimaryProps | SecondaryProps;

export const Button = (props: Props) => {
  if (props.type === "nice") {
    return <button>{props.primaryText}</button>;
  } else if (props.type === "cool") {
    return <button>{props.secondaryText}</button>;
  }
};

export const App = () => {
  return <Button type="cool" />;
};
