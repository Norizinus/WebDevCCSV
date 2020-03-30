import React from "react";
import result from "./data.json";
import InputField from "./InputField";
import SearchButton from "./SearchButton";
import ResetButton from "./ResetButton";
import ShowResults from "./ShowResults";
import Grid from "@material-ui/core/Grid";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import SwitchStyle from "./SwitchStyle";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#007BA7"
    },
    secondary: {
      main: "#02e2f2"
    }
  },
  typography: {
    fontFamily: [
      "Nunito",
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif"
    ].join(",")
  }
});

class App extends React.Component {
  state = {
    inputSphere: 0,
    cylinder: 0,
    addition: 0,
    results: [],
    darkMode: false
  };

  findResults = (inputSphere, cylinder, addition) => {
    let filteredData = result.data.filter(value => {
      return (
        inputSphere > value.minSphere &&
        inputSphere < value.maxSphere &&
        cylinder > value.minCylinder &&
        cylinder < value.maxCylinder &&
        addition > value.minAddition &&
        addition < value.maxAddition
      );
    });

    this.setState({
      results: filteredData
    });
  };

  onSearch = () => {
    this.findResults(
      this.state.inputSphere,
      this.state.cylinder,
      this.state.addition
    );
  };

  onReset = () => {
    this.getData();
    this.setState({
      inputSphere: 0,
      cylinder: 0,
      addition: 0
    });
  };

  onChange = (key, value) => {
    this.setState({ [key]: value });
  };

  toggledarkMode = () => {
    this.setState({
      darkMode: !this.state.darkMode
    });
  };

  getData = () => {
    this.setState({
      results: result.data
    });
  };

  componentDidMount() {
    this.getData();
  }

  render() {
    const { darkMode, inputSphere, cylinder, addition, results } = this.state;
    return (
      <ThemeProvider theme={theme}>
        <div className={darkMode ? "AppDark" : "AppLight"}>
          <Grid className="searchField">
            <InputField
              inputField={inputSphere}
              name="inputSphere"
              label="Sphere"
              onChange={this.onChange}
            />
            <InputField
              inputField={cylinder}
              name="cylinder"
              label="Cylinder"
              onChange={this.onChange}
            />
            <InputField
              inputField={addition}
              name="addition"
              label="Addition"
              onChange={this.onChange}
            />
            <SearchButton onSearch={this.onSearch} />
          </Grid>
          <Grid className="resetField">
            <ResetButton onReset={this.onReset} />
          </Grid>
          <Grid className={darkMode ? "serchResult" : "serchResultLight"}>
            <ShowResults results={results} />
          </Grid>
          <SwitchStyle
            darkMode={this.state.darkMode}
            toggledarkMode={this.toggledarkMode}
          />
        </div>
      </ThemeProvider>
    );
  }
}

export default App;
