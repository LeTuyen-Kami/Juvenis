import { useState } from "react";
import Info from "../../components/Info";
import ScreenContainer from "../../components/ScreenContainer";
import Screen1 from "./Screen1";
import Screen3 from "./Screen3";
import Screen4 from "./Screen4";

const data = window?.data_quiz || [];

// const data = [
//   {
//     id: "1",
//     title: "TABLE A (Realistic - Người thực tế)",
//     content: {
//       list_question: [
//         "Có tính tự lập",
//         "Có đầu óc suy nghĩ thực tế",
//         "Dễ thích nghi với môi trường mới",
//         "Điều khiển các máy móc, thiết bị",
//         "Làm tốt các công việc thủ công như gấp giấy, cắt, dán, đan, móc",
//         "Thích tiếp xúc với thiên nhiên, động, thực vật",
//         "Thích làm công việc thực hành, tay chân",
//         "Thích làm những công việc thực tế",
//         "Thích làm việc ngoài trời",
//       ],
//       result:
//         "<p><strong>BẠN THUỘC TUÝP NGƯỜI THỰC TẾ - REALISTIC</strong></p><p> </p><p><strong>Người thuộc nhóm sở thích nghề nghiệp này thường có khả năng về</strong>: kỹ thuật, công nghệ, hệ thống; ưa thích làm việc với đồ vật, máy móc, động thực vật; thích làm các công việc ngoài trời.</p><p> </p><p><strong>Ngành nghề phù hợp với nhóm này bao gồm</strong>: Các nghề về kiến trúc, an toàn lao động, nghề mộc, xây dựng, thủy sản, kỹ thuật, máy tàu thủy, lái xe, huấn luyện viên, nông – lâm nghiệp (quản lý trang trại, nhân giống cá, lâm nghiệp…), cơ khí (chế tạo máy, bảo trì và sữa chữa thiết bị, luyện kim, cơ khí ứng dụng, tự động...), điện - điện tử, địa lý - địa chất (đo đạc, vẽ bản đồ địa chính), dầu khí, hải dương học, quản lý công nghiệp...</p><p> </p><p><strong>TÓM TẮT NGHỀ NGHIỆP LÝ TƯỞNG VỚI BẠN</strong></p><p> </p><p><strong>Nghề mà bạn nên chọn chứa những yếu tố</strong>: Công việc thể chất, công việc cơ khí, làm việc ngoài trời, làm việc với động vật và các công việc thủ công.</p><p> </p><p><strong>Bạn nên tránh những nghề có những yếu tố</strong>:</p><ul><li>Khoa học và công nghệ bao gồm y học, phần mềm, máy tính, khoa học thuần túy, toán học</li><li>Biểu đạt sáng tạo qua nghệ thuật như viết, vẽ, hội họa, âm nhạc, biểu diễn, cũng như nghệ thuật ẩm thực</li><li>Làm việc gần gũi với mọi người, giúp đỡ mọi người hoặc dạy học</li><li>Lãnh đạo con người, giám sát con người, thuyết phục con người, quản lý một doanh nghiệp, chính trị</li><li>Công việc lặp đi lặp lại yêu cầu sự tổ chức, công việc có tính cấu trúc cao, công việc có tính chi tiết cao, hầu hết các công việc hành chính và tài chính</li></ul>",
//     },
//     category: "1",
//     lang: "en",
//   },
// ];

const CareerTest = () => {
  const [screen, setScreen] = useState(1);
  const [selectData, setSelectData] = useState({});
  const [userInfo, setUserInfo] = useState({});

  const onChangeScreen = (screen) => {
    setScreen(screen);
  };

  const onPressSubmit = () => {
    fetch("https://juvenismaxime.com/wp-json/jm-quiz/client-result", {
      method: "POST",
      body: JSON.stringify({
        full_name: userInfo.name,
        email: userInfo.email,
        phone_number: userInfo.phone,
        year_of_birth: userInfo.birthYear,
        school: userInfo.school,
        result: selectData,
      }),
    }).catch(() => {});
  };

  const renderScreen = () => {
    switch (screen) {
      case 1:
        return (
          <Screen1
            onChangeScreen={onChangeScreen}
            lang={data?.[0]?.lang || "en"}
          />
        );
      case 2:
        return (
          <Info
            onPressContinue={(info) => {
              onChangeScreen(3);
              setUserInfo(info);
            }}
            language={data?.[0]?.lang || "en"}
          />
        );
      case 3:
        return (
          <Screen3
            data={data}
            onChangeScreen={() => {
              onChangeScreen(4);
              onPressSubmit();
            }}
            setSelectData={setSelectData}
            lang={data?.[0]?.lang || "en"}
          />
        );
      case 4:
        return (
          <Screen4
            selectData={selectData}
            data={data}
            lang={data?.[0]?.lang || "en"}
          />
        );
    }
  };

  return <ScreenContainer>{renderScreen()}</ScreenContainer>;
};

export default CareerTest;
