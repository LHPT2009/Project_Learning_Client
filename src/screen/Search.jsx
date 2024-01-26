import { Image, Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
const Search = () => {
  const specialityList = [
    {
      src: 'https://cdn.bookingcare.vn/fo/w1920/2023/06/07/160505-bo-sung-icon-goi-khamom-sot.png',
      text: 'Cúm & Sốt',
    },
    {
      src: 'https://cdn.bookingcare.vn/fo/w1920/2023/12/26/110200-huyen-icon-xet-nghiem.png',
      text: 'Sốt xuất huyết',
    },
    {
      src: 'https://cdn.bookingcare.vn/fo/w1920/2023/06/07/160452-bo-sung-icon-goi-khamgan.png',
      text: 'Gan',
    },
    {
      src: 'https://cdn.bookingcare.vn/fo/w1920/2023/06/07/180825-bo-sung-icon-goi-khamdi-ung-1.png',
      text: 'Dị ứng',
    },
  ];
  const hospitalList = [
    {
      src: 'https://cdn.bookingcare.vn/fo/w640/2020/06/03/114348-bv-viet-duc.jpg',
      text: 'Bệnh viện Hữu nghị Việt Đức',
    },
    {
      src: 'https://cdn.bookingcare.vn/fo/w640/2021/09/14/095119-benh-vien-cho-ray-h1.jpg',
      text: 'Bệnh viện Chợ Rẫy',
    },
    {
      src: 'https://cdn.bookingcare.vn/fo/w640/2020/05/29/112414-pk-dhyd1.jpg',
      text: 'Phòng khám Bệnh viện Đại học Y Dược 1',
    },
    {
      src: 'https://cdn.bookingcare.vn/fo/w640/2021/04/29/145224-bn-nam-hoc-va-hiem-muon-hn.jpg',
      text: 'Bệnh viện Nam học và Hiếm muộn Hà Nội',
    },
  ];
  const doctorList = [
    {
      src: 'https://i.ibb.co/ZWBPNyP/Capture.png',
      doctorName: 'Thạc sĩ, Bác sĩ Nguyễn Văn Nghị ',
      speciality: 'Tiểu đường - Nội tiết - Ung bướu - Tuyến giáp',
    },
    {
      src: 'https://i.ibb.co/ZWBPNyP/Capture.png',
      doctorName: 'Bác sĩ Chuyên khoa II Nguyễn Tuấn Minh',
      speciality: 'Sản Phụ khoa',
    },
    {
      src: 'https://i.ibb.co/ZWBPNyP/Capture.png',
      doctorName: 'Giáo sư, Tiến sĩ Hà Văn Quyết',
      speciality: 'Tiêu hoá - Bệnh Viêm gan',
    },
    {
      src: 'https://i.ibb.co/ZWBPNyP/Capture.png',
      doctorName: 'Phó Giáo sư, Tiến sĩ, Bác sĩ Nguyễn Thị Hoài An',
      speciality: 'Tai Mũi Họng - Nhi khoa',
    },
  ];
  return (
    <div>
      <>
        <Input
          addonBefore={<SearchOutlined />}
          placeholder="Tìm kiếm"
          size="large"
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '10vh',
            margin: 'auto',
            borderRadius: '20px',
          }}
        />
      </>
      <div>
        <h3 style={{ color: '#005761' }}>Chuyên khoa</h3>
      </div>
      <div>
        {specialityList.map((item, index) => (
          <div key={index} style={{ marginBottom: '10px' }}>
            <Image src={item.src} style={{ width: '50px', height: '50px' }} />
            <span>{item.text}</span>
          </div>
        ))}
      </div>
      <div>
        <h3 style={{ color: '#005761' }}>Bệnh viện</h3>
      </div>
      <div>
        {hospitalList.map((item, index) => (
          <div key={index} style={{ marginBottom: '10px' }}>
            <div>
              <Image src={item.src} style={{ width: '40px', height: '40px' }} />
              <span> {item.text}</span>
            </div>
          </div>
        ))}
      </div>
      <div>
        <h3 style={{ color: '#005761' }}>Bác sĩ</h3>
      </div>
      <div>
        {doctorList.map((item, index) => (
          <div key={index} style={{ marginBottom: '10px' }}>
            <div>
              <Image src={item.src} style={{ width: '40px', height: '40px' }} />
              <div style={{ display: 'inline-block', marginLeft: '10px', marginTop: '10px' }}>
                <div>{item.doctorName}</div>
                <div>{item.speciality}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Search;
