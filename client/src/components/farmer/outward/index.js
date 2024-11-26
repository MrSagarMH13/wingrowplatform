import React, { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { FORM_FIELDS_NAME } from "./constant";
import MzInput from "../../../common/MzForm/MzInput";
import { Button } from "primereact/button";
import { Link, useNavigate, useParams } from "react-router-dom";
import MzAutoComplete from "../../../common/MzForm/MzAutoComplete";
import { t } from "i18next";
import { WINGROW_LOGO } from "../../../assets/images";
import { ROUTE_PATH } from "../../../constant/urlConstant";

const AddOutwardComponent = (props) => {
  const {
    createOutwardRecord,
    formFieldValueMap,
    isLoading,
    isCreateOutwardSuccess,
    isEditOutwardSuccess,
    isOutwardDetailSuccess,
    isPageLevelError,
    isEdit,
    handleFetchOutwardRecord,
    commodity,
    marketData,
    initOutward,
  } = props.addOutwardProps;

  console.log(isOutwardDetailSuccess);
  const {
    control,
    formState: { errors, isDirty },
    watch,
    setValue,
    getValues,
    handleSubmit,
    reset,
  } = useForm({
    defaultValues: useMemo(() => {
      // console.log("check value come or not", formFieldValueMap);
      return formFieldValueMap;
    }, [formFieldValueMap]),
    mode: "onChange",
    reValidateMode: "onChange",
  });
  const history = useNavigate();
  const { id } = useParams();
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);  
  const handleClick = () => {
    setIsFormSubmitted(true);
  };
  useEffect(() => {
    if (isCreateOutwardSuccess || isEditOutwardSuccess) {
      setTimeout(() => {
        const currentValues = getValues();
        const marketValue = currentValues.market;
        reset({
          market: marketValue,
        });
        initOutward();
      }, 1000);
    }
    // eslint-disable-next-line
  }, [isCreateOutwardSuccess, isEditOutwardSuccess]);
  useEffect(() => {
    if (isFormSubmitted && (isCreateOutwardSuccess || isEditOutwardSuccess)) {
      setTimeout(() => {
        reset()
        initOutward();
        // Optionally redirect
        history(ROUTE_PATH.FARMER.HOME);
      }, 1000);
    }
    // eslint-disable-next-line
  }, [isCreateOutwardSuccess, isEditOutwardSuccess]);

  useEffect(() => {
    if (isOutwardDetailSuccess) {
      reset({
        ...formFieldValueMap,
      });
    }
    // eslint-disable-next-line
  }, [isOutwardDetailSuccess]);

  useEffect(() => {
    if (isEdit && id) {
      handleFetchOutwardRecord(id);
      reset({
        ...formFieldValueMap,
      });
    } else {
      reset();
    }
    // eslint-disable-next-line
  }, [isEdit, id]);

  const getFormErrorMessage = (name) => {
    return (
      errors[name] && <small className="p-error">{errors[name].message}</small>
    );
  };

  const onSubmit = (data) => {
    console.log(data);
    const payload = {
      market: data?.market,
      commodity: data?.commodity,
      sales_rate: data?.saleRate,
      remaining_sale: data?.remainingSale,
    };
    createOutwardRecord(payload);
  };

  return (
    <div className="w-full">
      <div className="p-2 md:px-6 md:py-8 w-full  text-center md:flex align-items-cente justify-content-center relative">
        <Link
          to="/farmer"
          className="text-d-none w-17rem absolute"
          style={{ left: "5%" }}
        >
          <Button
            className="p-button-rounded flex  justify-content-start"
            icon="pi pi-angle-left mr-2"
          >
            {t("back")}
          </Button>
        </Link>
        <div className="flex mt-7 md:mt-0 w-full flex-column align-items-center justify-content-center ">
          <div
            style={{
              borderRadius: "56px",
              padding: "1rem",
              background:
                "linear-gradient(90deg, rgba(224, 52, 54, 0.6) 30%, rgba(104, 214,118, 0.4) 70%)",
            }}
          >
            <div
              className="w-full text-center surface-card py-6 px-5 flex flex-column align-items-center"
              style={{ borderRadius: "53px" }}
            >
              <img
                src={WINGROW_LOGO}
                alt="Wingrow logo"
                className="mb-2 w-5rem flex-shrink-0"
              />
              <h1 className="text-900 font-bold text-xl md:text-3xl mb-2">
                {/* {t("welcome_message")} */}
                Wingrow Market Pune
              </h1>
              <div className="text-600 mb-2">Outward Data</div>
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="mt-5 p-fluid w-full"
              >
                <div className="">
                  <MzAutoComplete
                    control={control}
                    name={FORM_FIELDS_NAME.MARKET.name}
                    label={t(FORM_FIELDS_NAME.MARKET.label)}
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
                <div className="">
                  <MzAutoComplete
                    control={control}
                    name={FORM_FIELDS_NAME.COMMODITY.name}
                    label={FORM_FIELDS_NAME.COMMODITY.label}
                    optionLabel={FORM_FIELDS_NAME.COMMODITY.optionLabel}
                    optionValue={FORM_FIELDS_NAME.COMMODITY.optionValue}
                    placeholder={FORM_FIELDS_NAME.COMMODITY.placeholder}
                    rules={FORM_FIELDS_NAME.COMMODITY.rules}
                    isError={!!errors[FORM_FIELDS_NAME.COMMODITY.name]}
                    errorMsg={getFormErrorMessage(
                      FORM_FIELDS_NAME.COMMODITY.name
                    )}
                    suggestions={commodity ?? []}
                    dropdown
                  />
                </div>

                <div className="">
                  <MzInput
                    control={control}
                    name={FORM_FIELDS_NAME.REMAINING_SALE.name}
                    label={FORM_FIELDS_NAME.REMAINING_SALE.label}
                    type={FORM_FIELDS_NAME.REMAINING_SALE.type}
                    placeholder={FORM_FIELDS_NAME.REMAINING_SALE.placeholder}
                    rules={FORM_FIELDS_NAME.REMAINING_SALE.rules}
                    isError={!!errors[FORM_FIELDS_NAME.REMAINING_SALE.name]}
                    errorMsg={getFormErrorMessage(
                      FORM_FIELDS_NAME.REMAINING_SALE.name
                    )}
                  />
                </div>

                <div className="">
                  <MzInput
                    control={control}
                    name={FORM_FIELDS_NAME.SALE_RATE.name}
                    label={FORM_FIELDS_NAME.SALE_RATE.label}
                    type={FORM_FIELDS_NAME.SALE_RATE.type}
                    placeholder={FORM_FIELDS_NAME.SALE_RATE.placeholder}
                    rules={FORM_FIELDS_NAME.SALE_RATE.rules}
                    isError={!!errors[FORM_FIELDS_NAME.SALE_RATE.name]}
                    errorMsg={getFormErrorMessage(
                      FORM_FIELDS_NAME.SALE_RATE.name
                    )}
                  />
                </div>

                <div className="flex justify-content-between gap-2 w-full">
                  <div className="mb-3 w-full">
                    <Button
                      label="Add"
                      className="mt-3 border-round-sm"
                      // severity="danger"
                    />
                  </div>
                  <div className="mb-3 w-full">
                    <Button
                      onClick={handleClick}
                      disabled={isLoading}
                      label="submit"
                      type="submit"
                      className="mt-3 border-round-sm"
                    />
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddOutwardComponent;
