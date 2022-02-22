import { useEffect, useRef, useState } from 'react';

type Props = {
  loadingMessage: string;
  isLoading: boolean;
  doneMessage: string; // aria related only
};

const LoaderMessage = ({ loadingMessage, isLoading, doneMessage }: Props) => {
  const [showLoadingMessage, setShowLoadingMessage] = useState(false);
  const [showDoneMessage, setShowDoneMessage] = useState(false);
  const isLoadingPreviousValue = useRef(false);

  // the loading message will be displayed only if isLoading takes more the 0.5 sec to change to false
  // or, loading message will be diplayed only if the request takes more then 0.5 sec to finish
  useEffect(() => {
    let loadingMessageDelay: NodeJS.Timeout;
    let doneMessageDelay: NodeJS.Timeout;

    if (isLoading) {
      loadingMessageDelay = setTimeout(() => {
        setShowLoadingMessage(true);
      }, 500);
    } else if (isLoadingPreviousValue.current) {
      setShowDoneMessage(true);
      doneMessageDelay = setTimeout(() => {
        setShowDoneMessage(false);
      }, 300);
    }

    isLoadingPreviousValue.current = isLoading;

    return () => {
      clearTimeout(loadingMessageDelay);
      clearTimeout(doneMessageDelay);
      setShowLoadingMessage(false);
      setShowDoneMessage(false);
    };
  }, [isLoading]);

  return (
    <div aria-live="assertive" aria-atomic="true">
      {showLoadingMessage && <p className="loading">{loadingMessage}</p>}
      {showDoneMessage && <p className="visually-hidden">{doneMessage}</p>}
    </div>
  );
};

export default LoaderMessage;
