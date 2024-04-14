import h from "hyperscript";
import { A, R, pipe } from "@mobily/ts-belt";
import destr from "destr";
type Country = {
  name: { common: string };
  population: number;
  maps: { googleMaps: string };
};
const URL = "https://restcountries.com/v3.1/all";

const fetcher = <Ok, Err = string>(url: string): Promise<R.Result<Ok, Err>> =>
  new Promise((res, rej) => {
    fetch(url)
      .then(
        (r) => r.text(),
        (e) => rej(R.Error(e.toString()))
      )
      .then(
        (d) => res(R.Ok(destr(d))),
        (e) => rej(R.Error(e.toString()))
      );
  });

const countryListing = (country: Country): HTMLElement =>
  h("li", country.name.common);

const setApp = (element: HTMLElement) => {
  const el = document.querySelector<HTMLDivElement>("#app")!;
  el.innerHTML = "";
  el.appendChild(element);
};

const getCountries = async () =>
  pipe(
    await fetcher<Country[]>(URL),
    R.map(A.take(10)),
    R.map(A.map(countryListing)),
    R.map((countries) => h("ul", ...countries)),
    R.tap(setApp)
  );

getCountries();
