import MCQChallenge from './MCQChallenge';
import CodeChallenge from './CodeChallenge';
import OutputMatchChallenge from './OutputMatchChallenge';
import NumberChallenge from './NumberChallenge';

export default function ChallengeCard(props) {
  const { challenge } = props;

  if (challenge.type === 'code-challenge') {
    return <CodeChallenge {...props} />;
  }

  if (challenge.type === 'output-match') {
    return <OutputMatchChallenge {...props} />;
  }

  if (challenge.type === 'numeric-answer') {
    return <NumberChallenge {...props} />;
  }

  return <MCQChallenge {...props} />;
}