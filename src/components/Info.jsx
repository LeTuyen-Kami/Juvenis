import { useState } from "react";
import Container from "./Container";
import Button from "./Button";
import Input from "./Input";

const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

const validatePhone = (phone) => {
  return /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/.test(phone);
};

const languageTxt = {
  vi: {
    title: "TRẮC NGHIỆM NGHỀ NGHIỆP",
    name: {
      label: "Họ & tên",
      placeholder: "Nhập họ và tên",
    },
    birthYear: {
      label: "Năm sinh",
      placeholder: "Nhập năm sinh",
    },
    email: {
      label: "Email",
      placeholder: "Nhập email",
    },
    phone: {
      label: "Số điện thoại",
      placeholder: "Nhập số điện thoại",
    },
    school: {
      label: "Tên trường học",
      placeholder: "Nhập tên trường học",
    },
    continue: {
      label: "Tiếp tục",
      placeholder: "Tiếp tục",
    },
    errorEmail: {
      label: "Email không hợp lệ",
      placeholder: "Email không hợp lệ",
    },
    errorPhone: {
      label: "Số điện thoại không hợp lệ",
      placeholder: "Số điện thoại không hợp lệ",
    },
  },
  en: {
    title: "CAREER TEST",
    name: {
      label: "Name",
      placeholder: "Enter name",
    },
    birthYear: {
      label: "Year of birth",
      placeholder: "Enter year of birth",
    },
    email: {
      label: "Email",
      placeholder: "Enter email",
    },
    phone: {
      label: "Phone",
      placeholder: "Enter phone",
    },
    school: {
      label: "School",
      placeholder: "Enter school",
    },
    continue: {
      label: "Continue",
      placeholder: "Continue",
    },
    errorEmail: {
      label: "Invalid email",
      placeholder: "Invalid email",
    },
    errorPhone: {
      label: "Invalid phone",
      placeholder: "Invalid phone",
    },
  },
};

const Info = ({ onPressContinue, showTitle = true, language = "vi" }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [birthYear, setBirthYear] = useState("");
  const [school, setSchool] = useState("");
  const [errorEmail, setErrorEmail] = useState("");
  const [errorPhone, setErrorPhone] = useState("");
  const enable =
    name && email && phone && !errorEmail && !errorPhone && birthYear && school;

  const _onChangeScreen = () => {
    onPressContinue({
      name,
      email,
      phone,
      birthYear,
      school,
    });
  };

  const onChangeEmail = (e) => {
    setEmail(e.target.value);
    if (validateEmail(e.target.value)) {
      setErrorEmail("");
    } else {
      setErrorEmail(languageTxt[language].errorEmail.placeholder);
    }
  };

  const onChangePhone = (e) => {
    setPhone(e.target.value);
    if (validatePhone(e.target.value)) {
      setErrorPhone("");
    } else {
      setErrorPhone(languageTxt[language].errorPhone.placeholder);
    }
  };

  return (
    <section className="flex flex-col px-5 items-center w-full">
      {showTitle && (
        <h1 className="self-center text-2xl font-bold text-black mt-2 md:mt-0">
          {languageTxt[language].title}
        </h1>
      )}
      <Container className={"items-center min-h-[50vh] justify-center"}>
        <div className={"flex mt-10 max-md:flex-col w-full"}>
          <div
            className={"mr-5 max-md:mr-0"}
            style={{
              flex: 3,
            }}
          >
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              label={languageTxt[language].name.label}
              placeholder={languageTxt[language].name.placeholder}
              //   className={"mr-5 max-md:mr-0 "}
              classInput={"w-full"}
            />
          </div>
          <div
            style={{
              flex: 2,
            }}
          >
            <Input
              value={birthYear}
              onChange={(e) => setBirthYear(e.target.value)}
              label={languageTxt[language].birthYear.label}
              placeholder={languageTxt[language].birthYear.placeholder}
              classInput={"w-full min-w-[100px]"}
              className={"max-md:mt-2"}
            />
          </div>
        </div>
        <div className={"flex max-md:flex-col mt-5 max-md:mt-2 w-full"}>
          <div
            className={"max-md:mr-0 mr-5"}
            style={{
              flex: 3,
            }}
          >
            <Input
              value={email}
              onChange={onChangeEmail}
              label={languageTxt[language].email.label}
              placeholder={languageTxt[language].email.placeholder}
              //   classInput={"mrmax-md:mr-0"}
            />
            {errorEmail && <p className="text-red-500 mt-2">{errorEmail}</p>}
          </div>
          <div
            style={{
              flex: 2,
            }}
          >
            <Input
              value={phone}
              onChange={onChangePhone}
              label={languageTxt[language].phone.label}
              placeholder={languageTxt[language].phone.placeholder}
              classInput={"w-full min-w-[100px]"}
              className={"max-md:mt-2"}
            />

            {errorPhone && <p className="text-red-500 mt-2">{errorPhone}</p>}
          </div>
        </div>
        <Input
          value={school}
          onChange={(e) => setSchool(e.target.value)}
          label={languageTxt[language].school.label}
          placeholder={languageTxt[language].school.placeholder}
          className={"mt-5 w-full max-md:mt-2"}
        />

        <div className={"flex-1"} />
        <Button
          className={`mt-5 ${enable ? "bg-blue-500 mb-4" : "bg-gray-500 mb-4"}`}
          disabled={!enable}
          onClick={_onChangeScreen}
        >
          {languageTxt[language].continue.label}
        </Button>
      </Container>
    </section>
  );
};

export default Info;
