import { useState } from "react";
import Container from "./Container";
import Button from "./Button";
import Input from "./Input";

const fieldsConfig = [
  {
    key: "name",
    label: { vi: "Họ & Tên", en: "Name" },
    placeholder: { vi: "Nhập họ và tên", en: "Enter name" },
    validation: (value) => value.length > 0,
    errorMessages: {
      vi: "Họ và tên không được để trống",
      en: "Name is required",
    },
    colspan: 1,
  },
  {
    key: "email",
    label: { vi: "Email", en: "Email" },
    placeholder: { vi: "Nhập email", en: "Enter email" },
    validation: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
    errorMessages: { vi: "Email không hợp lệ", en: "Invalid email" },
    colspan: 1,
  },
  {
    key: "phone",
    label: { vi: "Số điện thoại", en: "Phone" },
    placeholder: { vi: "Nhập số điện thoại", en: "Enter phone" },
    validation: (value) =>
      /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/.test(value),
    errorMessages: {
      vi: "Số điện thoại không hợp lệ",
      en: "Invalid phone number",
    },
    colspan: 1,
  },
  {
    key: "birthYear",
    label: { vi: "Năm sinh", en: "Year of birth" },
    placeholder: { vi: "Nhập năm sinh", en: "Enter year of birth" },
    validation: (value) => /^\d{4}$/.test(value),
    errorMessages: { vi: "Năm sinh không hợp lệ", en: "Invalid year of birth" },
    colspan: 1,
  },
  {
    key: "school",
    label: { vi: "Tên trường học", en: "School" },
    placeholder: { vi: "Nhập tên trường học", en: "Enter school" },
    validation: (value) => value.length > 0,
    errorMessages: {
      vi: "Trường học không được để trống",
      en: "School is required",
    },
    colspan: 2,
  },
];

const Info = ({
  onPressContinue,
  showTitle = true,
  language = "vi",
  fields = fieldsConfig,
  title = "FORM",
  columns = 2, // Số cột mặc định
}) => {
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});

  const handleChange = (key, value, validation, errorMessages) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
    if (validation) {
      const isValid = validation(value);
      setErrors((prev) => ({
        ...prev,
        [key]: isValid ? "" : errorMessages?.[language] || "Invalid value",
      }));
    }
  };

  const isFormValid =
    fields.every(
      (field) =>
        formData[field.key] && (!field.validation || !errors[field.key])
    ) && Object.keys(formData).length === fields.length;

  const handleSubmit = () => {
    if (isFormValid) {
      onPressContinue(formData);
    }
  };

  return (
    <section className="flex flex-col items-center px-5 w-full">
      {showTitle && (
        <h1 className="self-center mt-2 text-2xl font-bold text-black md:mt-0">
          {title}
        </h1>
      )}
      <Container className={"justify-center items-center py-16"}>
        <div
          className="grid gap-4 w-full"
          style={{
            gridTemplateColumns: `repeat(${columns}, 1fr)`,
          }}
        >
          {fields.map((field) => (
            <div
              key={field.key}
              className="w-full"
              style={{
                gridColumn:
                  window.innerWidth < 640
                    ? `span ${columns}`
                    : `span ${field.colspan || 1}`,
              }}
            >
              <Input
                value={formData[field.key] || ""}
                onChange={(e) =>
                  handleChange(
                    field.key,
                    e.target.value,
                    field.validation,
                    field.errorMessages
                  )
                }
                label={field.label[language] || field.label["en"]}
                placeholder={
                  field.placeholder[language] || field.placeholder["en"]
                }
                className={"w-full"}
              />
              {errors[field.key] && (
                <p className="mt-2 text-red-500">{errors[field.key]}</p>
              )}
            </div>
          ))}
        </div>
        <Button
          className={`mt-5 ${isFormValid ? "bg-blue-500" : "bg-gray-500"}`}
          disabled={!isFormValid}
          onClick={handleSubmit}
        >
          Continue
        </Button>
      </Container>
    </section>
  );
};

export default Info;
