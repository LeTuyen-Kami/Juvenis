import Button from "../../components/Button";
import Container from "../../components/Container";
import Input from "../../components/Input";
import { useState } from "react";

const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

const validatePhone = (phone) => {
  return /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/.test(phone);
};

const Screen2 = ({ onChangeScreen }) => {
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
    if (name && email && phone) {
      onChangeScreen(3);
    }
  };

  const onChangeEmail = (e) => {
    setEmail(e.target.value);
    if (validateEmail(e.target.value)) {
      setErrorEmail("");
    } else {
      setErrorEmail("Email không hợp lệ");
    }
  };

  const onChangePhone = (e) => {
    setPhone(e.target.value);
    if (validatePhone(e.target.value)) {
      setErrorPhone("");
    } else {
      setErrorPhone("Số điện thoại không hợp lệ");
    }
  };

  return (
    <section className="flex flex-col px-5 items-center w-full">
      <h1 className="self-center text-2xl font-bold text-black mt-2 md:mt-0">
        TRẮC NGHIỆM NGHỀ NGHIỆP
      </h1>
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
              label="Họ & tên"
              placeholder="Nhập họ và tên"
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
              label="Năm sinh"
              placeholder="Nhập năm sinh"
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
              label="Email"
              placeholder="Nhập email"
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
              label="Số điện thoại"
              placeholder="Nhập số điện thoại"
              classInput={"w-full min-w-[100px]"}
              className={"max-md:mt-2"}
            />

            {errorPhone && <p className="text-red-500 mt-2">{errorPhone}</p>}
          </div>
        </div>
        <Input
          value={school}
          onChange={(e) => setSchool(e.target.value)}
          label="Tên trường học"
          placeholder="Nhập tên trường học"
          className={"mt-5 w-full max-md:mt-2"}
        />

        <div className={"flex-1"} />
        <Button
          className={`mt-5 ${enable ? "bg-blue-500 mb-4" : "bg-gray-500 mb-4"}`}
          onClick={_onChangeScreen}
          disabled={!enable}
        >
          Tiếp tục
        </Button>
      </Container>
    </section>
  );
};

export default Screen2;
