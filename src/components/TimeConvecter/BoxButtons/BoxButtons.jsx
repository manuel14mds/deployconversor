import { useContext, useEffect, useState } from "react";

import { AppContext } from "../../../context/AppContext";
import { cities } from "../../../utils/api.cities"
import cityCountryMapping from "../../../utils/cityCountryMapping";
import { getTimeZones } from "../../../utils/timeConverter";
import SelectComponent from "../../select-input/select-component";
import styles from "./BoxButtons.module.css";
import DateInput from "./dateInput/DateInput";

function BoxButtons({
  cityOfOrigin,
  selectedCities,
  setDateInput,
  dateInput,
}) {
  const {setOriginCity, addCity, removeCity, originCity}=useContext(AppContext)

  console.log('selectedCities', selectedCities)


  useEffect(() => {
    const timezones = getTimeZones();
  }, []);


  return (
    <section className={styles.section}>
      <div className={styles.button_Layout}>
        <SelectComponent
          contentList={cities}
          itemsCollected={originCity}
          emptyMessage="No se encontraton resultados..."
          placeHolder="Seleccione una ciudad de origen"
          selectItem={setOriginCity}
        />
      </div>

      <div className={styles.box_btn_layout}>
        <DateInput setDateInput={setDateInput} dateInput={dateInput} />
      </div>

      <div className={styles.destination_Select}>
        <div className={styles.button_Layout_Destination_Select}>
          <SelectComponent
            contentList={cities}
            itemsCollected={selectedCities}
            emptyMessage="No se encontraton resultados..."
            placeHolder="Seleccione las ciudades invitadas"
            selectItem={addCity}
          />
        </div>
        <div className={styles.selected_Cities}>
          {selectedCities?.length > 0 &&
            selectedCities.map((city) => {
              return (
                <span
                  onClick={() =>removeCity(city)}
                  className={styles.cityLabel}
                  key={city}>
                  {city}
                  <img src="/svg_icons/crossIcon.svg" alt={city} />
                </span>
              );
            })}
        </div>
      </div>
    </section>
  );
}

export default BoxButtons;
