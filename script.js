const zeroRegex = /^0$/;
const operatorRegex = /[+\-/*]/;
const operatorQuotesRegex = /"[+\-/*]"/g;
const decimalRegex = /\./;


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentOperand: '0',
      previousOperand: '' };


    this.handleClear = this.handleClear.bind(this);
    this.handleOperations = this.handleOperations.bind(this);
    this.handleNumbers = this.handleNumbers.bind(this);
    this.handleEqual = this.handleEqual.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }
  handleOperations(e) {
    let equation;
    let updatedCurrentOperand;

    //if the current operand ends with a decimal (eg. 42.), remove it
    if (/\.$/.test(this.state.currentOperand)) {
      updatedCurrentOperand = this.state.currentOperand.replace(/\.$/, '');
    } else {
      updatedCurrentOperand = this.state.currentOperand;
    }
    //After evaluating, use the previous answer to continue calculations
    if (/[=]/.test(this.state.previousOperand)) {
      equation = this.state.currentOperand;
    }
    //if the previous entry was an operator, either switch it or keep the negative
    else if (operatorRegex.test(this.state.currentOperand)) {
        if (e.target.value !== '-') {

          updatedCurrentOperand = '';
          equation = this.state.previousOperand;
          equation = equation.replace(/[*+/\-]+$/, '');
        } else {
          equation = this.state.previousOperand;
        }

      }
      //after the first operand (previous is empty), only add the current operand
      else if (this.state.previousOperand === '') {
          equation = `${updatedCurrentOperand} `;
        }
        //all other cases
        else {
            equation = this.state.previousOperand;
            equation = equation.concat(` ${updatedCurrentOperand} `);
          }
    //add operator to equation
    equation = equation.concat(e.target.value);
    this.setState({
      currentOperand: e.target.value,
      previousOperand: equation });

  }

  handleClear() {
    this.setState({
      currentOperand: '0',
      previousOperand: '' });

  }

  handleNumbers(e) {
    let operand = '';
    //if previously evaluated, reset calculations with new entry
    if (this.state.previousOperand.includes('=')) {
      this.setState({
        previousOperand: '',
        currentOperand: e.target.value });

      return;
    }
    //Decimal Logic
    if (e.target.value === '.') {
      //If the current operand is 0 or an operator, write '0.'
      if (zeroRegex.test(this.state.currentOperand) || operatorRegex.test(this.state.currentOperand)) {
        operand = '0.';
        this.setState({
          currentOperand: operand });

      }
      //if there is no decimal already present, add a decimal
      else if (!decimalRegex.test(this.state.currentOperand)) {
          operand = this.state.currentOperand;
          operand = operand.concat(e.target.value);
          this.setState({
            currentOperand: operand });

        }
    }
    //For numebrs, if there are already other numbers (not 0 or operator), concatenate the number
    else if (!zeroRegex.test(this.state.currentOperand) && !operatorRegex.test(this.state.currentOperand)) {
        operand = this.state.currentOperand;
        operand = operand.concat(e.target.value);
        this.setState({
          currentOperand: operand });

      }
      //Start a number
      else {
          operand = operand.concat(e.target.value);
          this.setState({
            currentOperand: operand });

        }
  }

  handleEqual() {

    let fullEquation = this.state.previousOperand + ' ' + this.state.currentOperand;

    let adaptedEquation = fullEquation.replace('--', '+');

    let answer = Math.round(1000000000000 * eval(adaptedEquation)) / 1000000000000;

    this.setState({
      currentOperand: answer.toString(),
      previousOperand: fullEquation + " = " });


  }
  handleDelete() {
    if (operatorRegex.test(this.state.currentOperand)) {
      return;
    }
    let operandLength = this.state.currentOperand.length;
    let deleteOperand = this.state.currentOperand.slice(0, operandLength - 1);
    if (deleteOperand.length === 0) {
      deleteOperand = '0';
    }
    this.setState({
      currentOperand: deleteOperand });

  }

  render() {
    const { currentOperand, previousOperand } = this.state;

    return /*#__PURE__*/(
      React.createElement("div", null, /*#__PURE__*/
      React.createElement("div", { id: "calculator" }, /*#__PURE__*/
      React.createElement("div", { id: "display-container" }, /*#__PURE__*/
      React.createElement("div", { id: "previousOperand" }, previousOperand), /*#__PURE__*/
      React.createElement("div", { id: "display" }, currentOperand)), /*#__PURE__*/

      React.createElement("button", { className: "clearButton", id: "clear", onClick: this.handleClear }, "AC"), /*#__PURE__*/
      React.createElement("button", { className: "backButton fa-solid fa-delete-left", id: "backspace", onClick: this.handleDelete }), /*#__PURE__*/
      React.createElement("button", { className: "operatorButton", id: "divide", value: "/", onClick: this.handleOperations }, "/"), /*#__PURE__*/
      React.createElement("button", { className: "numberButton", id: "seven", value: "7", onClick: this.handleNumbers }, "7"), /*#__PURE__*/
      React.createElement("button", { className: "numberButton", id: "eight", value: "8", onClick: this.handleNumbers }, "8"), /*#__PURE__*/
      React.createElement("button", { className: "numberButton", id: "nine", value: "9", onClick: this.handleNumbers }, "9"), /*#__PURE__*/
      React.createElement("button", { className: "operatorButton", id: "multiply", value: "*", onClick: this.handleOperations }, "*"), /*#__PURE__*/
      React.createElement("button", { className: "numberButton", id: "four", value: "4", onClick: this.handleNumbers }, "4"), /*#__PURE__*/
      React.createElement("button", { className: "numberButton", id: "five", value: "5", onClick: this.handleNumbers }, "5"), /*#__PURE__*/
      React.createElement("button", { className: "numberButton", id: "six", value: "6", onClick: this.handleNumbers }, "6"), /*#__PURE__*/
      React.createElement("button", { className: "operatorButton", id: "subtract", value: "-", onClick: this.handleOperations }, "-"), /*#__PURE__*/
      React.createElement("button", { className: "numberButton", id: "one", value: "1", onClick: this.handleNumbers }, "1"), /*#__PURE__*/
      React.createElement("button", { className: "numberButton", id: "two", value: "2", onClick: this.handleNumbers }, "2"), /*#__PURE__*/
      React.createElement("button", { className: "numberButton", id: "three", value: "3", onClick: this.handleNumbers }, "3"), /*#__PURE__*/
      React.createElement("button", { className: "operatorButton", id: "add", value: "+", onClick: this.handleOperations }, "+"), /*#__PURE__*/
      React.createElement("button", { className: "numberButton", id: "zero", value: "0", onClick: this.handleNumbers }, "0"), /*#__PURE__*/
      React.createElement("button", { className: "decimalButton", id: "decimal", value: ".", onClick: this.handleNumbers }, "."), /*#__PURE__*/
      React.createElement("button", { className: "equalsButton", id: "equals", value: "=", onClick: this.handleEqual }, "=")), /*#__PURE__*/

      React.createElement("div", { className: "credits" }, "Designed and Coded by", /*#__PURE__*/React.createElement("br", null), " Jonah Choi")));


  }}


ReactDOM.render( /*#__PURE__*/React.createElement(App, null), document.getElementById('app'));