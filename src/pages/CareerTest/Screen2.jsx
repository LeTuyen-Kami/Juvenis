import Button from "../../components/Button";
import Container from "../../components/Container";
import Input from "../../components/Input";

const Screen2 = ({ onChangeScreen }) => {
  return (
    <section className="flex flex-col px-5 items-center w-full">
      <h1 className="self-center text-2xl font-bold text-black mt-2 md:mt-0">
        TRẮC NGHIỆM NGHỀ NGHIỆP
      </h1>
      <Container className={"items-center min-h-[50vh] justify-center"}>
        <Input
          label="Họ & tên"
          placeholder="Nhập họ và tên"
          className={"mt-10"}
        />
        <Input label="Email" placeholder="Nhập email" className={"mt-4"} />
        <Input
          label="Số điện thoại"
          placeholder="Nhập số điện thoại"
          className={"mt-4"}
        />
        <div className={"flex-1"} />
        <Button className={"mb-4"} onClick={() => onChangeScreen(3)}>
          Tiếp tục
        </Button>
      </Container>
    </section>
  );
};

export default Screen2;
