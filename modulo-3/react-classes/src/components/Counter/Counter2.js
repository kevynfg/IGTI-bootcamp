import React, { Component } from 'react';

import css from './counter.module.css'
import IncrementButton from './incrementButton';
import DecrementButton from './decrementButton';
import Value from './Value';
import Steps from './Steps';

export default class Counter2 extends Component {

    handleButtonClick = (clickType) => {
        this.props.onCount(clickType)
    }

    render() {
        const { countValue, currentSteps } = this.props
        return (
            <div className={css.counterContainer}>
                <DecrementButton onDecrement={this.handleButtonClick}></DecrementButton>
                <Value value={countValue} />
                <IncrementButton onIncrement={this.handleButtonClick}></IncrementButton>
                <Steps currentSteps={currentSteps} />
            </div>
        );
    }
}