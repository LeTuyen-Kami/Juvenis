import Button from "../../components/Button";

const Screen2 = ({ onChangeScreen, data }) => {
  // Trích xuất URL video từ chuỗi HTML
  const extractVideoUrlAndCleanData = (html) => {
    const match = html.match(/mp4='(.*?)'/); // Regex để tìm giá trị trong mp4=''
    const videoUrl = match ? match[1] : null;

    // Xóa đoạn [video ...][/video] khỏi data
    const cleanedHtml = html.replace(/\[video.*?\[\/video\]/g, "");

    return { videoUrl, cleanedHtml };
  };

  const { videoUrl, cleanedHtml } = extractVideoUrlAndCleanData(data);

  return (
    <div className={"mb-10 px-[10vw]"}>
      <div
        className="flex flex-col gap-2"
        dangerouslySetInnerHTML={{ __html: cleanedHtml }}
      />
      {videoUrl && (
        <div className="mt-5 mb-5">
          <video controls className="w-full">
            <source src={videoUrl} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      )}

      <div className={"flex justify-center mt-10"}>
        <Button
          onClick={() => {
            onChangeScreen();
          }}
        >
          Continue
        </Button>
      </div>
    </div>
  );
};

export default Screen2;
