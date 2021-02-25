import axios from 'axios';
import {
  createContext,
  useContext,
  useState,
  useEffect,
} from 'react';

const SurveysContext = createContext();

export const useSurveysState = () => {
  const context = useContext(SurveysContext);

  if (context === undefined) {
    throw new Error(
      'useSurveysState must be used within a SurveysProvider'
    );
  }

  return context;
};

export const SurveysProvider = ({ children }) => {
  const [surveys, setSurveys] = useState();

  const source = axios.CancelToken.source();

  useEffect(() => {
    const fetchSurveys = async () => {
      try {
        const res = await axios.get(
          '/api/surveys',
          {
            cancelToken: source.token,
          }
        );

        setSurveys(res.data);
      } catch (error) {
        if (axios.isCancel(error)) {
          console.log(
            'Request canceled',
            error.message
          );
        } else console.error(error);
      }
    };

    fetchSurveys();

    return () => {
      source.cancel(
        'Operation cancled by the user'
      );
    };
  }, []);

  return (
    <SurveysContext.Provider value={{ surveys }}>
      {children}
    </SurveysContext.Provider>
  );
};
