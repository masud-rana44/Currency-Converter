import { useEffect, useRef, useState } from "react";

function App() {
  const [initialAmount, setInitialAmount] = useState("");
  const [convertedAmount, setConvertedAmount] = useState("");
  const [curFrom, setCurFrom] = useState("INR");
  const [curTo, setCurTO] = useState("USD");
  const [isLoading, setIsLoading] = useState(false);

  const inputRef = useRef();

  useEffect(function () {
    inputRef.current.focus();
  }, []);

  useEffect(
    function () {
      async function fetchConvert() {
        try {
          // setIsLoading(true);

          const res = await fetch(
            `https://api.frankfurter.app/latest?amount=${initialAmount}&from=${curFrom}&to=${curTo}`
          );
          const data = await res.json();
          setConvertedAmount(data.rates[curTo]);
        } catch (err) {
          console.log(err);
        } finally {
          setIsLoading(false);
        }
      }

      if (!initialAmount || initialAmount === 0 || curFrom === curTo)
        return setConvertedAmount(initialAmount);
      fetchConvert();
    },
    [initialAmount, curFrom, curTo]
  );

  return (
    <div className="min-h-screen bg-violet-900 flex items-center justify-center ">
      <div className="min-w-sm px-6 py-10 bg-violet-800 rounded-lg">
        <input
          className="w-full border-none  outline-none bg-violet-700 rounded-md px-4 py-2 text-white font-medium leading-tight mb-8"
          type="text"
          ref={inputRef}
          value={initialAmount}
          onChange={(e) => setInitialAmount(Number(e.target.value))}
          disabled={isLoading}
        />

        <div className="flex items-center gap-6 mb-4">
          {/* From */}
          <div className="flex gap-2 items-center">
            <span className="text-white font-medium text-base uppercase">
              From
            </span>
            <select
              value={curFrom}
              onChange={(e) => setCurFrom(e.target.value)}
              disabled={isLoading}
              className="bg-violet-700 text-white font-medium text-base px-2 py-1 rounded-md border-none outline-none"
            >
              <option className="text-base font-medium" value="AUD">
                AUD
              </option>
              <option className="text-base font-medium" value="INR">
                INR
              </option>
              <option className="text-base font-medium" value="USD">
                USD
              </option>
              <option className="text-base font-medium" value="EUR">
                EUR
              </option>
              <option className="text-base font-medium" value="CAD">
                CAD
              </option>
            </select>
          </div>

          <div>
            <span className="material-symbols-outlined text-gray-300 font-medium">
              currency_exchange
            </span>
          </div>

          {/* TO */}
          <div className="flex gap-2 items-center">
            <span className="text-white font-medium text-base uppercase">
              To
            </span>
            <select
              value={curTo}
              onChange={(e) => setCurTO(e.target.value)}
              disabled={isLoading}
              className="bg-violet-700 text-white font-medium text-base px-2 py-1 rounded-md border-none outline-none"
            >
              <option className="text-base font-medium" value="AUD">
                AUD
              </option>
              <option className="text-base font-medium" value="INR">
                INR
              </option>
              <option className="text-base font-medium" value="USD">
                USD
              </option>
              <option className="text-base font-medium" value="EUR">
                EUR
              </option>
              <option className="text-base font-medium" value="CAD">
                CAD
              </option>
            </select>
          </div>
        </div>
        {initialAmount && initialAmount !== 0 && (
          <p className="text-gray-300 text-base font-medium text-center">
            {initialAmount} {curFrom} is now{" "}
            <span className="font-semibold text-lg text-white">
              {convertedAmount}
            </span>{" "}
            {curTo}
          </p>
        )}
      </div>
    </div>
  );
}

export default App;
