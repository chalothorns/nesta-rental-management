import Step1_GeneralInfo from "./TenantModal/Step1_GeneralInfo";
import Step2_AdditionalInfo from "./TenantModal/Step2_AdditionalInfo";
import Step3_VehicleInfo from "./TenantModal/Step3_VehicleInfo";
import { LuUpload } from "react-icons/lu";
import { AiOutlineMan, AiOutlineWoman } from "react-icons/ai";

const Stepper = ({
  
  modal,
  setModal,
  onSave,
  
}) => {

  if (!modal) return null;

  const { mode, step, tenant, isOpen } = modal;


  const handleChange = (e) => {
    const { name, value } = e.target;
    let updatedTenant = { ...tenant, [name]: value };
    if (name === "title") {
    updatedTenant.profile = (value === "นาง" || value === "นางสาว") ? "woman" : "man";
  }
    setModal((prev) => ({
      ...prev,
      tenant: updatedTenant,
    }));
  };



  const nextStep = () => setModal((prev) => ({ ...prev, step: prev.step + 1 }));

  const prevStep = () => setModal((prev) => ({ ...prev, step: prev.step - 1 }));

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <Step1_GeneralInfo
            onNext={nextStep}
            handleChange={handleChange}
            tenant={modal.tenant}
            setModal={setModal}
          />
        );
      case 2:
        return (
          <Step2_AdditionalInfo
            onNext={nextStep}
            onBack={prevStep}
            handleChange={handleChange}
            tenant={modal.tenant}
          />
        );
      case 3:
        return (
          <Step3_VehicleInfo
            onBack={prevStep}
            onSave={() => onSave(modal.tenant)}
            mode={modal.mode}
            tenant={modal.tenant}
            setModal={setModal}
            handleChange={handleChange}
          />
        );
      default:
        return null;
    }
  };

  const formPopup = isOpen
    ? "max-h-screen opacity-100"
    : "max-h-0 opacity-0 overflow-hidden mt-0";

  return (
    <div
      className={`fixed inset-0 z-50 flex items-start  justify-center bg-[#333333] bg-opacity-80 overflow-y-auto p-4 mb-20  lg:mb-0 ${formPopup}`}
    >
      <div className="w-full max-w-2xl px-8 py-4 rounded-2xl bg-white">
        <div className="flex justify-end ">
          <button
            className="py-2 px-4 rounded-xl hover:text-gray-600 hover:bg-red-200"
            onClick={() => setModal((prev) => ({ ...prev, isOpen: false }))}
          >
            X
          </button>
        </div>
        <h1 className="text-2xl font-bold text-center">
          {mode === "add" ? "เพิ่มผู้เช่าใหม่" : "แก้ไขข้อมูลผู้เช่า"}
        </h1>
        {mode === "add" && (
          <>
            <h3 className="mt-2 text-gray-500 text-base text-center">
              กรอกข้อมูลผู้เช่าให้ครบถ้วน
            </h3>
            <div className="bg-slate-100 rounded-2xl p-2 mt-5">
              <h3 className="mt-2  text-lg font-semibold ">รูปโปรไฟล์</h3>

              {/* ---------------------------Desktop-------------------------------- */}

              <div className="flex justify-center md:justify-start">
                {tenant?.profile === "man" ? (
                  <img
                    src="./img/men-profilepic.png"
                    alt="man profile picture"
                    className="w-30 h-28"
                  />
                ) : (
                  <img
                    src="./img/woman-profilepic.png"
                    alt="woman profile picture"
                    className="w-30 h-28"
                  />
                )}
                <div className="w-fit hidden md:flex gap-2 items-center">
                  {/* เลือก profile picture */}
                  <div className="border border-gray-200 rounded-xl bg-white hover:bg-[#D1F0E5]">
                    <button
                      className="flex "
                      onClick={() =>
                        setModal((prev) => ({
                          ...prev,
                          tenant: {
                            ...prev.tenant,
                            profile: "man",
                          },
                        }))
                      }
                    >
                      <AiOutlineMan className="w-5 h-5 text-[#53b8e0] mr-2" />
                      <p className="text-base  text-gray-500">ผู้ชาย</p>
                    </button>
                  </div>

                  <div className="border border-gray-200 rounded-xl bg-white hover:bg-[#D1F0E5]">
                    <button
                      className="flex"
                      onClick={() =>
                        setModal((prev) => ({
                          ...prev,
                          tenant: {
                            ...prev.tenant,
                            profile: "woman",
                          },
                        }))
                      }
                    >
                      <AiOutlineWoman className="w-5 h-5 text-[#53b8e0] mr-2" />
                      <p className="text-base  text-gray-500">ผู้หญิง</p>
                    </button>
                  </div>

                  <div className=" border border-gray-200 rounded-xl bg-white hover:bg-[#D1F0E5]">
                    <button className="flex">
                      <LuUpload className="w-5 h-5 text-[#53b8e0] mr-2" />
                      <p className="text-base  text-gray-500">อัพโหลดรูป</p>
                    </button>
                  </div>
                </div>
              </div>

              {/* ---------------------------mobile-------------------------------- */}
              <div className=" w-fit flex gap-2 md:hidden">
                {/* เลือก profile picture */}
                <div className="border border-gray-200 rounded-xl bg-white hover:bg-[#D1F0E5]">
                  <button
                    onClick={() =>
        setModal((prev) => ({
          ...prev,
          tenant: { ...prev.tenant, profile: "man" }, 
        }))
      }
                  >
                    <AiOutlineMan className="w-4 h-5 text-[#53b8e0] mr-1" />
                    <p className="text-sm  text-gray-500">ผู้ชาย</p>
                  </button>
                </div>

                <div className="border border-gray-200 rounded-xl bg-white hover:bg-[#D1F0E5]">
                  <button
                    className="flex"
                    onClick={() =>
                      setModal((prev) => ({
                        ...prev,
                        tenant: {
                          ...prev.tenant,
                          profile: "woman",
                        },
                      }))
                    }
                  >
                    <AiOutlineWoman className="w-4 h-5 text-[#53b8e0] mr-1" />
                    <p className="text-sm  text-gray-500">ผู้หญิง</p>
                  </button>
                </div>

                <div className=" border border-gray-200 rounded-xl bg-white hover:bg-[#D1F0E5]">
                  <button className="flex">
                    <LuUpload className="w-4 h-5 text-[#53b8e0] mr-1" />
                    <p className="text-sm  text-gray-500">อัพโหลดรูป</p>
                  </button>
                </div>
              </div>
            </div>
          </>
        )}

        <div className="flex justify-center items-center my-8">
          <ol className="flex items-center w-full max-w-2xl">
            <li className="flex flex-1 items-center text-fg-brand after:content-[''] after:w-full after:h-1 after:border-b after:border-brand-subtle after:border-4 after:inline-block after:ms-4 after:rounded-full">
              <span className="flex items-center justify-center w-10 h-10 bg-brand-softer rounded-full lg:h-12 lg:w-12 shrink-0">
                <svg
                  className="w-5 h-5 text-fg-brand"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M5 11.917 9.724 16.5 19 7.5"
                  />
                </svg>
              </span>
            </li>
            <li className="flex flex-1 items-center after:content-[''] after:w-full after:h-1 after:border-b after:border-default after:border-4 after:inline-block  after:ms-4 after:rounded-full">
              <span className="flex items-center justify-center w-10 h-10 bg-neutral-tertiary rounded-full lg:h-12 lg:w-12 shrink-0">
                <svg
                  className="w-5 h-5 text-body"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M15 9h3m-3 3h3m-3 3h3m-6 1c-.306-.613-.933-1-1.618-1H7.618c-.685 0-1.312.387-1.618 1M4 5h16a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Zm7 5a2 2 0 1 1-4 0 2 2 0 0 1 4 0Z"
                  />
                </svg>
              </span>
            </li>
            <li className="flex items-center">
              <span className="flex items-center justify-center w-10 h-10 bg-neutral-tertiary rounded-full lg:h-12 lg:w-12 shrink-0">
                <svg
                  className="w-5 h-5 text-body"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M15 4h3a1 1 0 0 1 1 1v15a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h3m0 3h6m-6 7 2 2 4-4m-5-9v4h4V3h-4Z"
                  />
                </svg>
              </span>
            </li>
          </ol>
        </div>

        <div>{renderStep()}</div>
      </div>
    </div>
  );
};

export default Stepper;
