import { Component } from 'react';
import { GlobalStyle } from './GlobalStyle';
import {FeedbackOptions} from "./Feedback/FeedbackOptions";
import { Statistiks } from './Statistiks/statistiks';
import { Section } from './Section/Section';
import { Notification } from './Notifikation/Notifikation';

export class App extends Component {

  state = {
    good: 0,
    neutral: 0,
    bad: 0,
  };

  handleIncrement = option => {
    this.setState(prevState => {
      return { [option]: prevState[option] + 1 };
    });
  };
    
  countTotalFeedback = () => {
    return this.state.good + this.state.bad + this.state.neutral;
  };

  countPositiveFeedbackPercentage = () => {
    return ((this.state.good / this.countTotalFeedback()) * 100).toFixed(0);
  };

  render() {
    const { good, neutral, bad, } = this.state;
    const stateNames = Object.keys(this.state);
    const total = this.countTotalFeedback();
    const positivFeedback = this.countPositiveFeedbackPercentage();
    
    return (
      
      <>
        <GlobalStyle />
        <Section title="Please leave feedback">
        <FeedbackOptions
          options={stateNames}
            onLeaveFeedback={this.handleIncrement} />
        </Section>
        {total === 0 ? (
					<Notification message="No feedback given" />
				) : (
				<Section title="Statistics">
        <Statistiks
          good={good}
          neutral={neutral}
          bad={bad}
          total={this.countTotalFeedback(total)}
            positivFeedback={good && this.countPositiveFeedbackPercentage(positivFeedback)} />
        </Section>
				)}
        
      </>
    );
  
  }
}
