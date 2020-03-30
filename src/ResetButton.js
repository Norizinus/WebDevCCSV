import React from "react";
import Button from "@material-ui/core/Button";

class ResetButton extends React.Component {
  render() {
    const { onReset, darkMode } = this.props;
    return (
      <Button
        variant={"contained"}
        onClick={onReset}
        color={darkMode ? "secondary" : "primary"}
      >
        Reset
      </Button>
    );
  }
}

export default ResetButton;
