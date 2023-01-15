import { useEffect, useState } from "react";

// this hook will take a value and place it into local storage
// if there is already a value with that key in local storage,
// it will return that value instead.

// this PREFIX is useful when you have multiple apps using local
// storage from the same url (eg localhost:3000)
// the prefix allows you to keep each one seperate, and
// avoid conflicts with keys
const PREFIX = "skulls-";

function useLocalStorage(key, initialValue) {
  // combine key with the PREFIX
  const prefixedKey = PREFIX + key;

  // ~~~~~ set state ~~~~~
  const [value, setValue] = useState(() => {
    // grab value from local storage
    const jsonValue = localStorage.getItem(prefixedKey);

    // if the value DOES exist in local storage, set to default state value
    if (jsonValue !== null) return JSON.parse(jsonValue);

    // if the second argument is a function, we want to invoke
    // the function and store its return value
    if (typeof initialValue === "function") {
      return initialValue();
      // if it's a regular value, just set it to state
    } else {
      return initialValue;
    }
  });
  // ~~~~~ end initial state value function ~~~~

  // when the prefixed key or value changes, set this new value to
  // local storage
  useEffect(() => {
    localStorage.setItem(prefixedKey, JSON.stringify(value));
  }, [value, prefixedKey]);

  return [value, setValue];
}

export default useLocalStorage;
