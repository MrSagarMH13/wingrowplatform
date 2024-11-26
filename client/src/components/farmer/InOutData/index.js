import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { FORM_FIELDS_NAME } from "./constant";
import { Button } from "primereact/button";
import MzAutoComplete from "../../../common/MzForm/MzAutoComplete";
import "./style.css";
import { Chart } from 'primereact/chart';
import { Link } from "react-router-dom";
import { Calendar } from "primereact/calendar";
import "primereact/resources/themes/saga-green/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

const InOutData = (props) => {
  const {
    outwardList,
    inwardList,
    handleFetchInwardRecord,
    marketData,
    isloading,
  } = props.InOutwardProps;

  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm({
    mode: "onChange",
    reValidateMode: "onChange",
  });
  const [filteredOutwardList, setFilteredOutwardList] = useState([]);
  const [filteredInwardList, setFilteredInwardList] = useState([]);
  const data = {
    labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'], // Days of the week
    datasets: [
        {
            label: 'Market Sales',
            data: [500, 700, 800, 600, 900, 1200, 950], // Market sales for each day
           backgroundColor: '#66BB6A',
            borderColor: '#66BB6A', // Border color
            borderWidth: 1,
        }
    ]
};
  const onSubmit = (data) => {
    const selectedMarket = data.market;

    const filtered = outwardList?.filter(
      (item) => item.market === selectedMarket
    );
    const filteredInward = inwardList.filter(
      (item) => item.market === selectedMarket
    );
    setFilteredOutwardList(filtered);
    setFilteredInwardList(filteredInward);
  };
  const getFormErrorMessage = (name) => {
    return (
      errors[name] && <small className="p-error">{errors[name].message}</small>
    );
  };

  return (
    <div className="w-full">
      <div className="p-2 md:px-3 md:py-6 w-full  text-center md:flex align-items-center justify-content-center relative">
        <Link
          to="/farmer"
          className="text-d-none absolute"
          style={{ left: "5%" }}
        >
          <Button
            className="p-button-rounded flex justify-content-start"
            icon="pi pi-angle-left mr-2"
          >
            back
          </Button>
        </Link>
      </div>
      <div className="data-container">
        <form onSubmit={handleSubmit(onSubmit)} className="data-form">
          <div className="flex row justify-content-between align-items-center">
            <div className="market-dropdown-section col-6">
              <MzAutoComplete
                control={control}
                name={FORM_FIELDS_NAME.MARKET.name}
                label={FORM_FIELDS_NAME.MARKET.label}
                optionLabel={FORM_FIELDS_NAME.MARKET.optionLabel}
                optionValue={FORM_FIELDS_NAME.MARKET.optionValue}
                placeholder={FORM_FIELDS_NAME.MARKET.placeholder}
                rules={FORM_FIELDS_NAME.MARKET.rules}
                isError={!!errors[FORM_FIELDS_NAME.MARKET.name]}
                errorMsg={getFormErrorMessage(FORM_FIELDS_NAME.MARKET.name)}
                suggestions={marketData ?? []}
                dropdown
              />
            </div>
            <div className="calendar-section col-6" id="calender">
              <div className="">
                <label htmlFor="date">
                  Select Date<span className="required">*</span>
                </label>
                <Controller
                  name={FORM_FIELDS_NAME.B_DATE.name}
                  control={control}
                  rules={FORM_FIELDS_NAME.B_DATE.rules}
                  render={({ field }) => (
                    <Calendar
                      {...field}
                      id="date"
                      // value={dates[selectedMarket]}
                      // onChange={e => handleDateChange(e, field)}
                      placeholder={FORM_FIELDS_NAME.B_DATE.placeholder}
                      // disabledDays={getDisabledDays(marketDay)}
                      // minDate={dat}
                      showIcon={true}
                      showButtonBar={false}
                      className="w-full"
                      isError={errors[FORM_FIELDS_NAME.B_DATE.name]}
                      // errorMsg={getFormErrorMessage(
                      //   FORM_FIELDS_NAME.B_DATE.name,
                      // )}
                    />
                  )}
                />
              </div>
            </div>
            <div className="flex justify-content-end ">
              <Button
                label="Search"
                onClick={handleFetchInwardRecord}
                className="border-2 border-round-md md:w-6rem mr-2"
                disabled={isloading}
              />
            </div>
          </div>
        </form>
        <h5>Inward Data</h5>
        <hr />
        <div className="grid mt-3 mb-3">
          {filteredInwardList && filteredInwardList.length > 0 ? (
            filteredInwardList.map((inwardList, index) => (
              <div key={index} className="col-12 md:col-6 lg:col-3">
                <div className="h-full test">
                  <div className="img-cover"></div>
                  <div className="overlay"></div>
                  <div className="content font-bold shadow-1 p-3 border-1 border-50 border-round h-full hover:shadow-8">
                    <div className="flex justify-content-between mb-2">
                      <div>
                        <span className="text-900 mb-3">
                          {inwardList?.commodity}
                        </span>
                        <div className="text-900 font-medium text-xl text-white">
                          {inwardList?.market}
                        </div>
                      </div>
                    </div>
                    <div className="text-red-900">
                      Purchase Rate: {inwardList?.purchase_rate}
                    </div>
                    <div className="text-red-900">
                      Purchase Quantity: {inwardList?.purchase_quantity}
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-12 text-center">
              <p>No inward data available.</p>
            </div>
          )}
        </div>

        <h5>Outward Data</h5>
        <hr />
        <div className="grid mt-3 mb-3">
          {filteredOutwardList && filteredOutwardList.length > 0 ? (
            filteredOutwardList.map((outWardList, index) => (
              <div key={index} className="col-12 md:col-6 lg:col-3">
                <div className="h-full test">
                  <div className="img-cover"></div>
                  <div className="overlay"></div>
                  <div className="content font-bold shadow-1 p-3 border-1 border-50 border-round h-full hover:shadow-8">
                    <div className="text-red-900">{outWardList?.commodity}</div>
                    <span>{outWardList?.market}</span>
                    <br />
                    <span className="text-black">
                      Sales Rate: {outWardList?.sales_rate}
                    </span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-12 text-center">
              <p>No outward data available.</p>
            </div>
          )}
        </div>

        <h5>Market Details</h5>
        <hr />
        <div className="grid mt-3 mb-3">
          <div className="col-12 md:col-6 lg:col-3">
            <div className="h-full test">
              <div className="img-cover"></div>
              <div className="overlay"></div>
              <div className="content font-bold shadow-1 p-3 border-1 border-50 border-round h-full hover:shadow-8">
                <div className="text-white">Monday: None</div>
                <div className="text-red-900">
                  Tuesday: Karve Nagar, Kondhwa BK
                </div>
                <div className="text-white">Wednesday: Hadapsar, Undri</div>
                <div className="text-red-900">Thursday: Kharadi IT Park</div>
              
              </div>
            </div>
          </div>
          <div className="col-12 md:col-6 lg:col-3">
            <div className="h-full test">
              <div className="img-cover"></div>
              <div className="overlay"></div>
              <div className="content font-bold shadow-1 p-3 border-1 border-50 border-round h-full hover:shadow-8">
              
                <div className="text-white">
                  Friday: Bramhasum City, Wagholi
                </div>
                <div className="text-red-900">Saturday: Bhavani Road</div>
                <div className="text-white">
                  Sunday: Magarpatta, Amanora City, Green City
                </div>
              </div>
            </div>
          </div>
        </div>
        <h5>Cummulative Sales Data</h5>
        <hr />
        <div className="grid mt-3 mb-3">
          <div className="col-12 md:col-6 lg:col-3">
            <div className="h-full test">
              <div className="img-cover"></div>
              <div className="overlay"></div>
              <div className="content font-bold shadow-1 p-3 border-1 border-50 border-round h-full hover:shadow-8">
                <div className="text-white text-center">Total Purchase Quantity:</div>
                <div className="text-red-900 text-center text-4xl">
                 0
                </div>  
              </div>
            </div>
          </div>
          <div className="col-12 md:col-6 lg:col-3">
            <div className="h-full test">
              <div className="img-cover"></div>
              <div className="overlay"></div>
              <div className="content font-bold shadow-1 p-3 border-1 border-50 border-round h-full hover:shadow-8">
                <div className="text-white text-center">Total Remaining Sales:</div>
                <div className="text-red-900 text-center text-4xl">
                 0
                </div>  
              </div>
            </div>
          </div>
          <div className="col-12 md:col-6 lg:col-3">
            <div className="h-full test">
              <div className="img-cover"></div>
              <div className="overlay"></div>
              <div className="content font-bold shadow-1 p-3 border-1 border-50 border-round h-full hover:shadow-8">
                <div className="text-white text-center">Total Sales:</div>
                <div className="text-red-900 text-center text-4xl">
                 0
                </div>  
              </div>
            </div>
          </div>
        </div>
        <h5>Day Wise Market</h5>
        <hr />
        <div className="mb-4">
        <Chart type="bar" data={data}/>
        </div>
      </div>
    </div>
  );
};

export default InOutData;
