import { useEffect, useState } from 'react';
import { getIceCreams } from '../api/iceCreamData';
import { IIceCream } from '../models/Icecream';
import LoaderMessage from '../structure/LoaderMessage';
import Main from '../structure/Main';
import IcecreamCard from './IcecreamCard';
import IcecreamCardContainer from './IcecreamCardContainer';

const Icecreams = () => {
  const [icecreams, setIcecreams] = useState(Array<IIceCream>());
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function fetchIcecreams() {
      const icecreamsData = await getIceCreams();
      setIcecreams(icecreamsData);
    }

    if (isMounted) {
      fetchIcecreams();
      setIsLoading(false);
    }

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <Main headingText="Choose your poison and enjoy!">
      <LoaderMessage
        loadingMessage="Loading the stock list"
        doneMessage="Loading stock list complete"
        isLoading={isLoading}
      ></LoaderMessage>
      {icecreams.length > 0 ? (
        <IcecreamCardContainer>
          { icecreams.map((icecream) => <IcecreamCard icecream={icecream} to={`/menu-items/add/${icecream.id}`} key={icecream.id} />)}
        </IcecreamCardContainer>
      ) : (
        isLoading && <p className="fully-stocked">Your menu is fully stocked!</p>
      )}
    </Main>
  );
};

export default Icecreams;
