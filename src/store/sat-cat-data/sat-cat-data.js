import { SatCat } from "otk-data-handlers";

const globalSatCat = await SatCat.fromURL(process.env.PUBLIC_URL + "/satcat.json");

globalSatCat.forEach((sat) => {
  sat.SCENARIO_STATUS = "Inactive";
});

export default globalSatCat;