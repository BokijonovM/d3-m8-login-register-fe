import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export const useQueryParameter = ({ defaultValue, key }) => {
  const [parameter, setParameter] = useState(defaultValue);
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get(key)) {
      setParameter(params.get(key));
    }
  }, [window.location.search]);

  return parameter;
};

export const myNavigator = () => {
  const [parameter, setParameter] = useState();
  useEffect(() => {
    const location = useLocation();
    console.log(location.pathname);
    setParameter(location.pathname);
  }, []);

  return parameter;
};
