'use es6';
var React = require('react');

class ECA extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rule: [0, 0, 0, 0, 0, 0, 0, 0],
      maxNumberRows: 36
    };
  }

  getChangeRule(idx) {
    return () => {
      const {rule} = this.state;
      const newRule = rule;
      newRule[idx] = rule[idx] ^ 1;
      this.setState({rule: newRule})
    }
  }

  getRuleButtons() {
    const {rule} = this.state;
    let num = 7;
    return rule.map((rule, idx) => {
      let ruleHeader = `00${(num >>> 0).toString(2)}`;
      ruleHeader = ruleHeader.substr(ruleHeader.length - 3);
      num--;
      return (
        <div key={idx} className='rule'>
          <div>{ruleHeader}</div>
          <button
            className='rule-button'
            onClick={this.getChangeRule(idx)}
            >
            {rule}
          </button>
        </div>
      );
    });
  }

  getRows() {
    const {maxNumberRows, rule} = this.state;
    let rows = [];
    let currentRowData;
    let lastRowData = [1];
    rows.push(
      <div key='rowinitial' className='row'>
        <div key={`cellinitial`} className='cell filled'/>
      </div>
    );
    for (let i = 0; i < maxNumberRows; i++) {
      currentRowData = [];
      const retRow = [];
      for (let j = 0; j < lastRowData.length+2; j++) {
        currentRowData[j] = this.getCellValue(j, lastRowData);
        retRow[j] = <div key={`cell${i}${j}`} className={`cell${currentRowData[j] ? ' filled' : ''}`}/>;
      }
      rows.push(<div key={`row${i}`} className='row'>{retRow}</div>);
      lastRowData = currentRowData;
    }
    return rows
  }

  getCellValue(cellIndex, lastRowData) {
    const {rule} = this.state;
    const parentCellValues = [];
    parentCellValues[0] = lastRowData[cellIndex-2] || 0;
    parentCellValues[1] = lastRowData[cellIndex-1] || 0;
    parentCellValues[2] = lastRowData[cellIndex] || 0;
    const ruleIndex = parentCellValues[2] + parentCellValues[1] * 2 + parentCellValues[0] * 4;
    return rule[(7-ruleIndex)];
  }

  render() {
    return (
      <div className='main'>
        <div className='rules'>
          {this.getRuleButtons()}
        </div>
        <div className='rows'>
          {this.getRows()}
        </div>
      </div>
    );
  }
};

module.exports = ECA;
