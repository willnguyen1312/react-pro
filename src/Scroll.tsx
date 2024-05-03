import React from "react";

export default class ScrollingList extends React.Component {
  state = {
    list: [1, 2, 3, 4, 5, 6, 7],
  };

  constructor(props: any) {
    super(props);
    this.listRef = React.createRef();
  }

  getSnapshotBeforeUpdate(_, prevState: any) {
    // Are we adding new items to the list?
    // Capture the scroll position so we can adjust scroll later.
    if (prevState.list.length < this.state.list.length) {
      const list = this.listRef.current;
      return list.scrollTop;
    }
  }

  componentDidUpdate(_, __, snapshot) {
    // If we have a snapshot value, we've just added new items.
    // Adjust scroll so these new items don't push the old ones out of view.
    // (snapshot here is the value returned from getSnapshotBeforeUpdate)
    if (snapshot !== null) {
      const list = this.listRef.current;
      list.scrollTop = snapshot;
    }
  }

  render() {
    return (
      <div
        ref={this.listRef}
        style={{
          height: 200,
          width: 200,
          display: "flex",
          flexDirection: "column",
          gap: 10,
          overflow: "scroll",
        }}
      >
        {this.state.list.map((_, index) => {
          return (
            <button
              key={index}
              onClick={() => {
                const newList = [...this.state.list].concat(
                  this.state.list.length + 1,
                );

                this.setState({
                  list: newList,
                });
              }}
            >
              {index + 1}
            </button>
          );
        })}
      </div>
    );
  }
}
